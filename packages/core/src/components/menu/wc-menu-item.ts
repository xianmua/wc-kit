import { html, LitElement, nothing, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { menuItemStyles } from './wc-menu-item.styles';
import '../icon/wc-icon.js';

/**
 * 菜单项，作为 wc-menu（或 wc-sub-menu）的子元素使用。
 * 选中态由 wc-menu 统一管理（按 value 匹配，单选）。
 *
 * @slot - 菜单项文本
 * @csspart base - 菜单项根元素
 * @cssprop --wc-menu-item-height - 条目高度（默认 40px）
 * @cssprop --wc-menu-item-radius - 条目圆角（默认 --wc-radius-small）
 */
export class wcMenuItem extends LitElement {
  static styles = [menuItemStyles];

  /** 菜单项值（随 wc-select 事件的 detail.value 抛出，选中匹配依据） */
  @property({ reflect: true }) value = '';

  /** 禁用 */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** 危险操作（红色文字） */
  @property({ type: Boolean, reflect: true }) danger = false;

  /** 前置图标（内置图标名） */
  @property() icon = '';

  /** 选中态（内部状态，由 wc-menu 同步，勿手工维护） */
  @state() selected = false;

  /** 所处菜单是否为水平模式（内部状态，由 wc-menu 同步） */
  @state() menuHorizontal = false;

  /** 菜单项文本 */
  get label(): string {
    return (this.textContent ?? '').trim();
  }

  /** 供 wc-menu 键盘导航聚焦内部条目 */
  focusFromMenu(): void {
    this.renderRoot.querySelector<HTMLElement>('.item')?.focus();
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('menuHorizontal')) {
      this.classList.toggle('horizontal', this.menuHorizontal);
    }
  }

  render() {
    return html`
      <div
        class="item ${this.selected ? 'selected' : ''} ${this.disabled ? 'disabled' : ''}"
        part="base"
        role="menuitem"
        tabindex=${this.disabled ? -1 : 0}
        aria-disabled=${this.disabled}
        aria-selected=${this.selected}
        aria-label=${this.label}
      >
        ${this.icon ? html`<wc-icon class="ico" name=${this.icon}></wc-icon>` : nothing}
        <span class="label"><slot></slot></span>
      </div>
    `;
  }
}

if (!customElements.get('wc-menu-item')) {
  customElements.define('wc-menu-item', wcMenuItem);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-menu-item': wcMenuItem;
  }
}
