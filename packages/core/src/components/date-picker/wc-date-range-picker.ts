import { wcDatePicker } from './wc-date-picker.js';

/** 选中值：[start, end] ISO 日期对，未选的端为空串 */
export type wcDateRange = [string, string];

/**
 * 日期范围选择器（antd RangePicker 对标）：`<wc-date-picker range>` 的等价形态，
 * 保留独立标签以兼容旧代码。行为与属性请参考 wcDatePicker。
 *
 * value 属性格式：`YYYY-MM-DD,YYYY-MM-DD`（逗号分隔，可只给一端）。
 *
 * @csspart base - 外层容器
 * @csspart trigger - 触发器
 * @csspart panel - 日历面板
 * @cssprop --wc-date-range-picker-cell-size - 日历格尺寸
 * @fires wc-change - 范围选定（两次点击完成）或清空时触发，detail.value: [start, end]
 * @fires wc-clear - 点击清除按钮后触发
 */
export class wcDateRangePicker extends wcDatePicker {
  /** 范围模式固定开启 */
  constructor() {
    super();
    this.range = true;
  }
}

if (!customElements.get('wc-date-range-picker')) {
  customElements.define('wc-date-range-picker', wcDateRangePicker);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-date-range-picker': wcDateRangePicker;
  }
}
