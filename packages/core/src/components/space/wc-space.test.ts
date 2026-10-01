import { expect, fixture, html } from '@open-wc/testing';
import './wc-space.js';
import type { wcSpace } from './wc-space.js';

describe('wc-space', () => {
  it('默认属性正确', async () => {
    const el = await fixture<wcSpace>(html`<wc-space><span>A</span></wc-space>`);
    expect(el.size).to.equal('medium');
    expect(el.direction).to.equal('horizontal');
    expect(el.wrap).to.be.false;
  });

  it('direction/wrap 反射到宿主属性', async () => {
    const el = await fixture<wcSpace>(
      html`<wc-space direction="vertical" wrap><span>A</span></wc-space>`,
    );
    expect(el.getAttribute('direction')).to.equal('vertical');
    expect(el.hasAttribute('wrap')).to.be.true;
  });

  it('预设尺寸映射语义令牌', async () => {
    const el = await fixture<wcSpace>(html`<wc-space size="large"><span>A</span></wc-space>`);
    const space = el.shadowRoot!.querySelector<HTMLElement>('.space')!;
    expect(space.style.getPropertyValue('--wc-space-gap')).to.equal('var(--wc-space-6)');
  });

  it('纯数字尺寸按 px 处理，任意值原样传递', async () => {
    const num = await fixture<wcSpace>(html`<wc-space size="12"><span>A</span></wc-space>`);
    expect(
      num
        .shadowRoot!.querySelector<HTMLElement>('.space')!
        .style.getPropertyValue('--wc-space-gap'),
    ).to.equal('12px');

    const css = await fixture<wcSpace>(html`<wc-space size="2rem"><span>A</span></wc-space>`);
    expect(
      css
        .shadowRoot!.querySelector<HTMLElement>('.space')!
        .style.getPropertyValue('--wc-space-gap'),
    ).to.equal('2rem');
  });

  it('子元素仍然分配到默认插槽', async () => {
    const el = await fixture<wcSpace>(
      html`<wc-space><span class="a">A</span><span class="b">B</span></wc-space>`,
    );
    const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot')!;
    const assigned = slot.assignedElements();
    expect(assigned.length).to.equal(2);
    expect((assigned[0] as HTMLElement).className).to.equal('a');
  });

  it('暴露 part="base"，对齐方式渲染类名', async () => {
    const el = await fixture<wcSpace>(html`<wc-space align="end"><span>A</span></wc-space>`);
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
    expect(el.shadowRoot!.querySelector('.align-end')).to.exist;
  });
});
