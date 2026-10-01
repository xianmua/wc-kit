import { LitElement, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import type { PropertyValues } from 'lit';
import { baseStyles } from '../../styles/base.css.js';
import { resolveIcon } from '../../icons/library.js';
import { iconStyles } from './wc-icon.styles.js';

/**
 * 图标
 *
 * 三种来源（优先级从高到低）：`src`（URL 直连）> `name` + `library`（图标库解析）。
 * 内置图标需先调用 `registerBuiltinIcons()`；自定义库用 `registerIconLibrary()`。
 *
 * @slot - 无（内容由 name/src 解析而来）
 * @csspart base - 图标容器
 * @cssprop --wc-icon-size - 覆盖图标尺寸（默认 1em）
 */
export class WcIcon extends LitElement {
  static styles = [baseStyles, iconStyles];

  /** 图标名（在 library 对应的图标库中查找） */
  @property() name = '';

  /** 直接指定 SVG 地址，优先级高于 name */
  @property() src = '';

  /** 图标库名称，默认走同步注册表 */
  @property() library = 'default';

  /** 无障碍描述文案；提供时 role=img + aria-label，否则对读屏隐藏 */
  @property() label = '';

  /** 旋转动画（加载中） */
  @property({ type: Boolean, reflect: true }) spin = false;

  /** 缓动旋转动画 */
  @property({ type: Boolean, reflect: true }) pulse = false;

  @state() private svg = '';

  /** 竞态守卫：name 快速切换时只采纳最后一次解析结果 */
  private requestId = 0;

  protected willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('src') || changed.has('name') || changed.has('library')) {
      void this.loadIcon();
    }
  }

  private async loadIcon(): Promise<void> {
    const requestId = ++this.requestId;
    let raw = '';
    if (this.src) {
      raw = await this.fetchSrc(this.src);
    } else if (this.name) {
      raw = await resolveIcon(this.library, this.name);
    }
    if (requestId !== this.requestId) {
      return;
    }
    this.svg = raw;
  }

  private async fetchSrc(url: string): Promise<string> {
    if (typeof fetch !== 'function') {
      return '';
    }
    try {
      const res = await fetch(url);
      if (!res.ok) {
        return '';
      }
      return await res.text();
    } catch {
      return '';
    }
  }

  render() {
    return html`
      <span
        part="base"
        role=${this.label ? 'img' : 'presentation'}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
        >${this.svg ? unsafeSVG(this.svg) : nothing}</span
      >
    `;
  }
}

if (!customElements.get('wc-icon')) {
  customElements.define('wc-icon', WcIcon);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-icon': WcIcon;
  }
}
