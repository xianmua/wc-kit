import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { buttonStyles } from './wc-button.styles';

export type wcButtonTheme = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type wcButtonVariant = 'base' | 'outline' | 'dashed' | 'text';
export type wcButtonSize = 'small' | 'medium' | 'large';

/**
 * 按钮
 *
 * @slot - 按钮内容
 * @slot icon - 前置图标
 * @csspart base - 按钮根元素
 * @cssprop --wc-button-height - 按钮高度
 */
export class wcButton extends LitElement {
  static styles = [baseStyles, buttonStyles];

  /** 组件风格（语义色） */
  @property() theme: wcButtonTheme = 'default';

  /** 按钮形式 */
  @property() variant: wcButtonVariant = 'base';

  /** 尺寸 */
  @property({ reflect: true }) size: wcButtonSize = 'medium';

  /** 是否为块级元素 */
  @property({ type: Boolean, reflect: true }) block = false;

  /** 禁用状态 */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** 加载状态 */
  @property({ type: Boolean, reflect: true }) loading = false;

  private handleClick(e: MouseEvent): void {
    // 禁用/加载时拦截点击：原生按钮 disabled 已拦截禁用态，这里兜底加载态
    if (this.loading) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }

  render() {
    return html`
      <button
        part="base"
        class="button"
        ?disabled=${this.disabled || this.loading}
        aria-disabled=${this.disabled || this.loading}
        aria-busy=${this.loading}
        @click=${this.handleClick}
      >
        <span class="icon" part="icon" ?hidden=${!this._hasIcon}>
          <slot name="icon" @slotchange=${this._onSlotChange}></slot>
        </span>
        <span class="content" part="content"><slot></slot></span>
      </button>
    `;
  }

  private _hasIcon = false;

  private _onSlotChange(e: Event): void {
    this._hasIcon = (e.target as HTMLSlotElement).assignedElements({ flatten: true }).length > 0;
    this.requestUpdate();
  }
}

if (!customElements.get('wc-button')) {
  customElements.define('wc-button', wcButton);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-button': wcButton;
  }
}
