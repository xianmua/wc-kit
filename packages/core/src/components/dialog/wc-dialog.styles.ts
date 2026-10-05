import { css } from 'lit';

export const dialogStyles = css`
  :host {
    display: contents;

    /* component 层令牌 */
    --wc-dialog-width: 520px;
  }

  .overlay {
    position: fixed;
    inset: 0;
    z-index: var(--wc-z-index-modal);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--wc-space-4);
    background: var(--wc-color-mask);
    animation: wc-dialog-fade var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .overlay[hidden] {
    display: none;
  }

  .dialog {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: min(var(--wc-dialog-width), 100%);
    max-height: calc(100vh - var(--wc-space-8));
    overflow: hidden;
    background-color: var(--wc-color-bg-container);
    border-radius: var(--wc-radius-xlarge);
    box-shadow: var(--wc-shadow-3);
    animation: wc-dialog-in var(--wc-duration-medium) var(--wc-easing-standard);
    outline: none;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--wc-space-2);
    padding: var(--wc-space-4) var(--wc-space-6) 0;
  }

  .title {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    font-size: var(--wc-font-size-large);
    font-weight: var(--wc-font-weight-semibold);
    color: var(--wc-color-text);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .close {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    padding: var(--wc-space-1);
    font-size: var(--wc-font-size-medium);
    color: var(--wc-color-text-placeholder);
    cursor: pointer;
    background: transparent;
    border: none;
    border-radius: var(--wc-radius-small);
    transition:
      color var(--wc-duration-fast) var(--wc-easing-standard),
      background-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .close:hover {
    color: var(--wc-color-text);
    background-color: var(--wc-color-bg-hover);
  }

  .body {
    flex: 1;
    min-height: 0;
    padding: var(--wc-space-4) var(--wc-space-6);
    overflow-y: auto;
    font-size: var(--wc-font-size-medium);
    color: var(--wc-color-text);
  }

  .footer {
    display: flex;
    gap: var(--wc-space-2);
    justify-content: flex-end;
    padding: var(--wc-space-2) var(--wc-space-6) var(--wc-space-4);
  }

  .footer slot {
    display: contents;
  }

  @keyframes wc-dialog-fade {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes wc-dialog-in {
    from {
      transform: translateY(-8px) scale(0.98);
      opacity: 0;
    }

    to {
      transform: none;
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .overlay,
    .dialog {
      animation: none;
    }
  }
`;
