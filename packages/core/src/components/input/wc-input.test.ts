import { expect, fixture, html } from '@open-wc/testing';
import './wc-input.js';
import type { wcInput } from './wc-input.js';

/* jsdom 未实现 ElementInternals（attachInternals），注入最小 mock 供断言 */
interface MockInternals {
  setFormValue: (...args: unknown[]) => void;
  setValidity: () => void;
  calls: unknown[][];
}

const internalsMap = new WeakMap<Element, MockInternals>();

// jsdom 的 attachInternals 返回空壳 internals（无 setFormValue/form），统一替换为可断言的 mock
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

function getLastFormValue(el: wcInput): unknown {
  const mock = internalsMap.get(el);
  return mock?.calls.at(-1)?.[0];
}

describe('wc-input', () => {
  it('渲染内部 input 并透传初始值', async () => {
    const el = await fixture<wcInput>(html`<wc-input value="hello"></wc-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.value).to.equal('hello');
    expect(el.value).to.equal('hello');
  });

  it('默认属性正确', async () => {
    const el = await fixture<wcInput>(html`<wc-input></wc-input>`);
    expect(el.type).to.equal('text');
    expect(el.size).to.equal('medium');
    expect(el.status).to.equal('default');
    expect(el.disabled).to.be.false;
    expect(el.readonly).to.be.false;
    expect(el.clearable).to.be.false;
  });

  it('输入时更新 value 并派发 composed 的 wc-input 事件', async () => {
    const el = await fixture<wcInput>(html`<wc-input></wc-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    let detail = '';
    let composed = false;
    el.addEventListener('wc-input', (e) => {
      detail = (e as CustomEvent).detail.value;
      composed = e.composed;
    });
    input.value = 'abc';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.value).to.equal('abc');
    expect(detail).to.equal('abc');
    // composed：宿主外部（document）也能监听到
    expect(composed).to.be.true;
  });

  it('change 时派发 wc-change', async () => {
    const el = await fixture<wcInput>(html`<wc-input value="x"></wc-input>`);
    let detail = '';
    el.addEventListener('wc-change', (e) => {
      detail = (e as CustomEvent).detail.value;
    });
    el.shadowRoot!.querySelector('input')!.dispatchEvent(
      new Event('change', { bubbles: true, composed: true }),
    );
    expect(detail).to.equal('x');
  });

  it('maxlength 透传到内部 input', async () => {
    const el = await fixture<wcInput>(html`<wc-input maxlength="10"></wc-input>`);
    expect(el.shadowRoot!.querySelector('input')!.getAttribute('maxlength')).to.equal('10');
  });

  it('placeholder 与 aria-label 透传', async () => {
    const el = await fixture<wcInput>(
      html`<wc-input placeholder="请输入" label="用户名"></wc-input>`,
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.placeholder).to.equal('请输入');
    expect(input.getAttribute('aria-label')).to.equal('用户名');
  });

  it('disabled 时内部 input 禁用', async () => {
    const el = await fixture<wcInput>(html`<wc-input disabled></wc-input>`);
    expect(el.shadowRoot!.querySelector('input')!.disabled).to.be.true;
  });

  it('clearable：有值时渲染清除按钮，点击清空并派发事件', async () => {
    const el = await fixture<wcInput>(html`<wc-input clearable value="abc"></wc-input>`);
    const clearBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('[part="clear-button"]')!;
    expect(clearBtn).to.exist;

    const events: string[] = [];
    el.addEventListener('wc-clear', () => events.push('clear'));
    el.addEventListener('wc-change', (e) => events.push((e as CustomEvent).detail.value));
    clearBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
    await el.updateComplete;
    expect(el.value).to.equal('');
    expect(events).to.deep.equal(['clear', '']);
  });

  it('clearable：无值或只读时不渲染清除按钮', async () => {
    const el = await fixture<wcInput>(html`<wc-input clearable></wc-input>`);
    expect(el.shadowRoot!.querySelector('[part="clear-button"]')).to.not.exist;

    const readonlyEl = await fixture<wcInput>(
      html`<wc-input clearable readonly value="x"></wc-input>`,
    );
    expect(readonlyEl.shadowRoot!.querySelector('[part="clear-button"]')).to.not.exist;
  });

  it('表单关联：value 变化时调用 setFormValue', async () => {
    const el = await fixture<wcInput>(html`<wc-input name="username" value="wc"></wc-input>`);
    expect(getLastFormValue(el)).to.equal('wc');
    el.value = 'new';
    await el.updateComplete;
    expect(getLastFormValue(el)).to.equal('new');
  });

  it('暴露 part="base" / "input" 供外部定制', async () => {
    const el = await fixture<wcInput>(html`<wc-input></wc-input>`);
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="input"]')).to.exist;
  });
});
