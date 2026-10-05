import { expect, fixture, html } from '@open-wc/testing';
import './wc-splitter-panel.js';
import type { wcSplitterPanel } from './wc-splitter-panel.js';

describe('wc-splitter-panel', () => {
  it('默认属性：size 0 / min 0 / max 100，resizable 开、collapsible 关', async () => {
    const el = await fixture<wcSplitterPanel>(html`<wc-splitter-panel>内容</wc-splitter-panel>`);
    await el.updateComplete;
    expect(el.size).to.equal(0);
    expect(el.min).to.equal(0);
    expect(el.max).to.equal(100);
    expect(el.resizable).to.be.true;
    expect(el.collapsible).to.be.false;
    expect(el.shadowRoot!.querySelector('.panel')).to.exist;
  });

  it('number 属性从 attribute 解析', async () => {
    const el = await fixture<wcSplitterPanel>(
      html`<wc-splitter-panel size="30" min="10" max="60" collapsible></wc-splitter-panel>`,
    );
    await el.updateComplete;
    expect(el.size).to.equal(30);
    expect(el.min).to.equal(10);
    expect(el.max).to.equal(60);
    expect(el.collapsible).to.be.true;
  });

  it('collapsible/resizable 反映到 attribute', async () => {
    const el = await fixture<wcSplitterPanel>(
      html`<wc-splitter-panel collapsible></wc-splitter-panel>`,
    );
    await el.updateComplete;
    expect(el.hasAttribute('collapsible')).to.be.true;
    el.resizable = false;
    await el.updateComplete;
    expect(el.hasAttribute('resizable')).to.be.false;
  });
});
