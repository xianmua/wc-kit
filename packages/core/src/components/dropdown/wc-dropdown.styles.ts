import { css } from 'lit';

export const dropdownStyles = css`
  :host {
    display: inline-block;

    /* component 层令牌 */
    --wc-dropdown-min-width: 120px;
    --wc-dropdown-max-height: 280px;
    --wc-dropdown-radius: var(--wc-radius-medium);
  }

  .trigger {
    display: inline-flex;
  }

  .panel {
    position: fixed;
    z-index: var(--wc-z-index-dropdown);
    box-sizing: border-box;
    min-width: var(--wc-dropdown-min-width);
    max-height: var(--wc-dropdown-max-height);
    overflow-y: auto;
    padding: var(--wc-space-1) 0;
    font-size: var(--wc-font-size-medium);
    background-color: var(--wc-color-bg-container);
    border: 1px solid var(--wc-color-border);
    border-radius: var(--wc-dropdown-radius);
    box-shadow: var(--wc-shadow-2);
    opacity: 0;
    visibility: hidden;
    transform: scale(0.96);
    transform-origin: top;
    transition:
      opacity var(--wc-duration-fast) var(--wc-easing-standard),
      transform var(--wc-duration-fast) var(--wc-easing-standard),
      visibility var(--wc-duration-fast);
  }

  /* visibility:hidden 而非 display:none：面板需保持可测量供定位引擎使用 */
  .panel[data-open] {
    opacity: 1;
    visibility: visible;
    transform: none;
  }

  .empty {
    padding: var(--wc-space-4) var(--wc-space-3);
    color: var(--wc-color-text-placeholder);
    text-align: center;
  }

  @media (prefers-reduced-motion: reduce) {
    .panel {
      transition: none;
    }
  }
`;
