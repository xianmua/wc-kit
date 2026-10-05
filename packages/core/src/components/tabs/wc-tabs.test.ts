import { expect, fixture, html } from '@open-wc/testing';
import './wc-tabs.js';
import type { wcTab } from './wc-tab.js';
import type { wcTabs } from './wc-tabs.js';

describe('wc-tabs', () => {
  it('从 wc-tab 子元素收集标签栏（label/value/disabled）', async () => {
    const el = await fixture<wcTabs>(html`
      <wc-tabs>
        <wc-tab label="首页"><p>内容一</p></wc-tab>
        <wc-tab label="设置" value="cfg"><p>内容二</p></wc-tab>
        <wc-tab label="禁用" disabled><p>内容三</p></wc-tab>
      </wc-tabs>
    `);
    const tabs = el.shadowRoot!.querySelectorAll('.tab');
    expect(tabs.length).to.equal(3);
    expect(tabs[0]!.textContent).to.contain('首页');
    expect(tabs[1]!.getAttribute('data-value')).to.equal('cfg');
    expect(tabs[2]!.hasAttribute('data-disabled')).to.be.true;
  });

  it('未指定 value 时默认激活第一个，子元素 active 同步', async () => {
    const el = await fixture<wcTabs>(html`
      <wc-tabs>
        <wc-tab label="首页"><p>内容一</p></wc-tab>
        <wc-tab label="设置"><p>内容二</p></wc-tab>
      </wc-tabs>
    `);
    expect(el.value).to.equal('0');
    const panels = el.querySelectorAll('wc-tab');
    expect((panels[0] as wcTab).active).to.be.true;
    expect((panels[1] as wcTab).active).to.be.false;
  });

  it('value 属性激活对应标签与面板', async () => {
    const el = await fixture<wcTabs>(html`
      <wc-tabs value="cfg">
        <wc-tab label="首页"><p>内容一</p></wc-tab>
        <wc-tab label="设置" value="cfg"><p>内容二</p></wc-tab>
      </wc-tabs>
    `);
    expect(
      el.shadowRoot!.querySelector('.tab[data-value="cfg"]')!.getAttribute('aria-selected'),
    ).to.equal('true');
    expect((el.querySelectorAll('wc-tab')[1] as wcTab).active).to.be.true;
    expect((el.querySelectorAll('wc-tab')[0] as wcTab).active).to.be.false;
  });

  it('点击切换：value 更新、wc-change 派发、面板切换', async () => {
    const el = await fixture<wcTabs>(html`
      <wc-tabs>
        <wc-tab label="首页"><p>内容一</p></wc-tab>
        <wc-tab label="设置" value="cfg"><p>内容二</p></wc-tab>
      </wc-tabs>
    `);
    let changed: string | null = null;
    el.addEventListener('wc-change', (e) => {
      changed = (e as CustomEvent).detail.value;
    });
    el.shadowRoot!.querySelector<HTMLButtonElement>('.tab[data-value="cfg"]')!.click();
    await el.updateComplete;
    expect(el.value).to.equal('cfg');
    expect(changed).to.equal('cfg');
    expect((el.querySelectorAll('wc-tab')[1] as wcTab).active).to.be.true;
  });

  it('禁用标签点击无效，键盘导航跳过', async () => {
    const el = await fixture<wcTabs>(html`
      <wc-tabs>
        <wc-tab label="首页"><p>内容一</p></wc-tab>
        <wc-tab label="禁用" value="off" disabled><p>内容三</p></wc-tab>
      </wc-tabs>
    `);
    el.shadowRoot!.querySelector<HTMLButtonElement>('.tab[data-value="off"]')!.click();
    expect(el.value).to.equal('0');

    el.shadowRoot!.querySelector<HTMLButtonElement>('.tab[data-value="0"]')!.focus();
    el.shadowRoot!.querySelector('.bar')!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true }),
    );
    expect(el.value).to.equal('0');
  });

  it('键盘 ←→/Home/End 循环切换', async () => {
    const el = await fixture<wcTabs>(html`
      <wc-tabs>
        <wc-tab label="A" value="a"><p>一</p></wc-tab>
        <wc-tab label="B" value="b"><p>二</p></wc-tab>
        <wc-tab label="C" value="c"><p>三</p></wc-tab>
      </wc-tabs>
    `);
    const key = (key: string) =>
      el
        .shadowRoot!.querySelector('.bar')!
        .dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true }));
    key('ArrowRight');
    expect(el.value).to.equal('b');
    key('ArrowRight');
    expect(el.value).to.equal('c');
    key('ArrowRight');
    expect(el.value).to.equal('a');
    key('ArrowLeft');
    expect(el.value).to.equal('c');
    key('Home');
    expect(el.value).to.equal('a');
    key('End');
    expect(el.value).to.equal('c');
  });

  it('roving tabindex：只有激活标签可 Tab 进入', async () => {
    const el = await fixture<wcTabs>(html`
      <wc-tabs value="b">
        <wc-tab label="A" value="a"><p>一</p></wc-tab>
        <wc-tab label="B" value="b"><p>二</p></wc-tab>
      </wc-tabs>
    `);
    const tabs = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.tab');
    expect(tabs[0]!.getAttribute('tabindex')).to.equal('-1');
    expect(tabs[1]!.getAttribute('tabindex')).to.equal('0');
  });

  it('子元素 label 属性变化时标签栏自动刷新（MutationObserver）', async () => {
    const el = await fixture<wcTabs>(html`
      <wc-tabs
        ><wc-tab label="旧"><p>内容</p></wc-tab></wc-tabs
      >
    `);
    const tab = el.querySelector('wc-tab')!;
    tab.setAttribute('label', '新');
    await new Promise((resolve) => setTimeout(resolve, 0));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.tab')!.textContent).to.contain('新');
  });

  it('role=tablist/tab 与 aria-selected 正确', async () => {
    const el = await fixture<wcTabs>(html`
      <wc-tabs
        ><wc-tab label="A"><p>一</p></wc-tab><wc-tab label="B"><p>二</p></wc-tab></wc-tabs
      >
    `);
    expect(el.shadowRoot!.querySelector('[role="tablist"]')).to.exist;
    const tabs = el.shadowRoot!.querySelectorAll('[role="tab"]');
    expect(tabs.length).to.equal(2);
    expect(tabs[0]!.getAttribute('aria-selected')).to.equal('true');
    expect(tabs[1]!.getAttribute('aria-selected')).to.equal('false');
  });

  it('面板 role=tabpanel 且禁用标签 aria-disabled', async () => {
    const el = await fixture<wcTabs>(html`
      <wc-tabs>
        <wc-tab label="A"><p>一</p></wc-tab>
        <wc-tab label="B" disabled><p>二</p></wc-tab>
      </wc-tabs>
    `);
    expect(el.querySelector('wc-tab')!.shadowRoot!.querySelector('[role="tabpanel"]')).to.exist;
    expect(
      el.shadowRoot!.querySelector('.tab[data-disabled]')!.getAttribute('aria-disabled'),
    ).to.equal('true');
  });

  it('暴露 part="bar" / "tab" / "panel"', async () => {
    const el = await fixture<wcTabs>(html`
      <wc-tabs
        ><wc-tab label="A"><p>一</p></wc-tab></wc-tabs
      >
    `);
    const root = el.shadowRoot!;
    expect(root.querySelector('[part="bar"]')).to.exist;
    expect(root.querySelector('[part="tab"]')).to.exist;
    expect(el.querySelector('wc-tab')!.shadowRoot!.querySelector('[part="panel"]')).to.exist;
  });

  it('tabPosition 默认 top 且反射，tablist 为水平方向', async () => {
    const el = await fixture<wcTabs>(html`
      <wc-tabs
        ><wc-tab label="A"><p>一</p></wc-tab></wc-tabs
      >
    `);
    expect(el.tabPosition).to.equal('top');
    expect(el.getAttribute('tab-position')).to.equal('top');
    expect(el.shadowRoot!.querySelector('.bar')!.getAttribute('aria-orientation')).to.equal(
      'horizontal',
    );
  });

  it('tabPosition=left：反射 + tablist 纵向 + 标签栏在面板之前', async () => {
    const el = await fixture<wcTabs>(html`
      <wc-tabs tab-position="left"
        ><wc-tab label="A"><p>一</p></wc-tab></wc-tabs
      >
    `);
    await el.updateComplete;
    expect(el.getAttribute('tab-position')).to.equal('left');
    expect(el.shadowRoot!.querySelector('.bar')!.getAttribute('aria-orientation')).to.equal(
      'vertical',
    );
    const children = Array.from(el.shadowRoot!.children);
    expect(children.findIndex((c) => c.classList.contains('bar'))).to.equal(0);
    expect(children.some((c) => c.tagName === 'SLOT')).to.be.true;
  });

  it('tabPosition=bottom/right：面板在前、标签栏在后', async () => {
    for (const position of ['bottom', 'right']) {
      const el = await fixture<wcTabs>(html`
        <wc-tabs tab-position=${position}
          ><wc-tab label="A"><p>一</p></wc-tab></wc-tabs
        >
      `);
      await el.updateComplete;
      // 过滤掉 jsdom 下 Lit 回退追加的 <style>，只看真实渲染节点
      const children = Array.from(el.shadowRoot!.children).filter((c) => c.tagName !== 'STYLE');
      const barIndex = children.findIndex((c) => c.classList.contains('bar'));
      const slotIndex = children.findIndex((c) => c.tagName === 'SLOT');
      expect(slotIndex).to.be.lessThan(barIndex);
      expect(el.shadowRoot!.querySelector('.bar')!.getAttribute('aria-orientation')).to.equal(
        position === 'right' ? 'vertical' : 'horizontal',
      );
    }
  });

  it('竖排切换不影响点击与键盘切换', async () => {
    const el = await fixture<wcTabs>(html`
      <wc-tabs tab-position="left">
        <wc-tab label="A" value="a"><p>一</p></wc-tab>
        <wc-tab label="B" value="b"><p>二</p></wc-tab>
      </wc-tabs>
    `);
    el.shadowRoot!.querySelector<HTMLButtonElement>('.tab[data-value="b"]')!.click();
    await el.updateComplete;
    expect(el.value).to.equal('b');
    el.shadowRoot!.querySelector('.bar')!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }),
    );
    expect(el.value).to.equal('a');
  });
});
