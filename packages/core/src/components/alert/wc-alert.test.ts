import { expect, fixture, html } from '@open-wc/testing';
import './wc-alert.js';
import type { wcAlert } from './wc-alert.js';

describe('wc-alert', () => {
  it('默认 info 主题，渲染正文', async () => {
    const el = await fixture<wcAlert>(html`<wc-alert>提示内容</wc-alert>`);
    expect(el.theme).to.equal('info');
    expect(el.getAttribute('theme')).to.equal('info');
    const slot = el.shadowRoot!.querySelector('.content slot')!;
    expect(
      slot
        .assignedNodes()
        .map((n) => n.textContent!.trim())
        .join(''),
    ).to.equal('提示内容');
  });

  it('heading 渲染标题', async () => {
    const el = await fixture<wcAlert>(html`<wc-alert heading="提示">内容</wc-alert>`);
    expect(el.shadowRoot!.querySelector('.title')!.textContent!.trim()).to.equal('提示');
  });

  it('无 heading 时不渲染标题节点', async () => {
    const el = await fixture<wcAlert>(html`<wc-alert>内容</wc-alert>`);
    expect(el.shadowRoot!.querySelector('.title')).to.be.null;
  });

  it('show-icon 渲染语义图标（warning → warning 图标）', async () => {
    const el = await fixture<wcAlert>(html`<wc-alert show-icon theme="warning"></wc-alert>`);
    const icon = el.shadowRoot!.querySelector('.icon wc-icon')!;
    expect(icon.getAttribute('name')).to.equal('warning');
  });

  it('closable 渲染关闭按钮，点击后自身隐藏并派发 wc-close', async () => {
    const el = await fixture<wcAlert>(html`<wc-alert closable>内容</wc-alert>`);
    let closed = false;
    el.addEventListener('wc-close', () => {
      closed = true;
    });
    const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.close')!;
    btn.click();
    await el.updateComplete;
    expect(closed).to.be.true;
    expect(el.closed).to.be.true;
    expect(el.shadowRoot!.querySelector('.alert')).to.be.null;
  });

  it('closed 属性直接隐藏（移除属性可恢复）', async () => {
    const el = await fixture<wcAlert>(html`<wc-alert closed>内容</wc-alert>`);
    expect(el.shadowRoot!.querySelector('.alert')).to.be.null;
    el.closed = false;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.alert')).to.exist;
  });

  it('icon slot 自定义图标覆盖内建图标', async () => {
    const el = await fixture<wcAlert>(html`
      <wc-alert show-icon><wc-icon slot="icon" name="bell"></wc-icon>内容</wc-alert>
    `);
    const slot = el.shadowRoot!.querySelector('slot[name="icon"]')!;
    expect(
      slot.assignedNodes({ flatten: true }).some((n) => (n as HTMLElement).tagName === 'WC-ICON'),
    ).to.be.true;
  });

  it('part 选择器：base / title / content / close-button', async () => {
    const el = await fixture<wcAlert>(html`<wc-alert heading="提示" closable>内容</wc-alert>`);
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="title"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="content"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="close-button"]')).to.exist;
  });
});
