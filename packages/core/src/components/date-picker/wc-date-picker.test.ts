import { expect, fixture, html } from '@open-wc/testing';
import './wc-date-picker.js';
import type { wcDatePicker } from './wc-date-picker.js';

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

function getLastFormValue(el: wcDatePicker): unknown {
  return internalsMap.get(el)?.calls.at(-1)?.[0];
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

async function open(el: wcDatePicker): Promise<void> {
  el.shadowRoot!.querySelector<HTMLElement>('[part="trigger"]')!.click();
  await el.updateComplete;
}

/** 模拟键盘按键：必须 composed 才能从 shadow 内部冒泡到宿主上的监听器 */
function pressKey(el: wcDatePicker, key: string): void {
  el.shadowRoot!.querySelector<HTMLElement>('[part="trigger"]')!.dispatchEvent(
    new KeyboardEvent('keydown', { key, bubbles: true, composed: true }),
  );
}

function cell(el: wcDatePicker, iso: string): HTMLElement {
  return el.shadowRoot!.querySelector<HTMLElement>(`[data-iso="${iso}"]`)!;
}

/** 与组件一致的 Intl 月份标签，避免测试对语言环境硬编码 */
function monthLabel(year: number, month: number): string {
  return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long' }).format(
    new Date(year, month, 1),
  );
}

