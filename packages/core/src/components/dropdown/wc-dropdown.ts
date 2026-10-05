import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { positionPanel, type WcPlacement } from '../../common/position';
import { OutsideClickController } from '../../common/outside-click';
import './wc-dropdown-item.js';
import { dropdownStyles } from './wc-dropdown.styles';
import type { wcDropdownItem } from './wc-dropdown-item.js';

let dropdownUid = 0;

/**
 * 下拉菜单：点击触发元素弹出菜单面板（fixed 定位，空间不足自动翻转）。
 * 触发元素放 `slot="trigger"`，菜单项用 `wc-dropdown-item` 作为默认子元素；
 * 支持键盘导航（↑↓ 移动高亮、Enter 选中、Esc 关闭）与点击外部关闭。
 *
 * @slot trigger - 触发元素
 * @slot - 菜单项（wc-dropdown-item）
 * @csspart trigger - 触发区
 * @csspart base - 菜单面板
 * @fires wc-open - 菜单展开
 * @fires wc-close - 菜单关闭，detail.reason: 'outside' | 'escape' | 'select' | 'toggle'
 * @fires wc-select - 选中菜单项，detail.value / detail.label（之后自动关闭）
 * @cssprop --wc-dropdown-min-width - 面板最小宽度（默认 120px）
 * @cssprop --wc-dropdown-max-height - 面板最大高度（默认 280px）
 */
export class wcDropdown extends LitElement {
  static styles = [baseStyles, dropdownStyles];

  /** 期望弹出方向（空间不足自动翻转） */
  @property() placement: WcPlacement = 'bottom-start';

  /** 当前是否打开 */
  @property({ type: Boolean, reflect: true }) open = false;

  /** 禁用（触发器不响应点击/键盘） */
  @property({ type: Boolean, reflect: true }) disabled = false;

  private panelId = `wc-dropdown-panel-${++dropdownUid}`;

  private itemUid = `wc-dropdown-item-${++dropdownUid}`;

  private activeIndex = -1;

  private assignedItems: wcDropdownItem[] = [];

  constructor() {
    super();
    this.addEventListener('keydown', this.handleKeydown);
  }

  /** 面板中的可用菜单项列表 */
  private get enabledItems(): wcDropdownItem[] {
    return this.assignedItems.filter((o) => !o.disabled && !o.divider);
  }

  /* ---------- 开合 ---------- */

  /** 打开菜单 */
  show(): void {
    if (this.disabled || this.open) return;
    this.open = true;
    this.activeIndex = this.enabledItems.length ? 0 : -1;
    this.syncActive();
    this.dispatchEvent(new CustomEvent('wc-open', { bubbles: true, composed: true }));
  }

  /** 关闭菜单（不派发事件） */
  hide(): void {
    if (!this.open) return;
    this.open = false;
    this.activeIndex = -1;
    this.syncActive();
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    // updated 时面板已渲染，可直接测量定位
    if (changed.has('open') && this.open) this.position();
  }

  /** 计算并应用 fixed 定位（同 Popconfirm，无箭头） */
  private position(): void {
    positionPanel(this, this.shadowRoot!.querySelector<HTMLElement>('.panel'), this.placement);
  }

  /** 切换开合 */
  toggle(): void {
    if (this.open) {
      this.hide();
      this.emitClose('toggle');
    } else {
      this.show();
    }
  }

  private emitClose(reason: 'outside' | 'escape' | 'select' | 'toggle'): void {
    this.dispatchEvent(
      new CustomEvent('wc-close', { detail: { reason }, bubbles: true, composed: true }),
    );
  }

  private outsideClick = new OutsideClickController(this, () => {
    const wasOpen = this.open;
    this.hide();
    if (wasOpen) this.emitClose('outside');
  });

  /* ---------- 菜单项 ---------- */

