import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { FormAssociatedMixin } from '../../common/form-associated-mixin';
import { LocalizeController } from '../../i18n/localize-controller';
import '../icon/wc-icon.js';
import { datePickerStyles } from './wc-date-picker.styles';

export type wcDatePickerSize = 'small' | 'medium' | 'large';
export type wcDatePickerStatus = 'default' | 'success' | 'warning' | 'error';

interface CalendarCell {
  /** ISO 日期 YYYY-MM-DD */
  iso: string;
  /** 显示的日号 */
  day: number;
  /** 是否属于当前视图月份 */
  inMonth: boolean;
  /** 是否今天 */
  isToday: boolean;
}

/* ---------- 日期工具（本地时区，避免 UTC 偏移问题） ---------- */

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

function formatDate(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function parseDate(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

function addDays(d: Date, days: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
}

/**
 * 日期选择器。面板开合、document 点击关闭与 aria-activedescendant 键盘模式
 * 复用 Select 的方案；日期运算全部基于本地时区。
 *
 * @csspart base - 外层容器
 * @csspart trigger - 触发器
 * @csspart panel - 日历面板
 * @cssprop --wc-date-picker-height - 触发器高度
 * @fires wc-change - 选中日期变化时触发，detail.value（YYYY-MM-DD）
 * @fires wc-clear - 点击清除按钮后触发
 */
export class wcDatePicker extends FormAssociatedMixin(LitElement) {
  static styles = [baseStyles, datePickerStyles];

  private _value = '';

  /** 当前选中值（YYYY-MM-DD） */
  @property()
  get value(): string {
    return this._value;
  }

  set value(v: string) {
    const old = this._value;
    this._value = v && parseDate(v) ? v : '';
    this.requestUpdate('value', old);
  }

  /** 占位提示，默认取 i18n 文案 */
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

  /** 一周从周几开始：0 周日（默认）~ 6 周六 */
  @property({ type: Number, attribute: 'first-day-of-week' }) firstDayOfWeek = 0;

  /** 面板是否展开（内部状态） */
  @property({ type: Boolean, reflect: true }) open = false;

  /** 日历视图的年（内部状态） */
  private viewYear = new Date().getFullYear();

  /** 日历视图的月 0~11（内部状态） */
  private viewMonth = new Date().getMonth();

  /** 键盘导航高亮的日期（内部状态） */
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
  }

  override formResetCallback(): void {
    super.formResetCallback();
    this.value = String(this.defaultValue ?? '');
    this.internals.setFormValue(this.value || null);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this.onDocumentClick);
  }

  override disconnectedCallback(): void {
    document.removeEventListener('click', this.onDocumentClick);
    super.disconnectedCallback();
  }

  /* ---------- 开合（同 Select 模式） ---------- */

  private show(): void {
    if (this.disabled || this.readonly || this.open) return;
    this.open = true;
    // 视图与高亮定位到已选日期，否则今天
    const base = parseDate(this.value) ?? new Date();
    this.viewYear = base.getFullYear();
    this.viewMonth = base.getMonth();
    this.activeIso = formatDate(base);
  }

  private hide(): void {
    if (!this.open) return;
    this.open = false;
    this.activeIso = '';
  }

  private toggle(): void {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  private onDocumentClick = (e: MouseEvent): void => {
    if (!(e.composedPath() as Array<EventTarget>).includes(this)) {
      this.hide();
    }
  };

  /* ---------- 日历视图 ---------- */

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

  /** 6 行 × 7 列 = 42 格，含前后月补位日期 */
  private get calendarCells(): CalendarCell[] {
    const first = new Date(this.viewYear, this.viewMonth, 1);
    const startOffset = (first.getDay() - this.firstDayOfWeek + 7) % 7;
    const start = new Date(this.viewYear, this.viewMonth, 1 - startOffset);
    const todayIso = formatDate(new Date());
    const cells: CalendarCell[] = [];
    for (let i = 0; i < 42; i++) {
      const d = addDays(start, i);
      const iso = formatDate(d);
      cells.push({
        iso,
        day: d.getDate(),
        inMonth: d.getMonth() === this.viewMonth,
        isToday: iso === todayIso,
      });
    }
    return cells;
  }

  /** 表头星期标签，顺序按 firstDayOfWeek 旋转（Intl 本地化，中文取单字「日一二三四五六」） */
  private get weekdayLabels(): string[] {
    // 2023-01-01 是周日，作为基准依次取星期窄名
    return Array.from({ length: 7 }, (_, i) =>
      this.localize.date(new Date(2023, 0, 1 + ((this.firstDayOfWeek + i) % 7)), {
        weekday: 'narrow',
      }),
    );
  }

  private get monthLabel(): string {
    return this.localize.date(new Date(this.viewYear, this.viewMonth, 1), {
      year: 'numeric',
      month: 'long',
    });
  }

  /* ---------- 选择 ---------- */

  private selectDate(iso: string): void {
    this.value = iso;
    this.hide();
    this.dispatchEvent(
      new CustomEvent('wc-change', { detail: { value: iso }, bubbles: true, composed: true }),
    );
  }

  private handleClear(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.value = '';
    this.hide();
    this.dispatchEvent(new CustomEvent('wc-clear', { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent('wc-change', { detail: { value: '' }, bubbles: true, composed: true }),
    );
  }

  private selectToday(): void {
    this.selectDate(formatDate(new Date()));
  }

  private onCellClick(e: MouseEvent): void {
    const cell = (e.target as Element).closest<HTMLElement>('[data-iso]');
    if (cell?.dataset.iso) this.selectDate(cell.dataset.iso);
  }

  /* ---------- 键盘导航（activedescendant 模式，同 Select） ---------- */

  private moveActive(delta: number): void {
    if (!this.open) return;
    const base = parseDate(this.activeIso) ?? new Date();
    const next = addDays(base, delta);
    const iso = formatDate(next);
    this.activeIso = iso;
    // 跨月时同步翻页视图
    if (next.getFullYear() !== this.viewYear || next.getMonth() !== this.viewMonth) {
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

  render() {
    const showClear = this.clearable && this.value && !this.disabled && !this.readonly;
    const cells = this.open ? this.calendarCells : [];
    const rows: CalendarCell[][] = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

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
          aria-activedescendant=${
            this.open && this.activeIso ? `${this.uid}-cell-${this.activeIso}` : undefined
          }
          @click=${this.toggle}
        >
          <span class="value ${this.value ? '' : 'placeholder'}" part="value"
            >${this.value || this.placeholder || this.localize.term('datePicker.placeholder')}</span
          >
          ${
            showClear
              ? html`
                  <span
                    class="clear"
                    part="clear-button"
                    role="button"
                    aria-label=${this.localize.term('input.clear')}
                    @mousedown=${(e: MouseEvent) => {
                      e.preventDefault();
                      e.stopPropagation();
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
          aria-label=${this.label || this.localize.term('datePicker.placeholder')}
          ?hidden=${!this.open}
        >
          <div class="header" part="header">
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
            <span class="month-label" part="month-label">${this.monthLabel}</span>
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
              <wc-icon name="chevron-right"></wc-icon><wc-icon name="chevron-right"></wc-icon>
            </button>
          </div>
          <div class="grid" part="grid" role="grid">
            <div class="row weekdays" role="row">
              ${this.weekdayLabels.map(
                (w) => html`<span class="cell weekday" role="columnheader">${w}</span>`,
              )}
            </div>
            ${rows.map(
              (row) => html`
                <div class="row" role="row">
                  ${row.map(
                    (c) => html`
                      <span
                        class="cell day ${c.inMonth ? '' : 'out'} ${
                          c.iso === this.value ? 'selected' : ''
                        } ${c.iso === this.activeIso ? 'active' : ''}"
                        role="gridcell"
                        data-iso=${c.iso}
                        id="${this.uid}-cell-${c.iso}"
                        aria-selected=${c.iso === this.value}
                        @click=${this.onCellClick}
                        >${c.day}</span
                      >
                    `,
                  )}
                </div>
              `,
            )}
          </div>
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
        </div>
      </div>
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
