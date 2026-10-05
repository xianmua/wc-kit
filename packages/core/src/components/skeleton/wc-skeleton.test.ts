import { expect, fixture, html } from '@open-wc/testing';
import './wc-skeleton.js';
import './wc-skeleton-item.js';
import type { wcSkeleton } from './wc-skeleton.js';
import type { wcSkeletonItem } from './wc-skeleton-item.js';

describe('wc-skeleton', () => {
  it('默认 3 行正文 + 标题行，共 4 条占位行', async () => {
    const el = await fixture<wcSkeleton>(html`<wc-skeleton></wc-skeleton>`);
    expect(el.rows).to.equal(3);
    expect(el.shadowRoot!.querySelectorAll('.line').length).to.equal(4);
    expect(el.shadowRoot!.querySelector('.title')).to.exist;
  });

  it('rows 控制行数，末行带 last 缩短类', async () => {
    const el = await fixture<wcSkeleton>(html`<wc-skeleton rows="5"></wc-skeleton>`);
    const lines = el.shadowRoot!.querySelectorAll('.line');
    expect(lines.length).to.equal(6);
    expect(lines[lines.length - 1].classList.contains('last')).to.be.true;
  });

  it('avatar 渲染圆头像占位', async () => {
    const el = await fixture<wcSkeleton>(html`<wc-skeleton avatar></wc-skeleton>`);
    expect(el.shadowRoot!.querySelector('.avatar')).to.exist;
  });

  it('animated 默认关闭，开启后加 animated 类', async () => {
    const el = await fixture<wcSkeleton>(html`<wc-skeleton></wc-skeleton>`);
    expect(el.shadowRoot!.querySelector('.animated')).to.be.null;
    el.animated = true;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.animated')).to.exist;
  });

  it('part 选择器：base / avatar / line', async () => {
    const el = await fixture<wcSkeleton>(html`<wc-skeleton avatar rows="1"></wc-skeleton>`);
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="avatar"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="line"]')).to.exist;
  });
});

describe('wc-skeleton-item', () => {
  it('默认 rect 变体', async () => {
    const el = await fixture<wcSkeletonItem>(html`<wc-skeleton-item></wc-skeleton-item>`);
    expect(el.variant).to.equal('rect');
    expect(el.shadowRoot!.querySelector('.item')).to.exist;
  });

  it('circle 变体反映到属性', async () => {
    const el = await fixture<wcSkeletonItem>(
      html`<wc-skeleton-item variant="circle"></wc-skeleton-item>`,
    );
    expect(el.getAttribute('variant')).to.equal('circle');
  });

  it('animated 开启呼吸动画', async () => {
    const el = await fixture<wcSkeletonItem>(html`<wc-skeleton-item animated></wc-skeleton-item>`);
    expect(el.shadowRoot!.querySelector('.animated')).to.exist;
  });
});
