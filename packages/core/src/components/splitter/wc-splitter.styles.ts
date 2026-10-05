import { css } from 'lit';

export const splitterStyles = css`
  :host {
    display: block;
    min-width: 0;
    min-height: 0;
    /* component 层令牌：引用 semantic 层，允许按实例覆盖 */
    --wc-splitter-divider-bg: var(--wc-color-border);
    --wc-splitter-divider-hover-bg: var(--wc-color-primary);
    --wc-splitter-grip-bg: var(--wc-color-text-disabled);
  }

  /* flex 容器是 .splitter wrapper（而非 :host）：pane/divider 都渲染在这层 wrapper 里，
     若把 flex 挂在 :host 上，wrapper 会成为无样式 block 独占一行，面板垂直堆叠 */
  .splitter {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  }

  :host([layout='vertical']) .splitter {
    flex-direction: column;
  }

  .pane {
    position: relative;
    flex: 0 0 auto;
    min-width: 0;
    min-height: 0;
  }

  /* ---- 分隔条：细线 + 拖拽热区（antd 方案：绝对定位骑在面板边界上，不占布局流） ----
     面板 flex-basis 相加恒为 100%，底色在边界处直接相接；分隔条永不隐藏——
     折叠后面板收成 0 宽，相邻两条分隔条重叠在同一边界（两条 1px 线重合仍是一条线）；
     子元素（细线/把手/折叠按钮）全部绝对定位：折叠按钮分居线两侧，各自独立可点 */
  .divider {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 9px;
    margin-left: -4.5px; /* 9px 热区中心对齐边界线 */
    z-index: 1;
    cursor: col-resize;
    outline-offset: var(--wc-splitter-focus-ring-offset, -2px);
    touch-action: none;
    user-select: none;
  }

  :host([layout='vertical']) .divider {
    top: auto;
    bottom: auto;
    left: 0;
    right: 0;
    width: auto;
    height: 9px;
    margin-left: 0;
    margin-top: -4.5px;
    cursor: row-resize;
  }

  /* 细线绝对居中于热区：不参与 flex 排列，只有一侧折叠按钮时也不会被挤偏 */
  .divider .bar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
    transform: translateX(-50%);
    background-color: var(--wc-splitter-divider-bg);
    transition: background-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  :host([layout='vertical']) .divider .bar {
    top: 50%;
    bottom: auto;
    left: 0;
    right: 0;
    width: auto;
    height: 1px;
    transform: translateY(-50%);
  }

  .divider:hover .bar,
  .divider[data-dragging] .bar {
    background-color: var(--wc-splitter-divider-hover-bg);
  }

  .divider:focus-visible .bar {
    background-color: var(--wc-splitter-divider-hover-bg);
  }

  /* ---- 拖拽把手：线中央的长圆头段（antd spinner 同位），常驻提示可拖拽 ---- */
  .divider .grip {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3px;
    height: 24px;
    transform: translate(-50%, -50%);
    border-radius: var(--wc-radius-round);
    background-color: var(--wc-splitter-grip-bg);
    pointer-events: none;
  }

  :host([layout='vertical']) .divider .grip {
    width: 24px;
    height: 3px;
  }

  /* ---- 折叠按钮：hover 分隔条（含悬停按钮自身，溢出区也算 :hover 范围）时浮现，
     左右各一枚独立按钮分居线两侧（prev 在线左、next 在线右，各留 3px 间距，antd 同款），
     各自只管自己相邻面板的折叠/展开，互不影响 ---- */
  .divider .col {
    position: absolute;
    top: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 16px;
    padding: 0;
    border: none;
    border-radius: var(--wc-radius-small);
    background-color: var(--wc-color-bg-hover);
    color: var(--wc-color-text);
    cursor: pointer;
    font-size: 10px;
    line-height: 1;
    z-index: 1;
  }

  .divider .col[data-dir='prev'] {
    right: calc(50% + 3px);
    transform: translateY(-50%);
  }

  .divider .col[data-dir='next'] {
    left: calc(50% + 3px);
    transform: translateY(-50%);
  }

  .divider:hover .col,
  .divider:focus-within .col {
    display: flex;
  }

  .divider .col:hover {
    background-color: var(--wc-color-primary-light);
  }

  /* 垂直布局：prev 在线上方、next 在线下方，横向居中 */
  :host([layout='vertical']) .divider .col {
    top: auto;
    left: 50%;
  }

  :host([layout='vertical']) .divider .col[data-dir='prev'] {
    bottom: calc(50% + 3px);
    transform: translateX(-50%);
  }

  :host([layout='vertical']) .divider .col[data-dir='next'] {
    top: calc(50% + 3px);
    transform: translateX(-50%);
  }

  .divider .col:focus-visible {
    outline: none;
    background-color: var(--wc-color-primary-light);
    color: var(--wc-color-primary);
  }
`;
