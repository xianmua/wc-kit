import { expect, fixture, html } from '@open-wc/testing';
import './wc-input-number.js';
import type { wcInputNumber } from './wc-input-number.js';

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

function getLastFormValue(el: wcInputNumber): unknown {
  return internalsMap.get(el)?.calls.at(-1)?.[0];
}

/** 模拟手动输入：focus 进入编辑态 → 输入文本 → 可选 blur 提交 */
async function type(el: wcInputNumber, text: string, commit = true): Promise<void> {
  const inner = el.shadowRoot!.querySelector<HTMLInputElement>('.inner')!;
  inner.dispatchEvent(new Event('focus'));
  inner.value = text;
  inner.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  if (commit) inner.dispatchEvent(new Event('blur'));
  await el.updateComplete;
}

function getInner(el: wcInputNumber): HTMLInputElement {
  return el.shadowRoot!.querySelector<HTMLInputElement>('.inner')!;
}

describe('wc-input-number', () => {
  it('默认属性正确', async () => {
    const el = await fixture<wcInputNumber>(html`<wc-input-number></wc-input-number>`);
    expect(el.value).to.equal(0);
    expect(el.step).to.equal(1);
    expect(el.theme).to.equal('row');
    expect(el.disabled).to.be.false;
  });

  it('value 夹在 [min, max] 区间', async () => {
    const el = await fixture<wcInputNumber>(
      html`<wc-input-number min="0" max="10"></wc-input-number>`,
    );
    el.value = 15;
    expect(el.value).to.equal(10);
    el.value = -5;
    expect(el.value).to.equal(0);
  });

  it('按 step 取整且无浮点误差', async () => {
    const el = await fixture<wcInputNumber>(
      html`<wc-input-number min="0" max="1" step="0.1"></wc-input-number>`,
    );
    el.value = 0.3;
    expect(el.value).to.equal(0.3);
    el.value = 0.56;
    expect(el.value).to.equal(0.6);
  });

  it('点击增加/减少按钮步进并派发 wc-change', async () => {
    const el = await fixture<wcInputNumber>(html`<wc-input-number value="5"></wc-input-number>`);
    let detail = 0;
    let composed = false;
    el.addEventListener('wc-change', (e) => {
      detail = (e as CustomEvent).detail.value;
      composed = e.composed;
    });
    const plus = el.shadowRoot!.querySelector<HTMLButtonElement>('[part="increment-button"]')!;
    const minus = el.shadowRoot!.querySelector<HTMLButtonElement>('[part="decrement-button"]')!;
    plus.click();
    minus.click();
    await el.updateComplete;
    expect(detail).to.equal(5);
    expect(composed).to.be.true;
  });

  it('步进/提交时伴发原生 input / change 事件（编辑中不派发）', async () => {
    const el = await fixture<wcInputNumber>(html`<wc-input-number value="5"></wc-input-number>`);
    const counts = { input: 0, change: 0 };
    el.addEventListener('input', () => counts.input++);
    el.addEventListener('change', () => counts.change++);
    // 编辑中只改文本，不派发原生事件
    const inner = getInner(el);
    inner.dispatchEvent(new Event('focus'));
    inner.value = '8';
    inner.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(counts.input).to.equal(0);
    expect(counts.change).to.equal(0);
    // 失焦提交后伴发
    inner.dispatchEvent(new Event('blur'));
    await el.updateComplete;
    expect(el.value).to.equal(8);
    expect(counts.input).to.equal(1);
    expect(counts.change).to.equal(1);
  });

  it('到达边界时对应按钮禁用', async () => {
    const el = await fixture<wcInputNumber>(
      html`<wc-input-number min="0" max="10" value="10"></wc-input-number>`,
    );
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector<HTMLButtonElement>('[part="increment-button"]')!.disabled)
      .to.be.true;
    expect(el.shadowRoot!.querySelector<HTMLButtonElement>('[part="decrement-button"]')!.disabled)
      .to.be.false;
  });

  it('手动输入失焦提交并按 step 取整', async () => {
    const el = await fixture<wcInputNumber>(
      html`<wc-input-number min="0" step="5"></wc-input-number>`,
    );
    await type(el, '12');
    expect(el.value).to.equal(10);
    expect(getInner(el).value).to.equal('10');
  });

  it('输入空值或非法文本失焦回退当前值', async () => {
    const el = await fixture<wcInputNumber>(html`<wc-input-number value="7"></wc-input-number>`);
    await type(el, '');
    expect(el.value).to.equal(7);
    await type(el, 'abc');
    expect(el.value).to.equal(7);
  });

  it('Enter 提交，派发 wc-change', async () => {
    const el = await fixture<wcInputNumber>(html`<wc-input-number></wc-input-number>`);
    let detail = 0;
    el.addEventListener('wc-change', (e) => {
      detail = (e as CustomEvent).detail.value;
    });
    const inner = getInner(el);
    inner.dispatchEvent(new Event('focus'));
    inner.value = '42';
    inner.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    inner.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await el.updateComplete;
    expect(el.value).to.equal(42);
    expect(detail).to.equal(42);
  });

  it('ArrowUp / ArrowDown 键盘步进', async () => {
    const el = await fixture<wcInputNumber>(html`<wc-input-number value="5"></wc-input-number>`);
    const inner = getInner(el);
    inner.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    inner.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;
    expect(el.value).to.equal(5);
    // 单独验证向上步进
    inner.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    await el.updateComplete;
    expect(el.value).to.equal(6);
  });

  it('disabled / readonly 时不响应步进', async () => {
    const disabledEl = await fixture<wcInputNumber>(
      html`<wc-input-number value="5" disabled></wc-input-number>`,
    );
    disabledEl.shadowRoot!.querySelector<HTMLButtonElement>('[part="increment-button"]')!.click();
    await disabledEl.updateComplete;
    expect(disabledEl.value).to.equal(5);

    const readonlyEl = await fixture<wcInputNumber>(
      html`<wc-input-number value="5" readonly></wc-input-number>`,
    );
    readonlyEl.shadowRoot!.querySelector<HTMLButtonElement>('[part="increment-button"]')!.click();
    await readonlyEl.updateComplete;
    expect(readonlyEl.value).to.equal(5);
  });

  it('输入过程中派发 wc-input', async () => {
    const el = await fixture<wcInputNumber>(html`<wc-input-number></wc-input-number>`);
    let received: { value: number; text: string } | undefined;
    el.addEventListener('wc-input', (e) => {
      received = (e as CustomEvent).detail;
    });
    await type(el, '123', false);
    expect(received?.text).to.equal('123');
    expect(received?.value).to.equal(123);
  });

  it('表单关联：value 变化时调用 setFormValue，重置恢复默认值', async () => {
    const el = await fixture<wcInputNumber>(
      html`<wc-input-number name="count" value="3"></wc-input-number>`,
    );
    expect(getLastFormValue(el)).to.equal('3');
    el.value = 8;
    await el.updateComplete;
    expect(getLastFormValue(el)).to.equal('8');
    el.formResetCallback();
    await el.updateComplete;
    expect(el.value).to.equal(3);
  });

  it('theme=column 渲染纵向步进器，theme=normal 不渲染按钮', async () => {
    const column = await fixture<wcInputNumber>(
      html`<wc-input-number theme="column"></wc-input-number>`,
    );
    expect(column.shadowRoot!.querySelector('.stepper')).to.exist;
    expect(column.shadowRoot!.querySelectorAll('.step').length).to.equal(2);

    const normal = await fixture<wcInputNumber>(
      html`<wc-input-number theme="normal"></wc-input-number>`,
    );
    expect(normal.shadowRoot!.querySelectorAll('.step').length).to.equal(0);
  });

  it('暴露 part="base" / "input" / "increment-button" / "decrement-button"', async () => {
    const el = await fixture<wcInputNumber>(html`<wc-input-number></wc-input-number>`);
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="input"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="increment-button"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="decrement-button"]')).to.exist;
  });
});
