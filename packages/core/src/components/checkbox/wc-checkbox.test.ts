import { expect, fixture, html } from '@open-wc/testing';
import './wc-checkbox.js';
import type { wcCheckbox } from './wc-checkbox.js';

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

function getLastFormValue(el: wcCheckbox): unknown {
  return internalsMap.get(el)?.calls.at(-1)?.[0];
}

describe('wc-checkbox', () => {
  it('默认属性正确', async () => {
    const el = await fixture<wcCheckbox>(html`<wc-checkbox>选项</wc-checkbox>`);
    expect(el.checked).to.be.false;
    expect(el.indeterminate).to.be.false;
    expect(el.value).to.equal('on');
    expect(el.disabled).to.be.false;
  });

  it('checked 属性 reflect 且同步内部 input', async () => {
    const el = await fixture<wcCheckbox>(html`<wc-checkbox checked>选项</wc-checkbox>`);
    expect(el.hasAttribute('checked')).to.be.true;
    expect(el.shadowRoot!.querySelector<HTMLInputElement>('.native')!.checked).to.be.true;
  });

  it('点击切换选中并派发 wc-change', async () => {
    const el = await fixture<wcCheckbox>(html`<wc-checkbox>选项</wc-checkbox>`);
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

  it('change 后解除半选态', async () => {
    const el = await fixture<wcCheckbox>(html`<wc-checkbox indeterminate>选项</wc-checkbox>`);
    el.shadowRoot!.querySelector<HTMLInputElement>('.native')!.click();
    await el.updateComplete;
    expect(el.indeterminate).to.be.false;
    expect(el.checked).to.be.true;
  });

  it('半选态渲染 dash 样式', async () => {
    const el = await fixture<wcCheckbox>(html`<wc-checkbox indeterminate>选项</wc-checkbox>`);
    expect(el.shadowRoot!.querySelector('.dash')).to.exist;
  });

  it('表单关联：选中提交 value，未选中提交 null', async () => {
    const el = await fixture<wcCheckbox>(
      html`<wc-checkbox name="agree" value="yes"></wc-checkbox>`,
    );
    expect(getLastFormValue(el)).to.be.null;
    el.checked = true;
    await el.updateComplete;
    expect(getLastFormValue(el)).to.equal('yes');
  });

  it('disabled 时内部 input 禁用', async () => {
    const el = await fixture<wcCheckbox>(html`<wc-checkbox disabled>选项</wc-checkbox>`);
    expect(el.shadowRoot!.querySelector<HTMLInputElement>('.native')!.disabled).to.be.true;
  });

  it('label 透传为 aria-label', async () => {
    const el = await fixture<wcCheckbox>(html`<wc-checkbox label="同意协议"></wc-checkbox>`);
    expect(el.shadowRoot!.querySelector('.native')!.getAttribute('aria-label')).to.equal(
      '同意协议',
    );
  });

  it('暴露 part="base" / "box" / "label"', async () => {
    const el = await fixture<wcCheckbox>(html`<wc-checkbox>选项</wc-checkbox>`);
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="box"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="label"]')).to.exist;
  });
});
