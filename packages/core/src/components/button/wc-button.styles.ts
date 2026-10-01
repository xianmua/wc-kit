import { css } from 'lit';

export const buttonStyles = css`
  :host {
    display: inline-block;
    /* component 层令牌：引用 semantic 层，允许按实例覆盖 */
    --wc-button-height: 32px;
    --wc-button-padding-x: var(--wc-space-4);
    --wc-button-font-size: var(--wc-font-size-medium);
    --wc-button-radius: var(--wc-radius-medium);
  }

  :host([size='small']) {
    --wc-button-height: 24px;
    --wc-button-padding-x: var(--wc-space-2);
    --wc-button-font-size: var(--wc-font-size-small);
  }

  :host([size='large']) {
    --wc-button-height: 40px;
    --wc-button-padding-x: 20px;
    --wc-button-font-size: var(--wc-font-size-large);
  }

  :host([block]) {
    display: block;
    width: 100%;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--wc-space-1);
    width: 100%;
    height: var(--wc-button-height);
    padding: 0 var(--wc-button-padding-x);
    border: 1px solid transparent;
    border-radius: var(--wc-button-radius);
    font-family: inherit;
    font-size: var(--wc-button-font-size);
    line-height: 1;
    cursor: pointer;
    user-select: none;
    transition:
      background-color var(--wc-duration-fast) var(--wc-easing-standard),
      border-color var(--wc-duration-fast) var(--wc-easing-standard),
      color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .button:disabled {
    cursor: not-allowed;
  }

  .icon[hidden] {
    display: none;
  }

  /* ---- theme: default ---- */
  :host([variant='base']) .button {
    background-color: var(--wc-color-bg-container);
    border-color: var(--wc-color-border);
    color: var(--wc-color-text);
  }
  :host([variant='base']) .button:hover:not(:disabled) {
    border-color: var(--wc-color-primary);
    color: var(--wc-color-primary);
  }

  /* ---- theme: primary ---- */
  :host([theme='primary'][variant='base']) .button {
    background-color: var(--wc-color-primary);
    border-color: var(--wc-color-primary);
    color: #ffffff;
  }
  :host([theme='primary'][variant='base']) .button:hover:not(:disabled) {
    background-color: var(--wc-color-primary-hover);
    border-color: var(--wc-color-primary-hover);
  }
  :host([theme='primary'][variant='base']) .button:active:not(:disabled) {
    background-color: var(--wc-color-primary-active);
    border-color: var(--wc-color-primary-active);
  }

  /* ---- variant: outline / dashed（继承 theme 色） ---- */
  :host([variant='outline']) .button,
  :host([variant='dashed']) .button {
    background-color: transparent;
    border-color: var(--wc-color-primary);
    color: var(--wc-color-primary);
  }
  :host([variant='dashed']) .button {
    border-style: dashed;
  }
  :host([variant='outline']) .button:hover:not(:disabled),
  :host([variant='dashed']) .button:hover:not(:disabled) {
    background-color: var(--wc-color-primary);
    color: #ffffff;
  }

  /* ---- variant: text ---- */
  :host([variant='text']) .button {
    background-color: transparent;
    border-color: transparent;
    color: var(--wc-color-primary);
  }
  :host([variant='text']) .button:hover:not(:disabled) {
    background-color: var(--wc-color-bg);
  }

  /* ---- 禁用态 ---- */
  .button:disabled {
    background-color: var(--wc-color-bg-disabled);
    border-color: transparent;
    color: var(--wc-color-text-disabled);
  }

  /* ---- 加载态 spinner ---- */
  .button[aria-busy='true'] .content {
    opacity: 0.7;
  }
`;
