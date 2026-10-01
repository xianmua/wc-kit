import { css } from 'lit';

export const inputNumberStyles = css`
  :host {
    display: inline-block;
    width: 144px;

    /* component 层令牌 */
    --wc-input-number-height: 32px;
    --wc-input-number-padding-x: var(--wc-space-2);
    --wc-input-number-font-size: var(--wc-font-size-medium);
    --wc-input-number-radius: var(--wc-radius-medium);
    --wc-input-number-step-width: 28px;
  }

  :host([size='small']) {
    --wc-input-number-height: 24px;
    --wc-input-number-padding-x: var(--wc-space-1);
    --wc-input-number-font-size: var(--wc-font-size-small);
    --wc-input-number-step-width: 24px;
  }

  :host([size='large']) {
    --wc-input-number-height: 40px;
    --wc-input-number-padding-x: var(--wc-space-3);
    --wc-input-number-font-size: var(--wc-font-size-large);
    --wc-input-number-step-width: 32px;
  }

  .number {
    display: flex;
    align-items: stretch;
    width: 100%;
    height: var(--wc-input-number-height);
    background-color: var(--wc-color-bg-container);
    border: 1px solid var(--wc-color-border);
    border-radius: var(--wc-input-number-radius);
    transition:
      border-color var(--wc-duration-fast) var(--wc-easing-standard),
      box-shadow var(--wc-duration-fast) var(--wc-easing-standard),
      background-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .number:focus-within {
    border-color: var(--wc-color-primary);
    box-shadow: 0 0 0 2px var(--wc-color-focus-ring);
  }

  .inner {
    flex: 1;
    min-width: 0;
    padding: 0 var(--wc-input-number-padding-x);
    font-family: inherit;
    font-size: var(--wc-input-number-font-size);
    color: var(--wc-color-text);
    text-align: center;
    background: transparent;
    border: none;
    outline: none;
    caret-color: var(--wc-color-primary);
  }

  :host([theme='column']) .inner,
  :host([theme='normal']) .inner {
    text-align: inherit;
  }

  .inner::placeholder {
    color: var(--wc-color-text-placeholder);
  }

  .inner:disabled {
    cursor: not-allowed;
  }

  .step {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--wc-input-number-step-width);
    padding: 0;
    color: var(--wc-color-text-secondary);
    cursor: pointer;
    background: transparent;
    border: none;
    border-radius: 0;
    transition:
      background-color var(--wc-duration-fast) var(--wc-easing-standard),
      color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .step:hover:not(:disabled):not(:active) {
    color: var(--wc-color-primary);
    background-color: var(--wc-color-bg-hover);
  }

  .step:active:not(:disabled) {
    color: var(--wc-color-primary-active);
  }

  .step:disabled {
    color: var(--wc-color-text-disabled);
    cursor: not-allowed;
  }

  .step wc-icon {
    pointer-events: none;
  }

  /* ---- column 主题：步进按钮右侧纵向堆叠 ---- */
  .stepper {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 22px;
    border-left: 1px solid var(--wc-color-border);
  }

  :host([theme='column']) .step {
    flex: 1;
    width: 100%;
  }

  :host([theme='column']) .step wc-icon {
    font-size: 10px;
  }

  .stepper .step + .step {
    border-top: 1px solid var(--wc-color-border);
  }

  /* row 主题：左右两个按钮与边框衔接处不留圆角缝隙 */
  :host([theme='row']) .number {
    overflow: hidden;
  }

  /* ---- 校验状态 ---- */
  :host([status='success']) .number {
    border-color: var(--wc-color-success);
  }

  :host([status='warning']) .number {
    border-color: var(--wc-color-warning);
  }

  :host([status='error']) .number {
    border-color: var(--wc-color-error);
  }

  :host([status='error']) .number:focus-within {
    border-color: var(--wc-color-error);
    box-shadow: 0 0 0 2px var(--wc-color-error-light);
  }

  /* ---- 禁用 / 只读 ---- */
  :host([disabled]) .number {
    background-color: var(--wc-color-bg-disabled);
    border-color: transparent;
    cursor: not-allowed;
  }

  :host([disabled]) .inner {
    color: var(--wc-color-text-disabled);
  }

  :host([readonly]) .number {
    border-style: dashed;
  }
`;
