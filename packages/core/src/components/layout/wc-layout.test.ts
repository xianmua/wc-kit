import { expect, fixture, html } from '@open-wc/testing';
import './wc-layout.js';
import type { wcLayout, wcLayoutSider } from './wc-layout.js';

// jsdom 未实现 matchMedia，断点测试用假 MQL 替换（组件侧已有 typeof 守卫）
const originalMatchMedia = window.matchMedia;

/** 替换/恢复 window.matchMedia（绕开 no-explicit-any，走 unknown 断言） */
const setMatchMedia = (impl: unknown): void => {
  (window as unknown as { matchMedia: unknown }).matchMedia = impl;
};

/** 读取组件内部缓存的 MQL（绕开 no-explicit-any，走 unknown 断言） */
const getMediaQuery = (el: object): { matches: boolean } =>
  (el as unknown as { mediaQuery: { matches: boolean } }).mediaQuery;

describe('wc-layout', () => {
  it('默认纵向，不含 auto-sider 类', async () => {
    const el = await fixture<wcLayout>(html`
      <wc-layout
        ><wc-layout-header></wc-layout-header><wc-layout-content></wc-layout-content
      ></wc-layout>
    `);
    expect(el.classList.contains('auto-sider')).to.be.false;
  });

  it('含 sider 子元素时自动横向（auto-sider）', async () => {
    const el = await fixture<wcLayout>(html`
      <wc-layout>
        <wc-layout-sider></wc-layout-sider>
        <wc-layout-content></wc-layout-content>
      </wc-layout>
    `);
    expect(el.classList.contains('auto-sider')).to.be.true;
  });

  it('移除 sider 后恢复纵向', async () => {
    const el = await fixture<wcLayout>(html`
      <wc-layout>
        <wc-layout-sider></wc-layout-sider>
        <wc-layout-content></wc-layout-content>
      </wc-layout>
    `);
    el.querySelector('wc-layout-sider')!.remove();
    await el.updateComplete;
    await el.updateComplete;
    expect(el.classList.contains('auto-sider')).to.be.false;
  });

  it('header/content/footer 可投影内容', async () => {
    const el = await fixture<wcLayout>(html`
      <wc-layout>
        <wc-layout-header>顶部</wc-layout-header>
        <wc-layout-content>内容</wc-layout-content>
        <wc-layout-footer>底部</wc-layout-footer>
      </wc-layout>
    `);
    expect(el.querySelector('wc-layout-header')!.textContent).to.contain('顶部');
    expect(el.querySelector('wc-layout-content')!.textContent).to.contain('内容');
    expect(el.querySelector('wc-layout-footer')!.textContent).to.contain('底部');
  });
});

describe('wc-layout-sider', () => {
  it('collapsible 渲染触发器，点击切换 collapsed 并派发事件', async () => {
    const el = await fixture<wcLayoutSider>(
      html`<wc-layout-sider collapsible>菜单</wc-layout-sider>`,
    );
    const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('.trigger')!;
    expect(trigger).to.exist;

    const events: boolean[] = [];
    el.addEventListener('wc-collapse', (e) => events.push((e as CustomEvent).detail.isCollapsed));

    trigger.click();
    await el.updateComplete;
    expect(el.collapsed).to.be.true;
    expect(trigger.getAttribute('aria-label')).to.equal('展开侧边栏');

    trigger.click();
    await el.updateComplete;
    expect(el.collapsed).to.be.false;
    expect(events).to.deep.equal([true, false]);
  });

  it('非 collapsible 不渲染触发器', async () => {
    const el = await fixture<wcLayoutSider>(html`<wc-layout-sider></wc-layout-sider>`);
    expect(el.shadowRoot!.querySelector('.trigger')).to.not.exist;
  });

  it('collapsedWidth=0 时折叠完全隐藏（zero-width）', async () => {
    const el = await fixture<wcLayoutSider>(
      html`<wc-layout-sider collapsible .collapsedWidth=${0}></wc-layout-sider>`,
    );
    el.collapsed = true;
    await el.updateComplete;
    expect(el.hasAttribute('zero-width')).to.be.true;
  });

  it('breakpoint 变化重新注册 matchMedia', async () => {
    const queries: string[] = [];
    setMatchMedia((query: string) => {
      queries.push(query);
      return {
        matches: false,
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
      };
    });

    const el = await fixture<wcLayoutSider>(
      html`<wc-layout-sider breakpoint="md"></wc-layout-sider>`,
    );
    expect(queries[0]).to.include('767px');

    el.breakpoint = 'xl';
    await el.updateComplete;
    expect(queries.some((q) => q.includes('1199px'))).to.be.true;

    setMatchMedia(originalMatchMedia);
  });

  it('断点触发折叠事件（模拟视口变窄）', async () => {
    // 构造可手动触发 change 的假 matchMedia，matches 可变
    let listener: (() => void) | null = null;
    const mql = {
      matches: false,
      media: '',
      addEventListener: (_: string, fn: () => void) => {
        listener = fn;
      },
      removeEventListener: () => {
        listener = null;
      },
    };
    setMatchMedia((query: string) => ({ ...mql, media: query }));

    const el = await fixture<wcLayoutSider>(
      html`<wc-layout-sider collapsible breakpoint="lg"></wc-layout-sider>`,
    );
    const events: boolean[] = [];
    el.addEventListener('wc-collapse', (e) => events.push((e as CustomEvent).detail.isCollapsed));

    // 视口变窄（低于 lg）→ 自动折叠（组件读的是自身缓存的 MQL.matches）
    const registered = getMediaQuery(el);
    registered.matches = true;
    listener!();
    await el.updateComplete;
    expect(el.collapsed).to.be.true;
    expect(events).to.deep.equal([true]);

    setMatchMedia(originalMatchMedia);
  });
});
