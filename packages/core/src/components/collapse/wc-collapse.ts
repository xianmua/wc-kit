import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import './wc-collapse-item.js';
import { collapseStyles } from './wc-collapse.styles';
import type { wcCollapseItem } from './wc-collapse-item.js';

/**
 * 折叠面板：将一组内容折叠收纳在标题下，点击标题展开/收起，参考 antd Collapse。
 * 子元素必须为 `wc-collapse-item`。
 *
 * @example
 * ```html
 * <wc-collapse accordion>
 *   <wc-collapse-item header="标题一" name="a" open>内容一</wc-collapse-item>
 *   <wc-collapse-item header="标题二" name="b">内容二</wc-collapse-item>
 * </wc-collapse>
 * ```
 *
 * @slot - wc-collapse-item 面板（其他子元素不渲染）
 * @cssprop --wc-collapse-border - 容器边框色（默认 --wc-color-border）
 * @cssprop --wc-collapse-radius - 容器圆角（默认 --wc-radius-medium）
 * @fires wc-change - 任一面板展开/收起后冒泡（事件由 wc-collapse-item 派发，bubbles + composed）
 */
export class wcCollapse extends LitElement {
  static styles = [baseStyles, collapseStyles];

  /** 手风琴模式：同时最多展开一个面板 */
  @property({ type: Boolean, reflect: true }) accordion = false;

  /** 直接子面板（嵌套折叠面板的子项不纳入互斥逻辑） */
  private get items(): wcCollapseItem[] {
    return Array.from(this.querySelectorAll(':scope > wc-collapse-item'));
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('wc-change', this.onItemChange);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('wc-change', this.onItemChange);
  }

  /** 手风琴互斥：仅处理直接子面板发来的展开事件（嵌套面板的冒泡事件被 parentElement 过滤） */
  private onItemChange = (e: Event): void => {
    const item = e.target as wcCollapseItem;
    if (!this.accordion || !item.open || item.parentElement !== this) return;
    for (const it of this.items) {
      if (it !== item && it.open) it.open = false;
    }
  };

  protected override render(): null {
    return null;
  }
}

if (!customElements.get('wc-collapse')) {
  customElements.define('wc-collapse', wcCollapse);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-collapse': wcCollapse;
  }
}
