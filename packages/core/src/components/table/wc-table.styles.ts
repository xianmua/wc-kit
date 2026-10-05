import { css } from 'lit';

export const tableStyles = css`
  :host {
    display: block;
  }

  [hidden] {
    display: none !important;
  }

  .wrapper {
    position: relative;
    color: var(--wc-color-text);
    font-size: var(--wc-font-size-medium);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  th,
  td {
    padding: var(--wc-space-3) var(--wc-space-3);
    border-bottom: 1px solid var(--wc-color-border);
    font-weight: normal;
  }

  th {
    color: var(--wc-color-text-secondary);
    font-weight: var(--wc-font-weight-medium);
    background-color: var(--wc-color-bg-container-secondary);
    white-space: nowrap;
    user-select: none;
  }

  :host([bordered]) th,
  :host([bordered]) td {
    border: 1px solid var(--wc-color-border);
  }

  :host([size='small']) th,
  :host([size='small']) td {
    padding: var(--wc-space-2) var(--wc-space-2);
  }

  :host([size='large']) th,
  :host([size='large']) td {
    padding: var(--wc-space-4) var(--wc-space-3);
  }

  :host([striped]) tbody tr:nth-child(even) td {
    background-color: var(--wc-color-bg-container-secondary);
  }

  tbody tr {
    transition: background-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  tbody tr:hover td {
    background-color: var(--wc-color-bg-hover);
  }

  :host([striped]) tbody tr:nth-child(even):hover td {
    background-color: var(--wc-color-bg-hover);
  }

  th.sortable {
    cursor: pointer;
  }

  th.sortable:hover {
    color: var(--wc-color-primary);
  }

  th.sorted {
    color: var(--wc-color-primary);
  }

  .th-inner {
    display: inline-flex;
    align-items: center;
    gap: var(--wc-space-1);
  }

  .sort {
    display: inline-flex;
    flex-direction: column;
    gap: 0;
    color: var(--wc-color-text-placeholder);
  }

  .sort wc-icon {
    display: block;
    height: 0.5em;
    pointer-events: none;
  }

  .sort wc-icon.active {
    color: var(--wc-color-primary);
  }

  td[ellipsis] {
    max-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .align-left {
    text-align: left;
  }

  .align-right {
    text-align: right;
  }

  .align-center {
    text-align: center;
  }

  /* ---- 展开行 ---- */
  .expand-col {
    width: 48px;
  }

  .expand-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    border: none;
    background: none;
    color: var(--wc-color-text-secondary);
    cursor: pointer;
    border-radius: var(--wc-radius-small);
  }

  .expand-btn:hover {
    color: var(--wc-color-primary);
  }

  .expand-btn wc-icon {
    display: block;
    transition: transform var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .expand-btn[aria-expanded='true'] wc-icon {
    transform: rotate(90deg);
  }

  /* 展开内容行：浅底色，且不跟随行 hover 高亮 */
  tr.expanded-row td,
  tbody tr.expanded-row:hover td {
    background-color: var(--wc-color-bg-container-secondary);
  }

  .expanded-cell {
    padding: var(--wc-space-3) var(--wc-space-4);
  }

  .empty {
    padding: var(--wc-space-4) 0;
  }

  .loading {
    position: absolute;
    inset: 0;
    z-index: var(--wc-z-index-popover, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--wc-color-primary);
    /* 随容器底色自适应明暗主题 */
    background-color: color-mix(in srgb, var(--wc-color-bg-container) 70%, transparent);
  }
`;
