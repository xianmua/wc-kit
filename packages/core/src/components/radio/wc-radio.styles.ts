import { css } from 'lit';

export const radioStyles = css`
  :host {
    display: inline-block;

    /* component 层令牌 */
    --wc-radio-size: 16px;
  }

  .radio {
    display: inline-flex;
    align-items: center;
    gap: var(--wc-space-2);
    font-size: var(--wc-font-size-medium);
    color: var(--wc-color-text);
    cursor: pointer;
    user-select: none;
  }

  /* 原生 input 隐藏但保持可聚焦（键盘方向键切换） */
  .native {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: 0;
    opacity: 0;
    pointer-events: none;
  }

  .dot {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--wc-radio-size);
    height: var(--wc-radio-size);
    background-color: var(--wc-color-bg-container);
    border: 1px solid var(--wc-color-border-strong);
    border-radius: var(--wc-radius-circle);
    flex-shrink: 0;
    transition: border-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .inner {
    width: calc(var(--wc-radio-size) / 2 - 1px);
    height: calc(var(--wc-radio-size) / 2 - 1px);
    border-radius: var(--wc-radius-circle);
    background-color: var(--wc-color-primary);
    opacity: 0;
    transform: scale(0);
    transition:
      opacity var(--wc-duration-fast) var(--wc-easing-standard),
      transform var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .native:focus-visible + .dot {
    box-shadow: 0 0 0 2px var(--wc-color-focus-ring);
  }

  :host([checked]) .dot {
    border-color: var(--wc-color-primary);
  }

  :host([checked]) .inner {
    opacity: 1;
    transform: scale(1);
  }

  .radio:hover .dot {
    border-color: var(--wc-color-primary);
  }

  :host([disabled]) .radio {
    cursor: not-allowed;
    color: var(--wc-color-text-disabled);
  }

  :host([disabled]) .dot {
    background-color: var(--wc-color-bg-disabled);
    border-color: var(--wc-color-border);
  }

  :host([disabled][checked]) .dot {
    border-color: var(--wc-color-border);
  }

  :host([disabled][checked]) .inner {
    background-color: var(--wc-color-text-disabled);
  }

  .label {
    line-height: var(--wc-line-height-base);
  }
`;
