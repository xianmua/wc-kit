import { html, LitElement, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { LocalizeController } from '../../i18n/localize-controller';
import '../icon/wc-icon.js';
import { alertStyles } from './wc-alert.styles';

export type wcAlertTheme = 'info' | 'success' | 'warning' | 'danger';

const THEME_ICONS: Record<wcAlertTheme, string> = {
  info: 'info',
  success: 'check-circle',
  warning: 'warning',
  danger: 'error',
};

/**
 * 警告提示。展示需要用户关注的信息，左侧语义色圆头竖条 + 浅色底。
 * closable 时展示关闭按钮，点击后组件自身隐藏并派发 wc-close
 * （重新打开 = 移除 closed 属性 / 置回 false）。
 *
 * @example
 * ```html
 * <wc-alert heading="提示" show-icon>这是一条提示信息</wc-alert>
 * <wc-alert theme="warning" closable>注意：操作不可撤销</wc-alert>
 * ```
 *
 * @slot - 正文内容
 * @slot icon - 自定义前置图标（需配合 show-icon 或始终显示）
 * @csspart base - 警告提示主体
 * @csspart title - 标题
 * @csspart content - 正文
 * @csspart icon - 前置图标
 * @csspart close-button - 关闭按钮
 * @fires wc-close - 点击关闭按钮、组件隐藏后触发
 * @cssprop --wc-alert-radius - 圆角（默认 --wc-radius-medium）
 */
export class wcAlert extends LitElement {
  static styles = [baseStyles, alertStyles];

  /** 语义色 */
  @property({ reflect: true }) theme: wcAlertTheme = 'info';

  /** 标题（正文为默认 slot） */
  @property() heading = '';

  /** 可关闭：展示右上角关闭按钮 */
  @property({ type: Boolean, reflect: true }) closable = false;

  /** 展示前置图标（默认按语义色自动匹配） */
  @property({ type: Boolean, reflect: true, attribute: 'show-icon' }) showIcon = false;

  /** 已关闭（关闭按钮置 true；移除属性可重新显示） */
  @property({ type: Boolean, reflect: true }) closed = false;

  private localize = new LocalizeController(this);

  private handleClose(): void {
    this.closed = true;
    this.dispatchEvent(new CustomEvent('wc-close', { bubbles: true, composed: true }));
  }

  protected override render(): TemplateResult {
    if (this.closed) return html``;
    return html`
      <div class="alert" part="base" role="alert">
        <span class="indicator" aria-hidden="true"></span>
        ${
          this.showIcon
            ? html`
                <slot name="icon" class="icon" part="icon">
                  <wc-icon name=${THEME_ICONS[this.theme]}></wc-icon>
                </slot>
              `
            : nothing
        }
        <div class="body">
          ${this.heading ? html`<div class="title" part="title">${this.heading}</div>` : nothing}
          <div class="content" part="content"><slot></slot></div>
        </div>
        ${
          this.closable
            ? html`
                <button
                  type="button"
                  class="close"
                  part="close-button"
                  tabindex="-1"
                  aria-label=${this.localize.term('alert.close')}
                  @click=${this.handleClose}
                >
                  <wc-icon name="close"></wc-icon>
                </button>
              `
            : nothing
        }
      </div>
    `;
  }
}

if (!customElements.get('wc-alert')) {
  customElements.define('wc-alert', wcAlert);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-alert': wcAlert;
  }
}
