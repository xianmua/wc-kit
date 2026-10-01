import { expect, fixture, html } from '@open-wc/testing';
import './wc-button.js';
import type { wcButton } from './wc-button.js';

describe('wc-button', () => {
  it('渲染默认内容', async () => {
    const el = await fixture<wcButton>(html`<wc-button>确定</wc-button>`);
    const content = el.shadowRoot!.querySelector<HTMLSpanElement>('.content')!;
    const slotText = content
      .querySelector('slot')!
      .assignedNodes({ flatten: true })
      .map((n) => n.textContent?.trim())
      .join('');
    expect(slotText).to.equal('确定');
  });

  it('默认属性正确', async () => {
    const el = await fixture<wcButton>(html`<wc-button>确定</wc-button>`);
    expect(el.theme).to.equal('default');
    expect(el.variant).to.equal('base');
    expect(el.size).to.equal('medium');
    expect(el.disabled).to.be.false;
    expect(el.loading).to.be.false;
  });

  it('disabled 属性 reflect 且禁用原生按钮', async () => {
    const el = await fixture<wcButton>(html`<wc-button disabled>确定</wc-button>`);
    expect(el.hasAttribute('disabled')).to.be.true;
    const button = el.shadowRoot!.querySelector('button')!;
    expect(button.disabled).to.be.true;
  });

  it('禁用时不触发 click', async () => {
    const el = await fixture<wcButton>(html`<wc-button disabled>确定</wc-button>`);
    let clicked = false;
    el.addEventListener('click', () => {
      clicked = true;
    });
    // 原生 button disabled 状态下不会派发 click（jsdom 与真实浏览器行为一致）
    el.shadowRoot!.querySelector('button')!.click();
    expect(clicked).to.be.false;
  });

  it('loading 时拦截 click 冒泡', async () => {
    const el = await fixture<wcButton>(html`<wc-button loading>确定</wc-button>`);
    let clicked = false;
    el.addEventListener('click', () => {
      clicked = true;
    });
    const button = el.shadowRoot!.querySelector('button')!;
    button.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    expect(clicked).to.be.false;
    expect(button.getAttribute('aria-busy')).to.equal('true');
  });

  it('size 变化反映到 attribute', async () => {
    const el = await fixture<wcButton>(html`<wc-button size="large">确定</wc-button>`);
    expect(el.getAttribute('size')).to.equal('large');
    el.size = 'small';
    await el.updateComplete;
    expect(el.getAttribute('size')).to.equal('small');
  });

  it('暴露 part="base" 供外部定制', async () => {
    const el = await fixture<wcButton>(html`<wc-button>确定</wc-button>`);
    const part = el.shadowRoot!.querySelector('[part="base"]')!;
    expect(part).to.exist;
  });
});
