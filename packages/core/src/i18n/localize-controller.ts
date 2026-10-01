import type { ReactiveController, ReactiveElement } from 'lit';
import { getLocale, getTerm, LANGUAGE_CHANGE_EVENT, resolveLocale } from './localize.js';

/**
 * 组件国际化控制器。
 * 文案解析优先级：元素 lang 属性 > 全局 setLocale > 默认语言 zh-CN。
 * 全局语言切换时自动触发宿主组件重渲染。
 *
 * @example
 * ```ts
 * class WcSelect extends LitElement {
 *   private localize = new LocalizeController(this);
 *   render() {
 *     return html`<span>${this.localize.term('select.placeholder')}</span>`;
 *   }
 * }
 * ```
 */
export class LocalizeController implements ReactiveController {
  private host: ReactiveElement;

  constructor(host: ReactiveElement) {
    this.host = host;
    host.addController(this);
  }

  hostConnected(): void {
    document.addEventListener(LANGUAGE_CHANGE_EVENT, this.handleLanguageChange);
  }

  hostDisconnected(): void {
    document.removeEventListener(LANGUAGE_CHANGE_EVENT, this.handleLanguageChange);
  }

  /** 取文案，支持 {var} 插值 */
  term(key: string, vars?: Record<string, string | number>): string {
    return getTerm(this.resolvedLocale, key, vars);
  }

  /** 按当前语言格式化日期 */
  date(value: Date | number, options?: Intl.DateTimeFormatOptions & { locale?: string }): string {
    const { locale: localeOverride, ...formatOptions } = options ?? {};
    return new Intl.DateTimeFormat(localeOverride ?? this.resolvedLocale, formatOptions).format(
      value,
    );
  }

  /** 按当前语言格式化数字 */
  number(value: number, options?: Intl.NumberFormatOptions & { locale?: string }): string {
    const { locale: localeOverride, ...formatOptions } = options ?? {};
    return new Intl.NumberFormat(localeOverride ?? this.resolvedLocale, formatOptions).format(
      value,
    );
  }

  /** 元素 lang 属性优先，其次全局语言 */
  private get resolvedLocale(): string {
    const lang = (this.host as HTMLElement).getAttribute('lang');
    return lang ? resolveLocale(lang) : getLocale();
  }

  private handleLanguageChange = (): void => {
    this.host.requestUpdate();
  };
}
