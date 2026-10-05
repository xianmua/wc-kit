import { html, LitElement, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import './wc-segmented-item.js';
import { segmentedStyles } from './wc-segmented.styles';
import type { wcSegmentedItem } from './wc-segmented-item.js';

export type wcSegmentedSize = 'small' | 'middle' | 'large';

/**
 * 分段控制器：在一组互斥选项中切换单个值，参考 antd Segmented。
 * 子元素必须为 `wc-segmented-item`。
 *
 * @example
 * ```html
 * <wc-segmented value="weekly" @wc-change=${(e) => console.log(e.detail.value)}>
 *   <wc-segmented-item value="daily">日</wc-segmented-item>
 *   <wc-segmented-item value="weekly">周</wc-segmented-item>
 *   <wc-segmented-item value="monthly" disabled>月</wc-segmented-item>
 * </wc-segmented>
 * ```
 *
 * @slot - wc-segmented-item 选项（其他子元素不渲染）
 * @csspart base - 容器根元素
 * @csspart thumb - 滑块
 * @cssprop --wc-segmented-bg - 轨道底色（默认 --wc-color-bg-hover）
 * @cssprop --wc-segmented-thumb-bg - 滑块底色（默认 --wc-color-bg-container）
 * @fires wc-change - 选中值变化后触发，detail: { value }
 */
export class wcSegmented extends LitElement {
  static styles = [baseStyles, segmentedStyles];

  /** 当前选中的值（对应子项的 value；缺省用其文案） */
  @property() value = '';

  /** 尺寸 */
  @property({ reflect: true }) size: wcSegmentedSize = 'middle';

  /** 宽度撑满父容器（子项等分） */
  @property({ type: Boolean, reflect: true }) block = false;

  /** 整体禁用 */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** 直接子选项 */
  private get items(): wcSegmentedItem[] {
    return Array.from(this.querySelectorAll(':scope > wc-segmented-item'));
  }

  /** 取选项值：value 属性优先，否则用文案 */
  private itemValue(item: wcSegmentedItem): string {
    return item.value || item.textContent.trim();
  }

  protected override updated(): void {
    this.syncSelection();
  }

  /** 同步子项选中态 + 滑块位置（以选中项实测几何为准） */
  private syncSelection(): void {
    const base = this.renderRoot.querySelector<HTMLElement>('.segmented')!;
    const thumb = this.renderRoot.querySelector<HTMLElement>('.thumb')!;
    const items = this.items;
    let selected: wcSegmentedItem | undefined;
    for (const item of items) {
      const isSelected = this.itemValue(item) === this.value;
      if (item.selected !== isSelected) {
        item.selected = isSelected;
        item.requestUpdate();
      }
      if (isSelected) selected = item;
    }
    if (!selected) {
      thumb.removeAttribute('data-ready');
      return;
    }
    const baseRect = base.getBoundingClientRect();
    const rect = selected.getBoundingClientRect();
    // 首次定位不参与过渡（避免滑块从 0 飞入）
    thumb.style.left = `${rect.left - baseRect.left}px`;
    thumb.style.width = `${rect.width}px`;
    thumb.setAttribute('data-ready', '');
  }

  private onSelect(target: EventTarget | null): void {
    if (this.disabled) return;
    // composed click 越过 item shadow 边界后 target 已重定向为 item 宿主
    const item = target as wcSegmentedItem | null;
    if (!item || item.parentElement !== this) return;
    if (item.disabled) return;
    const value = this.itemValue(item);
    if (value === this.value) return;
    this.value = value;
    this.dispatchEvent(
      new CustomEvent('wc-change', { detail: { value }, bubbles: true, composed: true }),
    );
  }

  /** block 模式下容器尺寸变化时滑块跟随（子项等分宽度会随容器改变） */
  private ro: ResizeObserver | null = null;

  protected override firstUpdated(): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.ro = new ResizeObserver(() => this.syncSelection());
      this.ro.observe(this.renderRoot.querySelector<HTMLElement>('.segmented')!);
    }
  }

  protected override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.ro?.disconnect();
    this.ro = null;
  }

  /** 方向键在启用选项间移动选中（radio 惯例） */
  private onKeydown(e: KeyboardEvent): void {
    const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (!keys.includes(e.key) || this.disabled) return;
    const enabled = this.items.filter((it) => !it.disabled);
    if (enabled.length === 0) return;
    const current = enabled.findIndex((it) => this.itemValue(it) === this.value);
    const forward = e.key === 'ArrowRight' || e.key === 'ArrowDown';
    const next = enabled[(current + (forward ? 1 : -1) + enabled.length) % enabled.length];
    e.preventDefault();
    this.value = this.itemValue(next);
    this.dispatchEvent(
      new CustomEvent('wc-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
    next.shadowRoot?.querySelector('button')?.focus();
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class="segmented"
        part="base"
        role="radiogroup"
        @click=${(e: Event) => this.onSelect(e.target)}
        @keydown=${(e: KeyboardEvent) => this.onKeydown(e)}
      >
        <div class="thumb" part="thumb"></div>
        <slot @slotchange=${() => this.requestUpdate()}></slot>
        ${nothing}
      </div>
    `;
  }
}

if (!customElements.get('wc-segmented')) {
  customElements.define('wc-segmented', wcSegmented);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-segmented': wcSegmented;
  }
}
