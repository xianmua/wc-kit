import { expect, fixture, html } from '@open-wc/testing';
import './wc-text.js';
import type { wcText } from './wc-text.js';

describe('wc-text', () => {
  it('默认属性正确', async () => {
    const el = await fixture<wcText>(html`<wc-text>正文</wc-text>`);
    expect(el.variant).to.equal('text');
    expect(el.level).to.equal(3);
    expect(el.type).to.equal('default');
    expect(el.disabled).to.be.false;
  });

  it('text 模式渲染行内容器', async () => {
    const el = await fixture<wcText>(html`<wc-text>正文</wc-text>`);
    const base = el.shadowRoot!.querySelector('[part="base"]')!;
    expect(base.tagName).to.equal('SPAN');
    expect(base.classList.contains('heading')).to.be.false;
  });

  it('heading 模式带 role/aria-level 与级别类名', async () => {
    const el = await fixture<wcText>(html`<wc-text variant="heading" level="2">标题</wc-text>`);
    const base = el.shadowRoot!.querySelector('[part="base"]')!;
    expect(base.getAttribute('role')).to.equal('heading');
    expect(base.getAttribute('aria-level')).to.equal('2');
    expect(base.classList.contains('level-2')).to.be.true;
  });

  it('level 越界收敛到 1~6', async () => {
    const high = await fixture<wcText>(html`<wc-text variant="heading" level="9">标题</wc-text>`);
    expect(high.shadowRoot!.querySelector('.level-6')).to.exist;
    const low = await fixture<wcText>(html`<wc-text variant="heading" level="0">标题</wc-text>`);
    expect(low.shadowRoot!.querySelector('.level-1')).to.exist;
  });

  it('type 语义色反射', async () => {
    const el = await fixture<wcText>(html`<wc-text type="danger">错误</wc-text>`);
    expect(el.getAttribute('type')).to.equal('danger');
    expect(el.shadowRoot!.querySelector('.text')).to.exist;
  });

  it('disabled 反射', async () => {
    const el = await fixture<wcText>(html`<wc-text disabled>禁用</wc-text>`);
    expect(el.hasAttribute('disabled')).to.be.true;
  });

  it('暴露 part="base"', async () => {
    const el = await fixture<wcText>(html`<wc-text>正文</wc-text>`);
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
  });
});
