import { html, LitElement, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { LocalizeController } from '../../i18n/localize-controller';
import '../icon/wc-icon.js';
import { paginationStyles } from './wc-pagination.styles';

type PageItem = number | 'ellipsis-prev' | 'ellipsis-next';

/**
 * 分页。由 total / page-size 推导总页数，页码过多时按 folded-page-count 折叠
 * 为「1 … 中间窗 … 末页」。页码切换派发 wc-change（detail: { current, previous }），
 * total/page-size 变化导致越界时静默夹紧 current（不派发事件）。
 *
 * @example
 * ```html
 * <wc-pagination total="200" current="1" show-total show-jumper></wc-pagination>
 * ```
 *
 * @csspart nav - 导航容器
 * @csspart total - 总条数
 * @csspart prev / next - 前后翻页按钮
 * @csspart page - 页码按钮
 * @csspart ellipsis - 省略号
 * @csspart jumper - 跳页区
 * @csspart jumper-input - 跳页输入框
 * @fires wc-change - 页码变化后触发（含用户点击与跳页输入）
 */
export class wcPagination extends LitElement {
  static styles = [baseStyles, paginationStyles];

  /** 数据总条数 */
  @property({ type: Number }) total = 0;

  /** 每页条数 */
  @property({ type: Number, attribute: 'page-size' }) pageSize = 10;

  /** 当前页（1 开始） */
  @property({ type: Number, reflect: true }) current = 1;

  /** 折叠时中间窗口显示的页码数量 */
  @property({ type: Number, attribute: 'folded-page-count' }) foldedPageCount = 5;

  /** 显示总条数 */
  @property({ type: Boolean, attribute: 'show-total' }) showTotal = false;

  /** 显示跳页输入框（Enter 跳转，自动夹紧到有效范围） */
  @property({ type: Boolean, attribute: 'show-jumper' }) showJumper = false;

  /** 整体禁用 */
  @property({ type: Boolean, reflect: true }) disabled = false;

  private localize = new LocalizeController(this);

  /** 总页数 */
  get pageCount(): number {
    return Math.max(1, Math.ceil(this.total / Math.max(1, this.pageSize)));
  }

  private select(page: number): void {
    const clamped = Math.min(this.pageCount, Math.max(1, Math.floor(page)));
    if (this.disabled || clamped === this.current) return;
    const previous = this.current;
    this.current = clamped;
    this.dispatchEvent(
      new CustomEvent('wc-change', {
        detail: { current: clamped, previous },
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    // total/page-size 变化后当前页可能越界，静默夹紧（不派发事件）
    if ((changed.has('total') || changed.has('pageSize')) && this.current > this.pageCount) {
      this.current = this.pageCount;
    }
  }

  /** 页码序列：1 … 中间窗口 … 末页，空间充足时全部展开 */
  private getPageItems(): PageItem[] {
    const pageCount = this.pageCount;
    const folded = Math.max(1, this.foldedPageCount);
    if (pageCount <= folded + 2) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }
    let start = Math.max(2, this.current - Math.floor(folded / 2));
    const end = Math.min(pageCount - 1, start + folded - 1);
    start = Math.max(2, end - folded + 1);
    const items: PageItem[] = [1];
    if (start > 2) items.push('ellipsis-prev');
    for (let i = start; i <= end; i++) items.push(i);
    if (end < pageCount - 1) items.push('ellipsis-next');
    items.push(pageCount);
    return items;
  }

  private onJumperKeydown(e: KeyboardEvent): void {
    if (e.key !== 'Enter') return;
    const input = e.target as HTMLInputElement;
    const page = Number.parseInt(input.value, 10);
    if (Number.isNaN(page)) return;
    this.select(page);
    input.value = String(this.current);
  }

  protected override render(): TemplateResult {
    const prevDisabled = this.disabled || this.current <= 1;
    const nextDisabled = this.disabled || this.current >= this.pageCount;
    return html`
      <nav class="pagination" part="nav" aria-label=${this.localize.term('pagination.label')}>
        ${
          this.showTotal
            ? html`<span class="total" part="total">
                ${this.localize.term('pagination.total', { total: this.total })}
              </span>`
            : nothing
        }
        <button
          type="button"
          class="page-button"
          part="prev"
          ?disabled=${prevDisabled}
          aria-label=${this.localize.term('pagination.prev')}
          @click=${() => this.select(this.current - 1)}
        >
          <wc-icon name="chevron-left"></wc-icon>
        </button>
        ${this.getPageItems().map((item) =>
          typeof item !== 'number'
            ? html`<span class="ellipsis" part="ellipsis" aria-hidden="true">•••</span>`
            : html`<button
                type="button"
                class="page-button"
                part="page"
                ?disabled=${this.disabled}
                aria-label=${this.localize.term('pagination.page', { page: item })}
                aria-current=${item === this.current ? 'page' : nothing}
                @click=${() => this.select(item)}
              >
                ${item}
              </button>`,
        )}
        <button
          type="button"
          class="page-button"
          part="next"
          ?disabled=${nextDisabled}
          aria-label=${this.localize.term('pagination.next')}
          @click=${() => this.select(this.current + 1)}
        >
          <wc-icon name="chevron-right"></wc-icon>
        </button>
        ${
          this.showJumper
            ? html`<span class="jumper" part="jumper">
                ${this.localize.term('pagination.jumpTo')}
                <input
                  type="text"
                  class="jumper-input"
                  part="jumper-input"
                  ?disabled=${this.disabled}
                  aria-label=${this.localize.term('pagination.jumpTo')}
                  @keydown=${this.onJumperKeydown}
                />
                ${this.localize.term('pagination.pageUnit')}
              </span>`
            : nothing
        }
      </nav>
    `;
  }
}

if (!customElements.get('wc-pagination')) {
  customElements.define('wc-pagination', wcPagination);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-pagination': wcPagination;
  }
}
