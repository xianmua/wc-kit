import { css } from 'lit';

/** 容器（wc-segmented）样式 */
export const segmentedStyles = css`
  :host {
    display: inline-block;
    /* component 层令牌：引用 semantic 层，允许按实例覆盖 */
    --wc-segmented-bg: var(--wc-color-bg-hover);
    --wc-segmented-thumb-bg: var(--wc-color-bg-container);
  }

  .segmented {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 2px;
    background-color: var(--wc-segmented-bg);
    border-radius: var(--wc-radius-medium);
    /* 滑块在选中项位移时需要裁剪 */
    overflow: hidden;
    /* 滑块位置由内部绝对定位元素撑起，不参与 flex 排列 */
    --wc-segmented-item-height: 28px;
  }

  :host([block]) .segmented {
    display: flex;
    width: 100%;
  }

  :host([size='small']) .segmented {
    --wc-segmented-item-height: 20px;
    font-size: var(--wc-font-size-small);
  }

  :host([size='large']) .segmented {
    --wc-segmented-item-height: 36px;
    font-size: var(--wc-font-size-large);
  }

  :host([disabled]) .segmented {
    cursor: not-allowed;
  }

  :host([disabled]) .segmented ::slotted(wc-segmented-item) {
    --wc-segmented-item-color: var(--wc-color-text-disabled);
    pointer-events: none;
  }

  /* 滑块：绝对定位骑在选中项下方（left/width 由 JS 按选中项实测写入） */
  .thumb {
    position: absolute;
    top: 2px;
    bottom: 2px;
    z-index: 0;
    display: none;
    background-color: var(--wc-segmented-thumb-bg);
    border-radius: var(--wc-radius-small);
    box-shadow: var(--wc-shadow-1);
  }

  .thumb[data-ready] {
    display: block;
    transition:
      left var(--wc-duration-medium) var(--wc-easing-standard),
      width var(--wc-duration-medium) var(--wc-easing-standard);
  }

  /* block 模式：子项等分宽度（flex 提示，宿主文档同规则优先级更高也不影响语义） */
  :host([block]) .segmented ::slotted(wc-segmented-item) {
    flex: 1;
  }
`;

/** 选项（wc-segmented-item）样式 */
export const segmentedItemStyles = css`
  :host {
    /* 跟随容器字号（size small/large 经继承下发） */
    font-size: inherit;
    display: block;
  }

  .item {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wc-space-1);
    width: 100%;
    height: var(--wc-segmented-item-height, 28px);
    padding: 0 var(--wc-space-4);
    font: inherit;
    color: var(--wc-segmented-item-color, var(--wc-color-text-secondary));
    white-space: nowrap;
    background: transparent;
    border: none;
    border-radius: var(--wc-radius-small);
    cursor: pointer;
    transition: color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  :host(:not([disabled])) .item:hover {
    color: var(--wc-color-primary);
  }

  :host(.selected) .item {
    color: var(--wc-color-text);
  }

  :host([disabled]) .item {
    color: var(--wc-segmented-item-color, var(--wc-color-text-disabled));
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    .item {
      transition: none;
    }
  }
`;
