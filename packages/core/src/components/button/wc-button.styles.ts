import { css } from 'lit';

export const buttonStyles = css`
  :host {
    display: inline-block;
    /* component 层令牌：引用 semantic 层，允许按实例覆盖 */
    --wc-button-height: 32px;
    --wc-button-padding-x: var(--wc-space-4);
    --wc-button-font-size: var(--wc-font-size-medium);
    --wc-button-radius: var(--wc-radius-medium);
  }

  :host([size='small']) {
    --wc-button-height: 24px;
    --wc-button-padding-x: var(--wc-space-2);
    --wc-button-font-size: var(--wc-font-size-small);
  }

  :host([size='large']) {
    --wc-button-height: 40px;
    --wc-button-padding-x: 20px;
    --wc-button-font-size: var(--wc-font-size-large);
  }

  :host([block]) {
    display: block;
    width: 100%;
  }

  .button {
    /* 波纹 span 需按按钮定位且裁剪在圆角内；outline 聚焦环不受 overflow 影响 */
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--wc-space-1);
    width: 100%;
    height: var(--wc-button-height);
    padding: 0 var(--wc-button-padding-x);
    border: 1px solid transparent;
    border-radius: var(--wc-button-radius);
    font-family: inherit;
    font-size: var(--wc-button-font-size);
    line-height: 1;
    cursor: pointer;
    user-select: none;
    transition:
      background-color var(--wc-duration-fast) var(--wc-easing-standard),
      border-color var(--wc-duration-fast) var(--wc-easing-standard),
      color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  /* 聚焦环 offset 可被外层上下文覆写（如 button-group 内改为 -2px 内嵌，
     避免光环叠在相邻按钮上）；同名规则晚于 baseStyles 生效 */
  :focus-visible {
    outline-offset: var(--wc-button-focus-ring-offset, 2px);
  }

  .button:disabled {
    cursor: not-allowed;
  }

  /*
   * 图标容器必须显式 flex 居中：默认 inline 的 span 内部按行内盒基线摆放
   * inline-flex 图标，基线取图标底边，行盒被字体 descent 撑高 → 图标偏移 1-2px。
   * z-index: 1 保证内容在波纹之上。
   */
  .icon {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    position: relative;
    z-index: 1;
  }

  .icon[hidden] {
    display: none;
  }

  /* 纯图标按钮：宽度收为与高度相等的正方形 */
  :host(.wc-button--icon-only) .button {
    width: var(--wc-button-height);
    padding: 0;
  }

  /* ---- theme 语义色变量：base 实色底与 outline/dashed/text/link 前景色统一从这里取 ---- */
  :host {
    --wc-button-theme-color: var(--wc-color-primary);
    --wc-button-theme-hover: var(--wc-color-primary-hover);
    --wc-button-theme-active: var(--wc-color-primary-active);
  }
  :host([theme='success']) {
    --wc-button-theme-color: var(--wc-color-success);
    --wc-button-theme-hover: var(--wc-color-success-dark);
    --wc-button-theme-active: var(--wc-color-success-dark);
  }
  :host([theme='warning']) {
    --wc-button-theme-color: var(--wc-color-warning);
    --wc-button-theme-hover: var(--wc-color-warning-dark);
    --wc-button-theme-active: var(--wc-color-warning-dark);
  }
  :host([theme='danger']) {
    --wc-button-theme-color: var(--wc-color-error);
    --wc-button-theme-hover: var(--wc-color-error-dark);
    --wc-button-theme-active: var(--wc-color-error-dark);
  }

  /* ---- theme: default ---- */
  :host([type='base']) .button {
    background-color: var(--wc-color-bg-container);
    border-color: var(--wc-color-border);
    color: var(--wc-color-text);
  }
  :host([theme='default'][type='base']) .button:hover:not(:disabled) {
    border-color: var(--wc-button-theme-color);
    color: var(--wc-button-theme-color);
  }

  /* ---- theme: primary / success / warning / danger 的 base 变体：实色底 ---- */
  :host([theme='primary'][type='base']) .button,
  :host([theme='success'][type='base']) .button,
  :host([theme='warning'][type='base']) .button,
  :host([theme='danger'][type='base']) .button {
    background-color: var(--wc-button-theme-color);
    border-color: var(--wc-button-theme-color);
    color: var(--wc-color-text-anti);
  }
  :host([theme='primary'][type='base']) .button:hover:not(:disabled),
  :host([theme='success'][type='base']) .button:hover:not(:disabled),
  :host([theme='warning'][type='base']) .button:hover:not(:disabled),
  :host([theme='danger'][type='base']) .button:hover:not(:disabled) {
    background-color: var(--wc-button-theme-hover);
    border-color: var(--wc-button-theme-hover);
    color: var(--wc-color-text-anti);
  }
  :host([theme='primary'][type='base']) .button:active:not(:disabled),
  :host([theme='success'][type='base']) .button:active:not(:disabled),
  :host([theme='warning'][type='base']) .button:active:not(:disabled),
  :host([theme='danger'][type='base']) .button:active:not(:disabled) {
    background-color: var(--wc-button-theme-active);
    border-color: var(--wc-button-theme-active);
    color: var(--wc-color-text-anti);
  }

  /* ---- type: outline / dashed（继承 theme 色） ---- */
  :host([type='outline']) .button,
  :host([type='dashed']) .button {
    background-color: transparent;
    border-color: var(--wc-button-theme-color);
    color: var(--wc-button-theme-color);
  }
  :host([type='dashed']) .button {
    border-style: dashed;
  }
  :host([type='outline']) .button:hover:not(:disabled),
  :host([type='dashed']) .button:hover:not(:disabled) {
    background-color: var(--wc-button-theme-hover);
    border-color: var(--wc-button-theme-hover);
    color: var(--wc-color-text-anti);
  }

  /* ---- type: text ---- */
  :host([type='text']) .button {
    background-color: transparent;
    border-color: transparent;
    color: var(--wc-button-theme-color);
  }
  :host([type='text']) .button:hover:not(:disabled) {
    background-color: var(--wc-color-bg);
  }

  /* ---- type: link ---- */
  :host([type='link']) .button {
    background-color: transparent;
    border-color: transparent;
    color: var(--wc-button-theme-color);
  }
  :host([type='link']) .button:hover:not(:disabled) {
    color: var(--wc-button-theme-hover);
  }

  /* ---- ghost 幽灵模式（透明底 + 主题色边框/文字，用于深色背景） ----
     base 变体换透明底；outline/dashed 本就透明，仅把悬停实色填充换成半透明淡底；
     :not 链保证禁用态不受影响 */
  :host([ghost][type='base']:not([disabled]):not([loading])) .button {
    background-color: transparent;
    border-color: var(--wc-button-theme-color);
    color: var(--wc-button-theme-color);
  }
  :host([ghost][type='base']:not([disabled]):not([loading])) .button:hover:not(:disabled),
  :host([ghost][type='outline']:not([disabled]):not([loading])) .button:hover:not(:disabled),
  :host([ghost][type='dashed']:not([disabled]):not([loading])) .button:hover:not(:disabled) {
    background-color: var(
      --wc-button-ghost-hover-bg,
      color-mix(in srgb, var(--wc-button-theme-color) 12%, transparent)
    );
    border-color: var(--wc-button-theme-color);
    color: var(--wc-button-theme-color);
  }

  /* ---- gradient 渐变底（仅 base 变体且非 default 主题） ----
     主题色与 hover 色明度相差太小（肉眼近似纯色），端点改用 color-mix 混白提亮
     拉开对比；background-image 不可 transition，与 antd 一致不做渐变过渡 */
  :host([gradient][type='base']:not([theme='default']):not([disabled]):not([loading])) .button {
    background-image: linear-gradient(
      135deg,
      color-mix(in srgb, var(--wc-button-theme-color) 65%, #fff),
      var(--wc-button-theme-color)
    );
  }
  :host([gradient][type='base']:not([theme='default']):not([disabled]):not([loading]))
    .button:hover:not(:disabled) {
    background-image: linear-gradient(
      135deg,
      color-mix(in srgb, var(--wc-button-theme-hover) 65%, #fff),
      var(--wc-button-theme-hover)
    );
  }

  /* ---- ripple 点击波纹（span.ripple 由 handleClick 动态插入） ---- */
  .ripple {
    position: absolute;
    z-index: 0;
    border-radius: 50%;
    pointer-events: none;
    background-color: var(
      --wc-button-ripple-color,
      color-mix(in srgb, currentColor 45%, transparent)
    );
    transform: scale(0);
    opacity: 0.6;
    animation: wc-ripple var(--wc-button-ripple-duration, 600ms) var(--wc-easing-standard) forwards;
  }

  @keyframes wc-ripple {
    to {
      transform: scale(1);
      opacity: 0;
    }
  }

  /* 减弱动态效果：不渲染波纹动画（span 停留在 scale(0) 不可见） */
  @media (prefers-reduced-motion: reduce) {
    .ripple {
      animation: none;
    }
  }

  /* ---- 禁用态 ---- */
  .button:disabled {
    background-color: var(--wc-color-bg-disabled);
    border-color: transparent;
    color: var(--wc-color-text-disabled);
  }

  /* ---- 加载态 spinner ---- */
  .button[aria-busy='true'] .content {
    opacity: 0.7;
  }
`;
