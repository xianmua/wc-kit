import { expect, html, fixture } from '@open-wc/testing';
import { afterEach, beforeEach, vi } from 'vitest';
import './wc-anchor.js';
import './wc-anchor-link.js';
import type { wcAnchor } from './wc-anchor.js';
import type { wcAnchorLink } from './wc-anchor-link.js';

/** 手工组装锚点（innerHTML 便于传属性），jsdom 下等待两拍让 slotchange 同步完成 */
async function create(inner: string, attrs = ''): Promise<wcAnchor> {
  const host = document.createElement('div');
  host.innerHTML = `<wc-anchor ${attrs}>${inner}</wc-anchor>`;
  document.body.appendChild(host);
  const el = host.querySelector('wc-anchor')!;
  await el.updateComplete;
  await el.updateComplete;
  return el;
}

const links = (el: wcAnchor): wcAnchorLink[] =>
  Array.from(el.querySelectorAll('wc-anchor-link')) as wcAnchorLink[];

describe('wc-anchor', () => {
  beforeEach(() => {
    document.body.insertAdjacentHTML('beforeend', '<div id="sec-a"></div><div id="sec-b"></div>');
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  afterEach(() => {
    document.getElementById('sec-a')?.remove();
    document.getElementById('sec-b')?.remove();
    vi.restoreAllMocks();
  });

  it('渲染链接列表，初始高亮第一个目标', async () => {
    const el = await create(
      '<wc-anchor-link href="#sec-a">基础</wc-anchor-link><wc-anchor-link href="#sec-b">水平</wc-anchor-link>',
    );
    expect(links(el)).to.have.lengthOf(2);
    expect(el.current).to.equal('#sec-a');
    expect(links(el)[0].selected).to.be.true;
    expect(links(el)[0].shadowRoot!.querySelector('.link')!.className).to.contain('selected');
  });

  it('嵌套链接自动分流到命名 slot（不落入 <a> 内部）', async () => {
    const el = await create(
      '<wc-anchor-link href="#sec-a">基础<wc-anchor-link href="#sec-b">子项</wc-anchor-link></wc-anchor-link>',
    );
    const [parent, child] = links(el);
    expect(child.getAttribute('slot')).to.equal('sub');
    expect(parent.shadowRoot!.querySelector('slot[name="sub"]')).to.exist;
    // 嵌套链接不渲染在 <a> 内部
    const innerA = parent.shadowRoot!.querySelector('.link')!;
    expect(innerA.querySelector('slot[name="sub"]')).to.not.exist;
    expect(child.title).to.equal('子项');
    expect(parent.title).to.equal('基础');
  });

  it('点击链接派发 wc-click / wc-change、更新高亮并阻止默认跳转', async () => {
    const el = await create(
      '<wc-anchor-link href="#sec-a">基础</wc-anchor-link><wc-anchor-link href="#sec-b">水平</wc-anchor-link>',
    );
    const events: string[] = [];
    let changeValue = '';
    let clickDetail: { href: string; title: string } | null = null;
    el.addEventListener('wc-change', (e) => {
      events.push('change');
      changeValue = (e as CustomEvent).detail.value;
    });
    el.addEventListener('wc-click', (e) => {
      events.push('click');
      clickDetail = (e as CustomEvent).detail;
    });
    const innerA = links(el)[1].shadowRoot!.querySelector('.link') as HTMLAnchorElement;
    const evt = new MouseEvent('click', { bubbles: true, composed: true, cancelable: true });
    innerA.dispatchEvent(evt);
    await el.updateComplete;
    expect(evt.defaultPrevented).to.be.true;
    expect(events).to.deep.equal(['change', 'click']);
    expect(changeValue).to.equal('#sec-b');
    expect(clickDetail).to.deep.equal({ href: '#sec-b', title: '水平' });
    expect(el.current).to.equal('#sec-b');
    expect(links(el)[1].selected).to.be.true;
    expect(links(el)[0].selected).to.be.false;
  });

  it('程序化改 current 同步高亮（不派发 wc-change）', async () => {
    const el = await create(
      '<wc-anchor-link href="#sec-a">基础</wc-anchor-link><wc-anchor-link href="#sec-b">水平</wc-anchor-link>',
    );
    let fired = 0;
    el.addEventListener('wc-change', () => fired++);
    el.current = '#sec-b';
    await el.updateComplete;
    expect(fired).to.equal(0);
    expect(links(el)[1].selected).to.be.true;
  });

  it('direction 同步到链接（内部状态 anchorHorizontal + horizontal class）', async () => {
    const el = await create(
      '<wc-anchor-link href="#sec-a">基础</wc-anchor-link>',
      'direction="horizontal"',
    );
    expect(el.hasAttribute('direction')).to.be.true;
    expect(links(el)[0].anchorHorizontal).to.be.true;
    expect(links(el)[0].classList.contains('horizontal')).to.be.true;
    el.direction = 'vertical';
    await el.updateComplete;
    expect(links(el)[0].anchorHorizontal).to.be.false;
  });

  it('滚动监听：按目标位置自动切换高亮并派发 wc-change', async () => {
    const el = await create(
      '<wc-anchor-link href="#sec-a">基础</wc-anchor-link><wc-anchor-link href="#sec-b">水平</wc-anchor-link>',
    );
    const values: string[] = [];
    el.addEventListener('wc-change', (e) => values.push((e as CustomEvent).detail.value));
    const a = document.getElementById('sec-a')!;
    const b = document.getElementById('sec-b')!;
    // 页面已下滚 + 滚动高度可判定；b 在内容位置 0（视口 top=-100）越线、a 在 700 未越线
    vi.spyOn(document.documentElement, 'scrollTop', 'get').mockReturnValue(100);
    vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(2000);
    vi.spyOn(a, 'getBoundingClientRect').mockReturnValue({ top: 600 } as DOMRect);
    vi.spyOn(b, 'getBoundingClientRect').mockReturnValue({ top: -100 } as DOMRect);
    document.dispatchEvent(new Event('scroll'));
    await el.updateComplete;
    expect(values).to.deep.equal(['#sec-b']);
    expect(el.current).to.equal('#sec-b');
    expect(links(el)[1].selected).to.be.true;
  });

  it('container 选择器显式指定滚动容器（兄弟节点场景 spy 生效）', async () => {
    const box = document.createElement('div');
    box.id = 'spy-box';
    box.style.overflow = 'auto';
    document.body.appendChild(box);
    const el = await create(
      '<wc-anchor-link href="#sec-a">基础</wc-anchor-link><wc-anchor-link href="#sec-b">水平</wc-anchor-link>',
      'container="#spy-box"',
    );
    // 若绑定成功：scrollTop=100 非顶部，sec-b 内容位置 0（视口 top=-100）越线 → 高亮 #sec-b；
    // 若回退 document：scrollTop=0 走顶部特判 → 恒为 #sec-a
    vi.spyOn(box, 'scrollTop', 'get').mockReturnValue(100);
    vi.spyOn(document.getElementById('sec-a')!, 'getBoundingClientRect').mockReturnValue({
      top: 600,
    } as DOMRect);
    vi.spyOn(document.getElementById('sec-b')!, 'getBoundingClientRect').mockReturnValue({
      top: -100,
    } as DOMRect);
    box.dispatchEvent(new Event('scroll'));
    await el.updateComplete;
    expect(el.current).to.equal('#sec-b');
    box.remove();
  });

  it('断开连接后移除滚动监听（scroll 不再更新高亮）', async () => {
    const el = await create(
      '<wc-anchor-link href="#sec-a">基础</wc-anchor-link><wc-anchor-link href="#sec-b">水平</wc-anchor-link>',
    );
    expect(el.current).to.equal('#sec-a');
    const b = document.getElementById('sec-b')!;
    el.remove();
    vi.spyOn(document.documentElement, 'scrollTop', 'get').mockReturnValue(100);
    vi.spyOn(b, 'getBoundingClientRect').mockReturnValue({ top: -100 } as DOMRect);
    expect(() => document.dispatchEvent(new Event('scroll'))).to.not.throw();
    // 若监听未移除，此场景会切到 #sec-b
    expect(el.current).to.equal('#sec-a');
  });

  it('anchor-link 基础属性渲染', async () => {
    const el = await fixture<wcAnchorLink>(
      html`<wc-anchor-link href="#sec-a">演示</wc-anchor-link>`,
    );
    await el.updateComplete;
    expect(el.href).to.equal('#sec-a');
    expect(el.title).to.equal('演示');
    const a = el.shadowRoot!.querySelector('a') as HTMLAnchorElement;
    expect(a.getAttribute('href')).to.equal('#sec-a');
  });
});
