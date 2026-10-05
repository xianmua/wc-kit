import { html, LitElement, nothing, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { LocalizeController } from '../../i18n/localize-controller';
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
 * @csspart total - 总条数（show-total，独立靠左）
 * @fires wc-sort - 内部表格列头排序后派发（detail: { key, order }）
 * @fires wc-row-click - 点击数据行后派发（detail: { row, index }，index 为当前页内序号）
 * @fires wc-expand - 行展开/收起后派发（detail: { row, index, expanded }）
 * @fires wc-expanded-rows-change - 展开行集合变化后派发（detail: 展开键数组）
 * @fires wc-change - 页码变化后派发（detail: { current, previous }）
 * @fires wc-size-change - 每页条数变化后派发（detail: { pageSize, previous, current }）
 */
export class wcTablePager extends LitElement {
  static styles = [baseStyles, tablePagerStyles];

  private localize = new LocalizeController(this);

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

  /** 分页区显示总条数（独立渲染在左侧，其余分页控件靠右） */
  @property({ type: Boolean, attribute: 'show-total' }) showTotal = false;

  /** 显示跳页输入框（透传给分页器） */
  @property({ type: Boolean, attribute: 'show-jumper' }) showJumper = false;

  /** 显示每页条数选择器（透传给分页器） */
  @property({ type: Boolean, attribute: 'show-size-changer' }) showSizeChanger = false;

  /** 每页条数可选项（透传给分页器） */
  @property({ attribute: 'page-size-options' }) pageSizeOptions = '10,20,50,100';

  /** 行唯一键字段名（透传 wc-table.rowKey，展开状态跟踪用） */
  @property({ attribute: 'row-key' }) rowKey = '';

  /** 展开区渲染函数（透传，设置后表格出现展开列） */
  @property({ attribute: false })
  expandedRowRender?: (row: wcTableRow, index: number) => TemplateResult | string;

  /** 判断行是否可展开（透传，默认全部可展开） */
  @property({ attribute: false })
  rowExpandable?: (row: wcTableRow, index: number) => boolean;

  /** 点击行即切换展开（透传） */
  @property({ type: Boolean, attribute: 'expand-row-by-click' }) expandRowByClick = false;

  /** 初始展开行的键集合（透传，非受控） */
  @property({ type: Array, attribute: false })
  defaultExpandedRowKeys: Array<string | wcTableRow> = [];

  /** 受控展开行的键集合（透传；null = 非受控） */
  @property({ type: Array, attribute: false })
  expandedRowKeys: Array<string | wcTableRow> | null = null;

  /** 展开列宽（透传） */
  @property() columnWidth: number | string = 48;

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
    const hasTotal = this.showTotal && this.data.length > 0;
    return html`
      <div class="table-pager" part="base">
        <wc-table
          part="table"
          .columns=${this.columns}
          .data=${this.pagedData}
          .rowKey=${this.rowKey}
          .expandedRowRender=${this.expandedRowRender}
          .rowExpandable=${this.rowExpandable}
          .expandedRowKeys=${this.expandedRowKeys}
          .defaultExpandedRowKeys=${this.defaultExpandedRowKeys}
          .columnWidth=${this.columnWidth}
          ?expand-row-by-click=${this.expandRowByClick}
          ?striped=${this.striped}
          ?bordered=${this.bordered}
          size=${this.size}
          ?loading=${this.loading}
          @wc-sort=${this.onSort}
        >
          <slot name="empty" @slotchange=${this.onSlotChange} slot="empty"></slot>
        </wc-table>
        <div class="pager ${hasTotal ? 'has-total' : ''}" part="pager">
          ${hasTotal
            ? html`<span class="total" part="total">
                ${this.localize.term('pagination.total', { total: this.data.length })}
              </span>`
            : nothing}
          <wc-pagination
            .total=${this.data.length}
            .current=${this.currentPage}
            .pageSize=${this.currentPageSize}
            ?show-jumper=${this.showJumper}
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
