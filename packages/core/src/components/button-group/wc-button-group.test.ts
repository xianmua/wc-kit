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

  it('样式规则：相邻按钮负边距合并边框', async () => {
    const el = await fixture<wcButtonGroup>(html`
      <wc-button-group>
        <wc-button>左</wc-button>
        <wc-button>右</wc-button>
      </wc-button-group>
    `);
    await el.updateComplete;
    expect(groupCssText(el)).to.contain('margin-left: -1px');
  });

  it('暴露 part="base" 供外部定制', async () => {
    const el = await fixture<wcButtonGroup>(
      html`<wc-button-group><wc-button>独</wc-button></wc-button-group>`,
    );
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
  });
});
