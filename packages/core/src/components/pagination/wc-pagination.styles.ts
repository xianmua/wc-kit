import { css } from 'lit';

export const paginationStyles = css`
  :host {
    display: block;
  }

  .pagination {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--wc-space-1);
    font-size: var(--wc-font-size-medium);
  }

  .total {
    margin-right: var(--wc-space-2);
    color: var(--wc-color-text-secondary);
  }

  /* 每页条数选择器：与页码按钮同高，原生 select 去默认外观 + 自绘箭头 */
  .size-select {
    appearance: none;
    box-sizing: border-box;
    height: 32px;
    margin-right: var(--wc-space-1);
    padding: 0 var(--wc-space-5) 0 var(--wc-space-2);
    color: var(--wc-color-text);
    font: inherit;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid var(--wc-color-border);
    border-radius: var(--wc-radius-small);
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right var(--wc-space-2) center;
    transition:
      border-color var(--wc-duration-fast) var(--wc-easing-standard),
      color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .size-select:hover:not(:disabled) {
    color: var(--wc-color-primary);
    border-color: var(--wc-color-primary);
  }

  .size-select:focus {
    outline: none;
    border-color: var(--wc-color-primary);
  }

  .size-select:disabled {
    color: var(--wc-color-text-disabled);
    cursor: not-allowed;
    background-color: var(--wc-color-bg-disabled, var(--wc-color-bg-hover));
  }

  .page-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 var(--wc-space-2);
    color: var(--wc-color-text);
    font: inherit;
    background: transparent;
    border: none;
    border-radius: var(--wc-radius-small);
    cursor: pointer;
    transition:
      color var(--wc-duration-fast) var(--wc-easing-standard),
      background-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .page-button:hover:not(:disabled) {
    color: var(--wc-color-primary);
    background-color: var(--wc-color-bg-hover);
  }

  .page-button:disabled {
    color: var(--wc-color-text-disabled);
    cursor: not-allowed;
    background: transparent;
  }

  .page-button[aria-current='page'] {
    color: var(--wc-color-primary);
    font-weight: var(--wc-font-weight-medium);
    background-color: var(--wc-color-primary-light);
  }

  .ellipsis {
    min-width: 32px;
    color: var(--wc-color-text-placeholder);
    letter-spacing: 1px;
    text-align: center;
    user-select: none;
  }

  .jumper {
    display: inline-flex;
    align-items: center;
    gap: var(--wc-space-2);
    margin-left: var(--wc-space-2);
    color: var(--wc-color-text-secondary);
  }

  .jumper-input {
    width: 56px;
    height: 32px;
    padding: 0 var(--wc-space-2);
    font: inherit;
    color: var(--wc-color-text);
    text-align: center;
    background: transparent;
    border: 1px solid var(--wc-color-border);
    border-radius: var(--wc-radius-small);
  }

  .jumper-input:focus,
  .simple-input:focus {
    outline: none;
    border-color: var(--wc-color-primary);
  }

  .jumper-input:disabled,
  .simple-input:disabled {
    color: var(--wc-color-text-disabled);
    background-color: var(--wc-color-bg-disabled, var(--wc-color-bg-hover));
    cursor: not-allowed;
  }

  /* 极简模式：当前页输入 + / 总页数 */
  .simple-pager {
    display: inline-flex;
    align-items: center;
    gap: var(--wc-space-1);
    color: var(--wc-color-text-secondary);
  }

  .simple-input {
    box-sizing: border-box;
    width: var(--wc-space-8);
    height: 32px;
    padding: 0 2px;
    font: inherit;
    color: var(--wc-color-text);
    text-align: center;
    background: transparent;
    border: 1px solid var(--wc-color-border);
    border-radius: var(--wc-radius-small);
  }
`;
