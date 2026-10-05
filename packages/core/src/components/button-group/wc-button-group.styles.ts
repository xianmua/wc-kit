import { css } from 'lit';

export const buttonGroupStyles = css`
  :host {
    display: inline-block;

    /* component 层令牌：首尾按钮保留的圆角 */
    --wc-button-group-radius: var(--wc-radius-medium);
  }

  .group {
    display: inline-flex;
    vertical-align: middle;
  }

  /*
   * ::slotted 只能作用于子 wc-button 的宿主元素，圆角与边距通过
   * --wc-button-radius 自定义属性穿透进按钮的 Shadow DOM
   *（外层作用域对宿主的声明优先于组件内 :host 声明）。
   * 注意令牌名不能与按钮自身的 --wc-button-radius 同名，否则自引用失效。
   */
  ::slotted(wc-button) {
    --wc-button-radius: 0;
    /* 聚焦环内嵌：光环画在按钮边缘内侧，避免叠在相邻按钮上造成割裂感 */
    --wc-button-focus-ring-offset: -2px;
    position: relative;
  }

  /* 边距合并由组件用内联样式实现（见 _syncMargins），CSS 声明会被外层 reset 压过 */

  /* 悬停/聚焦的上层按钮边框完整可见 */
  ::slotted(wc-button:hover),
  ::slotted(wc-button:focus-within) {
    z-index: 1;
  }

  ::slotted(wc-button:first-child) {
    --wc-button-radius: var(--wc-button-group-radius) 0 0 var(--wc-button-group-radius);
  }

  ::slotted(wc-button:last-child) {
    --wc-button-radius: 0 var(--wc-button-group-radius) var(--wc-button-group-radius) 0;
  }

  ::slotted(wc-button:only-child) {
    --wc-button-radius: var(--wc-button-group-radius);
  }
`;
