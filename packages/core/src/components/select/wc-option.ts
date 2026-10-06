import { html, LitElement, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { optionStyles } from './wc-option.styles';

/**
 * 选项，必须作为 wc-select 的子元素使用。
 *
 * @slot - 选项文本
 * @csspart base - 选项根元素
 */
export class wcOption extends LitElement {
  static styles = [optionStyles];

  /** 选项值 */
  @property({ reflect: true }) value = '';

  /** 禁用 */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** 选中态（内部状态，由 wc-select 管理） */
  @state() selected = false;

  /** 键盘导航高亮态（内部状态，由 wc-select 管理） */
  @state() active = false;

  /** 选项文本 */
  get label(): string {
    return (this.textContent ?? '').trim();
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('selected') || changed.has('active')) {
      this.classList.toggle('selected', this.selected);
      this.classList.toggle('active', this.active);
    }
  }

  render() {
    return html`
      <div class="option" part="base" role="option" aria-selected=${this.selected}>
        <span class="text"><slot></slot></span>
        <svg class="check" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8.5L6.5 12L13 4.5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    `;
  }
}

if (!customElements.get('wc-option')) {
  customElements.define('wc-option', wcOption);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-option': wcOption;
  }
}
