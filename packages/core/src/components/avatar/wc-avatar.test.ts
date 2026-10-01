import { expect, fixture, html } from '@open-wc/testing';
import './wc-avatar.js';
import type { wcAvatar } from './wc-avatar.js';

describe('wc-avatar', () => {
  it('默认属性正确', async () => {
    const el = await fixture<wcAvatar>(html`<wc-avatar>W</wc-avatar>`);
    expect(el.size).to.equal('medium');
    expect(el.shape).to.equal('circle');
  });

  it('渲染插槽内容与形状反射', async () => {
    const el = await fixture<wcAvatar>(html`<wc-avatar shape="square">W</wc-avatar>`);
    // jsdom 中 slot 分配内容不进入 shadow textContent，用 assignedNodes 断言
    const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot')!;
    expect(
      slot
        .assignedNodes()
        .map((n) => n.textContent)
        .join(''),
    ).to.contain('W');
    expect(el.getAttribute('shape')).to.equal('square');
    expect(el.shadowRoot!.querySelector('.shape-square')).to.exist;
  });

  it('预设档位映射对应类名', async () => {
    const small = await fixture<wcAvatar>(html`<wc-avatar size="small">S</wc-avatar>`);
    expect(small.shadowRoot!.querySelector('.avatar')!.classList.contains('small')).to.be.true;
    const large = await fixture<wcAvatar>(html`<wc-avatar size="large">L</wc-avatar>`);
    expect(large.shadowRoot!.querySelector('.avatar')!.classList.contains('large')).to.be.true;
  });

  it('非预设尺寸走 custom 类并内联 CSS 变量', async () => {
    const el = await fixture<wcAvatar>(html`<wc-avatar size="48px">大</wc-avatar>`);
    const avatar = el.shadowRoot!.querySelector<HTMLElement>('.avatar')!;
    expect(avatar.classList.contains('custom')).to.be.true;
    expect(avatar.style.getPropertyValue('--wc-avatar-size')).to.equal('48px');
  });

  it('纯数字尺寸按 px 处理', async () => {
    const el = await fixture<wcAvatar>(html`<wc-avatar size="64">大</wc-avatar>`);
    const avatar = el.shadowRoot!.querySelector<HTMLElement>('.avatar')!;
    expect(avatar.style.getPropertyValue('--wc-avatar-size')).to.equal('64px');
  });

  it('img 插槽内容存在', async () => {
    const el = await fixture<wcAvatar>(
      html`<wc-avatar
        ><img class="pic" alt="头像" src="data:image/gif;base64,R0lGODlhAQABAAAAACw="
      /></wc-avatar>`,
    );
    expect(el.querySelector('.pic')).to.exist;
  });

  it('暴露 part="base"', async () => {
    const el = await fixture<wcAvatar>(html`<wc-avatar>W</wc-avatar>`);
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
  });
});
