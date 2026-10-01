import { css } from 'lit';

export const tooltipStyles = css`
  :host {
    display: inline-block;

    /* component 层令牌 */
    --wc-tooltip-max-width: 240px;
    --wc-tooltip-arrow-offset: 50%;
  }

  .trigger {
    display: inline-flex;
  }

  .panel {
    position: fixed;
    z-index: var(--wc-z-index-tooltip);
    box-sizing: border-box;
    max-width: var(--wc-tooltip-max-width);
    padding: var(--wc-space-2) var(--wc-space-3);
    font-size: var(--wc-font-size-small);
    line-height: var(--wc-font-line-height, 1.6);
    color: var(--wc-color-text-anti);
    background-color: var(--wc-color-gray-900);
    border-radius: var(--wc-radius-small);
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

  .body {
    overflow-wrap: anywhere;
  }

  /* ---- 箭头：8px 旋转正方形，贴在朝向锚点的一边 ---- */
  .arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: inherit;
    transform: rotate(45deg);
  }

  .side-top .arrow {
    left: var(--wc-tooltip-arrow-offset);
    bottom: -4px;
    margin-left: -4px;
  }

  .side-bottom .arrow {
    left: var(--wc-tooltip-arrow-offset);
    top: -4px;
    margin-left: -4px;
  }

  .side-left .arrow {
    top: var(--wc-tooltip-arrow-offset);
    right: -4px;
    margin-top: -4px;
  }

  .side-right .arrow {
    top: var(--wc-tooltip-arrow-offset);
    left: -4px;
    margin-top: -4px;
  }

  @media (prefers-reduced-motion: reduce) {
    .panel {
      transition: none;
    }
  }
`;
