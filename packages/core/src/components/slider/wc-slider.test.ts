import { expect, fixture, html } from '@open-wc/testing';
import './wc-slider.js';
import type { wcSlider } from './wc-slider.js';

/* jsdom 的 attachInternals 返回空壳 internals，替换为可断言的 mock（同 wc-input 模式） */
interface MockInternals {
  setFormValue: (...args: unknown[]) => void;
  setValidity: () => void;
  calls: unknown[][];
}

const internalsMap = new WeakMap<Element, MockInternals>();

Object.defineProperty(HTMLElement.prototype, 'attachInternals', {
  configurable: true,
  writable: true,
  value(this: HTMLElement) {
    const mock: MockInternals = {
      calls: [],
      setFormValue(...args: unknown[]) {
        mock.calls.push(args);
      },
      setValidity() {},
    };
    internalsMap.set(this, mock);
    return mock as unknown as ElementInternals;
  },
});

function getLastFormValue(el: wcSlider): unknown {
  return internalsMap.get(el)?.calls.at(-1)?.[0];
}

describe('wc-slider', () => {
  it('默认属性正确', async () => {
    const el = await fixture<wcSlider>(html`<wc-slider></wc-slider>`);
    expect(el.value).to.equal(0);
    expect(el.min).to.equal(0);
    expect(el.max).to.equal(100);
    expect(el.step).to.equal(1);
    expect(el.disabled).to.be.false;
  });

  it('value 夹在 [min, max] 区间', async () => {
    const el = await fixture<wcSlider>(html`<wc-slider min="10" max="20"></wc-slider>`);
    el.value = 5;
    expect(el.value).to.equal(10);
    el.value = 99;
    expect(el.value).to.equal(20);
  });

  it('按 step 取整', async () => {
    const el = await fixture<wcSlider>(html`<wc-slider min="0" max="10" step="2"></wc-slider>`);
    el.value = 3;
    expect(el.value).to.equal(4);
    el.value = 4.6;
    expect(el.value).to.equal(4);
  });

  it('拖动（input 事件）更新 value 并派发 wc-input', async () => {
    const el = await fixture<wcSlider>(html`<wc-slider></wc-slider>`);
    let detail = 0;
    let composed = false;
    el.addEventListener('wc-input', (e) => {
      detail = (e as CustomEvent).detail.value;
      composed = e.composed;
    });
    const native = el.shadowRoot!.querySelector<HTMLInputElement>('.native')!;
    native.value = '50';
    native.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.value).to.equal(50);
    expect(detail).to.equal(50);
    expect(composed).to.be.true;
  });

  it('松手派发 wc-change', async () => {
    const el = await fixture<wcSlider>(html`<wc-slider value="10"></wc-slider>`);
    let detail = 0;
    el.addEventListener('wc-change', (e) => {
      detail = (e as CustomEvent).detail.value;
    });
    el.shadowRoot!.querySelector('.native')!.dispatchEvent(
      new Event('change', { bubbles: true, composed: true }),
    );
    expect(detail).to.equal(10);
  });

  it('伴发原生 input / change 事件且内层事件不外泄（宿主只收到一次）', async () => {
    const el = await fixture<wcSlider>(html`<wc-slider value="10"></wc-slider>`);
    const native = el.shadowRoot!.querySelector<HTMLInputElement>('.native')!;
    let inputCount = 0;
    let changeCount = 0;
    el.addEventListener('input', () => inputCount++);
    el.addEventListener('change', () => changeCount++);
    native.value = '50';
    native.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    native.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(inputCount).to.equal(1);
    expect(changeCount).to.equal(1);
  });

  it('fill 宽度与 thumb 位置反映百分比', async () => {
    const el = await fixture<wcSlider>(html`<wc-slider value="25"></wc-slider>`);
    await el.updateComplete;
    const fill = el.shadowRoot!.querySelector<HTMLElement>('[part="fill"]')!;
    const thumb = el.shadowRoot!.querySelector<HTMLElement>('[part="thumb"]')!;
    expect(fill.style.width).to.equal('25%');
    expect(thumb.style.left).to.equal('25%');
  });

  it('非 0 起点的百分比计算正确', async () => {
    const el = await fixture<wcSlider>(html`<wc-slider min="0" max="200" value="50"></wc-slider>`);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector<HTMLElement>('[part="fill"]')!.style.width).to.equal('25%');
  });

  it('disabled 时原生 input 禁用', async () => {
    const el = await fixture<wcSlider>(html`<wc-slider disabled></wc-slider>`);
    expect(el.shadowRoot!.querySelector<HTMLInputElement>('.native')!.disabled).to.be.true;
  });

  it('label 透传为 aria-label', async () => {
    const el = await fixture<wcSlider>(html`<wc-slider label="音量"></wc-slider>`);
    expect(el.shadowRoot!.querySelector('.native')!.getAttribute('aria-label')).to.equal('音量');
  });

  it('表单关联：value 变化时调用 setFormValue', async () => {
    const el = await fixture<wcSlider>(html`<wc-slider name="vol" value="30"></wc-slider>`);
    expect(getLastFormValue(el)).to.equal('30');
    el.value = 60;
    await el.updateComplete;
    expect(getLastFormValue(el)).to.equal('60');
  });

  it('暴露 part="base" / "track" / "fill" / "thumb"', async () => {
    const el = await fixture<wcSlider>(html`<wc-slider></wc-slider>`);
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="track"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="fill"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="thumb"]')).to.exist;
  });
});
