import { html, LitElement, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { dropdownItemStyles } from './wc-dropdown-item.styles';

/**
 * 下拉菜单项，必须作为 wc-dropdown 的子元素使用。
 * `divider` 属性渲染为分隔线（忽略内容与 danger/disabled）。
 *
 * @slot - 菜单项文本
 * @csspart base - 菜单项根元素
 */
export class wcDropdownItem extends LitElement {
  static styles = [dropdownItemStyles];

  /** 菜单项值（随 wc-select 事件的 detail.value 抛出） */
  @property({ reflect: true }) value = '';

  /** 禁用 */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** 危险操作（红色文字） */
  @property({ type: Boolean, reflect: true }) danger = false;

  /** 渲染为分隔线 */
  @property({ type: Boolean, reflect: true }) divider = false;

  /** 键盘导航高亮态（内部状态，由 wc-dropdown 管理） */
  @state() active = false;

  /** 菜单项文本 */
  get label(): string {
    return (this.textContent ?? '').trim();
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('active')) {
      this.classList.toggle('active', this.active);
    }
  }

  render() {
    if (this.divider) {
      return html`<div class="item" part="base" role="separator"></div>`;
    }
    return html`
      <div
        class="item"
        part="base"
        role="menuitem"
        aria-disabled=${this.disabled}
        aria-label=${this.label}
      >
        <span class="text"><slot></slot></span>
      </div>
    `;
  }
}

if (!customElements.get('wc-dropdown-item')) {
  customElements.define('wc-dropdown-item', wcDropdownItem);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-dropdown-item': wcDropdownItem;
  }
}
