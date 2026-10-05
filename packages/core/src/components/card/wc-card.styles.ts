import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
    --wc-card-radius: var(--wc-radius-medium);
  }

  /* display:flex 类会覆盖 [hidden] 的 UA 样式，显式关闭 */
  [hidden] {
    display: none !important;
  }

  .card {
    background-color: var(--wc-color-bg-container);
    border-radius: var(--wc-card-radius);
    transition: box-shadow var(--wc-duration-base, 200ms) var(--wc-easing-standard);
  }

  :host([bordered]) .card {
    border: 1px solid var(--wc-color-border);
  }

  :host([hoverable]) .card:hover {
    box-shadow: var(--wc-shadow-2);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--wc-space-2);
    padding: var(--wc-space-4) var(--wc-space-4) 0;
  }

  .titles {
    min-width: 0;
  }

  .title {
    color: var(--wc-color-text);
    font-size: var(--wc-font-size-large);
    font-weight: var(--wc-font-weight-medium);
    line-height: 1.5;
  }

  .subtitle {
    margin-top: 2px;
    color: var(--wc-color-text-secondary);
    font-size: var(--wc-font-size-small);
  }

  .actions {
    flex-shrink: 0;
  }

  .body {
    padding: var(--wc-space-4);
    color: var(--wc-color-text);
    font-size: var(--wc-font-size-medium);
  }

  .footer {
    padding: var(--wc-space-3) var(--wc-space-4);
    border-top: 1px solid var(--wc-color-border);
  }
`;
