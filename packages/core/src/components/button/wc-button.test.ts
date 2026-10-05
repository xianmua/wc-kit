import { expect, fixture, html } from '@open-wc/testing';
import './wc-button.js';
import type { wcButton } from './wc-button.js';

describe('wc-button', () => {
  it('渲染默认内容', async () => {
    const el = await fixture<wcButton>(html`<wc-button>确定</wc-button>`);
    const content = el.shadowRoot!.querySelector<HTMLSpanElement>('.content')!;
    const slotText = content
      .querySelector('slot')!
      .assignedNodes({ flatten: true })
      .map((n) => n.textContent?.trim())
      .join('');
    expect(slotText).to.equal('确定');
  });

  it('默认属性正确', async () => {
    const el = await fixture<wcButton>(html`<wc-button>确定</wc-button>`);
    expect(el.theme).to.equal('default');
    expect(el.type).to.equal('base');
    expect(el.size).to.equal('medium');
    expect(el.disabled).to.be.false;
    expect(el.loading).to.be.false;
  });

  it('html-type 透传内部原生按钮', async () => {
    const el = await fixture<wcButton>(html`<wc-button html-type="submit">提交</wc-button>`);
    expect(el.htmlType).to.equal('submit');
    expect(el.getAttribute('html-type')).to.equal('submit');
    expect(el.shadowRoot!.querySelector('button')!.getAttribute('type')).to.equal('submit');
  });

  it('disabled 属性 reflect 且禁用原生按钮', async () => {
    const el = await fixture<wcButton>(html`<wc-button disabled>确定</wc-button>`);
    expect(el.hasAttribute('disabled')).to.be.true;
    const button = el.shadowRoot!.querySelector('button')!;
    expect(button.disabled).to.be.true;
  });

  it('禁用时不触发 click', async () => {
    const el = await fixture<wcButton>(html`<wc-button disabled>确定</wc-button>`);
    let clicked = false;
    el.addEventListener('click', () => {
      clicked = true;
    });
    // 原生 button disabled 状态下不会派发 click（jsdom 与真实浏览器行为一致）
    el.shadowRoot!.querySelector('button')!.click();
    expect(clicked).to.be.false;
  });

  it('loading 时拦截 click 冒泡', async () => {
    const el = await fixture<wcButton>(html`<wc-button loading>确定</wc-button>`);
    let clicked = false;
    el.addEventListener('click', () => {
      clicked = true;
    });
    const button = el.shadowRoot!.querySelector('button')!;
    button.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    expect(clicked).to.be.false;
    expect(button.getAttribute('aria-busy')).to.equal('true');
  });

  it('size 变化反映到 attribute', async () => {
    const el = await fixture<wcButton>(html`<wc-button size="large">确定</wc-button>`);
    expect(el.getAttribute('size')).to.equal('large');
    el.size = 'small';
    await el.updateComplete;
    expect(el.getAttribute('size')).to.equal('small');
  });

  it('暴露 part="base" 供外部定制', async () => {
    const el = await fixture<wcButton>(html`<wc-button>确定</wc-button>`);
    const part = el.shadowRoot!.querySelector('[part="base"]')!;
    expect(part).to.exist;
  });

  it('iconPosition 默认 start，end 时图标渲染在文案之后', async () => {
    const el = await fixture<wcButton>(
      html`<wc-button icon-position="end"
        ><wc-icon slot="icon" name="search"></wc-icon>搜索</wc-button
      >`,
    );
    await el.updateComplete;
    expect(el.iconPosition).to.equal('end');
    const button = el.shadowRoot!.querySelector('button')!;
    const children = Array.from(button.querySelectorAll(':scope > span'));
    expect(children.map((c) => c.className)).to.deep.equal(['content', 'icon']);
    el.iconPosition = 'start';
    await el.updateComplete;
    const flipped = Array.from(el.shadowRoot!.querySelectorAll('button > span'));
    expect(flipped.map((c) => c.className)).to.deep.equal(['icon', 'content']);
  });

  it('纯图标按钮加 icon-only 宿主类，有文案时移除', async () => {
    const el = await fixture<wcButton>(
      html`<wc-button><wc-icon slot="icon" name="search"></wc-icon></wc-button>`,
    );
    await el.updateComplete;
    expect(el.classList.contains('wc-button--icon-only')).to.be.true;
    el.insertAdjacentText('beforeend', '搜索');
    await el.updateComplete;
    expect(el.classList.contains('wc-button--icon-only')).to.be.false;
  });

  it('样式规则：.icon 容器 flex 居中（行内盒基线会导致图标偏移）', async () => {
    const el = await fixture<wcButton>(html`<wc-button>确定</wc-button>`);
    const css = Array.from(el.shadowRoot!.querySelectorAll('style'))
      .map((s) => s.textContent)
      .join('');
    const iconRule = /(?<=\.icon\s*\{)[^}]*(?=\})/.exec(css) ?? [];
    expect(iconRule[0]).to.contain('display: flex');
    expect(iconRule[0]).to.contain('align-items: center');
  });

  it('样式规则：ghost 透明底 + 主题色，hover 淡底可覆写', async () => {
    const el = await fixture<wcButton>(html`<wc-button ghost>确定</wc-button>`);
    const css = Array.from(el.shadowRoot!.querySelectorAll('style'))
      .map((s) => s.textContent)
      .join('');
    expect(css).to.contain("[ghost][type='base']");
    expect(css).to.contain('--wc-button-ghost-hover-bg');
  });

  it('样式规则：gradient 用主题色 135° 线性渐变且跳过 default 主题', async () => {
    const el = await fixture<wcButton>(html`<wc-button gradient>确定</wc-button>`);
    const css = Array.from(el.shadowRoot!.querySelectorAll('style'))
      .map((s) => s.textContent)
      .join('');
    expect(css).to.contain('linear-gradient(');
    expect(css).to.contain('135deg');
    expect(css).to.contain("[gradient][type='base']:not([theme='default'])");
  });

  it('ripple 属性开启后点击产生波纹 span，位置随点击点', async () => {
    const el = await fixture<wcButton>(html`<wc-button ripple>确定</wc-button>`);
    const button = el.shadowRoot!.querySelector('button')!;
    button.dispatchEvent(
      new MouseEvent('click', { bubbles: true, composed: true, clientX: 24, clientY: 10 }),
    );
    const ripple = button.querySelector<HTMLSpanElement>('span.ripple')!;
    expect(ripple).to.exist;
    expect(ripple.style.left).to.equal('24px');
  });

  it('波纹 span 在 animationend 后移除', async () => {
    const el = await fixture<wcButton>(html`<wc-button ripple>确定</wc-button>`);
    const button = el.shadowRoot!.querySelector('button')!;
    button.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    const ripple = button.querySelector<HTMLSpanElement>('span.ripple')!;
    ripple.dispatchEvent(new Event('animationend'));
    expect(button.querySelector('span.ripple')).to.not.exist;
  });

  it('默认无波纹', async () => {
    const el = await fixture<wcButton>(html`<wc-button>确定</wc-button>`);
    const button = el.shadowRoot!.querySelector('button')!;
    button.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    expect(button.querySelector('span.ripple')).to.not.exist;
  });

  it('loading 时 spinner 替换 icon 插槽', async () => {
    const el = await fixture<wcButton>(
      html`<wc-button loading><wc-icon slot="icon" name="search"></wc-icon>确定</wc-button>`,
    );
    await el.updateComplete;
    const spinner = el.shadowRoot!.querySelector('wc-icon.spinner')!;
    expect(spinner).to.exist;
    expect(spinner.getAttribute('name')).to.equal('loader');
    expect(spinner.hasAttribute('spin')).to.be.true;
    // icon 插槽不再渲染（被 spinner 替换）
    expect(el.shadowRoot!.querySelector('slot[name="icon"]')).to.not.exist;
  });
});
