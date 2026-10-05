import { css } from 'lit';

export const splitButtonStyles = css`
  :host {
    display: inline-block;

    /* component 层令牌：首尾圆角可覆写；聚焦环内嵌避免叠在相邻半边上 */
    --wc-split-button-radius: var(--wc-radius-medium);
    --wc-button-focus-ring-offset: -2px;
  }

  .group {
    display: inline-flex;
    vertical-align: middle;
  }

  /* 内部按钮去圆角、由两端各留单侧圆角（shadow 内部元素，普通选择器即可） */
  .main-btn {
    --wc-button-radius: var(--wc-split-button-radius) 0 0 var(--wc-split-button-radius);
  }

  .arrow-btn {
    --wc-button-radius: 0 var(--wc-split-button-radius) var(--wc-split-button-radius) 0;
    margin-left: -1px;
  }

  /* 悬停/聚焦的上层半边边框完整可见 */
  .main-btn:hover,
  .main-btn:focus-within {
    z-index: 1;
  }
`;
