import { expect, fixture, html } from '@open-wc/testing';
import './wc-radio.js';
import type { wcRadio } from './wc-radio.js';

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

function getLastFormValue(el: wcRadio): unknown {
  return internalsMap.get(el)?.calls.at(-1)?.[0];
}

describe('wc-radio', () => {
  it('默认属性正确', async () => {
    const el = await fixture<wcRadio>(html`<wc-radio>选项</wc-radio>`);
    expect(el.checked).to.be.false;
    expect(el.value).to.equal('');
    expect(el.disabled).to.be.false;
  });

  it('checked 属性 reflect 且同步内部 input', async () => {
    const el = await fixture<wcRadio>(html`<wc-radio checked>选项</wc-radio>`);
    expect(el.hasAttribute('checked')).to.be.true;
    expect(el.shadowRoot!.querySelector<HTMLInputElement>('.native')!.checked).to.be.true;
  });

  it('选中时派发 wc-change 携带 value', async () => {
    const el = await fixture<wcRadio>(html`<wc-radio value="a">选项</wc-radio>`);
    let detail = '';
    el.addEventListener('wc-change', (e) => {
      detail = (e as CustomEvent).detail.value;
    });
    el.shadowRoot!.querySelector<HTMLInputElement>('.native')!.click();
    await el.updateComplete;
    expect(el.checked).to.be.true;
    expect(detail).to.equal('a');
  });

  it('表单关联：选中提交 value，未选中提交 null', async () => {
    const el = await fixture<wcRadio>(html`<wc-radio name="group" value="a"></wc-radio>`);
    expect(getLastFormValue(el)).to.be.null;
    el.checked = true;
    await el.updateComplete;
    expect(getLastFormValue(el)).to.equal('a');
  });

  it('disabled 时内部 input 禁用', async () => {
    const el = await fixture<wcRadio>(html`<wc-radio disabled>选项</wc-radio>`);
    expect(el.shadowRoot!.querySelector<HTMLInputElement>('.native')!.disabled).to.be.true;
  });

  it('label 透传为 aria-label', async () => {
    const el = await fixture<wcRadio>(html`<wc-radio label="选项一"></wc-radio>`);
    expect(el.shadowRoot!.querySelector('.native')!.getAttribute('aria-label')).to.equal('选项一');
  });

  it('暴露 part="base" / "dot" / "label"', async () => {
    const el = await fixture<wcRadio>(html`<wc-radio>选项</wc-radio>`);
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="dot"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="label"]')).to.exist;
  });
});
