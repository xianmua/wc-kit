import { css } from 'lit';

export const tabsStyles = css`
  :host {
    display: block;
  }

  .bar {
    display: flex;
    gap: var(--wc-space-2);
    border-bottom: 1px solid var(--wc-color-border);
  }

  .tab {
    position: relative;
    padding: var(--wc-space-2) var(--wc-space-4);
    font-size: var(--wc-font-size-medium);
    line-height: var(--wc-font-line-height, 1.6);
    color: var(--wc-color-text);
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
    transition:
      color var(--wc-duration-fast) var(--wc-easing-standard),
      background-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .tab::after {
    content: '';
    position: absolute;
    right: var(--wc-space-3);
    bottom: -1px;
    left: var(--wc-space-3);
    height: 2px;
    background-color: var(--wc-color-primary);
    border-radius: var(--wc-radius-small);
    opacity: 0;
    transform: scaleX(0.4);
    transition:
      opacity var(--wc-duration-fast) var(--wc-easing-standard),
      transform var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .tab:hover {
    color: var(--wc-color-primary);
    background-color: var(--wc-color-bg-hover);
  }

  .tab[aria-selected='true'] {
    color: var(--wc-color-primary);
    font-weight: var(--wc-font-weight-semibold);
  }

  .tab[aria-selected='true']::after {
    opacity: 1;
    transform: none;
  }

  .tab:focus-visible {
    box-shadow: var(--wc-color-focus-ring);
  }

  .tab[data-disabled] {
    color: var(--wc-color-text-disabled);
    cursor: not-allowed;
    background-color: transparent;
  }
`;
