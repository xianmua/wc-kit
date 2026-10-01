import { expect, fixture, html } from '@open-wc/testing';
import './wc-badge.js';
import type { wcBadge } from './wc-badge.js';

describe('wc-badge', () => {
  it('默认 danger 主题，count 渲染数字', async () => {
    const el = await fixture<wcBadge>(html`<wc-badge count="5"></wc-badge>`);
    expect(el.theme).to.equal('danger');
    expect(el.shadowRoot!.querySelector('.badge')!.textContent!.trim()).to.equal('5');
  });

  it('包裹内容时徽标悬浮（slot 正常分发）', async () => {
    const el = await fixture<wcBadge>(html`<wc-badge count="3"><span>消息</span></wc-badge>`);
    expect(el.querySelector('span')!.textContent).to.equal('消息');
    expect(el.shadowRoot!.querySelector('.badge')).to.exist;
  });

  it('count 超过 max 显示「max+」', async () => {
    const el = await fixture<wcBadge>(html`<wc-badge count="120"></wc-badge>`);
    expect(el.shadowRoot!.querySelector('.badge')!.textContent!.trim()).to.equal('99+');

    const custom = await fixture<wcBadge>(html`<wc-badge count="8" max="5"></wc-badge>`);
    expect(custom.shadowRoot!.querySelector('.badge')!.textContent!.trim()).to.equal('5+');
  });

  it('count 为 0 时隐藏，dot 模式恒显示', async () => {
    const el = await fixture<wcBadge>(html`<wc-badge count="0"></wc-badge>`);
    expect(el.shadowRoot!.querySelector('.badge')).to.be.null;

    const dot = await fixture<wcBadge>(html`<wc-badge dot></wc-badge>`);
    const badge = dot.shadowRoot!.querySelector('.badge')!;
    expect(badge).to.exist;
    expect(badge.textContent!.trim()).to.equal('');
  });

  it('theme 语义色反映到属性', async () => {
    const el = await fixture<wcBadge>(html`<wc-badge count="1" theme="success"></wc-badge>`);
    expect(el.getAttribute('theme')).to.equal('success');
    expect(el.shadowRoot!.querySelector('.badge')).to.exist;
  });

  it('count 动态变化切换显隐', async () => {
    const el = await fixture<wcBadge>(html`<wc-badge count="0"></wc-badge>`);
    expect(el.shadowRoot!.querySelector('.badge')).to.be.null;
    el.count = 2;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.badge')!.textContent!.trim()).to.equal('2');
  });

  it('part 选择器：badge', async () => {
    const el = await fixture<wcBadge>(html`<wc-badge count="1"></wc-badge>`);
    expect(el.shadowRoot!.querySelector('[part="badge"]')).to.exist;
  });
});
