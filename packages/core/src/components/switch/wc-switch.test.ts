import { expect, fixture, html } from '@open-wc/testing';
import './wc-switch.js';
import type { wcSwitch } from './wc-switch.js';

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

function getLastFormValue(el: wcSwitch): unknown {
  return internalsMap.get(el)?.calls.at(-1)?.[0];
}

describe('wc-switch', () => {
  it('默认属性正确', async () => {
    const el = await fixture<wcSwitch>(html`<wc-switch></wc-switch>`);
    expect(el.checked).to.be.false;
    expect(el.checkedValue).to.equal('on');
    expect(el.uncheckedValue).to.equal('');
    expect(el.disabled).to.be.false;
  });

  it('checked 属性 reflect 且同步内部 input', async () => {
    const el = await fixture<wcSwitch>(html`<wc-switch checked></wc-switch>`);
    expect(el.hasAttribute('checked')).to.be.true;
    expect(el.shadowRoot!.querySelector<HTMLInputElement>('.native')!.checked).to.be.true;
  });

  it('点击切换并派发 wc-change', async () => {
    const el = await fixture<wcSwitch>(html`<wc-switch></wc-switch>`);
    let detail: { checked?: boolean } = {};
    el.addEventListener('wc-change', (e) => {
      detail = (e as CustomEvent).detail;
    });
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('.native')!;
    input.click();
    await el.updateComplete;
    expect(el.checked).to.be.true;
    expect(detail.checked).to.be.true;
    input.click();
    await el.updateComplete;
    expect(el.checked).to.be.false;
  });

  it('表单关联：开提交 checkedValue，关默认不提交', async () => {
    const el = await fixture<wcSwitch>(html`<wc-switch name="wifi"></wc-switch>`);
    expect(getLastFormValue(el)).to.be.null;
    el.checked = true;
    await el.updateComplete;
    expect(getLastFormValue(el)).to.equal('on');
  });

  it('value 与 checked 双向同步（供框架 v-model 绑定）', async () => {
    const el = await fixture<wcSwitch>(html`<wc-switch></wc-switch>`);
    el.value = true;
    await el.updateComplete;
    expect(el.checked).to.be.true;
    el.checked = false;
    await el.updateComplete;
    expect(el.value).to.be.false;
  });

  it('切换时伴发原生 input / change 事件且内层事件不外泄（宿主只收到一次）', async () => {
    const el = await fixture<wcSwitch>(html`<wc-switch></wc-switch>`);
    const counts = { input: 0, change: 0 };
    el.addEventListener('input', () => counts.input++);
    el.addEventListener('change', () => counts.change++);
    el.shadowRoot!.querySelector<HTMLInputElement>('.native')!.click();
    await el.updateComplete;
    expect(el.checked).to.be.true;
    expect(counts.input).to.equal(1);
    expect(counts.change).to.equal(1);
  });

  it('表单关联：uncheckedValue 自定义关闭值', async () => {
    const el = await fixture<wcSwitch>(
      html`<wc-switch name="mode" checkedvalue="1" uncheckedvalue="0"></wc-switch>`,
    );
    expect(getLastFormValue(el)).to.equal('0');
    el.checked = true;
    await el.updateComplete;
    expect(getLastFormValue(el)).to.equal('1');
  });

  it('disabled 时内部 input 禁用', async () => {
    const el = await fixture<wcSwitch>(html`<wc-switch disabled></wc-switch>`);
    expect(el.shadowRoot!.querySelector<HTMLInputElement>('.native')!.disabled).to.be.true;
  });

  it('role="switch" 语义', async () => {
    const el = await fixture<wcSwitch>(html`<wc-switch></wc-switch>`);
    expect(el.shadowRoot!.querySelector('.native')!.getAttribute('role')).to.equal('switch');
  });

  it('暴露 part="base" / "track" / "thumb" / "label"', async () => {
    const el = await fixture<wcSwitch>(html`<wc-switch></wc-switch>`);
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="track"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="thumb"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="label"]')).to.exist;
  });
});
