import { css } from 'lit';

export const menuStyles = css`
  :host {
    display: block;
    /* component 层令牌：引用 semantic 层，允许按实例覆盖 */
    --wc-menu-radius: var(--wc-radius-medium);
  }

  .menu {
    display: flex;
    flex-direction: column;
    gap: var(--wc-space-1);
    padding: var(--wc-space-2);
    background-color: var(--wc-color-bg-container);
    border-radius: var(--wc-menu-radius);
  }

  :host([bordered]) .menu {
    border: 1px solid var(--wc-color-border);
  }

  :host([mode='horizontal']) .menu {
    flex-direction: row;
    align-items: center;
  }

  /* 垂直模式下条目通栏；水平模式条目收为内容宽 */
  :host(:not([mode='horizontal'])) ::slotted(wc-menu-item),
  :host(:not([mode='horizontal'])) ::slotted(wc-sub-menu) {
    width: 100%;
  }
`;
