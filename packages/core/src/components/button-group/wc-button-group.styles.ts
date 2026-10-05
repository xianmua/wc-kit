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
    position: relative;
  }

  /* 相邻边框合并：后一个左移 1px 压在前一个边框上 */
  ::slotted(wc-button:not(:first-child)) {
    margin-left: -1px;
  }

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
