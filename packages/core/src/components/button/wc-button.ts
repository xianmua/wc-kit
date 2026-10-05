import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { hasAssignedElements, hasVisibleContent } from '../../common/slot';
import '../icon/wc-icon.js';
import { buttonStyles } from './wc-button.styles';

export type wcButtonTheme = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type wcButtonType = 'base' | 'outline' | 'dashed' | 'text' | 'link';
export type wcButtonSize = 'small' | 'medium' | 'large';
export type wcButtonIconPosition = 'start' | 'end';

/**
 * 按钮
 *
 * @slot - 按钮内容
 * @slot icon - 图标（位置由 iconPosition 控制；loading 时被 spinner 替换）
 * @csspart base - 按钮根元素
 * @csspart icon - 图标容器
 * @csspart content - 文案容器
 * @cssprop --wc-button-height - 按钮高度
 * @cssprop --wc-button-ghost-hover-bg - ghost 模式悬停淡底色
 * @cssprop --wc-button-ripple-color - 波纹颜色（默认 currentColor 45% 透明度）
 * @cssprop --wc-button-ripple-duration - 波纹扩散时长（默认 600ms）
 */
export class wcButton extends LitElement {
  static styles = [baseStyles, buttonStyles];

  /** 组件风格（语义色） */
  @property({ reflect: true }) theme: wcButtonTheme = 'default';

  /** 按钮类型（形式） */
  @property({ reflect: true }) type: wcButtonType = 'base';

  /** 原生按钮行为：submit / reset 仅在 wc-form 内触发提交 / 重置 */
  @property({ reflect: true, attribute: 'html-type' }) htmlType: 'button' | 'submit' | 'reset' =
    'button';

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

  /** 幽灵模式：透明底 + 主题色边框/文字（用于深色背景；outline/dashed 悬停改为半透明淡底） */
  @property({ type: Boolean, reflect: true }) ghost = false;

  /** 渐变底：实色按钮改为主题色线性渐变（仅 base 变体且非 default 主题生效） */
  @property({ type: Boolean, reflect: true }) gradient = false;

  /** 点击波纹效果 */
  @property({ type: Boolean, reflect: true }) ripple = false;

  private handleClick(e: MouseEvent): void {
    // 禁用/加载时拦截点击：原生按钮 disabled 已拦截禁用态，这里兜底加载态
    if (this.loading) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
    if (this.ripple) {
      this._spawnRipple(e);
    }
  }

  /*
   * 点击波纹：动态 span 从点击点扩散（伪元素无法按点击点定位，且并发点击
   * 会互相打断）。键盘触发（clientX/Y 均为 0）时从中心扩散。
   */
  private _spawnRipple(e: MouseEvent): void {
    const button = this.shadowRoot!.querySelector<HTMLElement>('.button');
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const diameter = Math.max(rect.width, rect.height) * 2;
    const cx = e.clientX || rect.left + rect.width / 2;
    const cy = e.clientY || rect.top + rect.height / 2;
    const span = document.createElement('span');
    span.className = 'ripple';
    span.style.width = `${diameter}px`;
    span.style.height = `${diameter}px`;
    span.style.left = `${cx - rect.left - diameter / 2}px`;
    span.style.top = `${cy - rect.top - diameter / 2}px`;
    span.addEventListener('animationend', () => span.remove());
    button.appendChild(span);
  }

  /** 是否有图标（icon 插槽检测） */
  private _hasIcon = false;

  /** 是否有文案（默认插槽检测），两者决定纯图标方形态 */
  private _hasText = false;

  render() {
    /*
     * loading 时 spinner 替换 icon 插槽（对齐 antd 行为）；无图标按钮也显示
     * spinner，因此 hidden 条件要放行 loading 态
     */
    const icon = html`<span class="icon" part="icon" ?hidden=${!this._hasIcon && !this.loading}>
      ${
        this.loading
          ? html`<wc-icon class="spinner" name="loader" spin></wc-icon>`
          : html`<slot name="icon" @slotchange=${this._onIconSlotChange}></slot>`
      }
    </span>`;
    const content = html`<span class="content" part="content"
      ><slot @slotchange=${this._onTextSlotChange}></slot
    ></span>`;
    return html`
      <button
        part="base"
        class="button"
        type=${this.htmlType}
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
    this._hasIcon = hasAssignedElements(e.target as HTMLSlotElement);
    this._syncIconOnly();
    this.requestUpdate();
  }

  private _onTextSlotChange(e: Event): void {
    this._hasText = hasVisibleContent(e.target as HTMLSlotElement);
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
