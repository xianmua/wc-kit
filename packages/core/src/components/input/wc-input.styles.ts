import { css } from 'lit';

export const inputStyles = css`
  :host {
    display: inline-block;
    width: 240px;

    /* component 层令牌 */
    --wc-input-height: 32px;
    --wc-input-padding-x: var(--wc-space-2);
    --wc-input-font-size: var(--wc-font-size-medium);
    --wc-input-radius: var(--wc-radius-medium);
  }

  :host([size='small']) {
    --wc-input-height: 24px;
    --wc-input-padding-x: var(--wc-space-1);
    --wc-input-font-size: var(--wc-font-size-small);
  }

  :host([size='large']) {
    --wc-input-height: 40px;
    --wc-input-padding-x: var(--wc-space-3);
    --wc-input-font-size: var(--wc-font-size-large);
  }

  .input {
    display: inline-flex;
    align-items: center;
    gap: var(--wc-space-1);
    width: 100%;
    height: var(--wc-input-height);
    padding: 0 var(--wc-input-padding-x);
    background-color: var(--wc-color-bg-container);
    border: 1px solid var(--wc-color-border);
    border-radius: var(--wc-input-radius);
    transition:
      border-color var(--wc-duration-fast) var(--wc-easing-standard),
      box-shadow var(--wc-duration-fast) var(--wc-easing-standard),
      background-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  /* 焦点态：外层容器统一呈现，内层去掉原生 outline 避免双重 */
  .input:focus-within {
    border-color: var(--wc-color-primary);
    box-shadow: 0 0 0 2px var(--wc-color-focus-ring);
  }

  .inner {
    flex: 1;
    min-width: 0;
    height: 100%;
    font-family: inherit;
    font-size: var(--wc-input-font-size);
    color: var(--wc-color-text);
    background: transparent;
    border: none;
    outline: none;
    caret-color: var(--wc-color-primary);
  }

  .inner::placeholder {
    color: var(--wc-color-text-placeholder);
  }

  .inner:disabled {
    cursor: not-allowed;
  }

  .affix {
    display: inline-flex;
    align-items: center;
    color: var(--wc-color-text-placeholder);
    flex-shrink: 0;
  }

  .affix[hidden] {
    display: none;
  }

  .clear {
    width: 16px;
    height: 16px;
    justify-content: center;
    padding: 0;
    border-radius: var(--wc-radius-circle);
    background: transparent;
    color: var(--wc-color-text-placeholder);
    cursor: pointer;
  }

  .clear:hover {
    color: var(--wc-color-text-secondary);
  }

  /* ---- 校验状态 ---- */
  :host([status='success']) .input {
    border-color: var(--wc-color-success);
  }

  :host([status='warning']) .input {
    border-color: var(--wc-color-warning);
  }

  :host([status='error']) .input {
    border-color: var(--wc-color-error);
  }

  :host([status='error']) .input:focus-within {
    border-color: var(--wc-color-error);
    box-shadow: 0 0 0 2px var(--wc-color-error-light);
  }

  /* ---- 禁用 / 只读 ---- */
  :host([disabled]) .input {
    background-color: var(--wc-color-bg-disabled);
    border-color: transparent;
    cursor: not-allowed;
  }

  :host([disabled]) .inner {
    color: var(--wc-color-text-disabled);
  }

  :host([readonly]) .input {
    border-style: dashed;
  }
`;
