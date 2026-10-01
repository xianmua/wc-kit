import { css } from 'lit';

export const listStyles = css`
  :host {
    display: block;
  }

  /* display:flex/grid 类会覆盖 [hidden] 的 UA 样式，显式关闭 */
  [hidden] {
    display: none !important;
  }

  .list {
    margin: 0;
    padding: 0;
    list-style: none;
    color: var(--wc-color-text);
    font-size: var(--wc-font-size-medium);
  }

  /* 通过 ::slotted 为 light-DOM 条目提供统一样式 */
  ::slotted(wc-list-item) {
    display: block;
    padding: var(--wc-space-3) var(--wc-space-4);
  }

  ::slotted(wc-list-item:not(:last-child)) {
    border-bottom: 1px solid var(--wc-color-border);
  }

  :host([striped]) ::slotted(wc-list-item:nth-child(even)) {
    background-color: var(--wc-color-bg-container-secondary);
  }

  :host([hoverable]) ::slotted(wc-list-item:hover) {
    background-color: var(--wc-color-bg-hover);
  }

  :host([size='small']) ::slotted(wc-list-item) {
    padding: var(--wc-space-2) var(--wc-space-4);
  }

  :host([size='large']) ::slotted(wc-list-item) {
    padding: var(--wc-space-4) var(--wc-space-4);
  }

  .empty {
    padding: var(--wc-space-2) 0;
  }
`;
