import { expect, fixture, html } from '@open-wc/testing';
import './wc-progress.js';
import type { wcProgress } from './wc-progress.js';

describe('wc-progress', () => {
  it('默认 line 主题，指示条宽度与 ARIA 反映百分比', async () => {
    const el = await fixture<wcProgress>(html`<wc-progress value="60"></wc-progress>`);
    expect(el.theme).to.equal('line');
    const track = el.shadowRoot!.querySelector('[role="progressbar"]')!;
    expect(track.getAttribute('aria-valuenow')).to.equal('60');
    const indicator = el.shadowRoot!.querySelector('.indicator') as HTMLElement;
    expect(indicator.style.width).to.equal('60%');
  });

  it('value 自动夹紧到 0-100，标签百分比取整', async () => {
    const over = await fixture<wcProgress>(html`<wc-progress value="150"></wc-progress>`);
    expect((over.shadowRoot!.querySelector('.indicator') as HTMLElement).style.width).to.equal(
      '100%',
    );
    expect(over.shadowRoot!.querySelector('.label')!.textContent!.trim()).to.contain('100%');

    const under = await fixture<wcProgress>(html`<wc-progress value="-20"></wc-progress>`);
    expect((under.shadowRoot!.querySelector('.indicator') as HTMLElement).style.width).to.equal(
      '0%',
    );
  });

  it('show-label 默认显示百分比，label 属性可覆盖', async () => {
    const el = await fixture<wcProgress>(html`<wc-progress value="45.6"></wc-progress>`);
    expect(el.shadowRoot!.querySelector('.label')!.textContent!.trim()).to.contain('46%');

    const custom = await fixture<wcProgress>(
      html`<wc-progress value="45.6" label="3/7 天"></wc-progress>`,
    );
    expect(custom.shadowRoot!.querySelector('.label')!.textContent!.trim()).to.contain('3/7 天');

    // Lit Boolean 属性遵循 HTML 规范，关闭需移除属性（直接设 property）
    const hidden = await fixture<wcProgress>(html`<wc-progress value="45.6"></wc-progress>`);
    hidden.showLabel = false;
    await hidden.updateComplete;
    expect(hidden.shadowRoot!.querySelector('.label')).to.be.null;
  });

  it('status 语义色反映到属性与样式选择器', async () => {
    const el = await fixture<wcProgress>(
      html`<wc-progress value="80" status="success"></wc-progress>`,
    );
    expect(el.getAttribute('status')).to.equal('success');
    // success 附带状态图标
    expect(el.shadowRoot!.querySelector('.label wc-icon')).to.exist;

    const error = await fixture<wcProgress>(
      html`<wc-progress value="30" status="error"></wc-progress>`,
    );
    expect(error.shadowRoot!.querySelector('.label wc-icon')!.getAttribute('name')).to.equal(
      'close',
    );

    const normal = await fixture<wcProgress>(html`<wc-progress value="30"></wc-progress>`);
    expect(normal.shadowRoot!.querySelector('.label wc-icon')).to.be.null;
  });

  it('stroke-width 反映轨道高度', async () => {
    const el = await fixture<wcProgress>(
      html`<wc-progress value="40" stroke-width="10"></wc-progress>`,
    );
    const track = el.shadowRoot!.querySelector('.track') as HTMLElement;
    expect(track.style.height).to.equal('10px');
  });

  it('circle 主题：SVG 指示条 dashoffset 反映进度', async () => {
    const el = await fixture<wcProgress>(
      html`<wc-progress theme="circle" value="50"></wc-progress>`,
    );
    const circles = el.shadowRoot!.querySelectorAll('circle');
    expect(circles.length).to.equal(2);
    const indicator = circles[1]!;
    const dasharray = Number(indicator.getAttribute('stroke-dasharray'));
    expect(Math.round(Number(indicator.getAttribute('stroke-dashoffset')))).to.equal(
      Math.round(dasharray * 0.5),
    );
    expect(el.shadowRoot!.querySelector('.circle-label')!.textContent!.trim()).to.contain('50%');
    expect(
      el.shadowRoot!.querySelector('[role="progressbar"]')!.getAttribute('aria-valuenow'),
    ).to.equal('50');
  });

  it('value 动态更新同步指示条与标签', async () => {
    const el = await fixture<wcProgress>(html`<wc-progress value="10"></wc-progress>`);
    el.value = 70;
    await el.updateComplete;
    expect((el.shadowRoot!.querySelector('.indicator') as HTMLElement).style.width).to.equal('70%');
    expect(el.shadowRoot!.querySelector('.label')!.textContent!.trim()).to.contain('70%');
  });

  it('part 选择器：base/track/indicator/label', async () => {
    const el = await fixture<wcProgress>(html`<wc-progress value="40" show-label></wc-progress>`);
    for (const part of ['base', 'track', 'indicator', 'label']) {
      expect(el.shadowRoot!.querySelector(`[part="${part}"]`)).to.exist;
    }
  });
});
