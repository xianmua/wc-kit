import { expect, fixture, html } from '@open-wc/testing';
import './wc-card.js';
import type { wcCard } from './wc-card.js';

describe('wc-card', () => {
  it('title/subtitle 渲染头部，body 承载默认插槽', async () => {
    const el = await fixture<wcCard>(html`
      <wc-card title="标题" subtitle="副标题"><p>内容</p></wc-card>
    `);
    expect(el.shadowRoot!.querySelector('.title')!.textContent).to.equal('标题');
    expect(el.shadowRoot!.querySelector('.subtitle')!.textContent).to.equal('副标题');
    // 默认插槽内容留在 light DOM，shadow 内 .body 文本不含分发内容
    expect(el.shadowRoot!.querySelector('.body slot')).to.exist;
    expect(el.querySelector('p')!.textContent).to.equal('内容');
  });

  it('无 title/插槽时头部隐藏', async () => {
    const el = await fixture<wcCard>(html`<wc-card><p>内容</p></wc-card>`);
    expect(el.shadowRoot!.querySelector('.header')!.hasAttribute('hidden')).to.be.true;
  });

  it('header 插槽覆盖默认标题', async () => {
    const el = await fixture<wcCard>(html`
      <wc-card title="默认标题"
        ><span slot="header">自定义头部</span>
        <p>内容</p></wc-card
      >
    `);
    expect(el.shadowRoot!.querySelector('.titles')!.hasAttribute('hidden')).to.be.true;
    const assigned = (el.shadowRoot!.querySelector('slot[name="header"]') as HTMLSlotElement)
      .assignedNodes()
      .map((n) => n.textContent)
      .join('')
      .trim();
    expect(assigned).to.equal('自定义头部');
  });

  it('actions 插槽渲染头部右侧，无内容时隐藏', async () => {
    const el = await fixture<wcCard>(html`
      <wc-card title="标题"
        ><wc-icon slot="actions" name="close"></wc-icon>
        <p>内容</p></wc-card
      >
    `);
    expect(el.shadowRoot!.querySelector('.actions')!.hasAttribute('hidden')).to.be.false;

    const bare = await fixture<wcCard>(html`<wc-card title="标题"><p>内容</p></wc-card>`);
    expect(bare.shadowRoot!.querySelector('.actions')!.hasAttribute('hidden')).to.be.true;
  });

  it('footer 插槽有内容才渲染底部分隔区', async () => {
    const el = await fixture<wcCard>(html`
      <wc-card title="标题"
        ><wc-button slot="footer">操作</wc-button>
        <p>内容</p></wc-card
      >
    `);
    expect(el.shadowRoot!.querySelector('.footer')!.hasAttribute('hidden')).to.be.false;

    const bare = await fixture<wcCard>(html`<wc-card title="标题"><p>内容</p></wc-card>`);
    expect(bare.shadowRoot!.querySelector('.footer')!.hasAttribute('hidden')).to.be.true;
  });

  it('动态添加 footer 内容自动显示底部', async () => {
    const el = await fixture<wcCard>(html`<wc-card title="标题"><p>内容</p></wc-card>`);
    expect(el.shadowRoot!.querySelector('.footer')!.hasAttribute('hidden')).to.be.true;
    const btn = document.createElement('button');
    btn.setAttribute('slot', 'footer');
    el.appendChild(btn);
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(el.shadowRoot!.querySelector('.footer')!.hasAttribute('hidden')).to.be.false;
  });

  it('bordered/hoverable 反射为属性', async () => {
    const el = await fixture<wcCard>(html`
      <wc-card title="标题" hoverable bordered="false"><p>内容</p></wc-card>
    `);
    expect(el.hasAttribute('hoverable')).to.be.true;
    // bordered="false" 遵循 HTML 布尔语义，仍为 true
    expect(el.bordered).to.be.true;
    el.bordered = false;
    await el.updateComplete;
    expect(el.hasAttribute('bordered')).to.be.false;
  });

  it('part 选择器：base/header/title/body/footer', async () => {
    const el = await fixture<wcCard>(html`
      <wc-card title="标题"
        ><p>内容</p>
        <span slot="footer">底部</span></wc-card
      >
    `);
    for (const part of ['base', 'header', 'title', 'body', 'footer']) {
      expect(el.shadowRoot!.querySelector(`[part="${part}"]`)).to.exist;
    }
  });
});
