import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { FormAssociatedMixin } from '../../common/form-associated-mixin';
import { OutsideClickController } from '../../common/outside-click';
import { LocalizeController } from '../../i18n/localize-controller';
import '../icon/wc-icon.js';
import {
  addDays,
  buildMonthCells,
  formatDate,
  parseDate,
  parseRange,
  type CalendarCell,
} from './date-utils.js';
import { datePickerStyles } from './wc-date-picker.styles';
import { dateRangePickerStyles } from './wc-date-range-picker.styles';

export type wcDatePickerSize = 'small' | 'medium' | 'large';
export type wcDatePickerStatus = 'default' | 'success' | 'warning' | 'error';

/** 范围模式（range）的选中值：[start, end] ISO 日期对，未选的端为空串 */
export type wcDateRange = [string, string];

/** 渲染面板里的一块月视图 */
interface MonthView {
  year: number;
  month: number;
  cells: CalendarCell[];
}

/**
 * 日期选择器：默认单日期模式；加 range 属性切换为范围选择
 * （antd RangePicker 对标：两次点击选中区间、双月面板并排、悬停预览区间高亮、
 * 第二次点击早于起点时自动交换）。
 *
 * value 属性格式：单值为 YYYY-MM-DD；范围为 `YYYY-MM-DD,YYYY-MM-DD`（逗号分隔，
 * 可只给一端）。注意书写 `<wc-date-picker range value="...">` 时 range 要在 value 之前。
 *
 * 面板开合、document 点击关闭与 aria-activedescendant 键盘模式
 * 复用 Select 的方案；日期运算全部基于本地时区。
 *
 * @csspart base - 外层容器
 * @csspart trigger - 触发器
 * @csspart panel - 日历面板
 * @cssprop --wc-date-picker-height - 触发器高度
 * @cssprop --wc-date-picker-cell-size - 日历格尺寸
 * @fires wc-change - 选中变化时触发：单值模式 detail.value 为 YYYY-MM-DD；
 *   范围模式为 [start, end]（范围选定或清空时触发）
 * @fires wc-clear - 点击清除按钮后触发
 */
export class wcDatePicker extends FormAssociatedMixin(LitElement) {
  static styles = [baseStyles, datePickerStyles, dateRangePickerStyles];

  /** 范围模式：两次点击选择日期区间，value 为 'YYYY-MM-DD,YYYY-MM-DD' */
  @property({ type: Boolean, reflect: true }) range = false;

  /** 内部统一存 [start, end]：单值模式只用 start */
  private _range: wcDateRange = ['', ''];

  /** 当前选中值：单值模式为 YYYY-MM-DD，范围模式为 YYYY-MM-DD,YYYY-MM-DD */
  @property()
  get value(): string {
    const [s, e] = this._range;
    return this.range ? (s && e ? `${s},${e}` : '') : s;
  }

  set value(v: string) {
    const old = this._range;
    if (this.range) {
      this._range = parseRange(v);
    } else {
      const s = v && parseDate(v) ? v : '';
      this._range = [s, ''];
    }
    this.requestUpdate('value', old);
  }

  /** 占位提示：单值模式一个，范围模式同时覆盖两端，默认取 i18n 文案 */
  @property() placeholder = '';

  /** 无障碍标签 */
  @property() label = '';

  /** 尺寸 */
  @property({ reflect: true }) size: wcDatePickerSize = 'medium';

  /** 校验状态（影响边框色） */
  @property({ reflect: true }) status: wcDatePickerStatus = 'default';

  /** 可清除 */
  @property({ type: Boolean, reflect: true }) clearable = false;

  /** 只读 */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** 面板是否展开（内部状态） */
  @state() open = false;

  /** 左侧面板视图的年（内部状态） */
  private viewYear = new Date().getFullYear();

  /** 左侧面板视图的月 0~11（内部状态） */
  private viewMonth = new Date().getMonth();

  /** 范围模式选择进行中：'' 未开始 / 'end' 已选起点等终点（内部状态） */
  private pending: '' | 'end' = '';

  /** 键盘导航 / 悬停预览高亮的日期（内部状态） */
  private activeIso = '';

  private localize = new LocalizeController(this);

  private uid = `wc-date-picker-${Math.random().toString(36).slice(2, 8)}`;

  constructor() {
    super();
    this.addEventListener('keydown', this.handleKeydown);
  }

  override get defaultValue(): unknown {
    return this.getAttribute('value') ?? '';
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    if (changed.has('value')) {
      this.internals.setFormValue(this.value || null);
    }
    if (changed.has('range') && this.hasAttribute('value')) {
      // range 切换后按新模式重解析 value 属性（HTML 属性书写顺序不确定）
      this.value = this.getAttribute('value')!;
    }
  }

