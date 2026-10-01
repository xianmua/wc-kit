import { expect, fixture, html } from '@open-wc/testing';
import './wc-divider.js';
import type { wcDivider } from './wc-divider.js';

describe('wc-divider', () => {
  it('默认属性正确', async () => {
    const el = await fixture<wcDivider>(html`<wc-divider></wc-divider>`);
    expect(el.dashed).to.be.false;
    expect(el.align).to.equal('center');
    expect(el.vertical).to.be.false;
  });

  it('渲染插槽文案', async () => {
    const el = await fixture<wcDivider>(html`<wc-divider>章节一</wc-divider>`);
    // jsdom 中 slot 分配内容不进入 shadow textContent，用 assignedNodes 断言
    const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot')!;
    expect(
      slot
        .assignedNodes()
        .map((n) => n.textContent)
        .join(''),
    ).to.contain('章节一');
  });

  it('无插槽文案时 content 隐藏', async () => {
    const el = await fixture<wcDivider>(html`<wc-divider></wc-divider>`);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.content')!.hasAttribute('hidden')).to.be.true;
  });

  it('dashed 反射到宿主属性', async () => {
    const el = await fixture<wcDivider>(html`<wc-divider dashed></wc-divider>`);
    expect(el.hasAttribute('dashed')).to.be.true;
    expect(el.shadowRoot!.querySelector('.line')!.classList.contains('line')).to.be.true;
  });

  it('vertical 模式只渲染单条竖线', async () => {
    const el = await fixture<wcDivider>(html`<wc-divider vertical>文本</wc-divider>`);
    expect(el.shadowRoot!.querySelector('.line.vertical')).to.exist;
    expect(el.shadowRoot!.querySelector('.divider')).to.not.exist;
  });

  it('align 影响布局类名', async () => {
    const el = await fixture<wcDivider>(html`<wc-divider align="left">标题</wc-divider>`);
    expect(el.shadowRoot!.querySelector('.divider')!.classList.contains('align-left')).to.be.true;
  });

  it('暴露 part="base" / "line" / "content"', async () => {
    const el = await fixture<wcDivider>(html`<wc-divider>文本</wc-divider>`);
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
    expect(el.shadowRoot!.querySelectorAll('[part="line"]').length).to.be.at.least(2);
    expect(el.shadowRoot!.querySelector('[part="content"]')).to.exist;
  });
});
