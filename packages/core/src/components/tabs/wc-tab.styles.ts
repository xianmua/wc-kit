import { css } from 'lit';

export const tabStyles = css`
  :host {
    display: block;
    /* 顶部留白由容器下发：竖排（left/right）时容器置 0 使面板与首个标签顶对齐 */
    padding-top: var(--wc-tab-panel-padding-top, var(--wc-space-3));
    font-size: var(--wc-font-size-medium);
    line-height: var(--wc-font-line-height, 1.6);
    color: var(--wc-color-text);
  }

  :host(:not(.active)) {
    display: none;
  }
`;