  override formResetCallback(): void {
    super.formResetCallback();
    this.value = String(this.defaultValue ?? '');
    this.internals.setFormValue(this.value || null);
  }

  /* ---------- 开合（同 Select 模式） ---------- */

  private show(): void {
    if (this.disabled || this.readonly || this.open) return;
    this.open = true;
    // 视图定位到已选起点（单值即所选日期），否则今天
    const base = parseDate(this._range[0]) ?? new Date();
    this.viewYear = base.getFullYear();
    this.viewMonth = base.getMonth();
    this.activeIso = this.range ? '' : formatDate(base);
    this.pending = '';
  }

  private hide(): void {
    if (!this.open) return;
    this.open = false;
    this.activeIso = '';
    this.pending = '';
  }

  private toggle(): void {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  private outsideClick = new OutsideClickController(this, () => this.hide());

  /* ---------- 月视图 ---------- */

  private setView(year: number, month: number): void {
    this.viewYear = year;
    this.viewMonth = month;
    this.requestUpdate();
  }

  private prevMonth(): void {
    const m = this.viewMonth === 0 ? 11 : this.viewMonth - 1;
    const y = this.viewMonth === 0 ? this.viewYear - 1 : this.viewYear;
    this.setView(y, m);
  }

  private nextMonth(): void {
    const m = this.viewMonth === 11 ? 0 : this.viewMonth + 1;
    const y = this.viewMonth === 11 ? this.viewYear + 1 : this.viewYear;
    this.setView(y, m);
  }

  private prevYear(): void {
    this.setView(this.viewYear - 1, this.viewMonth);
  }

  private nextYear(): void {
    this.setView(this.viewYear + 1, this.viewMonth);
  }

  /** 已渲染的月视图：单值模式 1 块；范围模式 2 块并排（右月 = 左月 + 1） */
  private get monthViews(): MonthView[] {
    const left = { year: this.viewYear, month: this.viewMonth };
    if (!this.range) return [{ ...left, cells: buildMonthCells(left.year, left.month) }];
    const rightDate = new Date(this.viewYear, this.viewMonth + 1, 1);
    const right = { year: rightDate.getFullYear(), month: rightDate.getMonth() };
    return [left, right].map((v) => ({ ...v, cells: buildMonthCells(v.year, v.month) }));
  }

  /** 表头星期标签，周日起始（Intl 本地化，中文取单字「日一二三四五六」） */
  private get weekdayLabels(): string[] {
    // 2023-01-01 是周日，作为基准依次取星期窄名
    return Array.from({ length: 7 }, (_, i) =>
      this.localize.date(new Date(2023, 0, 1 + i), { weekday: 'narrow' }),
    );
  }

  private monthLabel(year: number, month: number): string {
    return this.localize.date(new Date(year, month, 1), { year: 'numeric', month: 'long' });
  }

  /* ---------- 选择 ---------- */

  /** 范围模式的区间预览终点：选完为终点本身；选起点后跟随悬停/键盘高亮 */
  private get previewEnd(): string {
    const [, e] = this._range;
    if (e) return e;
    if (this.pending === 'end' && this.activeIso) return this.activeIso;
    return '';
  }

  private isInRange(iso: string): boolean {
    const [s] = this._range;
    const e = this.previewEnd;
    if (!s || !e || !iso) return false;
    const lo = s < e ? s : e;
    const hi = s < e ? e : s;
    return iso >= lo && iso <= hi;
  }

  /** 范围模式的端点判定：预览/选中区间的两端（含悬停预览端） */
  private isBoundary(iso: string): boolean {
    return iso === this._range[0] || iso === this.previewEnd;
  }

  private selectDate(iso: string): void {
    const old = this._range;
    if (!this.range) {
      this._range = [iso, ''];
      this.requestUpdate('value', old);
      this.hide();
      this.dispatchEvent(
        new CustomEvent('wc-change', { detail: { value: iso }, bubbles: true, composed: true }),
      );
      return;
    }
    if (this.pending !== 'end') {
      // 第一击：定起点，面板保持展开等待终点
      this._range = [iso, ''];
      this.pending = 'end';
      this.activeIso = iso;
      this.requestUpdate('value', old);
      return;
    }
    // 第二击：定终点，早于起点自动交换
    const [s] = old;
    this._range = iso < s! ? [iso, s!] : [s!, iso];
    this.pending = '';
    this.hide();
    this.requestUpdate('value', old);
    this.emitChange();
  }

  private emitChange(): void {
    this.dispatchEvent(
      new CustomEvent('wc-change', {
        detail: { value: this.range ? [...this._range] : this._range[0] },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleClear(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    const old = this._range;
    this._range = ['', ''];
    this.pending = '';
    this.hide();
    this.requestUpdate('value', old);
    this.dispatchEvent(new CustomEvent('wc-clear', { bubbles: true, composed: true }));
    this.emitChange();
  }

  private selectToday(): void {
    this.selectDate(formatDate(new Date()));
  }

  private onCellClick = (e: MouseEvent): void => {
    const cell = (e.target as Element).closest<HTMLElement>('[data-iso]');
    if (cell?.dataset.iso) this.selectDate(cell.dataset.iso);
  };

  private onCellHover = (e: MouseEvent): void => {
    const cell = (e.target as Element).closest<HTMLElement>('[data-iso]');
    if (!cell?.dataset.iso || cell.dataset.iso === this.activeIso) return;
    this.activeIso = cell.dataset.iso;
    this.requestUpdate();
  };

  /* ---------- 键盘导航（activedescendant 模式，同 Select） ---------- */

  private moveActive(delta: number): void {
    if (!this.open) return;
    const base = parseDate(this.activeIso) ?? parseDate(this._range[0]) ?? new Date();
    const next = addDays(base, delta);
    this.activeIso = formatDate(next);
    // 高亮月不在已渲染的月视图范围内时同步翻页
    const views = this.monthViews;
    const first = views[0];
    const last = views[views.length - 1];
    const nextInView =
      next >= new Date(first.year, first.month, 1) &&
      next <= new Date(last.year, last.month + 1, 0);
    if (!nextInView) {
      this.setView(next.getFullYear(), next.getMonth());
    } else {
      this.requestUpdate();
    }
  }

  private handleKeydown = (e: KeyboardEvent): void => {
    if (this.disabled || this.readonly) return;
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (this.open && this.activeIso) {
          this.selectDate(this.activeIso);
        } else {
          this.show();
        }
        break;
      case 'Escape':
        e.preventDefault();
        this.hide();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (this.open) this.moveActive(-1);
        else this.show();
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (this.open) this.moveActive(1);
        else this.show();
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (this.open) this.moveActive(-7);
        else this.show();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (this.open) this.moveActive(7);
        else this.show();
        break;
      case 'Home':
        if (this.open) {
          e.preventDefault();
          this.moveActive(-7);
        }
        break;
      case 'End':
        if (this.open) {
          e.preventDefault();
          this.moveActive(7);
        }
        break;
      case 'Tab':
        this.hide();
        break;
    }
  };

  /** activeIso 对应 cell 的 DOM id（落在哪块月视图就用哪块的编号） */
  private activeCellId(): string | undefined {
    if (!this.open || !this.activeIso) return undefined;
    const d = parseDate(this.activeIso);
    if (!d) return undefined;
    const ym = `${d.getFullYear()}-${d.getMonth()}`;
    const idx = this.monthViews.findIndex((v) => `${v.year}-${v.month}` === ym);
    return idx === -1 ? undefined : `${this.uid}-cell-${idx}-${this.activeIso}`;
  }

  render() {
    const [s, e] = this._range;
    const hasValue = this.range ? !!(s || e) : !!s;
    const showClear = this.clearable && hasValue && !this.disabled && !this.readonly;
    const activeId = this.activeCellId();

    return html`
      <div class="picker" part="base">
        <div
          class="trigger"
          part="trigger"
          role="combobox"
          tabindex=${this.disabled ? -1 : 0}
          aria-haspopup="grid"
          aria-expanded=${this.open}
          aria-disabled=${this.disabled}
          aria-label=${this.label || undefined}
          aria-controls=${this.open ? `${this.uid}-panel` : undefined}
          aria-activedescendant=${activeId ?? nothing}
          @click=${this.toggle}
        >
          <span class="value ${hasValue ? '' : 'placeholder'}" part="value">
            ${this.renderTriggerValue()}
          </span>
          ${
            showClear
              ? html`
                  <span
                    class="clear"
                    part="clear-button"
                    role="button"
                    aria-label=${this.localize.term('input.clear')}
                    @mousedown=${(ev: MouseEvent) => {
                      ev.preventDefault();
                      ev.stopPropagation();
                    }}
                    @click=${this.handleClear}
                  >
                    <wc-icon name="close"></wc-icon>
                  </span>
                `
              : ''
          }
          <wc-icon name="calendar" class="icon"></wc-icon>
        </div>
        <div
          class="panel"
          part="panel"
          id="${this.uid}-panel"
          role="dialog"
          aria-label=${
            this.label ||
            (this.range
              ? this.localize.term('rangePicker.placeholderStart')
              : this.localize.term('datePicker.placeholder'))
          }
          ?hidden=${!this.open}
          @mouseover=${this.range ? this.onCellHover : nothing}
        >
          ${this.renderPanels()}
          ${
            this.range
              ? nothing
              : html`
                  <div class="footer" part="footer">
                    <button
                      type="button"
                      class="today"
                      part="today-button"
                      tabindex="-1"
                      @click=${this.selectToday}
                    >
                      ${this.localize.term('datePicker.today')}
                    </button>
                  </div>
                `
          }
        </div>
      </div>
    `;
  }

  /** 触发器显示值：单值为日期或占位；范围为「起点 → 终点」 */
  private renderTriggerValue(): unknown {
    if (!this.range) {
      const v = this._range[0];
      return v || this.placeholder || this.localize.term('datePicker.placeholder');
    }
    const [s, e] = this._range;
    const startPh = this.placeholder || this.localize.term('rangePicker.placeholderStart');
    const endPh = this.placeholder || this.localize.term('rangePicker.placeholderEnd');
    const arrow = html`<span class="sep">→</span>`;
    if (s && !e) return html`${s} ${arrow} <span class="placeholder">${endPh}</span>`;
    if (s && e) return html`${s} ${arrow} ${e}`;
    return html`<span class="placeholder">${startPh} ${arrow} ${endPh}</span>`;
  }

  /** 月视图面板：单值模式 1 块（四向导航齐全），范围模式 2 块（左前右后各半） */
  private renderPanels(): unknown {
    const views = this.monthViews;
    return views.map((v, idx) => {
      const rows: CalendarCell[][] = [];
      for (let i = 0; i < v.cells.length; i += 7) rows.push(v.cells.slice(i, i + 7));
      const showPrev = !this.range || idx === 0;
      const showNext = !this.range || idx === views.length - 1;
      return html`
        <div class="month">
          <div class="header" part="header">
            ${
              showPrev
                ? html`
                    <button
                      type="button"
                      class="nav"
                      part="prev-year-button"
                      tabindex="-1"
                      aria-label=${this.localize.term('datePicker.prevYear')}
                      @click=${this.prevYear}
                    >
                      <wc-icon name="chevron-left"></wc-icon><wc-icon name="chevron-left"></wc-icon>
                    </button>
                    <button
                      type="button"
                      class="nav"
                      part="prev-month-button"
                      tabindex="-1"
                      aria-label=${this.localize.term('datePicker.prevMonth')}
                      @click=${this.prevMonth}
                    >
                      <wc-icon name="chevron-left"></wc-icon>
                    </button>
                  `
                : nothing
            }
            <span class="month-label" part="month-label">${this.monthLabel(v.year, v.month)}</span>
            ${
              showNext
                ? html`
                    <button
                      type="button"
                      class="nav"
                      part="next-month-button"
                      tabindex="-1"
                      aria-label=${this.localize.term('datePicker.nextMonth')}
                      @click=${this.nextMonth}
                    >
                      <wc-icon name="chevron-right"></wc-icon>
                    </button>
                    <button
                      type="button"
                      class="nav"
                      part="next-year-button"
                      tabindex="-1"
                      aria-label=${this.localize.term('datePicker.nextYear')}
                      @click=${this.nextYear}
                    >
                      <wc-icon name="chevron-right"></wc-icon
                      ><wc-icon name="chevron-right"></wc-icon>
                    </button>
                  `
                : nothing
            }
          </div>
          <div class="grid" part="grid" role="grid">
            <div class="row weekdays" role="row">
              ${this.weekdayLabels.map(
                (w) => html`<span class="cell weekday" role="columnheader">${w}</span>`,
              )}
            </div>
            ${rows.map(
              (row) => html`
                <div class="row" role="row">${row.map((c) => this.renderCell(c, idx))}</div>
              `,
            )}
          </div>
        </div>
      `;
    });
  }

  private renderCell(c: CalendarCell, panelIdx: number): unknown {
    const selected = this.range ? this.isBoundary(c.iso) : c.iso === this._range[0];
    const inRange = this.range && this.isInRange(c.iso) && !selected;
    return html`
      <span
        class="cell day ${c.inMonth ? '' : 'out'} ${inRange ? 'in-range' : ''}
          ${selected ? 'selected' : ''} ${c.iso === this.activeIso ? 'active' : ''}"
        role="gridcell"
        data-iso=${c.iso}
        id="${this.uid}-cell-${panelIdx}-${c.iso}"
        aria-selected=${selected}
        @click=${this.onCellClick}
        >${c.day}</span
      >
    `;
  }
}

if (!customElements.get('wc-date-picker')) {
  customElements.define('wc-date-picker', wcDatePicker);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-date-picker': wcDatePicker;
  }
}
