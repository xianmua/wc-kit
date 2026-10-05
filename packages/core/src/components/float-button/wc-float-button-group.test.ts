import { expect, fixture, html } from '@open-wc/testing';
import './wc-float-button.js';
import './wc-float-button-group.js';
import type { wcFloatButton } from './wc-float-button.js';
import type { wcFloatButtonGroup } from './wc-float-button-group.js';

/** 构造带 2 个子按钮的 group（无 trigger，常显堆叠） */
async function fixtureGroup() {
  const el = await fixture<wcFloatButtonGroup>(html`
    <wc-float-button-group>
      <wc-float-button icon="plus"></wc-float-button>
      <wc-float-button icon="search"></wc-float-button>
    </wc-float-button-group>
  `);
  await el.updateComplete;
  return el;
}

/** 构造 click 触发的 speed-dial */
async function fixtureTriggered() {
  const el = await fixture<wcFloatButtonGroup>(html`
    <wc-float-button-group trigger="click">
      <wc-float-button icon="plus"></wc-float-button>
      <wc-float-button icon="search"></wc-float-button>
    </wc-float-button-group>
  `);
  await el.updateComplete;
  return el;
}

function triggerBtn(el: wcFloatButtonGroup): wcFloatButton {
  return el.shadowRoot!.querySelector<HTMLElement>('.trigger-btn')! as unknown as wcFloatButton;
}

function itemsEl(el: wcFloatButtonGroup): HTMLElement {
  return el.shadowRoot!.querySelector<HTMLElement>('.items')!;
}

describe('wc-float-button-group', () => {
  it('无 trigger 时子按钮常显堆叠，无触发按钮', async () => {
    const el = await fixtureGroup();
    expect(el.shadowRoot!.querySelector('.trigger-btn')).to.not.exist;
    expect(itemsEl(el).hasAttribute('data-open')).to.be.true;
    const slotted = el.querySelectorAll('wc-float-button');
    expect(slotted.length).to.equal(2);
  });

  it('slotchange 同步 shape 给未显式设置的子按钮，显式设置的被尊重', async () => {
    const el = await fixture<wcFloatButtonGroup>(html`
      <wc-float-button-group shape="square">
        <wc-float-button icon="plus"></wc-float-button>
        <wc-float-button icon="search" shape="circle"></wc-float-button>
      </wc-float-button-group>
    `);
    await el.updateComplete;
    const [a, b] = el.querySelectorAll('wc-float-button');
    expect(a!.getAttribute('shape')).to.equal('square');
    expect(b!.getAttribute('shape')).to.equal('circle');
  });

  it('click 触发：初始收起，点击开合并派发 wc-open / wc-close(toggle)', async () => {
    const el = await fixtureTriggered();
    const events: string[] = [];
    el.addEventListener('wc-open', () => events.push('open'));
    el.addEventListener('wc-close', (e) => {
      events.push('close:' + (e as CustomEvent).detail.reason);
    });

    expect(el.open).to.be.false;
    expect(itemsEl(el).hasAttribute('data-open')).to.be.false;

    triggerBtn(el).click();
    await el.updateComplete;
    expect(el.open).to.be.true;
    expect(el.hasAttribute('open')).to.be.true;
    expect(itemsEl(el).hasAttribute('data-open')).to.be.true;
    expect(triggerBtn(el).getAttribute('aria-expanded')).to.equal('true');
    expect(events).to.deep.equal(['open']);

    triggerBtn(el).click();
    await el.updateComplete;
    expect(el.open).to.be.false;
    expect(events).to.deep.equal(['open', 'close:toggle']);
  });

  it('open 时点击外部关闭（reason=outside）', async () => {
    const el = await fixtureTriggered();
    let reason = '';
    el.addEventListener('wc-close', (e) => {
      reason = (e as CustomEvent).detail.reason;
    });
    el.show();
    await el.updateComplete;

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.open).to.be.false;
    expect(reason).to.equal('outside');
  });

  it('Escape 关闭（reason=escape）', async () => {
    const el = await fixtureTriggered();
    let reason = '';
    el.addEventListener('wc-close', (e) => {
      reason = (e as CustomEvent).detail.reason;
    });
    el.show();
    await el.updateComplete;

    el.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }),
    );
    await el.updateComplete;
    expect(el.open).to.be.false;
    expect(reason).to.equal('escape');
  });

  it('hover 触发：悬浮展开、移出收起', async () => {
    const el = await fixture<wcFloatButtonGroup>(html`
      <wc-float-button-group trigger="hover">
        <wc-float-button icon="plus"></wc-float-button>
      </wc-float-button-group>
    `);
    await el.updateComplete;

    el.dispatchEvent(new Event('mouseenter'));
    await el.updateComplete;
    expect(el.open).to.be.true;

    el.dispatchEvent(new Event('mouseleave'));
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('show/hide/toggle 编程调用', async () => {
    const el = await fixtureTriggered();
    el.show();
    await el.updateComplete;
    expect(el.open).to.be.true;
    el.hide();
    await el.updateComplete;
    expect(el.open).to.be.false;
    el.toggle();
    await el.updateComplete;
    expect(el.open).to.be.true;
  });

  it('非 trigger 模式下 show/hide/toggle 不生效', async () => {
    const el = await fixtureGroup();
    el.show();
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('触发按钮默认 plus 图标，open 时宿主 [open] 驱动旋转样式', async () => {
    const el = await fixtureTriggered();
    await el.updateComplete;
    const ico = el.shadowRoot!.querySelector('wc-icon')!;
    expect(ico.getAttribute('name')).to.equal('plus');
    el.show();
    await el.updateComplete;
    expect(el.hasAttribute('open')).to.be.true;
  });

  it('part 属性存在', async () => {
    const el = await fixtureTriggered();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('[part="trigger"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="items"]')).to.exist;
  });
});
