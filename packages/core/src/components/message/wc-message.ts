import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { LocalizeController } from '../../i18n/localize-controller';
import '../icon/wc-icon.js';
import { messageStyles } from './wc-message.styles';

export type wcMessageTheme = 'info' | 'success' | 'warning' | 'error' | 'loading';

/** 主题 → 内置图标 */
const THEME_ICONS: Record<wcMessageTheme, string> = {
  info: 'info',
  success: 'check',
  warning: 'warning',
  error: 'error',
  loading: 'loader',
};

/**
 * 全局提示（单条）。常规用法是命令式 API `message.success('...')`，
 * 也可以声明式书写（content 属性或默认插槽，duration 控制自动关闭）。
 * 关闭时派发 wc-close 并将自身从 DOM 移除。
 *
 * @slot - 提示内容（覆盖 content 属性）
 * @slot icon - 覆盖主题图标
 * @csspart base - 提示条
 * @csspart icon - 主题图标
 * @csspart content - 内容
 * @csspart close-button - 关闭按钮
 * @fires wc-close - 关闭时触发（之后组件从 DOM 移除）
 */
export class wcMessage extends LitElement {
  static styles = [baseStyles, messageStyles];

  /** 提示类型 */
  @property({ reflect: true }) theme: wcMessageTheme = 'info';

  /** 提示内容 */
  @property() content = '';

  /** 自动关闭时长（ms），0 表示不自动关闭 */
  @property({ type: Number }) duration = 3000;

  /** 显示关闭按钮 */
  @property({ type: Boolean, reflect: true }) closable = false;

  private localize = new LocalizeController(this);

  private autoCloseTimer: ReturnType<typeof setTimeout> | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this.startAutoClose();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopAutoClose();
  }

  private startAutoClose(): void {
    if (this.duration <= 0 || this.autoCloseTimer !== null) return;
    this.autoCloseTimer = setTimeout(() => this.close(), this.duration);
  }

  private stopAutoClose(): void {
    if (this.autoCloseTimer !== null) {
      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = null;
    }
  }

  /** 关闭：派发 wc-close 并从 DOM 移除自身 */
  close(): void {
    this.stopAutoClose();
    this.dispatchEvent(new CustomEvent('wc-close', { bubbles: true, composed: true }));
    this.remove();
  }

  render() {
    const icon = THEME_ICONS[this.theme] ?? 'info';
    return html`
      <div class="message" part="base" role="status" aria-live="polite">
        <wc-icon
          class="icon ${this.theme}"
          part="icon"
          name=${icon}
          ?spin=${this.theme === 'loading'}
        ></wc-icon>
        <div class="content" part="content"><slot>${this.content}</slot></div>
        ${
          this.closable
            ? html`
                <button
                  type="button"
                  class="close"
                  part="close-button"
                  aria-label=${this.localize.term('message.close')}
                  @click=${() => this.close()}
                >
                  <wc-icon name="close"></wc-icon>
                </button>
              `
            : ''
        }
      </div>
    `;
  }
}

if (!customElements.get('wc-message')) {
  customElements.define('wc-message', wcMessage);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-message': wcMessage;
  }
}