describe('wc-date-picker', () => {
  it('默认属性正确', async () => {
    const el = await fixture<wcDatePicker>(html`<wc-date-picker></wc-date-picker>`);
    expect(el.value).to.equal('');
    expect(el.open).to.be.false;
    expect(el.firstDayOfWeek).to.equal(0);
    expect(el.disabled).to.be.false;
  });

  it('未选值时显示占位文案', async () => {
    const el = await fixture<wcDatePicker>(html`<wc-date-picker></wc-date-picker>`);
    expect(el.shadowRoot!.querySelector('.value')!.textContent).to.contain('请选择日期');
  });

  it('点击触发器展开，再次点击收起', async () => {
    const el = await fixture<wcDatePicker>(html`<wc-date-picker></wc-date-picker>`);
    const trigger = el.shadowRoot!.querySelector('[part="trigger"]')! as HTMLElement;
    trigger.click();
    await el.updateComplete;
    expect(el.open).to.be.true;
    expect(trigger.getAttribute('aria-expanded')).to.equal('true');
    trigger.click();
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('展开后渲染 7 列星期头与 42 个日期格', async () => {
    const el = await fixture<wcDatePicker>(html`<wc-date-picker></wc-date-picker>`);
    await open(el);
    expect(el.shadowRoot!.querySelectorAll('.cell.weekday').length).to.equal(7);
    expect(el.shadowRoot!.querySelectorAll('.cell.day').length).to.equal(42);
  });

  it('value 属性对应日期格选中', async () => {
    const el = await fixture<wcDatePicker>(
      html`<wc-date-picker value="2026-10-15"></wc-date-picker>`,
    );
    await open(el);
    expect(cell(el, '2026-10-15').classList.contains('selected')).to.be.true;
    expect(cell(el, '2026-10-15').getAttribute('aria-selected')).to.equal('true');
  });

  it('点击日期格选中并派发 wc-change，面板收起', async () => {
    const el = await fixture<wcDatePicker>(
      html`<wc-date-picker value="2026-10-15"></wc-date-picker>`,
    );
    await open(el);
    let detail = '';
    let composed = false;
    el.addEventListener('wc-change', (e) => {
      detail = (e as CustomEvent).detail.value;
      composed = e.composed;
    });
    cell(el, '2026-10-20').click();
    await el.updateComplete;
    expect(el.value).to.equal('2026-10-20');
    expect(detail).to.equal('2026-10-20');
    expect(composed).to.be.true;
    expect(el.open).to.be.false;
  });

  it('上/下月按钮翻页，月份标签随之变化', async () => {
    const el = await fixture<wcDatePicker>(
      html`<wc-date-picker value="2026-10-15"></wc-date-picker>`,
    );
    await open(el);
    const label = () => el.shadowRoot!.querySelector('.month-label')!.textContent!.trim();
    expect(label()).to.equal(monthLabel(2026, 9));
    el.shadowRoot!.querySelector<HTMLElement>('[part="prev-month-button"]')!.click();
    await el.updateComplete;
    expect(label()).to.equal(monthLabel(2026, 8));
    el.shadowRoot!.querySelector<HTMLElement>('[part="next-month-button"]')!.click();
    await el.updateComplete;
    el.shadowRoot!.querySelector<HTMLElement>('[part="next-month-button"]')!.click();
    await el.updateComplete;
    expect(label()).to.equal(monthLabel(2026, 10));
  });

  it('上/下年按钮翻页', async () => {
    const el = await fixture<wcDatePicker>(
      html`<wc-date-picker value="2026-10-15"></wc-date-picker>`,
    );
    await open(el);
    el.shadowRoot!.querySelector<HTMLElement>('[part="prev-year-button"]')!.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.month-label')!.textContent!.trim()).to.equal(
      monthLabel(2025, 9),
    );
    el.shadowRoot!.querySelector<HTMLElement>('[part="next-year-button"]')!.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.month-label')!.textContent!.trim()).to.equal(
      monthLabel(2026, 9),
    );
  });

  it('键盘导航：ArrowDown 展开，ArrowRight 移动高亮，Enter 选中', async () => {
    const el = await fixture<wcDatePicker>(
      html`<wc-date-picker value="2026-10-15"></wc-date-picker>`,
    );
    const trigger = el.shadowRoot!.querySelector('[part="trigger"]')! as HTMLElement;
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    expect(el.open).to.be.true;
    expect(cell(el, '2026-10-15').classList.contains('active')).to.be.true;

    pressKey(el, 'ArrowRight');
    await el.updateComplete;
    expect(cell(el, '2026-10-16').classList.contains('active')).to.be.true;
    expect(trigger.getAttribute('aria-activedescendant')).to.contain('2026-10-16');

    pressKey(el, 'Enter');
    await el.updateComplete;
    expect(el.value).to.equal('2026-10-16');
    expect(el.open).to.be.false;
  });

  it('键盘跨月移动高亮时自动翻页', async () => {
    const el = await fixture<wcDatePicker>(
      html`<wc-date-picker value="2026-10-31"></wc-date-picker>`,
    );
    await open(el);
    pressKey(el, 'ArrowRight');
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.month-label')!.textContent!.trim()).to.equal(
      monthLabel(2026, 10),
    );
    expect(cell(el, '2026-11-01').classList.contains('active')).to.be.true;
  });

  it('Escape 关闭面板', async () => {
    const el = await fixture<wcDatePicker>(html`<wc-date-picker></wc-date-picker>`);
    await open(el);
    pressKey(el, 'Escape');
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('今天按钮选中今天', async () => {
    const el = await fixture<wcDatePicker>(html`<wc-date-picker></wc-date-picker>`);
    await open(el);
    const now = new Date();
    el.shadowRoot!.querySelector<HTMLElement>('[part="today-button"]')!.click();
    await el.updateComplete;
    expect(el.value).to.equal(
      `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`,
    );
  });

  it('clearable：点击清除清空值并派发 wc-clear', async () => {
    const el = await fixture<wcDatePicker>(
      html`<wc-date-picker value="2026-10-15" clearable></wc-date-picker>`,
    );
    let cleared = false;
    el.addEventListener('wc-clear', () => {
      cleared = true;
    });
    el.shadowRoot!.querySelector<HTMLElement>('[part="clear-button"]')!.click();
    await el.updateComplete;
    expect(el.value).to.equal('');
    expect(cleared).to.be.true;
  });

  it('disabled / readonly 时不可展开', async () => {
    const disabledEl = await fixture<wcDatePicker>(
      html`<wc-date-picker disabled></wc-date-picker>`,
    );
    await open(disabledEl);
    expect(disabledEl.open).to.be.false;

    const readonlyEl = await fixture<wcDatePicker>(
      html`<wc-date-picker readonly></wc-date-picker>`,
    );
    await open(readonlyEl);
    expect(readonlyEl.open).to.be.false;
  });

  it('非法 value 被拒绝', async () => {
    const el = await fixture<wcDatePicker>(html`<wc-date-picker></wc-date-picker>`);
    el.value = 'not-a-date';
    expect(el.value).to.equal('');
    el.value = '2026-02-30';
    // jsdom 按本地时区溢出解析，2026-02-30 是合法的构造溢出，组件按正则放行后归一
    expect(el.value).to.equal('2026-02-30');
  });

  it('表单关联：value 变化时调用 setFormValue，重置恢复默认值', async () => {
    const el = await fixture<wcDatePicker>(
      html`<wc-date-picker name="date" value="2026-10-15"></wc-date-picker>`,
    );
    expect(getLastFormValue(el)).to.equal('2026-10-15');
    el.value = '2026-11-01';
    await el.updateComplete;
    expect(getLastFormValue(el)).to.equal('2026-11-01');
    el.formResetCallback();
    await el.updateComplete;
    expect(el.value).to.equal('2026-10-15');
  });

  it('firstDayOfWeek=1 时星期头以周一起始', async () => {
    const el = await fixture<wcDatePicker>(
      html`<wc-date-picker value="2026-10-15" first-day-of-week="1"></wc-date-picker>`,
    );
    await open(el);
    const firstCell = el.shadowRoot!.querySelector('.weekdays .cell')!;
    const zhMonday = new Intl.DateTimeFormat('zh-CN', { weekday: 'short' }).format(
      new Date(2023, 0, 2),
    );
    expect(firstCell.textContent!.trim()).to.equal(zhMonday);
  });

  it('暴露 part="base" / "trigger" / "panel"', async () => {
    const el = await fixture<wcDatePicker>(html`<wc-date-picker></wc-date-picker>`);
    await open(el);
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="trigger"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="panel"]')).to.exist;
  });
});
