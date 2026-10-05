import { html, LitElement, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { segmentedItemStyles } from './wc-segmented.styles';

/**
 * 分段控制器的选项，必须作为 `wc-segmented` 的子元素使用。
 *
 * @example
 * ```html
 * <wc-segmented value="weekly">
 *   <wc-segmented-item value="daily">日</wc-segmented-item>
 *   <wc-segmented-item value="weekly">周</wc-segmented-item>
 * </wc-segmented>
 * ```
 *
 * @slot - 选项文案（可含 wc-icon 等任意内容）
 * @csspart item - 选项按钮
 */
export class wcSegmentedItem extends LitElement {
  static styles = [baseStyles, segmentedItemStyles];

  /** 选项值（选中时随 wc-change 的 detail.value 抛出；缺省用文案） */
  @property() value = '';

  /** 禁用选项 */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** 是否选中（由 wc-segmented 同步，勿手动设置） */
  selected = false;

  protected override render(): TemplateResult {
    return html`
      <button
        type="button"
        class="item"
        part="item"
        role="radio"
        aria-checked=${this.selected}
        ?disabled=${this.disabled}
        tabindex=${this.selected ? 0 : -1}
      >
        <slot></slot>
      </button>
    `;
  }
}

if (!customElements.get('wc-segmented-item')) {
  customElements.define('wc-segmented-item', wcSegmentedItem);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-segmented-item': wcSegmentedItem;
  }
}
