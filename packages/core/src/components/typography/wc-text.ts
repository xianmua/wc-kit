import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { typographyStyles } from './wc-text.styles';

export type wcTextVariant = 'text' | 'heading';
export type wcTextType = 'default' | 'secondary' | 'success' | 'warning' | 'danger';

/**
 * 排版文本。text 为正文；heading 按 level（1~6）渲染对应语义与字号，
 * 输出 role="heading" + aria-level，保持无障碍语义。
 *
 * @slot - 文本内容
 * @csspart base - 文本容器
 */
export class wcText extends LitElement {
  static styles = [baseStyles, typographyStyles];

  /** 变体：正文 / 标题 */
  @property({ reflect: true }) variant: wcTextVariant = 'text';

  /** 标题级别（仅 heading 生效，1~6，默认 3） */
  @property({ type: Number }) level = 3;

  /** 语义色 */
  @property({ reflect: true }) type: wcTextType = 'default';

  /** 禁用态（灰字 + not-allowed） */
  @property({ type: Boolean, reflect: true }) disabled = false;

  private get headingLevel(): number {
    const n = Math.round(this.level);
    return Math.min(6, Math.max(1, Number.isNaN(n) ? 3 : n));
  }

  render() {
    if (this.variant === 'heading') {
      const level = this.headingLevel;
      return html`
        <div class="text heading level-${level}" part="base" role="heading" aria-level=${level}>
          <slot></slot>
        </div>
      `;
    }
    return html`<span class="text" part="base"><slot></slot></span>`;
  }
}

if (!customElements.get('wc-text')) {
  customElements.define('wc-text', wcText);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-text': wcText;
  }
}
