import { expect, fixture, html } from '@open-wc/testing';
import '../dropdown/wc-dropdown-item.js';
import './wc-split-button.js';
import type { wcSplitButton } from './wc-split-button.js';
import type { wcDropdownItem } from '../dropdown/wc-dropdown-item.js';

async function fixtureSplitButton() {
  const el = await fixture<wcSplitButton>(html`
    <wc-split-button theme="primary">
      主操作
      <wc-dropdown-item value="a">菜单一</wc-dropdown-item>
      <wc-dropdown-item value="b">菜单二</wc-dropdown-item>
    </wc-split-button>
  `);
  await el.updateComplete;
  return el;
}

describe('wc-split-button', () => {
  it('渲染主按钮与箭头按钮，文案落入主按钮', async () => {
    const el = await fixtureSplitButton();
    const main = el.shadowRoot!.querySelector('.main-btn')!;
    const arrow = el.shadowRoot!.querySelector('.arrow-btn')!;
    expect(main).to.exist;
    expect(arrow).to.exist;
    const text = main
      .querySelector('slot')!
      .assignedNodes({ flatten: true })
      .map((n) => n.textContent?.trim())
      .join('');
    expect(text).to.equal('主操作');
  });

  it('点击主按钮派发 wc-main-click 且不冒泡原生 click', async () => {
    const el = await fixtureSplitButton();
    let mainClicked = false;
    let nativeBubbled = false;
    el.addEventListener('wc-main-click', () => {
      mainClicked = true;
    });
    el.addEventListener('click', () => {
      nativeBubbled = true;
    });
    el.shadowRoot!.querySelector<HTMLElement>('.main-btn')!.click();
    expect(mainClicked).to.be.true;
    expect(nativeBubbled).to.be.false;
  });

  it('点击箭头派发 wc-arrow-click 并展开下拉，菜单项经 slot 链落入面板', async () => {
    const el = await fixtureSplitButton();
    let arrowClicked = false;
    el.addEventListener('wc-arrow-click', () => {
      arrowClicked = true;
    });
    el.shadowRoot!.querySelector<HTMLElement>('.arrow-btn')!.click();
    await el.updateComplete;
    expect(arrowClicked).to.be.true;
    const dropdown = el.shadowRoot!.querySelector('wc-dropdown')!;
    expect(dropdown.open).to.be.true;
    // 菜单项经嵌套 slot 链被 dropdown 收集（flatten）
    const collected = el.querySelectorAll('wc-dropdown-item');
    expect(collected.length).to.equal(2);
    expect(collected[0]!.id).to.contain('wc-dropdown-item-');
    // 再次点击箭头关闭
    el.shadowRoot!.querySelector<HTMLElement>('.arrow-btn')!.click();
    await el.updateComplete;
    expect(dropdown.open).to.be.false;
  });

  it('下拉菜单项可正常选中（slot 链上的 wc-select 冒泡到宿主）', async () => {
    const el = await fixtureSplitButton();
    el.shadowRoot!.querySelector<HTMLElement>('.arrow-btn')!.click();
    await el.updateComplete;
    let value = '';
    el.addEventListener('wc-select', (e) => {
      value = (e as CustomEvent).detail.value;
    });
    (el.querySelectorAll('wc-dropdown-item')[1] as wcDropdownItem)
      .shadowRoot!.querySelector<HTMLElement>('.item')!
      .click();
    await el.updateComplete;
    expect(value).to.equal('b');
  });

  it('theme/size/disabled 透传两枚按钮', async () => {
    const el = await fixtureSplitButton();
    el.theme = 'danger';
    el.size = 'small';
    el.disabled = true;
    await el.updateComplete;
    for (const cls of ['.main-btn', '.arrow-btn']) {
      const btn = el.shadowRoot!.querySelector(cls) as HTMLElement & {
        theme: string;
        size: string;
        disabled: boolean;
      };
      expect(btn.getAttribute('theme')).to.equal('danger');
      expect(btn.getAttribute('size')).to.equal('small');
      expect(btn.hasAttribute('disabled')).to.be.true;
    }
    const dropdown = el.shadowRoot!.querySelector('wc-dropdown')!;
    expect(dropdown.hasAttribute('disabled')).to.be.true;
  });

  it('样式规则：两端各留单侧圆角、聚焦环内嵌', async () => {
    const el = await fixtureSplitButton();
    const css = Array.from(el.shadowRoot!.querySelectorAll('style'))
      .map((s) => s.textContent)
      .join('');
    expect(css).to.contain('--wc-split-button-radius');
    expect(css).to.contain('--wc-button-focus-ring-offset: -2px');
  });

  it('暴露 part="base" 供外部定制', async () => {
    const el = await fixtureSplitButton();
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
  });
});
