import { css } from 'lit';

export const subMenuStyles = css`
  :host {
    display: block;
    min-width: 0;
  }

  /* ---- 展开头复用菜单项样式，此处仅补箭头 ---- */
  .arrow {
    transition: transform var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .arrow.up {
    transform: rotate(180deg);
  }

  /* ---- 垂直内联展开 ---- */
  .sub {
    display: none;
    flex-direction: column;
    gap: var(--wc-space-1);
    padding: var(--wc-space-1) 0 0 var(--wc-space-3);
  }

  .sub[data-open] {
    display: flex;
  }

  :host(.horizontal) .sub {
    display: none;
  }

  /* ---- 水平弹出层（fixed 定位同 dropdown） ---- */
  .sub.popup {
    position: fixed;
    z-index: var(--wc-z-index-dropdown);
    min-width: var(--wc-sub-menu-min-width, 140px);
    padding: var(--wc-space-1);
    background-color: var(--wc-color-bg-container);
    border-radius: var(--wc-radius-medium);
    box-shadow: var(--wc-shadow-2);
  }

  :host(.horizontal) .sub.popup[data-open] {
    display: flex;
  }
`;
