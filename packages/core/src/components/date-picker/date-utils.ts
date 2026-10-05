/** 日期选择器共享类型与工具（本地时区，避免 UTC 偏移问题） */

export interface CalendarCell {
  /** ISO 日期 YYYY-MM-DD */
  iso: string;
  /** 显示的日号 */
  day: number;
  /** 是否属于当前视图月份 */
  inMonth: boolean;
  /** 是否今天 */
  isToday: boolean;
}

export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function formatDate(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export function parseDate(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

export function addDays(d: Date, days: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
}

/** 某月 6 行 × 7 列 = 42 格，含前后月补位日期（一周从周日开始） */
export function buildMonthCells(year: number, month: number): CalendarCell[] {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  const todayIso = formatDate(new Date());
  const cells: CalendarCell[] = [];
  for (let i = 0; i < 42; i++) {
    const d = addDays(start, i);
    const iso = formatDate(d);
    cells.push({
      iso,
      day: d.getDate(),
      inMonth: d.getMonth() === month,
      isToday: iso === todayIso,
    });
  }
  return cells;
}
