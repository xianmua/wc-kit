import { expect, fixture, html } from '@open-wc/testing';
import { LitElement } from 'lit';
import { getLocale, getRegisteredLocales, getTerm, registerLocale, setLocale } from './localize.js';
import { LocalizeController } from './localize-controller.js';

class TestI18nElement extends LitElement {
  static properties = { lang: { type: String, reflect: true } };

  declare lang: string;

  localize = new LocalizeController(this);

  constructor() {
    super();
    this.lang = '';
  }

  render() {
    return this.localize.term('empty.noData');
  }
}
customElements.define('test-i18n-element', TestI18nElement);

describe('i18n', () => {
  it('默认语言为 zh-CN 且内置语言包已注册', () => {
    expect(getLocale()).to.equal('zh-CN');
    expect(getRegisteredLocales()).to.include.members(['zh-CN', 'en-US']);
  });

  it('setLocale 切换文案', () => {
    setLocale('en-US');
    expect(getTerm('en-US', 'dialog.confirm')).to.equal('Confirm');
    setLocale('zh-CN');
    expect(getTerm('zh-CN', 'dialog.confirm')).to.equal('确认');
  });

  it('setLocale 相同语言时不重复派发事件', () => {
    let count = 0;
    const handler = () => {
      count++;
    };
    document.addEventListener('wc-language-change', handler);
    setLocale('zh-CN');
    document.removeEventListener('wc-language-change', handler);
    expect(count).to.equal(0);
  });

  it('无效语言标识抛错', () => {
    expect(() => setLocale('not a locale!')).to.throw();
  });

  it('getTerm 支持 {var} 插值', () => {
    expect(getTerm('zh-CN', 'pagination.total', { total: 100 })).to.equal('共 100 条');
    expect(getTerm('en-US', 'pagination.total', { total: 100 })).to.equal('100 items in total');
  });

  it('未知 key 回退为 key 本身', () => {
    expect(getTerm('zh-CN', 'not.exist.key')).to.equal('not.exist.key');
  });

  it('registerLocale 可注册新语言并切换', () => {
    registerLocale('ja-JP', { 'dialog.confirm': '確認', 'dialog.cancel': 'キャンセル' });
    setLocale('ja-JP');
    expect(getTerm('ja-JP', 'dialog.confirm')).to.equal('確認');
    // 未翻译的 key 回退到默认语言
    expect(getTerm('ja-JP', 'select.placeholder')).to.equal('请选择');
    setLocale('zh-CN');
  });

  it('registerLocale 同名语言浅合并可覆盖内置文案', () => {
    registerLocale('zh-CN', { 'dialog.confirm': '好的' });
    expect(getTerm('zh-CN', 'dialog.confirm')).to.equal('好的');
    registerLocale('zh-CN', { 'dialog.confirm': '确认' });
  });

  it('LocalizeController 元素 lang 属性优先于全局语言', async () => {
    setLocale('zh-CN');
    const el = await fixture<TestI18nElement>(html`<test-i18n-element></test-i18n-element>`);
    expect(el.shadowRoot!.textContent?.trim()).to.equal('暂无数据');
    el.lang = 'en-US';
    await el.updateComplete;
    expect(el.localize.term('empty.noData')).to.equal('No data');
  });

  it('全局语言切换触发组件重渲染', async () => {
    const el = await fixture<TestI18nElement>(html`<test-i18n-element></test-i18n-element>`);
    setLocale('en-US');
    await el.updateComplete;
    expect(el.shadowRoot!.textContent?.trim()).to.equal('No data');
    setLocale('zh-CN');
    await el.updateComplete;
    expect(el.shadowRoot!.textContent?.trim()).to.equal('暂无数据');
  });

  it('语言回退：未注册的完整标识匹配基础语言', () => {
    // en-GB 未注册，回退到 en-US
    expect(getTerm('en-GB', 'dialog.confirm')).to.equal('Confirm');
  });

  it('日期与数字格式化跟随语言', () => {
    setLocale('zh-CN');
    const el = new TestI18nElement();
    expect(el.localize.number(12345.6, { maximumFractionDigits: 0 })).to.equal('12,346');
    expect(el.localize.date(new Date('2026-01-15T00:00:00Z'), { timeZone: 'UTC' })).to.match(
      /2026/,
    );
  });
});
