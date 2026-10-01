import { html, LitElement, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { badgeStyles } from './wc-badge.styles';

export type wcBadgeTheme = 'primary' | 'success' | 'warning' | 'danger';

/**
 * 徽标。出现在右上角的数字或圆点标记：包裹内容时悬浮于其右上角，
 * 无内容时独立展示。count 超过 max 显示「max+」，count 为 0 时隐藏
 * （dot 模式恒显示）。
 *
 * @example
 * ```html
 * <wc-badge count="5"><wc-icon name="search"></wc-icon></wc-badge>
 * <wc-badge dot></wc-badge>
 * ```
 *
 * @slot - 被标记的内容（可空，空时独立展示）
 * @csspart badge - 徽标本体
 */
export class wcBadge extends LitElement {
  static styles = [baseStyles, badgeStyles];

  /** 徽标数字（<= 0 隐藏） */
  @property({ type: Number }) count = 0;

  /** 数字上限，超出显示「max+」 */
  @property({ type: Number }) max = 99;

  /** 圆点模式（忽略 count，恒显示） */
  @property({ type: Boolean, reflect: true }) dot = false;

  /** 语义色 */
  @property({ reflect: true }) theme: wcBadgeTheme = 'danger';

  /** 实际展示的数字文本 */
  private get displayCount(): string {
    if (this.count > this.max) return `${this.max}+`;
    return String(Math.max(0, this.count));
  }

  protected override render(): TemplateResult {
    const visible = this.dot || this.count > 0;
    return html`
      <slot></slot>
      ${
        visible
          ? html`<sup class="badge" part="badge">${this.dot ? nothing : this.displayCount}</sup>`
          : nothing
      }
    `;
  }
}

if (!customElements.get('wc-badge')) {
  customElements.define('wc-badge', wcBadge);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-badge': wcBadge;
  }
}
