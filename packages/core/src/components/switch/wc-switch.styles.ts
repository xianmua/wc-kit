import { css } from 'lit';

export const switchStyles = css`
  :host {
    display: inline-block;

    /* component 层令牌 */
    --wc-switch-width: 40px;
    --wc-switch-height: 22px;
    --wc-switch-thumb: 18px;
  }

  .switch {
    display: inline-flex;
    align-items: center;
    gap: var(--wc-space-2);
    font-size: var(--wc-font-size-medium);
    color: var(--wc-color-text);
    cursor: pointer;
    user-select: none;
  }

  /* 原生 input 隐藏但保持可聚焦（键盘空格切换） */
  .native {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: 0;
    opacity: 0;
    pointer-events: none;
  }

  .track {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: var(--wc-switch-width);
    height: var(--wc-switch-height);
    padding: 2px;
    background-color: var(--wc-color-gray-300);
    border-radius: var(--wc-radius-round);
    flex-shrink: 0;
    transition: background-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .thumb {
    width: var(--wc-switch-thumb);
    height: var(--wc-switch-thumb);
    border-radius: var(--wc-radius-circle);
    background-color: var(--wc-color-text-anti);
    box-shadow: var(--wc-shadow-1);
    transform: translateX(0);
    transition: transform var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .native:focus-visible + .track {
    box-shadow: 0 0 0 2px var(--wc-color-focus-ring);
  }

  :host([checked]) .track {
    background-color: var(--wc-color-primary);
  }

  :host([checked]) .thumb {
    transform: translateX(calc(var(--wc-switch-width) - var(--wc-switch-height)));
  }

  .switch:hover .track {
    background-color: var(--wc-color-gray-400);
  }

  :host([checked]) .switch:hover .track {
    background-color: var(--wc-color-primary-hover);
  }

  :host([disabled]) .switch {
    cursor: not-allowed;
    color: var(--wc-color-text-disabled);
  }

  :host([disabled]) .track {
    background-color: var(--wc-color-bg-disabled);
  }

  :host([disabled]) .thumb {
    background-color: var(--wc-color-gray-100);
    box-shadow: none;
  }

  .label {
    line-height: var(--wc-line-height-base);
  }
`;
