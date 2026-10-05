import { css } from 'lit';

export const tagStyles = css`
  :host {
    display: inline-block;

    /* component 层令牌 */
    --wc-tag-height: 24px;
    --wc-tag-font-size: var(--wc-font-size-small);
    --wc-tag-padding-x: var(--wc-space-2);
    --wc-tag-radius: var(--wc-radius-small);
  }

  :host([size='small']) {
    --wc-tag-height: 20px;
    --wc-tag-font-size: var(--wc-font-size-small);
    --wc-tag-padding-x: var(--wc-space-1);
  }

  :host([size='large']) {
    --wc-tag-height: 28px;
    --wc-tag-font-size: var(--wc-font-size-medium);
    --wc-tag-padding-x: var(--wc-space-2);
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: var(--wc-space-1);
    height: var(--wc-tag-height);
    padding: 0 var(--wc-tag-padding-x);
    font-size: var(--wc-tag-font-size);
    line-height: 1;
    white-space: nowrap;
    border: 1px solid transparent;
    border-radius: var(--wc-tag-radius);
    box-sizing: border-box;
    transition: opacity var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .icon {
    display: inline-flex;
    align-items: center;
    font-size: 1em;
  }

  /* 未分配图标时 slot 渲染占位 fallback，隐藏以消除多余间隙 */
  .icon:has(.icon-placeholder) {
    display: none;
  }

  /* ---- 关闭按钮 ---- */
  .close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    padding: 0;
    font-size: 10px;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: none;
    border-radius: var(--wc-radius-circle);
    transition: background-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .close:hover {
    background-color: var(--wc-color-overlay-hover);
  }

  .close wc-icon {
    pointer-events: none;
  }

  /* ---- default 主题 ---- */
  :host([theme='default']) .tag {
    color: var(--wc-color-text);
    background-color: var(--wc-color-bg-container-secondary);
    border-color: var(--wc-color-border);
  }

  /* ---- 语义色 × light 浅底（默认 variant） ---- */
  :host([theme='primary']) .tag {
    color: var(--wc-color-primary);
    background-color: var(--wc-color-primary-light);
  }

  :host([theme='success']) .tag {
    color: var(--wc-color-success);
    background-color: var(--wc-color-success-bg);
  }

  :host([theme='warning']) .tag {
    color: var(--wc-color-warning);
    background-color: var(--wc-color-warning-bg);
  }

  :host([theme='danger']) .tag {
    color: var(--wc-color-error);
    background-color: var(--wc-color-error-bg);
  }

  /* ---- dark 实底 ---- */
  :host([variant='dark'][theme='default']) .tag {
    color: var(--wc-color-text-anti);
    background-color: var(--wc-color-text-secondary);
    border-color: transparent;
  }

  :host([variant='dark'][theme='primary']) .tag {
    color: var(--wc-color-text-anti);
    background-color: var(--wc-color-primary);
  }

  :host([variant='dark'][theme='success']) .tag {
    color: var(--wc-color-text-anti);
    background-color: var(--wc-color-success);
  }

  :host([variant='dark'][theme='warning']) .tag {
    color: var(--wc-color-text-anti);
    background-color: var(--wc-color-warning);
  }

  :host([variant='dark'][theme='danger']) .tag {
    color: var(--wc-color-text-anti);
    background-color: var(--wc-color-error);
  }

  /* ---- outline 描边 ---- */
  :host([variant='outline']) .tag {
    background-color: transparent;
  }

  :host([variant='outline'][theme='default']) .tag {
    border-color: var(--wc-color-border);
  }

  :host([variant='outline'][theme='primary']) .tag {
    border-color: var(--wc-color-primary);
  }

  :host([variant='outline'][theme='success']) .tag {
    border-color: var(--wc-color-success);
  }

  :host([variant='outline'][theme='warning']) .tag {
    border-color: var(--wc-color-warning);
  }

  :host([variant='outline'][theme='danger']) .tag {
    border-color: var(--wc-color-error);
  }

  /* ---- 禁用 ---- */
  :host([disabled]) .tag {
    cursor: not-allowed;
    opacity: 0.5;
  }

  :host([disabled]) .close {
    cursor: not-allowed;
  }
`;
