import { html, LitElement, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import '../empty/wc-empty.js';
import { listStyles } from './wc-list.styles';

export type wcListSize = 'small' | 'medium' | 'large';

/**
 * 列表。子条目用 light-DOM 的 <wc-list-item> 声明，容器通过 ::slotted
 * 提供分隔线 / 斑马纹 / 悬浮反馈；无条目时回退渲染 empty 插槽（默认
 * <wc-empty>）。
 *
 * @example
 * ```html
 * <wc-list striped hoverable>
 *   <wc-list-item>条目一</wc-list-item>
 *   <wc-list-item>条目二</wc-list-item>
 * </wc-list>
 * ```
 *
 * @slot - 列表条目（wc-list-item）
 * @slot empty - 空状态（默认渲染 wc-empty）
 * @csspart base - 列表容器
 * @csspart empty - 空状态区
 * @cssprop --wc-list-radius - 列表圆角（默认 --wc-radius-medium）
 */
export class wcList extends LitElement {
  static styles = [baseStyles, listStyles];

  /** 条目密度 */
  @property({ reflect: true }) size: wcListSize = 'medium';

  /** 斑马纹 */
  @property({ type: Boolean, reflect: true }) striped = false;

  /** 条目悬浮高亮 */
  @property({ type: Boolean, reflect: true }) hoverable = false;

  @state() private itemCount = 0;

  private onSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    // 只统计默认插槽；empty 具名插槽的变化不影响条目计数
    if (slot.name !== '') return;
    this.itemCount = slot.assignedElements().length;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    // 首渲染前的种子状态（slotchange 只在已渲染的 slot 上触发）
    this.itemCount = this.querySelectorAll('wc-list-item').length;
  }

  protected override render(): TemplateResult {
    // 两个分支恒渲染（hidden 切换），保证 slot 元素始终存在、slotchange 可触发
    return html`
      <ul class="list" part="base" role="list" ?hidden=${this.itemCount === 0}>
        <slot @slotchange=${this.onSlotChange}></slot>
      </ul>
      <div class="empty" part="empty" ?hidden=${this.itemCount > 0}>
        <slot name="empty" @slotchange=${this.onSlotChange}><wc-empty></wc-empty></slot>
      </div>
    `;
  }
}

if (!customElements.get('wc-list')) {
  customElements.define('wc-list', wcList);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-list': wcList;
  }
}
