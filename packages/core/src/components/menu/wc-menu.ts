import { html, LitElement, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import './wc-menu-item.js';
import './wc-sub-menu.js';
import { menuStyles } from './wc-menu.styles';
import type { wcMenuItem } from './wc-menu-item.js';
import type { wcSubMenu } from './wc-sub-menu.js';

export type wcMenuMode = 'vertical' | 'horizontal';

/**
 * 导航菜单：垂直（默认）/ 水平两种模式，支持图标、单选高亮、禁用、危险项与
 * 子菜单（垂直内联展开、水平弹出层）。参考 antd Menu。
 *
 * @slot - wc-menu-item / wc-sub-menu
 * @csspart base - 菜单容器
 * @fires wc-select - 选中菜单项，detail.value / detail.label
 * @cssprop --wc-menu-radius - 菜单容器圆角（默认 --wc-radius-medium）
 * @cssprop --wc-menu-item-height - 条目高度（默认 40px，透传给菜单项）
 */
export class wcMenu extends LitElement {
  static styles = [menuStyles];

  /** 布局模式：垂直堆叠 / 水平排列（水平时子菜单弹出展示） */
  @property({ reflect: true }) mode: wcMenuMode = 'vertical';

  /** 当前选中项的 value（单选） */
  @property({ reflect: true }) selected = '';

  /** 显示边框（默认无边框仅容器底色） */
  @property({ type: Boolean, reflect: true }) bordered = false;

  private get horizontal(): boolean {
    return this.mode === 'horizontal';
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    if (changed.has('mode')) this.syncEntries();
    if (changed.has('selected')) this.syncSelected();
  }

  /* ---------- 子条目收集与状态同步 ---------- */

  private onSlotChange(): void {
    this.syncEntries();
    this.syncSelected();
  }

  private get entries(): Array<wcMenuItem | wcSubMenu> {
    return Array.from(
      this.querySelectorAll(':scope > wc-menu-item, :scope > wc-sub-menu'),
    ) as Array<wcMenuItem | wcSubMenu>;
  }

  private get items(): wcMenuItem[] {
    return Array.from(this.querySelectorAll('wc-menu-item')) as wcMenuItem[];
  }

  /** 模式下发（条目按此切换选中指示条方向 / 子菜单展开形态） */
  private syncEntries(): void {
    for (const entry of this.entries) {
      entry.menuHorizontal = this.horizontal;
    }
  }

  private syncSelected(): void {
    for (const item of this.items) {
      item.selected = item.value === this.selected;
    }
  }

  private onSelectClick(e: Event): void {
    const path = e.composedPath() as Element[];
    const item = path.find((el) => el instanceof HTMLElement && el.localName === 'wc-menu-item');
    if (!item || (item as wcMenuItem).disabled) return;
    this.select(item as wcMenuItem);
  }

  private select(item: wcMenuItem): void {
    this.selected = item.value;
    this.syncSelected();
    this.dispatchEvent(
      new CustomEvent('wc-select', {
        detail: { value: item.value, label: item.label },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /* ---------- 键盘导航（方向键在条目间移动焦点） ---------- */

  private onKeydown(e: KeyboardEvent): void {
    const forward = this.horizontal ? 'ArrowRight' : 'ArrowDown';
    const back = this.horizontal ? 'ArrowLeft' : 'ArrowUp';
    if (e.key !== forward && e.key !== back && e.key !== 'Home' && e.key !== 'End') return;
    const entries = this.entries.filter((o) => !o.disabled);
    if (!entries.length) return;
    e.preventDefault();
    const current = entries.findIndex((o) =>
      (e.composedPath() as Node[]).some((n) => n === o || o.contains(n)),
    );
    const next =
      e.key === 'Home'
        ? 0
        : e.key === 'End'
          ? entries.length - 1
          : (current + (e.key === forward ? 1 : -1) + entries.length) % entries.length;
    entries[next]?.focusFromMenu();
  }

  protected override render(): TemplateResult {
    return html`
      <nav
        class="menu"
        part="base"
        role="menu"
        @click=${this.onSelectClick}
        @keydown=${this.onKeydown}
      >
        <slot @slotchange=${this.onSlotChange}></slot>
      </nav>
    `;
  }
}

if (!customElements.get('wc-menu')) {
  customElements.define('wc-menu', wcMenu);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-menu': wcMenu;
  }
}
