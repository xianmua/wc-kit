import { expect, fixture, html } from '@open-wc/testing';
import './wc-segmented.js';
import './wc-segmented-item.js';
import type { wcSegmented } from './wc-segmented.js';
import type { wcSegmentedItem } from './wc-segmented-item.js';

async function create(template: ReturnType<typeof html>) {
  const el = await fixture<wcSegmented>(html`<wc-segmented>${template}</wc-segmented>`);
  await el.updateComplete;
  return el;
}

const items = (el: wcSegmented) =>
  Array.from(el.querySelectorAll('wc-segmented-item')) as wcSegmentedItem[];

const buttons = (el: wcSegmented) =>
  items(el).map((it) => it.shadowRoot!.querySelector<HTMLButtonElement>('.item')!);

describe('wc-segmented', () => {
  it('渲染选项文案，默认无选中（滑块隐藏）', async () => {
    const el = await create(
      html`<wc-segmented-item value="a">日</wc-segmented-item>
        <wc-segmented-item value="b">周</wc-segmented-item>`,
    );
    // 选项文案在 light DOM（slot 分发），textContent 直读
    expect(items(el)[0].textContent).to.contain('日');
    const thumb = el.shadowRoot!.querySelector<HTMLElement>('[part="thumb"]')!;
    expect(thumb.hasAttribute('data-ready')).to.be.false;
    expect(items(el).every((it) => !it.selected)).to.be.true;
  });

  it('value 命中选项：selected 同步 + aria-checked + roving tabindex', async () => {
    const el = await create(
      html`<wc-segmented-item value="a">日</wc-segmented-item>
        <wc-segmented-item value="b">周</wc-segmented-item>`,
    );
    el.value = 'b';
    await el.updateComplete;
    const [a, b] = items(el);
    expect(a.selected).to.be.false;
    expect(b.selected).to.be.true;
    expect(buttons(el)[1].getAttribute('aria-checked')).to.equal('true');
    expect(buttons(el)[1].getAttribute('tabindex')).to.equal('0');
    expect(buttons(el)[0].getAttribute('tabindex')).to.equal('-1');
    // 滑块已定位（jsdom 无布局，断言定位样式已写入）
    const thumb = el.shadowRoot!.querySelector<HTMLElement>('[part="thumb"]')!;
    expect(thumb.hasAttribute('data-ready')).to.be.true;
    expect(thumb.style.left).to.contain('px');
    expect(thumb.style.width).to.contain('px');
  });

  it('value 缺省时用选项文案作为值', async () => {
    const el = await create(
      html`<wc-segmented-item>日</wc-segmented-item> <wc-segmented-item>周</wc-segmented-item>`,
    );
    el.value = '周';
    await el.updateComplete;
    expect(items(el)[1].selected).to.be.true;
  });

  it('点击选项切换选中并派发 wc-change', async () => {
    const el = await create(
      html`<wc-segmented-item value="a">日</wc-segmented-item>
        <wc-segmented-item value="b">周</wc-segmented-item>`,
    );
    const changes: string[] = [];
    el.addEventListener('wc-change', (e) => changes.push((e as CustomEvent).detail.value));

    buttons(el)[1].click();
    await el.updateComplete;
    expect(el.value).to.equal('b');
    expect(changes).to.deep.equal(['b']);
    expect(items(el)[0].selected).to.be.false;
    expect(items(el)[1].selected).to.be.true;

    // 点击已选中项不重复派发
    buttons(el)[1].click();
    await el.updateComplete;
    expect(changes).to.deep.equal(['b']);
  });

  it('禁用选项不响应点击', async () => {
    const el = await create(
      html`<wc-segmented-item value="a">日</wc-segmented-item>
        <wc-segmented-item value="b" disabled>周</wc-segmented-item>`,
    );
    buttons(el)[1].click();
    await el.updateComplete;
    expect(el.value).to.equal('');
    expect(items(el)[1].selected).to.be.false;
  });

  it('整体禁用后点击无效', async () => {
    const el = await create(html`<wc-segmented-item value="a">日</wc-segmented-item>`);
    el.disabled = true;
    await el.updateComplete;
    expect(el.hasAttribute('disabled')).to.be.true;
    buttons(el)[0].click();
    await el.updateComplete;
    expect(el.value).to.equal('');
  });

  it('方向键在启用选项间循环切换', async () => {
    const el = await create(
      html`<wc-segmented-item value="a">1</wc-segmented-item>
        <wc-segmented-item value="b" disabled>2</wc-segmented-item>
        <wc-segmented-item value="c">3</wc-segmented-item>`,
    );
    el.value = 'a';
    await el.updateComplete;
    const changes: string[] = [];
    el.addEventListener('wc-change', (e) => changes.push((e as CustomEvent).detail.value));

    el.shadowRoot!.querySelector('.segmented')!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true }),
    );
    await el.updateComplete;
    expect(el.value).to.equal('c'); // b 被跳过

    el.shadowRoot!.querySelector('.segmented')!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, composed: true }),
    );
    await el.updateComplete;
    expect(el.value).to.equal('a');
    expect(changes).to.deep.equal(['c', 'a']);
  });

  it('size 与 block 属性反射', async () => {
    const el = await fixture<wcSegmented>(
      html`<wc-segmented size="large" block>
        <wc-segmented-item value="a">a</wc-segmented-item>
      </wc-segmented>`,
    );
    await el.updateComplete;
    expect(el.getAttribute('size')).to.equal('large');
    expect(el.hasAttribute('block')).to.be.true;
  });

  it('part 选择器：base / thumb / item', async () => {
    const el = await create(html`<wc-segmented-item value="a">a</wc-segmented-item>`);
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="thumb"]')).to.exist;
    expect(items(el)[0].shadowRoot!.querySelector('[part="item"]')).to.exist;
  });
});
