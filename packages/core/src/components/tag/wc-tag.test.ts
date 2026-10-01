import { expect, fixture, html } from '@open-wc/testing';
import './wc-tag.js';
import type { wcTag } from './wc-tag.js';

describe('wc-tag', () => {
  it('默认属性正确', async () => {
    const el = await fixture<wcTag>(html`<wc-tag>标签</wc-tag>`);
    expect(el.theme).to.equal('default');
    expect(el.size).to.equal('medium');
    expect(el.variant).to.equal('light');
    expect(el.closable).to.be.false;
    expect(el.disabled).to.be.false;
  });

  it('渲染插槽内容与主题/变体反射', async () => {
    const el = await fixture<wcTag>(html`<wc-tag theme="success" variant="outline">成功</wc-tag>`);
    // jsdom 中 slot 分配内容不进入 shadow textContent，用 assignedNodes 断言
    const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])')!;
    expect(
      slot
        .assignedNodes()
        .map((n) => n.textContent)
        .join(''),
    ).to.contain('成功');
    expect(el.getAttribute('theme')).to.equal('success');
    expect(el.getAttribute('variant')).to.equal('outline');
  });

  it('closable 时渲染关闭按钮，点击派发 wc-close', async () => {
    const el = await fixture<wcTag>(html`<wc-tag closable>可关闭</wc-tag>`);
    let closed = false;
    let composed = false;
    el.addEventListener('wc-close', (e) => {
      closed = true;
      composed = e.composed;
    });
    const close = el.shadowRoot!.querySelector<HTMLButtonElement>('[part="close-button"]')!;
    expect(close).to.exist;
    close.click();
    expect(closed).to.be.true;
    expect(composed).to.be.true;
  });

  it('非 closable 时无关闭按钮', async () => {
    const el = await fixture<wcTag>(html`<wc-tag>普通</wc-tag>`);
    expect(el.shadowRoot!.querySelector('[part="close-button"]')).to.not.exist;
  });

  it('disabled 时点击关闭不派发事件', async () => {
    const el = await fixture<wcTag>(html`<wc-tag closable disabled>禁用</wc-tag>`);
    let closed = false;
    el.addEventListener('wc-close', () => {
      closed = true;
    });
    // 按钮 disabled 原生拦截 click；同时组件内部也有守卫
    const close = el.shadowRoot!.querySelector<HTMLButtonElement>('[part="close-button"]')!;
    expect(close.disabled).to.be.true;
    close.click();
    expect(closed).to.be.false;
  });

  it('icon 插槽渲染', async () => {
    const el = await fixture<wcTag>(
      html`<wc-tag><span slot="icon" class="my-icon">★</span>收藏</wc-tag>`,
    );
    expect(el.querySelector('.my-icon')).to.exist;
  });

  it('暴露 part="base"，size 三档反射', async () => {
    const el = await fixture<wcTag>(html`<wc-tag size="large">大标签</wc-tag>`);
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
    expect(el.getAttribute('size')).to.equal('large');
  });
});
