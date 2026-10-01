import { css } from 'lit';

export const sliderStyles = css`
  :host {
    display: inline-block;
    width: 240px;

    /* component 层令牌 */
    --wc-slider-height: 20px;
    --wc-slider-track-height: 4px;
    --wc-slider-thumb-size: 16px;
  }

  .slider {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 100%;
    height: var(--wc-slider-height);
    touch-action: none;
  }

  .track {
    width: 100%;
    height: var(--wc-slider-track-height);
    background-color: var(--wc-color-gray-200);
    border-radius: var(--wc-radius-round);
    overflow: hidden;
  }

  .fill {
    height: 100%;
    background-color: var(--wc-color-primary);
    transition: width var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .thumb {
    position: absolute;
    top: 50%;
    width: var(--wc-slider-thumb-size);
    height: var(--wc-slider-thumb-size);
    background-color: var(--wc-color-bg-container);
    border: 2px solid var(--wc-color-primary);
    border-radius: var(--wc-radius-circle);
    box-shadow: var(--wc-shadow-1);
    box-sizing: border-box;
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: left var(--wc-duration-fast) var(--wc-easing-standard);
  }

  /* 原生 range 覆盖整个区域接收交互，视觉隐藏 */
  .native {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }

  .native:focus-visible ~ .thumb {
    box-shadow: 0 0 0 2px var(--wc-color-focus-ring);
  }

  .native:disabled {
    cursor: not-allowed;
  }

  :host([disabled]) .track {
    background-color: var(--wc-color-bg-disabled);
  }

  :host([disabled]) .fill {
    background-color: var(--wc-color-border);
  }

  :host([disabled]) .thumb {
    border-color: var(--wc-color-border);
    box-shadow: none;
  }
`;
