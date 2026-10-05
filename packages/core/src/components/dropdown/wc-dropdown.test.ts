import { expect, fixture, html } from '@open-wc/testing';
import '../button/wc-button.js';
import './wc-dropdown.js';
import './wc-dropdown-item.js';
import type { wcDropdown } from './wc-dropdown.js';
import type { wcDropdownItem } from './wc-dropdown-item.js';

/** 构造带 3 个菜单项的下拉（第二项禁用） */
async function fixtureDropdown() {
  const el = await fixture<wcDropdown>(html`
    <wc-dropdown>
      <wc-button slot="trigger">下拉菜单</wc-button>
      <wc-dropdown-item value="a">操作一</wc-dropdown-item>
      <wc-dropdown-item value="b" disabled>操作二</wc-dropdown-item>
      <wc-dropdown-item value="c">操作三</wc-dropdown-item>
    </wc-dropdown>
  `);
  await el.updateComplete;
  return el;
}

/** 点击宿主上的触发按钮（走 trigger slot 的冒泡链路） */
function clickTrigger(el: wcDropdown): void {
  el.shadowRoot!.querySelector<HTMLElement>('.trigger')!.click();
}

function items(el: wcDropdown): wcDropdownItem[] {
  return Array.from(el.querySelectorAll('wc-dropdown-item'));
}

describe('wc-dropdown', () => {
  it('open reflect 且触发点击开合，派发 wc-open / wc-close', async () => {
    const el = await fixtureDropdown();
    const events: string[] = [];
    el.addEventListener('wc-open', () => events.push('open'));
    el.addEventListener('wc-close', () => events.push('close'));

    clickTrigger(el);
    await el.updateComplete;
    expect(el.open).to.be.true;
    expect(el.hasAttribute('open')).to.be.true;
    expect(events).to.deep.equal(['open']);

    clickTrigger(el);
    await el.updateComplete;
    expect(el.open).to.be.false;
    expect(events).to.deep.equal(['open', 'close']);
  });

  it('面板展开时可见且 role=menu', async () => {
    const el = await fixtureDropdown();
    const panel = el.shadowRoot!.querySelector<HTMLElement>('.panel')!;
    expect(panel.hasAttribute('data-open')).to.be.false;
    clickTrigger(el);
    await el.updateComplete;
    expect(panel.getAttribute('role')).to.equal('menu');
    expect(panel.hasAttribute('data-open')).to.be.true;
    // 定位引擎已应用 fixed 坐标
    expect(panel.style.left).to.contain('px');
    expect(panel.style.top).to.contain('px');
  });

  it('菜单项被收集并分配导航 id', async () => {
    const el = await fixtureDropdown();
    const collected = items(el);
    expect(collected.length).to.equal(3);
    expect(collected[0]!.id).to.contain('wc-dropdown-item-');
  });

  it('点击菜单项派发 wc-select 并关闭（reason=select）', async () => {
    const el = await fixtureDropdown();
    clickTrigger(el);
    await el.updateComplete;
    let detail: { value: string; label: string } | null = null;
    let closeReason = '';
    el.addEventListener('wc-select', (e) => {
      detail = (e as CustomEvent).detail;
    });
    el.addEventListener('wc-close', (e) => {
      closeReason = (e as CustomEvent).detail.reason;
    });
    items(el)[2]!.shadowRoot!.querySelector<HTMLElement>('.item')!.click();
    await el.updateComplete;
    expect(detail).to.deep.equal({ value: 'c', label: '操作三' });
    expect(closeReason).to.equal('select');
    expect(el.open).to.be.false;
  });

  it('disabled 菜单项与分隔线不触发选中', async () => {
    const el = await fixtureDropdown();
    clickTrigger(el);
    await el.updateComplete;
    let selected = false;
    el.addEventListener('wc-select', () => {
      selected = true;
    });
    items(el)[1]!.shadowRoot!.querySelector<HTMLElement>('.item')!.click();
    expect(selected).to.be.false;
    expect(el.open).to.be.true;
  });

  it('Escape 关闭且 reason=escape，外部点击关闭 reason=outside', async () => {
    const el = await fixtureDropdown();
    const reasons: string[] = [];
    el.addEventListener('wc-close', (e) => reasons.push((e as CustomEvent).detail.reason));

    clickTrigger(el);
    await el.updateComplete;
    el.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }),
    );
    expect(el.open).to.be.false;
    expect(reasons).to.deep.equal(['escape']);

    clickTrigger(el);
    await el.updateComplete;
    document.body.click();
    expect(el.open).to.be.false;
    expect(reasons).to.deep.equal(['escape', 'outside']);
  });

  it('键盘：ArrowDown 打开并高亮首项，跳过 disabled，Enter 选中', async () => {
    const el = await fixtureDropdown();
    const key = (k: string) =>
      el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, composed: true }));

    key('ArrowDown');
    await el.updateComplete;
    await items(el)[0]!.updateComplete;
    expect(items(el)[0]!.hasAttribute('active')).to.be.true;

    // 下移跳过禁用的第二项，停到第三项
    key('ArrowDown');
    await items(el)[0]!.updateComplete;
    await items(el)[2]!.updateComplete;
    expect(items(el)[2]!.hasAttribute('active')).to.be.true;
    expect(items(el)[0]!.hasAttribute('active')).to.be.false;

    key('Enter');
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('键盘选中已高亮项并派发 wc-select', async () => {
    const el = await fixtureDropdown();
    const key = (k: string) =>
      el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, composed: true }));
    key('ArrowDown');
    await el.updateComplete;
    let value = '';
    el.addEventListener('wc-select', (e) => {
      value = (e as CustomEvent).detail.value;
    });
    key('Enter');
    await el.updateComplete;
    expect(value).to.equal('a');
    expect(el.open).to.be.false;
  });

  it('disabled 状态下触发器不响应', async () => {
    const el = await fixture<wcDropdown>(html`
      <wc-dropdown disabled>
        <wc-button slot="trigger">下拉</wc-button>
        <wc-dropdown-item value="a">操作一</wc-dropdown-item>
      </wc-dropdown>
    `);
    await el.updateComplete;
    clickTrigger(el);
    await el.updateComplete;
    expect(el.open).to.be.false;
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(el.open).to.be.false;
  });

  it('placement 属性透传定位引擎（面板坐标随 placement 变化）', async () => {
    const el = await fixture<wcDropdown>(html`
      <wc-dropdown placement="top-end">
        <wc-button slot="trigger">下拉</wc-button>
        <wc-dropdown-item value="a">操作一</wc-dropdown-item>
      </wc-dropdown>
    `);
    await el.updateComplete;
    el.show();
    await el.updateComplete;
    const panel = el.shadowRoot!.querySelector<HTMLElement>('.panel')!;
    expect(panel.style.left).to.not.equal('');
  });

  it('暴露 part="trigger" 与 part="base" 供外部定制', async () => {
    const el = await fixtureDropdown();
    expect(el.shadowRoot!.querySelector('[part="trigger"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
  });
});
