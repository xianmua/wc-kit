import { css } from 'lit';

/**
 * 范围模式样式：在 datePickerStyles 之上做范围特化覆盖——
 * 双月并排、方形区间高亮、端点圆形选中、触发器箭头分隔。
 * 全部规则限定在 :host([range]) 下，与单值模式共存于同一组件。
 */
export const dateRangePickerStyles = css`
  :host([range]) {
    width: 300px;
    /* 范围面板更紧凑：复用 datePickerStyles 的格尺寸变量，整体调小一档 */
    --wc-date-picker-cell-size: var(--wc-date-range-picker-cell-size);
  }

  :host([range][size='small']) {
    --wc-date-range-picker-cell-size: 24px;
  }

  :host([range][size='medium']) {
    --wc-date-range-picker-cell-size: 28px;
  }

  :host([range][size='large']) {
    --wc-date-range-picker-cell-size: 32px;
  }

  /* 触发器：起点 → 终点 */
  .sep {
    margin: 0 var(--wc-space-1);
    color: var(--wc-color-text-placeholder);
    flex-shrink: 0;
  }

  .value .placeholder {
    color: var(--wc-color-text-placeholder);
  }

  /* ---- 双月面板 ---- */
  /* :not([hidden]) 避免覆盖 hidden 属性的 UA display:none（作者样式优先级高于 UA 规则） */
  :host([range]) .panel:not([hidden]) {
    display: flex;
    gap: var(--wc-space-5);
  }

  .month {
    min-width: 0;
  }

  .month .header {
    min-height: 22px;
  }

  /* ---- 区间高亮：中间方形浅底，端点保持圆形实底 ---- */
  :host([range]) .cell.day {
    border-radius: 0;
  }

  :host([range]) .cell.day.in-range {
    background-color: var(--wc-color-primary-light);
  }

  :host([range]) .cell.day.selected {
    border-radius: var(--wc-radius-circle);
  }

  :host([range]) .cell.day.selected.today {
    color: var(--wc-color-text-anti);
  }

  :host([range]) .cell.day.active {
    border-radius: var(--wc-radius-circle);
  }

  :host([range]) .cell.day.in-range.active {
    box-shadow: inset 0 0 0 1px var(--wc-color-primary);
  }
`;
