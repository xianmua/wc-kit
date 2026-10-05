import { expect, fixture, html } from '@open-wc/testing';
import './wc-menu.js';
import './wc-menu-item.js';
import './wc-sub-menu.js';
import type { wcMenu } from './wc-menu.js';
import type { wcMenuItem } from './wc-menu-item.js';
import type { wcSubMenu } from './wc-sub-menu.js';

/** 手工组装菜单（innerHTML 便于传属性），jsdom 下等待两拍让 slotchange 同步完成 */
async function create(inner: string, attrs = ''): Promise<wcMenu> {
  const host = document.createElement('div');
  host.innerHTML = `<wc-menu ${attrs}>${inner}</wc-menu>`;
  document.body.appendChild(host);
  const el = host.querySelector('wc-menu')!;
  await el.updateComplete;
  await el.updateComplete;
  return el;
}

const items = (el: wcMenu): wcMenuItem[] => Array.from(el.querySelectorAll('wc-menu-item'));
const subMenus = (el: wcMenu): wcSubMenu[] => Array.from(el.querySelectorAll('wc-sub-menu'));

describe('wc-menu', () => {
  it('渲染菜单项并同步选中态（selected 属性）', async () => {
    const el = await create(
      '<wc-menu-item value="home">首页</wc-menu-item><wc-menu-item value="about">关于</wc-menu-item>',
      'selected="home"',
    );
    const [home, about] = items(el);
    expect(home.selected).to.be.true;
    expect(about.selected).to.be.false;
    expect(home.shadowRoot!.querySelector('.item')!.className).to.contain('selected');
  });

  it('点击菜单项派发 wc-select 并更新选中', async () => {
    const el = await create(
      '<wc-menu-item value="home">首页</wc-menu-item><wc-menu-item value="about">关于</wc-menu-item>',
    );
    const events: CustomEvent[] = [];
    el.addEventListener('wc-select', (e) => events.push(e as CustomEvent));
    items(el)[1]
      .shadowRoot!.querySelector('.item')!
      .dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(events).to.have.lengthOf(1);
    expect(events[0].detail).to.deep.equal({ value: 'about', label: '关于' });
    expect(events[0].composed).to.be.true;
    expect(el.selected).to.equal('about');
    expect(items(el)[1].selected).to.be.true;
    expect(items(el)[0].selected).to.be.false;
  });

  it('禁用项点击不选中不派发', async () => {
    const el = await create(
      '<wc-menu-item value="a">A</wc-menu-item><wc-menu-item value="b" disabled>B</wc-menu-item>',
    );
    let fired = 0;
    el.addEventListener('wc-select', () => fired++);
    items(el)[1]
      .shadowRoot!.querySelector('.item')!
      .dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    expect(fired).to.equal(0);
    expect(el.selected).to.equal('');
  });

  it('程序化改 selected 同步条目高亮', async () => {
    const el = await create(
      '<wc-menu-item value="a">A</wc-menu-item><wc-menu-item value="b">B</wc-menu-item>',
    );
    el.selected = 'b';
    await el.updateComplete;
    expect(items(el)[1].selected).to.be.true;
    expect(items(el)[0].selected).to.be.false;
  });

  it('模式同步到条目（menu-horizontal 反映为 attribute）', async () => {
    const el = await create(
      '<wc-menu-item value="a">A</wc-menu-item><wc-sub-menu label="更多"><wc-menu-item value="b">B</wc-menu-item></wc-sub-menu>',
      'mode="horizontal"',
    );
    expect(items(el)[0].hasAttribute('menu-horizontal')).to.be.true;
    expect(subMenus(el)[0].hasAttribute('menu-horizontal')).to.be.true;
    el.mode = 'vertical';
    await el.updateComplete;
    expect(items(el)[0].hasAttribute('menu-horizontal')).to.be.false;
  });

  it('键盘方向键在条目间移动焦点', async () => {
    const el = await create(
      '<wc-menu-item value="a">A</wc-menu-item><wc-menu-item value="b">B</wc-menu-item>',
    );
    items(el)[0].focusFromMenu();
    // 从第一个条目内部派发（模拟真实焦点处的冒泡路径，composedPath 才能定位当前条目）
    items(el)[0]
      .shadowRoot!.querySelector('.item')!
      .dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }),
      );
    // 焦点移动到第二个条目的内部 .item（shadow 内 activeElement）
    expect(items(el)[1].shadowRoot!.activeElement).to.exist;
  });
});

describe('wc-sub-menu', () => {
  it('垂直模式内联展开/收起并派发 wc-open / wc-close', async () => {
    const el = await create(
      '<wc-sub-menu label="更多"><wc-menu-item value="a">子项</wc-menu-item></wc-sub-menu>',
    );
    const sub = subMenus(el)[0];
    const events: string[] = [];
    sub.addEventListener('wc-open', () => events.push('open'));
    sub.addEventListener('wc-close', () => events.push('close'));

    expect(sub.shadowRoot!.querySelector('.sub')!.hasAttribute('data-open')).to.be.false;
    sub
      .shadowRoot!.querySelector('.head')!
      .dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    await sub.updateComplete;
    expect(sub.open).to.be.true;
    expect(sub.hasAttribute('open')).to.be.true;
    expect(sub.shadowRoot!.querySelector('.sub')!.hasAttribute('data-open')).to.be.true;
    expect(sub.shadowRoot!.querySelector('.arrow')!.className).to.contain('up');
    expect(events).to.deep.equal(['open']);

    sub
      .shadowRoot!.querySelector('.head')!
      .dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    await sub.updateComplete;
    expect(sub.open).to.be.false;
    expect(events).to.deep.equal(['open', 'close']);
  });

  it('子项点击后弹出层收起（reason=select），选择仍冒泡给 wc-menu', async () => {
    const el = await create(
      '<wc-sub-menu label="更多"><wc-menu-item value="a">子项</wc-menu-item></wc-sub-menu>',
      'mode="horizontal"',
    );
    const sub = subMenus(el)[0];
    sub.toggle();
    await sub.updateComplete;
    expect(sub.open).to.be.true;

    const reasons: string[] = [];
    let selected = '';
    el.addEventListener('wc-select', () => (selected = 'yes'));
    sub.addEventListener('wc-close', (e) => reasons.push((e as CustomEvent).detail.reason));
    items(el)[0]
      .shadowRoot!.querySelector('.item')!
      .dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(sub.open).to.be.false;
    expect(reasons).to.deep.equal(['select']);
    expect(selected).to.equal('yes');
    expect(el.selected).to.equal('a');
  });

  it('禁用子菜单头部点击不展开', async () => {
    const el = await create(
      '<wc-sub-menu label="更多" disabled><wc-menu-item value="a">子项</wc-menu-item></wc-sub-menu>',
    );
    const sub = subMenus(el)[0];
    sub
      .shadowRoot!.querySelector('.head')!
      .dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    await sub.updateComplete;
    expect(sub.open).to.be.false;
  });

  it('menu-item 基础属性与图标渲染', async () => {
    const el = await fixture<wcMenuItem>(
      html`<wc-menu-item value="x" icon="search">搜索</wc-menu-item>`,
    );
    await el.updateComplete;
    expect(el.value).to.equal('x');
    expect(el.icon).to.equal('search');
    expect(el.shadowRoot!.querySelector('wc-icon')).to.exist;
    expect(el.label).to.equal('搜索');
  });
});
