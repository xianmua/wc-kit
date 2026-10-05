import { html, LitElement, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import '../empty/wc-empty.js';
import '../icon/wc-icon.js';
import { sortRows } from './sort-rows.js';
import { tableStyles } from './wc-table.styles';

export type wcTableAlign = 'left' | 'right' | 'center';
export type wcTableSize = 'small' | 'medium' | 'large';
export type wcSortOrder = 'asc' | 'desc' | null;

export interface wcTableColumn {
  /** 对应 data 行的字段名 */
  key: string;
  /** 表头标题 */
  title: string;
  /** 列宽（px 数值或任意 CSS 宽度） */
  width?: number | string;
  /** 单元格对齐（默认左对齐） */
  align?: wcTableAlign;
  /** 是否可点击排序（升 → 降 → 取消循环） */
  sortable?: boolean;
  /** 超宽省略（title 提示完整内容） */
  ellipsis?: boolean;
  /** 自定义单元格渲染（返回模板或文本） */
  render?: (row: wcTableRow, index: number) => TemplateResult | string | number;
}

export type wcTableRow = Record<string, unknown>;

/**
 * 表格。columns + data 驱动的纯展示表格：可排序列点击循环升/降/取消
 * （派发 wc-sort），行点击派发 wc-row-click；空数据回退 wc-empty
 * （empty 插槽可覆盖），loading 属性叠加加载遮罩。
 *
 * 展开行：设置 expandedRowRender 后首列出现展开箭头，点击展开/收起，
 * 展开区渲染任意内容（嵌套子表格、详情等）；rowExpandable 可按行禁用，
 * rowKey 指定行唯一键字段（不设则按行对象引用跟踪展开状态）。
 * antd expandable 对标：expandRowByClick 点击行展开、defaultExpandedRowKeys
 * 初始展开、expandedRowKeys 受控模式（null = 非受控）、columnWidth 展开列宽。
 *
 * @example
 * ```html
 * <wc-table id="demo"></wc-table>
 * <script>
 *   demo.columns = [
 *     { key: 'name', title: '姓名', sortable: true },
 *     { key: 'age', title: '年龄', align: 'right', width: 100 },
 *   ];
 *   demo.data = [{ name: '张三', age: 18 }];
 * </script>
 * ```
 *
 * @slot empty - 空状态（默认渲染 wc-empty）
 * @csspart wrapper - 外层容器（loading 遮罩的定位父级）
 * @csspart table - table 元素
 * @csspart head - thead
 * @csspart body - tbody
 * @csspart sort - 排序图标区
 * @csspart expand - 展开按钮
 * @csspart expanded-row - 展开内容行
 * @csspart empty - 空状态区
 * @csspart loading - 加载遮罩
 * @fires wc-sort - 点击可排序列头后派发（detail: { key, order }）
 * @fires wc-row-click - 点击数据行后派发（detail: { row, index }）
 * @fires wc-expand - 行展开/收起后派发（detail: { row, index, expanded }）
 * @fires wc-expanded-rows-change - 展开行集合变化后派发（detail: 展开键数组，受控模式据此回写 expandedRowKeys）
 */
export class wcTable extends LitElement {
  static styles = [baseStyles, tableStyles];

  /** 列配置 */
  @property({ type: Array }) columns: wcTableColumn[] = [];

  /** 行数据 */
  @property({ type: Array }) data: wcTableRow[] = [];

  /** 斑马纹 */
  @property({ type: Boolean, reflect: true }) striped = false;

  /** 全边框 */
  @property({ type: Boolean, reflect: true }) bordered = false;

  /** 密度 */
  @property({ reflect: true }) size: wcTableSize = 'medium';

  /** 加载中（叠加遮罩） */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** 行唯一键字段名（展开状态跟踪用；不设则按行对象引用跟踪） */
  @property({ attribute: 'row-key' }) rowKey = '';

  /** 展开区渲染函数（设置后首列出现展开箭头），返回模板或文本 */
  @property({ attribute: false })
  expandedRowRender?: (row: wcTableRow, index: number) => TemplateResult | string;

  /** 判断行是否可展开（默认全部可展开） */
  @property({ attribute: false })
  rowExpandable?: (row: wcTableRow, index: number) => boolean;

  /** 点击行即切换展开（antd expandRowByClick），默认仅点击展开箭头 */
  @property({ type: Boolean, attribute: 'expand-row-by-click' }) expandRowByClick = false;

  /** 初始展开行的键集合（非受控，仅首次渲染前生效） */
  @property({ type: Array, attribute: false })
  defaultExpandedRowKeys: Array<string | wcTableRow> = [];

  /** 受控展开行的键集合（antd expandedRowKeys；null = 非受控内部自管） */
  @property({ type: Array, attribute: false })
  expandedRowKeys: Array<string | wcTableRow> | null = null;

  /** 展开列宽（antd columnWidth，数值 px 或任意 CSS 宽度） */
  @property() columnWidth: number | string = 48;

  /** 已展开行的键集合（rowKey 字段值或行对象引用，内部状态） */
  @state() private expandedKeys = new Set<string | wcTableRow>();

  /** defaultExpandedRowKeys 只在首次更新时播种一次 */
  private seededDefaults = false;

  @state() private sortKey = '';

  @state() private sortOrder: wcSortOrder = null;

  private onSlotChange = (): void => this.requestUpdate();

  /** 排序后的展示数据 */
  private get displayData(): wcTableRow[] {
    return sortRows(this.data, this.sortKey, this.sortOrder);
  }

  private onHeaderClick(col: wcTableColumn): void {
    if (!col.sortable) return;
    const cycle: Record<string, wcSortOrder> = { '': 'asc', asc: 'desc', desc: null };
    this.sortOrder = this.sortKey === col.key ? (cycle[this.sortOrder ?? ''] ?? null) : 'asc';
    this.sortKey = this.sortOrder === null ? '' : col.key;
    this.dispatchEvent(
      new CustomEvent('wc-sort', {
        detail: { key: this.sortKey, order: this.sortOrder },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /** 是否启用展开列 */
  private get expandEnabled(): boolean {
    return typeof this.expandedRowRender === 'function';
  }

  /** 行的展开跟踪键：rowKey 字段值或行对象引用 */
  private rowId(row: wcTableRow): string | wcTableRow {
    return this.rowKey ? String(row[this.rowKey] ?? '') : row;
  }

  private toggleExpand(row: wcTableRow, index: number, e: Event): void {
    // 阻止冒泡到行，避免同时触发 wc-row-click
    e.stopPropagation();
    const key = this.rowId(row);
    const expanded = !this.expandedKeys.has(key);
    const next = new Set(this.expandedKeys);
    if (expanded) {
      next.add(key);
    } else {
      next.delete(key);
    }
    // 受控模式（expandedRowKeys 非 null）以外部为唯一数据源，等待外部回写
    if (this.expandedRowKeys == null) {
      this.expandedKeys = next;
    }
    this.dispatchEvent(
      new CustomEvent('wc-expand', {
        detail: { row, index, expanded },
        bubbles: true,
        composed: true,
      }),
    );
    this.dispatchEvent(
      new CustomEvent('wc-expanded-rows-change', {
        detail: [...next],
        bubbles: true,
        composed: true,
      }),
    );
  }

  /** 行点击：派发 wc-row-click；expandRowByClick 时同时切换展开 */
  private onRowClick(row: wcTableRow, index: number, e: Event): void {
    this.dispatchEvent(
      new CustomEvent('wc-row-click', {
        detail: { row, index },
        bubbles: true,
        composed: true,
      }),
    );
    if (
      this.expandRowByClick &&
      this.expandEnabled &&
      this.rowExpandable?.(row, index) !== false
    ) {
      this.toggleExpand(row, index, e);
    }
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);
    // defaultExpandedRowKeys 仅首次生效（antd 语义：初始展开，之后由交互接管）
    if (!this.seededDefaults) {
      this.seededDefaults = true;
      if (this.expandedRowKeys == null && this.defaultExpandedRowKeys.length > 0) {
        this.expandedKeys = new Set(this.defaultExpandedRowKeys);
      }
    }
    // 受控模式：外部 expandedRowKeys 变化时同步进内部集合
    if (changed.has('expandedRowKeys') && this.expandedRowKeys != null) {
      this.expandedKeys = new Set(this.expandedRowKeys);
    }
  }

  private cellContent(col: wcTableColumn, row: wcTableRow, index: number): TemplateResult | string {
    const rendered = col.render?.(row, index);
    if (rendered != null && rendered !== '') {
      return typeof rendered === 'object' ? rendered : String(rendered);
    }
    const value = row[col.key];
    return value == null ? '' : String(value);
  }

  private renderHead(): TemplateResult {
    return html`<thead part="head">
      <tr>
        ${
          this.expandEnabled
            ? html`<th
                class="expand-col"
                part="th"
                scope="col"
                aria-label="展开"
                style=${
                  typeof this.columnWidth === 'number'
                    ? `width: ${this.columnWidth}px`
                    : `width: ${this.columnWidth}`
                }
              ></th>`
            : nothing
        }
        ${this.columns.map((col) => {
          const isSorted = this.sortKey === col.key && this.sortOrder !== null;
          return html`<th
            part="th"
            scope="col"
            style=${
              col.width != null
                ? `width: ${typeof col.width === 'number' ? `${col.width}px` : col.width}`
                : nothing
            }
            class=${
              [
                col.align ? `align-${col.align}` : '',
                col.sortable ? 'sortable' : '',
                isSorted ? 'sorted' : '',
              ].join(' ') || nothing
            }
            aria-sort=${
              isSorted ? (this.sortOrder === 'asc' ? 'ascending' : 'descending') : nothing
            }
            @click=${() => this.onHeaderClick(col)}
          >
            <div class="th-inner">
              ${col.title}
              ${
                col.sortable
                  ? html`<span class="sort" part="sort">
                      <wc-icon
                        class=${this.sortKey === col.key && this.sortOrder === 'asc' ? 'active' : ''}
                        name="chevron-up"
                      ></wc-icon>
                      <wc-icon
                        class=${this.sortKey === col.key && this.sortOrder === 'desc' ? 'active' : ''}
                        name="chevron-down"
                      ></wc-icon>
                    </span>`
                  : nothing
              }
            </div>
          </th>`;
        })}
      </tr>
    </thead>`;
  }

  protected override render(): TemplateResult {
    const hasData = this.data.length > 0;
    return html`<div class="wrapper" part="wrapper">
      <table part="table">
        ${this.renderHead()}
        <tbody part="body" ?hidden=${!hasData}>
          ${this.displayData.map((row, index) => {
            const expandable = this.expandEnabled && this.rowExpandable?.(row, index) !== false;
            const expanded = expandable && this.expandedKeys.has(this.rowId(row));
            return html`
              <tr part="row" @click=${(e: Event) => this.onRowClick(row, index, e)}>
                ${
                  this.expandEnabled
                    ? expandable
                      ? html`<td part="td" class="expand-cell">
                          <button
                            class="expand-btn"
                            part="expand"
                            aria-expanded=${expanded ? 'true' : 'false'}
                            aria-label=${expanded ? '收起' : '展开'}
                            @click=${(e: Event) => this.toggleExpand(row, index, e)}
                          >
                            <wc-icon name="chevron-right"></wc-icon>
                          </button>
                        </td>`
                      : html`<td part="td" class="expand-cell"></td>`
                    : nothing
                }
                ${this.columns.map(
                  (col) => html`<td
                    part="td"
                    class=${col.align ? `align-${col.align}` : nothing}
                    ?ellipsis=${col.ellipsis === true}
                    title=${col.ellipsis ? String(row[col.key] ?? '') : nothing}
                  >
                    ${this.cellContent(col, row, index)}
                  </td>`,
                )}
              </tr>
              ${
                expanded
                  ? html`<tr class="expanded-row" part="expanded-row">
                      <td
                        class="expanded-cell"
                        colspan=${this.columns.length + 1}
                      >
                        ${this.expandedRowRender!(row, index)}
                      </td>
                    </tr>`
                  : nothing
              }
            `;
          })}
        </tbody>
      </table>
      <div class="empty" part="empty" ?hidden=${hasData}>
        <slot name="empty" @slotchange=${this.onSlotChange}><wc-empty></wc-empty></slot>
      </div>
      ${
        this.loading
          ? html`<div class="loading" part="loading">
              <wc-icon name="loader" spin label="加载中"></wc-icon>
            </div>`
          : nothing
      }
    </div>`;
  }
}

if (!customElements.get('wc-table')) {
  customElements.define('wc-table', wcTable);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-table': wcTable;
  }
}