  private onSlotChange(e: Event): void {
    // flatten: 菜单项可能来自嵌套 slot 链（如 wc-split-button 的透传 slot）
    this.assignedItems = (e.target as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter((el): el is wcDropdownItem => el.tagName === 'WC-DROPDOWN-ITEM');
    // 为键盘导航分配 id（aria-activedescendant 使用）
    this.assignedItems.forEach((o, i) => o.setAttribute('id', `${this.itemUid}-${i}`));
    this.syncActive();
    this.requestUpdate();
  }

  private syncActive(): void {
    for (const o of this.assignedItems) {
      o.active = false;
    }
    const active = this.enabledItems[this.activeIndex];
    if (active) active.active = true;
    if (active && typeof active.scrollIntoView === 'function') {
      // jsdom 未实现 scrollIntoView
      active.scrollIntoView({ block: 'nearest' });
    }
  }

  private onPanelClick(e: Event): void {
    const target = e.target as Element;
    const item = target.closest?.('wc-dropdown-item') as wcDropdownItem | null;
    if (item && !item.disabled && !item.divider) {
      this.selectItem(item);
    }
  }

  private selectItem(item: wcDropdownItem): void {
    this.hide();
    this.dispatchEvent(
      new CustomEvent('wc-select', {
        detail: { value: item.value, label: item.label },
        bubbles: true,
        composed: true,
      }),
    );
    this.emitClose('select');
  }

  private onTriggerClick(e: Event): void {
    // 防止触发元素的点击冒泡到 document 立即又关闭
    e.stopPropagation();
    if (this.disabled) return;
    this.toggle();
  }

  /* ---------- 键盘导航（模式同 wc-select） ---------- */

  private handleKeydown = (e: KeyboardEvent): void => {
    if (this.disabled) return;
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (this.open && this.activeIndex >= 0) {
          const item = this.enabledItems[this.activeIndex];
          if (item) this.selectItem(item);
        } else {
          this.show();
        }
        break;
      case 'Escape':
        if (this.open) {
          e.preventDefault();
          this.hide();
          this.emitClose('escape');
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!this.open) {
          this.show();
        } else if (this.enabledItems.length) {
          this.activeIndex = (this.activeIndex + 1) % this.enabledItems.length;
          this.syncActive();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!this.open) {
          this.show();
        } else if (this.enabledItems.length) {
          const n = this.enabledItems.length;
          this.activeIndex = (this.activeIndex - 1 + n) % n;
          this.syncActive();
        }
        break;
      case 'Home':
        if (this.open && this.enabledItems.length) {
          e.preventDefault();
          this.activeIndex = 0;
          this.syncActive();
        }
        break;
      case 'End':
        if (this.open && this.enabledItems.length) {
          e.preventDefault();
          this.activeIndex = this.enabledItems.length - 1;
          this.syncActive();
        }
        break;
      case 'Tab': {
        const wasOpen = this.open;
        this.hide();
        if (wasOpen) this.emitClose('escape');
        break;
      }
    }
  };

  render() {
    const activeItem = this.activeIndex >= 0 ? this.enabledItems[this.activeIndex] : undefined;
    const activeId = activeItem ? `${this.itemUid}-${this.assignedItems.indexOf(activeItem)}` : '';
    return html`
      <span
        class="trigger"
        part="trigger"
        tabindex=${this.disabled ? -1 : 0}
        role="button"
        aria-haspopup="menu"
        aria-expanded=${this.open}
        aria-disabled=${this.disabled}
        aria-controls=${this.open ? this.panelId : undefined}
        aria-activedescendant=${this.open && activeId ? activeId : undefined}
        @click=${this.onTriggerClick}
      >
        <slot name="trigger"></slot>
      </span>
      <div
        class="panel"
        part="base"
        id=${this.panelId}
        role="menu"
        ?data-open=${this.open}
        @click=${this.onPanelClick}
      >
        <slot @slotchange=${this.onSlotChange}></slot>
        ${this.assignedItems.length === 0 ? html`<div class="empty">暂无数据</div>` : ''}
      </div>
    `;
  }
}

if (!customElements.get('wc-dropdown')) {
  customElements.define('wc-dropdown', wcDropdown);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-dropdown': wcDropdown;
  }
}
