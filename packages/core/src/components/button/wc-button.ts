import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { buttonStyles } from './wc-button.styles';

export type wcButtonTheme = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type wcButtonVariant = 'base' | 'outline' | 'dashed' | 'text' | 'link';
export type wcButtonSize = 'small' | 'medium' | 'large';
export type wcButtonIconPosition = 'start' | 'end';

/**
 * 按钮
 *
 * @slot - 按钮内容
 * @slot icon - 图标（位置由 iconPosition 控制）
 * @csspart base - 按钮根元素
 * @csspart icon - 图标容器
 * @csspart content - 文案容器
 * @cssprop --wc-button-height - 按钮高度
 */
export class wcButton extends LitElement {
  static styles = [baseStyles, buttonStyles];

  /** 组件风格（语义色） */
  @property({ reflect: true }) theme: wcButtonTheme = 'default';

  /** 按钮形式 */
  @property({ reflect: true }) variant: wcButtonVariant = 'base';

  /** 尺寸 */
  @property({ reflect: true }) size: wcButtonSize = 'medium';

  /** 图标位置：start 左 / end 右 */
  @property({ reflect: true, attribute: 'icon-position' }) iconPosition: wcButtonIconPosition =
    'start';

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

  /** 是否有图标（icon 插槽检测） */
  private _hasIcon = false;

  /** 是否有文案（默认插槽检测），两者决定纯图标方形态 */
  private _hasText = false;

  render() {
    const icon = html`<span class="icon" part="icon" ?hidden=${!this._hasIcon}>
      <slot name="icon" @slotchange=${this._onIconSlotChange}></slot>
    </span>`;
    const content = html`<span class="content" part="content"
      ><slot @slotchange=${this._onTextSlotChange}></slot
    ></span>`;
    return html`
      <button
        part="base"
        class="button"
        ?disabled=${this.disabled || this.loading}
        aria-disabled=${this.disabled || this.loading}
        aria-busy=${this.loading}
        @click=${this.handleClick}
      >
        ${this.iconPosition === 'end' ? [content, icon] : [icon, content]}
      </button>
    `;
  }

  private _onIconSlotChange(e: Event): void {
    this._hasIcon = (e.target as HTMLSlotElement).assignedElements({ flatten: true }).length > 0;
    this._syncIconOnly();
    this.requestUpdate();
  }

  private _onTextSlotChange(e: Event): void {
    const nodes = (e.target as HTMLSlotElement).assignedNodes({ flatten: true });
    this._hasText = nodes.some((n) => (n.textContent ?? '').trim().length > 0);
    this._syncIconOnly();
    this.requestUpdate();
  }

  /** 纯图标（有 icon 无文案）时收为正方形 */
  private _syncIconOnly(): void {
    this.classList.toggle('wc-button--icon-only', this._hasIcon && !this._hasText);
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
