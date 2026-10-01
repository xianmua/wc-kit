import { css } from 'lit';

export const popconfirmStyles = css`
  :host {
    display: inline-block;

    /* component 层令牌 */
    --wc-popconfirm-width: 240px;
    --wc-popconfirm-arrow-offset: 50%;
  }

  .trigger {
    display: inline-flex;
  }

  .panel {
    position: fixed;
    z-index: var(--wc-z-index-tooltip);
    box-sizing: border-box;
    width: var(--wc-popconfirm-width);
    padding: var(--wc-space-4);
    font-size: var(--wc-font-size-medium);
    line-height: var(--wc-font-line-height, 1.6);
    color: var(--wc-color-text);
    background-color: var(--wc-color-bg-container);
    border-radius: var(--wc-radius-medium);
    box-shadow: var(--wc-shadow-2);
    opacity: 0;
    visibility: hidden;
    transform: scale(0.96);
    transition:
      opacity var(--wc-duration-fast) var(--wc-easing-standard),
      transform var(--wc-duration-fast) var(--wc-easing-standard),
      visibility var(--wc-duration-fast);
  }

  .panel[data-open] {
    opacity: 1;
    visibility: visible;
    transform: none;
  }

  .main {
    display: flex;
    align-items: flex-start;
    gap: var(--wc-space-2);
  }

  .icon {
    flex-shrink: 0;
    margin-top: 2px;
    font-size: var(--wc-font-size-large);
    color: var(--wc-color-warning);
  }

  .content {
    flex: 1;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .actions {
    display: flex;
    gap: var(--wc-space-2);
    justify-content: flex-end;
    margin-top: var(--wc-space-3);
  }

  /* ---- 箭头（同 Tooltip） ---- */
  .arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: inherit;
    transform: rotate(45deg);
  }

  .side-top .arrow {
    left: var(--wc-popconfirm-arrow-offset);
    bottom: -4px;
    margin-left: -4px;
  }

  .side-bottom .arrow {
    left: var(--wc-popconfirm-arrow-offset);
    top: -4px;
    margin-left: -4px;
  }

  .side-left .arrow {
    top: var(--wc-popconfirm-arrow-offset);
    right: -4px;
    margin-top: -4px;
  }

  .side-right .arrow {
    top: var(--wc-popconfirm-arrow-offset);
    left: -4px;
    margin-top: -4px;
  }

  @media (prefers-reduced-motion: reduce) {
    .panel {
      transition: none;
    }
  }
`;
