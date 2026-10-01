import { css } from 'lit';

export const drawerStyles = css`
  :host {
    display: contents;

    /* component 层令牌 */
    --wc-drawer-size: 500px;
  }

  .overlay {
    position: fixed;
    inset: 0;
    z-index: var(--wc-z-index-drawer);
    background: rgb(0 0 0 / 45%);
    animation: wc-drawer-fade var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .overlay[hidden] {
    display: none;
  }

  .drawer {
    position: absolute;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow: hidden;
    background-color: var(--wc-color-bg-container);
    box-shadow: var(--wc-shadow-2);
    outline: none;
    animation: wc-drawer-in var(--wc-duration-medium) var(--wc-easing-standard);
  }

  /* ---- 四个方向 ---- */
  .placement-right {
    inset: 0 0 0 auto;
    width: min(var(--wc-drawer-size), 100%);
    height: 100%;
    --wc-drawer-from: translateX(100%);
  }

  .placement-left {
    inset: 0 auto 0 0;
    width: min(var(--wc-drawer-size), 100%);
    height: 100%;
    --wc-drawer-from: translateX(-100%);
  }

  .placement-bottom {
    inset: auto 0 0 0;
    width: 100%;
    height: var(--wc-drawer-size);
    --wc-drawer-from: translateY(100%);
  }

  .placement-top {
    inset: 0 0 auto 0;
    width: 100%;
    height: var(--wc-drawer-size);
    --wc-drawer-from: translateY(-100%);
  }

  /* ---- 页头 ---- */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--wc-space-2);
    padding: var(--wc-space-4) var(--wc-space-6) 0;
  }

  .title {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    font-size: var(--wc-font-size-large);
    font-weight: var(--wc-font-weight-semibold);
    color: var(--wc-color-text);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .close {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    padding: var(--wc-space-1);
    font-size: var(--wc-font-size-medium);
    color: var(--wc-color-text-placeholder);
    cursor: pointer;
    background: transparent;
    border: none;
    border-radius: var(--wc-radius-small);
    transition:
      color var(--wc-duration-fast) var(--wc-easing-standard),
      background-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .close:hover {
    color: var(--wc-color-text);
    background-color: var(--wc-color-bg-hover);
  }

  /* ---- 内容区 ---- */
  .body {
    flex: 1;
    min-height: 0;
    padding: var(--wc-space-4) var(--wc-space-6);
    overflow-y: auto;
    font-size: var(--wc-font-size-medium);
    color: var(--wc-color-text);
  }

  /* ---- 页脚 ---- */
  .footer {
    display: flex;
    gap: var(--wc-space-2);
    justify-content: flex-end;
    padding: var(--wc-space-2) var(--wc-space-6) var(--wc-space-4);
  }

  .footer slot {
    display: contents;
  }

  @keyframes wc-drawer-fade {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes wc-drawer-in {
    from {
      transform: var(--wc-drawer-from, translateX(100%));
    }

    to {
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .overlay,
    .drawer {
      animation: none;
    }
  }
`;
