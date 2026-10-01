import { expect, fixture, html } from '@open-wc/testing';
import './wc-textarea.js';
import type { wcTextarea } from './wc-textarea.js';

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

function getLastFormValue(el: wcTextarea): unknown {
  return internalsMap.get(el)?.calls.at(-1)?.[0];
}

describe('wc-textarea', () => {
  it('渲染内部 textarea 并透传初始值', async () => {
    const el = await fixture<wcTextarea>(html`<wc-textarea value="hello"></wc-textarea>`);
    const ta = el.shadowRoot!.querySelector('textarea')!;
    expect(ta.value).to.equal('hello');
    expect(el.value).to.equal('hello');
  });

  it('默认属性正确', async () => {
    const el = await fixture<wcTextarea>(html`<wc-textarea></wc-textarea>`);
    expect(el.rows).to.equal(3);
    expect(el.status).to.equal('default');
    expect(el.autosize).to.be.false;
    expect(el.disabled).to.be.false;
    expect(el.readonly).to.be.false;
    expect(el.maxlength).to.be.undefined;
  });

  it('输入时更新 value 并派发 composed 的 wc-input 事件', async () => {
    const el = await fixture<wcTextarea>(html`<wc-textarea></wc-textarea>`);
    const ta = el.shadowRoot!.querySelector('textarea')!;
    let detail = '';
    let composed = false;
    el.addEventListener('wc-input', (e) => {
      detail = (e as CustomEvent).detail.value;
      composed = e.composed;
    });
    ta.value = 'abc';
    ta.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.value).to.equal('abc');
    expect(detail).to.equal('abc');
    expect(composed).to.be.true;
  });

  it('change 时派发 wc-change', async () => {
    const el = await fixture<wcTextarea>(html`<wc-textarea value="x"></wc-textarea>`);
    let detail = '';
    el.addEventListener('wc-change', (e) => {
      detail = (e as CustomEvent).detail.value;
    });
    el.shadowRoot!.querySelector('textarea')!.dispatchEvent(
      new Event('change', { bubbles: true, composed: true }),
    );
    expect(detail).to.equal('x');
  });

  it('maxlength 透传且渲染字数统计', async () => {
    const el = await fixture<wcTextarea>(
      html`<wc-textarea maxlength="10" value="abc"></wc-textarea>`,
    );
    expect(el.shadowRoot!.querySelector('textarea')!.getAttribute('maxlength')).to.equal('10');
    const count = el.shadowRoot!.querySelector('[part="count"]')!;
    expect(count.textContent?.trim()).to.equal('3/10');
  });

  it('未设置 maxlength 时不渲染字数统计', async () => {
    const el = await fixture<wcTextarea>(html`<wc-textarea value="abc"></wc-textarea>`);
    expect(el.shadowRoot!.querySelector('[part="count"]')).to.not.exist;
  });

  it('rows 与 placeholder/aria-label 透传', async () => {
    const el = await fixture<wcTextarea>(
      html`<wc-textarea rows="5" placeholder="请输入" label="备注"></wc-textarea>`,
    );
    const ta = el.shadowRoot!.querySelector('textarea')!;
    expect(ta.getAttribute('rows')).to.equal('5');
    expect(ta.placeholder).to.equal('请输入');
    expect(ta.getAttribute('aria-label')).to.equal('备注');
  });

  it('disabled 时内部 textarea 禁用', async () => {
    const el = await fixture<wcTextarea>(html`<wc-textarea disabled></wc-textarea>`);
    expect(el.shadowRoot!.querySelector('textarea')!.disabled).to.be.true;
  });

  it('autosize 反映为 host 属性', async () => {
    const el = await fixture<wcTextarea>(html`<wc-textarea autosize></wc-textarea>`);
    expect(el.hasAttribute('autosize')).to.be.true;
  });

  it('表单关联：value 变化时调用 setFormValue', async () => {
    const el = await fixture<wcTextarea>(html`<wc-textarea name="desc" value="wc"></wc-textarea>`);
    expect(getLastFormValue(el)).to.equal('wc');
    el.value = 'new';
    await el.updateComplete;
    expect(getLastFormValue(el)).to.equal('new');
  });

  it('暴露 part="base" / "textarea" 供外部定制', async () => {
    const el = await fixture<wcTextarea>(html`<wc-textarea></wc-textarea>`);
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="textarea"]')).to.exist;
  });
});
