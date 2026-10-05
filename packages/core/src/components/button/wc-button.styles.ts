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

  /* 纯图标按钮：宽度收为与高度相等的正方形 */
  :host(.wc-button--icon-only) .button {
    width: var(--wc-button-height);
    padding: 0;
  }

  /* ---- theme 语义色变量：base 实色底与 outline/dashed/text/link 前景色统一从这里取 ---- */
  :host {
    --wc-button-theme-color: var(--wc-color-primary);
    --wc-button-theme-hover: var(--wc-color-primary-hover);
    --wc-button-theme-active: var(--wc-color-primary-active);
  }
  :host([theme='success']) {
    --wc-button-theme-color: var(--wc-color-success);
    --wc-button-theme-hover: var(--wc-color-success-dark);
    --wc-button-theme-active: var(--wc-color-success-dark);
  }
  :host([theme='warning']) {
    --wc-button-theme-color: var(--wc-color-warning);
    --wc-button-theme-hover: var(--wc-color-warning-dark);
    --wc-button-theme-active: var(--wc-color-warning-dark);
  }
  :host([theme='danger']) {
    --wc-button-theme-color: var(--wc-color-error);
    --wc-button-theme-hover: var(--wc-color-error-dark);
    --wc-button-theme-active: var(--wc-color-error-dark);
  }

  /* ---- theme: default ---- */
  :host([variant='base']) .button {
    background-color: var(--wc-color-bg-container);
    border-color: var(--wc-color-border);
    color: var(--wc-color-text);
  }
  :host([theme='default'][variant='base']) .button:hover:not(:disabled) {
    border-color: var(--wc-button-theme-color);
    color: var(--wc-button-theme-color);
  }

  /* ---- theme: primary / success / warning / danger 的 base 变体：实色底 ---- */
  :host([theme='primary'][variant='base']) .button,
  :host([theme='success'][variant='base']) .button,
  :host([theme='warning'][variant='base']) .button,
  :host([theme='danger'][variant='base']) .button {
    background-color: var(--wc-button-theme-color);
    border-color: var(--wc-button-theme-color);
    color: var(--wc-color-text-anti);
  }
  :host([theme='primary'][variant='base']) .button:hover:not(:disabled),
  :host([theme='success'][variant='base']) .button:hover:not(:disabled),
  :host([theme='warning'][variant='base']) .button:hover:not(:disabled),
  :host([theme='danger'][variant='base']) .button:hover:not(:disabled) {
    background-color: var(--wc-button-theme-hover);
    border-color: var(--wc-button-theme-hover);
    color: var(--wc-color-text-anti);
  }
  :host([theme='primary'][variant='base']) .button:active:not(:disabled),
  :host([theme='success'][variant='base']) .button:active:not(:disabled),
  :host([theme='warning'][variant='base']) .button:active:not(:disabled),
  :host([theme='danger'][variant='base']) .button:active:not(:disabled) {
    background-color: var(--wc-button-theme-active);
    border-color: var(--wc-button-theme-active);
    color: var(--wc-color-text-anti);
  }

  /* ---- variant: outline / dashed（继承 theme 色） ---- */
  :host([variant='outline']) .button,
  :host([variant='dashed']) .button {
    background-color: transparent;
    border-color: var(--wc-button-theme-color);
    color: var(--wc-button-theme-color);
  }
  :host([variant='dashed']) .button {
    border-style: dashed;
  }
  :host([variant='outline']) .button:hover:not(:disabled),
  :host([variant='dashed']) .button:hover:not(:disabled) {
    background-color: var(--wc-button-theme-hover);
    border-color: var(--wc-button-theme-hover);
    color: var(--wc-color-text-anti);
  }

  /* ---- variant: text ---- */
  :host([variant='text']) .button {
    background-color: transparent;
    border-color: transparent;
    color: var(--wc-button-theme-color);
  }
  :host([variant='text']) .button:hover:not(:disabled) {
    background-color: var(--wc-color-bg);
  }

  /* ---- variant: link ---- */
  :host([variant='link']) .button {
    background-color: transparent;
    border-color: transparent;
    color: var(--wc-button-theme-color);
  }
  :host([variant='link']) .button:hover:not(:disabled) {
    color: var(--wc-button-theme-hover);
    text-decoration: underline;
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
