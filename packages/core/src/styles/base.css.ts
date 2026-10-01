import { css } from 'lit';

/**
 * 组件共享基础样式，每个组件的 static styles 中首先引入。
 */
export const baseStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    display: inline-block;
    font-family: var(--wc-font-family);
    font-size: var(--wc-font-size-medium);
    line-height: var(--wc-line-height-base);
    color: var(--wc-color-text);
    -webkit-tap-highlight-color: transparent;
  }

  :host([hidden]) {
    display: none;
  }

  :focus-visible {
    outline: 2px solid var(--wc-color-focus-ring);
    outline-offset: 2px;
  }

  :focus:not(:focus-visible) {
    outline: none;
  }
`;
