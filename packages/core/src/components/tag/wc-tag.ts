import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { LocalizeController } from '../../i18n/localize-controller';
import '../icon/wc-icon.js';
import { tagStyles } from './wc-tag.styles';

export type wcTagTheme = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type wcTagSize = 'small' | 'medium' | 'large';
export type wcTagVariant = 'dark' | 'light' | 'outline';

/**
 * 标签。closable 时展示关闭按钮，点击派发 wc-close（是否移除由使用方控制）。
 *
 * @slot - 标签内容
 * @slot icon - 前置图标
 * @csspart base - 标签主体
 * @csspart close-button - 关闭按钮
 * @fires wc-close - 点击关闭按钮后触发
 */
export class wcTag extends LitElement {
  static styles = [baseStyles, tagStyles];

  /** 语义色 */
  @property({ reflect: true }) theme: wcTagTheme = 'default';

  /** 尺寸 */
  @property({ reflect: true }) size: wcTagSize = 'medium';

  /** 填充风格：dark 实底 / light 浅底 / outline 描边 */
  @property({ reflect: true }) variant: wcTagVariant = 'light';

  /** 可关闭 */
  @property({ type: Boolean, reflect: true }) closable = false;

  /** 禁用 */
  @property({ type: Boolean, reflect: true }) disabled = false;

  private localize = new LocalizeController(this);

  private handleClose(e: MouseEvent): void {
    e.stopPropagation();
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('wc-close', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <span class="tag" part="base">
        <slot name="icon" class="icon"><span class="icon-placeholder"></span></slot>
        <slot></slot>
        ${
          this.closable
            ? html`
                <button
                  type="button"
                  class="close"
                  part="close-button"
                  tabindex="-1"
                  ?disabled=${this.disabled}
                  aria-label=${this.localize.term('tag.close')}
                  @click=${this.handleClose}
                >
                  <wc-icon name="close"></wc-icon>
                </button>
              `
            : ''
        }
      </span>
    `;
  }
}

if (!customElements.get('wc-tag')) {
  customElements.define('wc-tag', wcTag);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-tag': wcTag;
  }
}
