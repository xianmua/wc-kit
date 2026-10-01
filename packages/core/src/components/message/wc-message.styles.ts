import { css } from 'lit';

export const messageStyles = css`
  :host {
    display: block;
    pointer-events: auto;
  }

  .message {
    display: flex;
    align-items: flex-start;
    gap: var(--wc-space-2);
    box-sizing: border-box;
    min-width: 240px;
    max-width: 480px;
    margin: 0 auto var(--wc-space-2);
    padding: var(--wc-space-2) var(--wc-space-4);
    font-size: var(--wc-font-size-medium);
    line-height: var(--wc-font-line-height, 1.6);
    color: var(--wc-color-text);
    background-color: var(--wc-color-bg-container);
    border-radius: var(--wc-radius-medium);
    box-shadow: var(--wc-shadow-2);
    animation: wc-message-in var(--wc-duration-medium) var(--wc-easing-standard);
  }

  .icon {
    flex-shrink: 0;
    margin-top: 2px;
    font-size: var(--wc-font-size-large);
  }

  .icon.success {
    color: var(--wc-color-success);
  }

  .icon.error {
    color: var(--wc-color-error);
  }

  .icon.warning {
    color: var(--wc-color-warning);
  }

  .icon.info,
  .icon.loading {
    color: var(--wc-color-primary);
  }

  .content {
    flex: 1;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .close {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    padding: 0;
    font-size: var(--wc-font-size-medium);
    color: var(--wc-color-text-placeholder);
    cursor: pointer;
    background: transparent;
    border: none;
    border-radius: var(--wc-radius-small);
    transition: color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .close:hover {
    color: var(--wc-color-text);
  }

  @keyframes wc-message-in {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }

    to {
      transform: none;
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .message {
      animation: none;
    }
  }
`;
