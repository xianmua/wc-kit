import type { wcSortOrder, wcTableRow } from './wc-table.js';

/**
 * 按列排序（wc-table 表头排序与 wc-table-pager 全量排序共用）：
 * 升/降序，空值恒排末尾，数字按值、其余按 zh-CN 本地化比较。
 */
export function sortRows(rows: wcTableRow[], key: string, order: wcSortOrder): wcTableRow[] {
  if (!key || !order) return rows;
  const dir = order === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => {
    const va = a[key];
    const vb = b[key];
    // 空值恒排末尾
    if (va == null) return 1;
    if (vb == null) return -1;
    if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
    return String(va).localeCompare(String(vb), 'zh-CN') * dir;
  });
}
