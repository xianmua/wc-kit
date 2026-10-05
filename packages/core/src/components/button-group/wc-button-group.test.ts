import { expect, fixture, html } from '@open-wc/testing';
import '../button/wc-button.js';
import './wc-button-group.js';
import type { wcButtonGroup } from './wc-button-group.js';

/** jsdom 的 getComputedStyle 不计算自定义属性/负边距场景，这里断言 shadow 样式表规则 */
function groupCssText(el: wcButtonGroup): string {
  return Array.from(el.shadowRoot!.querySelectorAll('style'))
    .map((s) => s.textContent)
    .join('');
}

describe('wc-button-group', () => {
  it('渲染分组容器并透传子按钮', async () => {
    const el = await fixture<wcButtonGroup>(html`
      <wc-button-group>
        <wc-button>左</wc-button>
        <wc-button>中</wc-button>
        <wc-button>右</wc-button>
      </wc-button-group>
    `);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.group')).to.exist;
    expect(el.querySelectorAll('wc-button').length).to.equal(3);
  });

  it('样式规则：中间按钮圆角归零、首尾保留外侧圆角', async () => {
    const el = await fixture<wcButtonGroup>(html`
      <wc-button-group>
        <wc-button>左</wc-button>
        <wc-button>右</wc-button>
      </wc-button-group>
    `);
    await el.updateComplete;
    const css = groupCssText(el);
    expect(css).to.contain('--wc-button-radius: 0');
    expect(css).to.contain('first-child');
    expect(css).to.contain('last-child');
    expect(css).to.contain('--wc-button-group-radius');
  });

  it('相邻按钮用内联 margin-left 合并边框（内联可抵御宿主 reset 覆盖 ::slotted）', async () => {
    const el = await fixture<wcButtonGroup>(html`
      <wc-button-group>
        <wc-button>左</wc-button>
        <wc-button>右</wc-button>
      </wc-button-group>
    `);
    await el.updateComplete;
    const buttons = el.querySelectorAll('wc-button');
    expect(buttons[0]!.style.marginLeft).to.equal('');
    expect(buttons[1]!.style.marginLeft).to.equal('-1px');
  });

  it('子按钮增删后重新同步边距', async () => {
    const el = await fixture<wcButtonGroup>(html`
      <wc-button-group>
        <wc-button>左</wc-button>
        <wc-button>右</wc-button>
      </wc-button-group>
    `);
    await el.updateComplete;
    const buttons = el.querySelectorAll('wc-button');
    expect(buttons[1]!.style.marginLeft).to.equal('-1px');
    buttons[0]!.remove();
    await el.updateComplete;
    // 原第二颗变成第一颗，边距应被清空
    expect(el.querySelectorAll('wc-button')[0]!.style.marginLeft).to.equal('');
  });

  it('样式规则：分组内聚焦环 offset 改为内嵌令牌', async () => {
    const el = await fixture<wcButtonGroup>(
      html`<wc-button-group><wc-button>独</wc-button></wc-button-group>`,
    );
    await el.updateComplete;
    expect(groupCssText(el)).to.contain('--wc-button-focus-ring-offset: -2px');
  });

  it('暴露 part="base" 供外部定制', async () => {
    const el = await fixture<wcButtonGroup>(
      html`<wc-button-group><wc-button>独</wc-button></wc-button-group>`,
    );
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
  });
});
