import { expect, fixture, html } from '@open-wc/testing';
import './wc-row.js';
import type { wcRow, wcCol } from './wc-row.js';

describe('wc-row / wc-col', () => {
  it('row 默认属性正确', async () => {
    const el = await fixture<wcRow>(html`<wc-row><wc-col>1</wc-col></wc-row>`);
    expect(el.gutter).to.equal(0);
    expect(el.justify).to.equal('start');
    expect(el.align).to.equal('top');
    expect(el.wrap).to.be.false;
  });

  it('row 的 justify/align/wrap 反射', async () => {
    const el = await fixture<wcRow>(
      html`<wc-row justify="center" align="middle" wrap><wc-col>1</wc-col></wc-row>`,
    );
    expect(el.getAttribute('justify')).to.equal('center');
    expect(el.getAttribute('align')).to.equal('middle');
    expect(el.hasAttribute('wrap')).to.be.true;
    expect(el.shadowRoot!.querySelector('.justify-center')).to.exist;
    expect(el.shadowRoot!.querySelector('.align-middle')).to.exist;
  });

  it('gutter 写入 CSS 变量', async () => {
    const el = await fixture<wcRow>(html`<wc-row gutter="16"><wc-col>1</wc-col></wc-row>`);
    expect(
      el.shadowRoot!.querySelector<HTMLElement>('.row')!.style.getPropertyValue('--wc-row-gutter'),
    ).to.equal('16px');
  });

  it('col 默认占满 24 栅格', async () => {
    const el = await fixture<wcCol>(html`<wc-col>内容</wc-col>`);
    expect(el.span).to.equal(24);
    expect(el.offset).to.equal(0);
    const col = el.shadowRoot!.querySelector<HTMLElement>('.col')!;
    expect(col.style.width).to.equal('100%');
    expect(col.style.marginLeft).to.equal('0%');
  });

  it('col span/offset 换算百分比，越界收敛', async () => {
    const el = await fixture<wcCol>(html`<wc-col span="12" offset="6">内容</wc-col>`);
    const col = el.shadowRoot!.querySelector<HTMLElement>('.col')!;
    // 内联 style 会被浏览器规范化（50.0000% → 50%）
    expect(col.style.width).to.equal('50%');
    expect(col.style.marginLeft).to.equal('25%');

    const over = await fixture<wcCol>(html`<wc-col span="99">内容</wc-col>`);
    expect(over.shadowRoot!.querySelector<HTMLElement>('.col')!.style.width).to.equal('100%');
  });

  it('row 收集 col 子元素', async () => {
    const row = await fixture<wcRow>(
      html`<wc-row><wc-col class="c1">1</wc-col><wc-col class="c2">2</wc-col></wc-row>`,
    );
    const slot = row.shadowRoot!.querySelector<HTMLSlotElement>('slot')!;
    expect(slot.assignedElements().filter((el) => el.tagName === 'WC-COL').length).to.equal(2);
  });

  it('暴露 part="base"', async () => {
    const row = await fixture<wcRow>(html`<wc-row><wc-col>1</wc-col></wc-row>`);
    expect(row.shadowRoot!.querySelector('[part="base"]')).to.exist;
    const col = row.querySelector('wc-col')! as wcCol;
    expect(col.shadowRoot!.querySelector('[part="base"]')).to.exist;
  });
});
