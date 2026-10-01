import { css } from 'lit';

export const datePickerStyles = css`
  :host {
    display: inline-block;
    width: 240px;

    /* component 层令牌 */
    --wc-date-picker-height: 32px;
    --wc-date-picker-padding-x: var(--wc-space-2);
    --wc-date-picker-font-size: var(--wc-font-size-medium);
    --wc-date-picker-radius: var(--wc-radius-medium);
    --wc-date-picker-cell-size: 32px;
  }

  :host([size='small']) {
    --wc-date-picker-height: 24px;
    --wc-date-picker-padding-x: var(--wc-space-1);
    --wc-date-picker-font-size: var(--wc-font-size-small);
    --wc-date-picker-cell-size: 28px;
  }

  :host([size='large']) {
    --wc-date-picker-height: 40px;
    --wc-date-picker-padding-x: var(--wc-space-3);
    --wc-date-picker-font-size: var(--wc-font-size-large);
    --wc-date-picker-cell-size: 36px;
  }

  .picker {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .trigger {
    display: inline-flex;
    align-items: center;
    gap: var(--wc-space-1);
    width: 100%;
    height: var(--wc-date-picker-height);
    padding: 0 var(--wc-date-picker-padding-x);
    background-color: var(--wc-color-bg-container);
    border: 1px solid var(--wc-color-border);
    border-radius: var(--wc-date-picker-radius);
    cursor: pointer;
    user-select: none;
    transition:
      border-color var(--wc-duration-fast) var(--wc-easing-standard),
      box-shadow var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .trigger:focus-visible {
    outline: none;
    border-color: var(--wc-color-primary);
    box-shadow: 0 0 0 2px var(--wc-color-focus-ring);
  }

  .value {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: var(--wc-date-picker-font-size);
    color: var(--wc-color-text);
  }

  .value.placeholder {
    color: var(--wc-color-text-placeholder);
  }

  .icon {
    font-size: 16px;
    color: var(--wc-color-text-placeholder);
    flex-shrink: 0;
  }

  .clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    font-size: 16px;
    color: var(--wc-color-text-placeholder);
    border-radius: var(--wc-radius-circle);
    flex-shrink: 0;
    opacity: 0;
    transition: opacity var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .clear:hover {
    color: var(--wc-color-text-secondary);
  }

  .trigger:hover .clear,
  .trigger:focus-visible .clear {
    opacity: 1;
  }

  .trigger:hover .clear + .icon {
    display: none;
  }

  /* ---- 日历面板 ---- */
  .panel {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: var(--wc-z-index-dropdown);
    padding: var(--wc-space-3);
    background-color: var(--wc-color-bg-container);
    border: 1px solid var(--wc-color-border);
    border-radius: var(--wc-date-picker-radius);
    box-shadow: var(--wc-shadow-2);
  }

  .panel[hidden] {
    display: none;
  }

  .header {
    display: flex;
    align-items: center;
    gap: var(--wc-space-1);
    margin-bottom: var(--wc-space-2);
  }

  .month-label {
    flex: 1;
    min-width: 0;
    font-size: var(--wc-font-size-medium);
    font-weight: var(--wc-font-weight-medium, 500);
    color: var(--wc-color-text);
    text-align: center;
    white-space: nowrap;
  }

  .nav {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    padding: 0;
    font-size: 12px;
    color: var(--wc-color-text-secondary);
    cursor: pointer;
    background: transparent;
    border: none;
    border-radius: var(--wc-radius-small);
    transition:
      background-color var(--wc-duration-fast) var(--wc-easing-standard),
      color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .nav wc-icon + wc-icon {
    margin-left: -10px;
  }

  .nav:hover {
    color: var(--wc-color-primary);
    background-color: var(--wc-color-bg-hover);
  }

  .grid {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .row {
    display: grid;
    grid-template-columns: repeat(7, var(--wc-date-picker-cell-size));
  }

  .cell {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--wc-date-picker-cell-size);
    height: var(--wc-date-picker-cell-size);
    box-sizing: border-box;
    font-size: var(--wc-font-size-small);
    color: var(--wc-color-text);
    border: 1px solid transparent;
    border-radius: var(--wc-radius-circle);
    user-select: none;
  }

  .cell.weekday {
    height: auto;
    color: var(--wc-color-text-placeholder);
    cursor: default;
  }

  .cell.day {
    cursor: pointer;
    transition:
      background-color var(--wc-duration-fast) var(--wc-easing-standard),
      color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .cell.day:hover {
    background-color: var(--wc-color-bg-hover);
  }

  .cell.day.out {
    color: var(--wc-color-text-placeholder);
  }

  .cell.day.today {
    border-color: var(--wc-color-primary);
    color: var(--wc-color-primary);
  }

  .cell.day.active {
    box-shadow: inset 0 0 0 1px var(--wc-color-primary);
  }

  .cell.day.selected {
    background-color: var(--wc-color-primary);
    color: var(--wc-color-text-anti);
  }

  .cell.day.selected.today {
    border-color: var(--wc-color-primary);
    color: var(--wc-color-text-anti);
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: var(--wc-space-2);
    padding-top: var(--wc-space-2);
    border-top: 1px solid var(--wc-color-border);
  }

  .today {
    padding: 2px var(--wc-space-2);
    font-size: var(--wc-font-size-small);
    color: var(--wc-color-primary);
    cursor: pointer;
    background: transparent;
    border: none;
    border-radius: var(--wc-radius-small);
    transition: background-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .today:hover {
    background-color: var(--wc-color-primary-light);
  }

  /* ---- 校验状态 ---- */
  :host([status='success']) .trigger {
    border-color: var(--wc-color-success);
  }

  :host([status='warning']) .trigger {
    border-color: var(--wc-color-warning);
  }

  :host([status='error']) .trigger {
    border-color: var(--wc-color-error);
  }

  :host([status='error']) .trigger:focus-visible {
    border-color: var(--wc-color-error);
    box-shadow: 0 0 0 2px var(--wc-color-error-light);
  }

  /* ---- 禁用 / 只读 ---- */
  :host([disabled]) .trigger {
    background-color: var(--wc-color-bg-disabled);
    border-color: transparent;
    cursor: not-allowed;
  }

  :host([disabled]) .value {
    color: var(--wc-color-text-disabled);
  }

  :host([readonly]) .trigger {
    border-style: dashed;
  }
`;
