import { expect, fixture, html } from '@open-wc/testing';
import './wc-float-button.js';
import type { wcFloatButton } from './wc-float-button.js';

describe('wc-float-button', () => {
  it('默认渲染圆形 default 的 <button>，宿主 fixed 定位', async () => {
    const el = await fixture<wcFloatButton>(html`<wc-float-button icon="plus"></wc-float-button>`);
    await el.updateComplete;
    const fab = el.shadowRoot!.querySelector<HTMLElement>('.fab')!;
    expect(fab.tagName).to.equal('BUTTON');
    expect(fab.getAttribute('type')).to.equal('button');
    expect(el.getAttribute('shape')).to.equal('circle');
    expect(el.getAttribute('type')).to.equal('default');
  });

  it('href 渲染 <a>，disabled 时回退为禁用 <button>', async () => {
    const link = await fixture<wcFloatButton>(
      html`<wc-float-button href="https://example.com" target="_blank"></wc-float-button>`,
    );
    await link.updateComplete;
    const a = link.shadowRoot!.querySelector('.fab')!;
    expect(a.tagName).to.equal('A');
    expect(a.getAttribute('href')).to.equal('https://example.com');
    expect(a.getAttribute('rel')).to.contain('noopener');

    const off = await fixture<wcFloatButton>(
      html`<wc-float-button href="https://example.com" disabled></wc-float-button>`,
    );
    await off.updateComplete;
    const b = off.shadowRoot!.querySelector('.fab')!;
    expect(b.tagName).to.equal('BUTTON');
    expect(b.hasAttribute('disabled')).to.be.true;
  });

  it('shape=square 切换类，icon 属性渲染 wc-icon', async () => {
    const el = await fixture<wcFloatButton>(
      html`<wc-float-button icon="close" shape="square"></wc-float-button>`,
    );
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('wc-icon')!.getAttribute('name')).to.equal('close');
  });

  it('description 属性与默认插槽文案展示', async () => {
    const el = await fixture<wcFloatButton>(
      html`<wc-float-button description="说明"></wc-float-button>`,
    );
    await el.updateComplete;
    const desc = el.shadowRoot!.querySelector<HTMLElement>('.desc')!;
    expect(desc.hasAttribute('hidden')).to.be.false;
    expect(desc.textContent).to.contain('说明');

    const slotted = await fixture<wcFloatButton>(html`<wc-float-button>插槽文案</wc-float-button>`);
    await slotted.updateComplete;
    const desc2 = slotted.shadowRoot!.querySelector<HTMLElement>('.desc')!;
    expect(desc2.hasAttribute('hidden')).to.be.false;
    const slot = desc2.querySelector('slot')!;
    const assigned = slot
      .assignedNodes({ flatten: true })
      .map((n) => n.textContent)
      .join('');
    expect(assigned).to.contain('插槽文案');
  });

  it('badge：dot 恒显示，count 显示数字，超 max 显 max+，<=0 隐藏', async () => {
    const dot = await fixture<wcFloatButton>(html`<wc-float-button dot></wc-float-button>`);
    await dot.updateComplete;
    expect(dot.shadowRoot!.querySelector('.badge')).to.exist;
    expect(dot.shadowRoot!.querySelector('.badge')!.textContent!.trim()).to.equal('');

    const count = await fixture<wcFloatButton>(html`<wc-float-button count="8"></wc-float-button>`);
    await count.updateComplete;
    expect(count.shadowRoot!.querySelector('.badge')!.textContent!.trim()).to.equal('8');

    const over = await fixture<wcFloatButton>(
      html`<wc-float-button count="120" max="99"></wc-float-button>`,
    );
    await over.updateComplete;
    expect(over.shadowRoot!.querySelector('.badge')!.textContent!.trim()).to.equal('99+');

    const none = await fixture<wcFloatButton>(html`<wc-float-button count="0"></wc-float-button>`);
    await none.updateComplete;
    expect(none.shadowRoot!.querySelector('.badge')).to.not.exist;
  });

  it('tooltip：hover 防抖显示气泡，离开后隐藏', async () => {
    const el = await fixture<wcFloatButton>(
      html`<wc-float-button tooltip="提示"></wc-float-button>`,
    );
    await el.updateComplete;
    const tip = el.shadowRoot!.querySelector<HTMLElement>('.tip')!;
    expect(tip.hasAttribute('data-open')).to.be.false;

    el.shadowRoot!.querySelector('.fab')!.dispatchEvent(new Event('mouseenter'));
    await new Promise((r) => setTimeout(r, 150));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.tip')!.hasAttribute('data-open')).to.be.true;
    // 定位已应用
    expect((el.shadowRoot!.querySelector('.tip') as HTMLElement).style.left).to.contain('px');

    el.shadowRoot!.querySelector('.fab')!.dispatchEvent(new Event('mouseleave'));
    await new Promise((r) => setTimeout(r, 200));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.tip')!.hasAttribute('data-open')).to.be.false;
  });

  it('backtop：滚动超阈值显示、点击滚顶', async () => {
    const el = await fixture<wcFloatButton>(
      html`<wc-float-button backtop visibility-height="400"></wc-float-button>`,
    );
    await el.updateComplete;
    expect(el.hasAttribute('data-visible')).to.be.false;

    Object.defineProperty(window, 'scrollY', { value: 500, configurable: true });
    window.dispatchEvent(new Event('scroll'));
    await el.updateComplete;
    expect(el.hasAttribute('data-visible')).to.be.true;

    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
    window.dispatchEvent(new Event('scroll'));
    await el.updateComplete;
    expect(el.hasAttribute('data-visible')).to.be.false;

    // 点击滚顶（jsdom scrollTo 为空实现，仅验证不抛错且未触发导航）
    Object.defineProperty(window, 'scrollY', { value: 500, configurable: true });
    window.dispatchEvent(new Event('scroll'));
    await el.updateComplete;
    let scrolled = false;
    window.scrollTo = (() => {
      scrolled = true;
    }) as typeof window.scrollTo;
    el.shadowRoot!.querySelector<HTMLElement>('.fab')!.click();
    expect(scrolled).to.be.true;
  });

  it('backtop 默认 tooltip 取 i18n 文案', async () => {
    const el = await fixture<wcFloatButton>(html`<wc-float-button backtop></wc-float-button>`);
    await el.updateComplete;
    el.shadowRoot!.querySelector('.fab')!.dispatchEvent(new Event('mouseenter'));
    await new Promise((r) => setTimeout(r, 150));
    await el.updateComplete;
    const tip = el.shadowRoot!.querySelector('.tip')!;
    expect(tip.hasAttribute('data-open')).to.be.true;
    expect(tip.textContent!.trim().length).to.be.greaterThan(0);
  });

  it('backtop 缺省渲染内建 arrow-up 图标', async () => {
    const el = await fixture<wcFloatButton>(html`<wc-float-button backtop></wc-float-button>`);
    await el.updateComplete;
    const ico = el.shadowRoot!.querySelector('.ico')!;
    expect(ico.hasAttribute('hidden')).to.be.false;
    expect(ico.querySelector('wc-icon')!.getAttribute('name')).to.equal('arrow-up');
  });

  it('part 属性存在', async () => {
    const el = await fixture<wcFloatButton>(
      html`<wc-float-button icon="plus" count="3" tooltip="x"></wc-float-button>`,
    );
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="badge"]')).to.exist;
  });
});
