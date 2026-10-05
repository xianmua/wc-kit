import { css } from 'lit';

export const floatButtonGroupStyles = css`
  :host {
    position: fixed;
    bottom: var(--wc-float-button-bottom, 24px);
    right: var(--wc-float-button-right, 24px);
    z-index: var(--wc-z-index-fab);
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: var(--wc-float-button-gap, 8px);

    /* component 层令牌 */
    --wc-float-button-gap: 8px;
  }

  /*
   * 子按钮自身 :host 是 fixed 定位（standalone 用），进组后必须改随布局——
   * 外层 shadow 树的声明优先于内层 :host，这里再加内联样式双保险（slotchange 同步）
   */
  .trigger-btn {
    position: static;
    z-index: auto;
  }

  ::slotted(wc-float-button) {
    position: static;
    z-index: auto;
  }

  .trigger-ico {
    transition: transform var(--wc-duration-fast) var(--wc-easing-standard);
  }

  /* 展开时 plus 旋转成 × */
  :host([open]) .trigger-ico {
    transform: rotate(45deg);
  }

  .items {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--wc-float-button-gap, 8px);
  }

  /* trigger 模式：面板悬浮于触发按钮上方（absolute 脱离布局，收起不影响定位） */
  :host([trigger]) .items {
    position: absolute;
    right: 0;
    bottom: calc(100% + var(--wc-float-button-gap, 8px));
    opacity: 0;
    visibility: hidden;
    transform: translateY(6px) scale(0.9);
    transform-origin: bottom center;
    transition:
      opacity var(--wc-duration-fast) var(--wc-easing-standard),
      transform var(--wc-duration-fast) var(--wc-easing-standard),
      visibility var(--wc-duration-fast);
  }

  :host([trigger]) .items[data-open] {
    opacity: 1;
    visibility: visible;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .items,
    .trigger-ico {
      transition: none;
    }
  }
`;
