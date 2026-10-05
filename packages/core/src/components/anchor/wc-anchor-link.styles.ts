import { css } from 'lit';

export const anchorLinkStyles = css`
  :host {
    display: block;
    min-width: 0;
  }

  .link {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: var(--wc-space-2);
    height: var(--wc-anchor-link-height, 32px);
    padding: 0 var(--wc-space-3);
    border-radius: var(--wc-anchor-link-radius, var(--wc-radius-small));
    color: var(--wc-color-text);
    font-size: var(--wc-font-size-medium);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    outline: none;
    box-sizing: border-box;
    transition:
      color var(--wc-duration-fast) var(--wc-easing-standard),
      background-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .link:hover {
    color: var(--wc-color-primary);
    background-color: var(--wc-color-bg-hover);
  }

  /* ---- 选中：主题色文字 + 指示条（垂直左侧圆头条 / 水平底条，与 Menu、Tabs 同语言） ---- */
  .link.selected {
    color: var(--wc-color-primary);
    font-weight: var(--wc-font-weight-semibold);
  }

  .link.selected::before {
    content: '';
    position: absolute;
    top: 50%;
    left: calc(-1 * var(--wc-space-2));
    width: 3px;
    height: 60%;
    background-color: var(--wc-color-primary);
    border-radius: var(--wc-radius-round);
    transform: translateY(-50%);
  }

  :host([anchor-horizontal]) .link.selected::before {
    top: auto;
    right: var(--wc-space-3);
    bottom: 0;
    left: var(--wc-space-3);
    width: auto;
    height: 2px;
    transform: none;
  }

  /* ---- 嵌套层级缩进（嵌套链接由 slotchange 分流到命名 slot） ---- */
  ::slotted(wc-anchor-link) {
    margin-left: var(--wc-space-4);
  }

  :host([anchor-horizontal]) slot[name='sub'] {
    display: none;
  }

  .link:focus-visible {
    outline: 2px solid var(--wc-color-primary);
    outline-offset: -2px;
  }
`;
