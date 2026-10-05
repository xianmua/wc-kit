import { html, LitElement, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import '../pagination/wc-pagination.js';
import { sortRows } from './sort-rows.js';
import { tablePagerStyles } from './wc-table-pager.styles.js';
import './wc-table.js';
import type { wcSortOrder, wcTableColumn, wcTableRow, wcTableSize } from './wc-table.js';

/**
 * 表格分页（复合组件）：wc-table + wc-pagination 的开箱即用组合，
 * 客户端分页——传入全量 data，内部「先排序、后按页切片」展示。
 *
 * 与手工组合 `<wc-table>` + `<wc-pagination>` 相比，本组件解决了两件事：
 * 1. 排序作用于全量数据而非当前页（点击列头后全量排序再切片）；
 * 2. 翻页 / 改每页条数 / 数据增减时的页码夹紧与切片联动。
 *
 * 内部组件的事件（wc-sort、wc-row-click、wc-change、wc-size-change）
 * 均为 composed，会自然穿透到宿主上，直接监听即可。
 *
 * @example
 * ```html
 * <wc-table-pager id="demo" striped show-total show-size-changer></wc-table-pager>
 * <script>
 *   demo.columns = [{ key: 'name', title: '姓名' }];
 *   demo.data = [/* 全量数据 *\/];
 * </script>
 * ```
 *
 * @slot empty - 空状态（透传给内部 wc-table，默认渲染 wc-empty）
 * @csspart base - 外层容器
 * @csspart table - 内部 wc-table
 * @csspart pager - 分页区容器
 * @fires wc-sort - 内部表格列头排序后派发（detail: { key, order }）
 * @fires wc-row-click - 点击数据行后派发（detail: { row, index }，index 为当前页内序号）
 * @fires wc-change - 页码变化后派发（detail: { current, previous }）
 * @fires wc-size-change - 每页条数变化后派发（detail: { pageSize, previous, current }）
 */
export class wcTablePager extends LitElement {
  static styles = [baseStyles, tablePagerStyles];

  /** 列配置（同 wc-table.columns） */
  @property({ type: Array }) columns: wcTableColumn[] = [];

  /** 全量行数据（内部排序 + 切片分页展示） */
  @property({ type: Array }) data: wcTableRow[] = [];

  /** 斑马纹（透传） */
  @property({ type: Boolean, reflect: true }) striped = false;

  /** 全边框（透传） */
  @property({ type: Boolean, reflect: true }) bordered = false;

  /** 密度（透传） */
  @property({ reflect: true }) size: wcTableSize = 'medium';

  /** 加载中（透传，叠加表格遮罩） */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** 显示总条数（透传给分页器） */
  @property({ type: Boolean, attribute: 'show-total' }) showTotal = false;

  /** 显示每页条数选择器（透传给分页器） */
  @property({ type: Boolean, attribute: 'show-size-changer' }) showSizeChanger = false;

  /** 每页条数可选项（透传给分页器） */
  @property({ attribute: 'page-size-options' }) pageSizeOptions = '10,20,50,100';

  @state() private currentPage = 1;

  @state() private currentPageSize = 10;

  @state() private sortKey = '';

  @state() private sortOrder: wcSortOrder = null;

  /** 当前页（1 开始，只读镜像，随内部翻页联动） */
  get page(): number {
    return this.currentPage;
  }

  set page(v: number) {
    this.currentPage = Math.max(1, Math.round(v) || 1);
  }

  /** 每页条数（只读镜像，随选择器联动） */
  get pageSize(): number {
    return this.currentPageSize;
  }

  /** 总页数 */
  get pageCount(): number {
    return Math.max(1, Math.ceil(this.data.length / this.currentPageSize));
  }

  private onSlotChange = (): void => this.requestUpdate();

  protected override willUpdate(changed: Map<string, unknown>): void {
    super.willUpdate(changed);
    // 数据缩水 / 换数据后当前页越界时夹紧
    if (this.currentPage > this.pageCount) this.currentPage = this.pageCount;
    if (this.currentPage < 1) this.currentPage = 1;
  }

  /** 全量排序后的数据 */
  private get sortedData(): wcTableRow[] {
    return sortRows(this.data, this.sortKey, this.sortOrder);
  }

  /** 当前页切片 */
  private get pagedData(): wcTableRow[] {
    const start = (this.currentPage - 1) * this.currentPageSize;
    return this.sortedData.slice(start, start + this.currentPageSize);
  }

  private onSort(e: CustomEvent<{ key: string; order: wcSortOrder }>): void {
    this.sortKey = e.detail.key;
    this.sortOrder = e.detail.order;
  }

  private onPageChange(e: CustomEvent<{ current: number }>): void {
    this.currentPage = e.detail.current;
  }

  private onPageSizeChange(e: CustomEvent<{ pageSize: number; current: number }>): void {
    this.currentPageSize = e.detail.pageSize;
    this.currentPage = e.detail.current;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="table-pager" part="base">
        <wc-table
          part="table"
          .columns=${this.columns}
          .data=${this.pagedData}
          ?striped=${this.striped}
          ?bordered=${this.bordered}
          size=${this.size}
          ?loading=${this.loading}
          @wc-sort=${this.onSort}
        >
          <slot name="empty" @slotchange=${this.onSlotChange} slot="empty"></slot>
        </wc-table>
        <div class="pager" part="pager">
          <wc-pagination
            .total=${this.data.length}
            .current=${this.currentPage}
            .pageSize=${this.currentPageSize}
            ?show-total=${this.showTotal}
            ?show-size-changer=${this.showSizeChanger}
            page-size-options=${this.pageSizeOptions}
            @wc-change=${this.onPageChange}
            @wc-size-change=${this.onPageSizeChange}
          ></wc-pagination>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('wc-table-pager')) {
  customElements.define('wc-table-pager', wcTablePager);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-table-pager': wcTablePager;
  }
}
