import { expect, fixture, html } from '@open-wc/testing';
import './wc-date-range-picker.js';
import type { wcDateRangePicker } from './wc-date-range-picker.js';

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

function getLastFormValue(el: wcDateRangePicker): unknown {
  return internalsMap.get(el)?.calls.at(-1)?.[0];
}

async function open(el: wcDateRangePicker): Promise<void> {
  el.shadowRoot!.querySelector<HTMLElement>('[part="trigger"]')!.click();
  await el.updateComplete;
}

/** 模拟键盘按键：必须 composed 才能从 shadow 内部冒泡到宿主上的监听器 */
function pressKey(el: wcDateRangePicker, key: string): void {
  el.shadowRoot!.querySelector<HTMLElement>('[part="trigger"]')!.dispatchEvent(
    new KeyboardEvent('keydown', { key, bubbles: true, composed: true }),
  );
}

function cell(el: wcDateRangePicker, iso: string): HTMLElement {
  return el.shadowRoot!.querySelector<HTMLElement>(`[data-iso="${iso}"]`)!;
}

/** 与组件一致的 Intl 月份标签，避免测试对语言环境硬编码 */
function monthLabel(year: number, month: number): string {
  return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long' }).format(
    new Date(year, month, 1),
  );
}

describe('wc-date-range-picker', () => {
  it('默认属性正确', async () => {
    const el = await fixture<wcDateRangePicker>(
      html`<wc-date-range-picker></wc-date-range-picker>`,
    );
    expect(el.value).to.equal('');
    expect(el.open).to.be.false;
    expect(el.clearable).to.be.false;
    expect(el.disabled).to.be.false;
  });

  it('value="a,b" 解析为区间并显示在触发器，非法值被拒', async () => {
    const el = await fixture<wcDateRangePicker>(
      html`<wc-date-range-picker value="2026-10-01,2026-10-15"></wc-date-range-picker>`,
    );
    const text = el.shadowRoot!.querySelector('[part="value"]')!.textContent!.replace(/\s+/g, ' ');
    expect(text).to.contain('2026-10-01');
    expect(text).to.contain('2026-10-15');

    el.value = 'bad,date';
    await el.updateComplete;
    expect(el.value).to.equal('');

    el.value = '2026-10-08';
    await el.updateComplete;
    expect(el.value).to.equal('');
  });

  it('展开渲染双月面板，右月 = 左月 + 1', async () => {
    const el = await fixture<wcDateRangePicker>(
      html`<wc-date-range-picker></wc-date-range-picker>`,
    );
    await open(el);
    const months = el.shadowRoot!.querySelectorAll('.month');
    expect(months.length).to.equal(2);
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const labels = [...months].map((m) => m.querySelector('.month-label')!.textContent!.trim());
    expect(labels[0]).to.equal(monthLabel(now.getFullYear(), now.getMonth()));
    expect(labels[1]).to.equal(monthLabel(next.getFullYear(), next.getMonth()));
  });

  it('两次点击完成选择：detail.value 为 [start, end]，面板收起并提交表单值', async () => {
    const el = await fixture<wcDateRangePicker>(
      html`<wc-date-range-picker></wc-date-range-picker>`,
    );
    const events: Array<{ value: string[] }> = [];
    el.addEventListener('wc-change', (e) => events.push((e as CustomEvent).detail));
    await open(el);

    cell(el, '2026-10-05').click();
    await el.updateComplete;
    expect(el.open).to.be.true; // 第一击后面板保持展开等待终点
    expect(events.length).to.equal(0);

    cell(el, '2026-10-20').click();
    await el.updateComplete;
    expect(el.open).to.be.false;
    expect(events.length).to.equal(1);
    expect(events[0]!.value).to.eql(['2026-10-05', '2026-10-20']);
    expect(el.value).to.equal('2026-10-05,2026-10-20');
    expect(getLastFormValue(el)).to.equal('2026-10-05,2026-10-20');
  });

  it('第二击早于起点时自动交换', async () => {
    const el = await fixture<wcDateRangePicker>(
      html`<wc-date-range-picker></wc-date-range-picker>`,
    );
    const events: Array<{ value: string[] }> = [];
    el.addEventListener('wc-change', (e) => events.push((e as CustomEvent).detail));
    await open(el);
    cell(el, '2026-10-20').click();
    await el.updateComplete;
    cell(el, '2026-10-05').click();
    await el.updateComplete;
    expect(events[0]!.value).to.eql(['2026-10-05', '2026-10-20']);
    expect(el.value).to.equal('2026-10-05,2026-10-20');
  });

  it('clearable：清除后清空值并派发 wc-clear / wc-change', async () => {
    const el = await fixture<wcDateRangePicker>(
      html`<wc-date-range-picker clearable value="2026-10-01,2026-10-15"></wc-date-range-picker>`,
    );
    const clears: number[] = [];
    el.addEventListener('wc-clear', () => clears.push(1));
    const events: Array<{ value: string[] }> = [];
    el.addEventListener('wc-change', (e) => events.push((e as CustomEvent).detail));
    el.shadowRoot!.querySelector<HTMLElement>('[part="clear-button"]')!.click();
    await el.updateComplete;
    expect(el.value).to.equal('');
    expect(clears.length).to.equal(1);
    expect(events[0]!.value).to.eql(['', '']);
  });

  it('disabled / readonly 时不可展开', async () => {
    const disabled = await fixture<wcDateRangePicker>(
      html`<wc-date-range-picker disabled></wc-date-range-picker>`,
    );
    await open(disabled);
    expect(disabled.open).to.be.false;

    const readonly = await fixture<wcDateRangePicker>(
      html`<wc-date-range-picker readonly></wc-date-range-picker>`,
    );
    await open(readonly);
    expect(readonly.open).to.be.false;
  });

  it('键盘：ArrowDown 高亮后 Enter 两击完成选择', async () => {
    const el = await fixture<wcDateRangePicker>(
      html`<wc-date-range-picker></wc-date-range-picker>`,
    );
    const events: Array<{ value: string[] }> = [];
    el.addEventListener('wc-change', (e) => events.push((e as CustomEvent).detail));
    await open(el);
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    pressKey(el, 'Enter'); // 起点
    await el.updateComplete;
    expect(el.open).to.be.true;
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    pressKey(el, 'Enter'); // 终点
    await el.updateComplete;
    expect(el.open).to.be.false;
    expect(events.length).to.equal(1);
    const [s, e] = events[0]!.value;
    expect(s).to.not.equal('');
    expect(e).to.not.equal('');
    expect(el.value).to.equal(`${s},${e}`);
  });

  it('暴露 part="base" / "trigger" / "panel"', async () => {
    const el = await fixture<wcDateRangePicker>(
      html`<wc-date-range-picker></wc-date-range-picker>`,
    );
    await open(el);
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="trigger"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="panel"]')).to.exist;
  });
});
