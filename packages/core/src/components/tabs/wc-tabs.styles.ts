import { css } from 'lit';

export const tabsStyles = css`
  :host {
    display: flex;
    flex-direction: column;
  }

  /* right：标签栏在右，横向排列（bottom 保持纵向，DOM 顺序已保证 bar 在下） */
  :host([tab-position='right']) {
    flex-direction: row;
  }

  /* 竖排：可见面板撑满标签栏以外区域；slot 默认 display:contents，flex 尺寸需下到 wc-tab 宿主 */
  :host([tab-position='left']) ::slotted(wc-tab),
  :host([tab-position='right']) ::slotted(wc-tab) {
    flex: 1;
    min-width: 0;
    /* 面板与首个标签顶对齐（wc-tab 读取该令牌作为面板顶部留白） */
    --wc-tab-panel-padding-top: 0px;
  }

  .bar {
    display: flex;
    gap: var(--wc-space-2);
    border-bottom: 1px solid var(--wc-color-border);
  }

  /* 竖排（left/right）：标签栏转为纵向，分隔线转向内容侧 */
  :host([tab-position='left']) .bar,
  :host([tab-position='right']) .bar {
    flex-direction: column;
    align-items: flex-start;
    border-bottom: none;
    border-right: 1px solid var(--wc-color-border);
  }

  :host([tab-position='right']) .bar {
    border-right: none;
    border-left: 1px solid var(--wc-color-border);
  }

  .tab {
    position: relative;
    padding: var(--wc-space-2) var(--wc-space-4);
    font-size: var(--wc-font-size-medium);
    line-height: var(--wc-font-line-height, 1.6);
    color: var(--wc-color-text);
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
    transition:
      color var(--wc-duration-fast) var(--wc-easing-standard),
      background-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .tab::after {
    content: '';
    position: absolute;
    right: var(--wc-space-3);
    bottom: -1px;
    left: var(--wc-space-3);
    height: 2px;
    background-color: var(--wc-color-primary);
    border-radius: var(--wc-radius-small);
    opacity: 0;
    transform: scaleX(0.4);
    transition:
      opacity var(--wc-duration-fast) var(--wc-easing-standard),
      transform var(--wc-duration-fast) var(--wc-easing-standard);
  }

  /* 竖排：指示条贴在分隔线上（left 在右缘 / right 在左缘），纵向展开 */
  :host([tab-position='left']) .tab::after,
  :host([tab-position='right']) .tab::after {
    top: var(--wc-space-2);
    right: auto;
    bottom: auto;
    left: auto;
    width: 2px;
    height: auto;
    transform: scaleY(0.4);
  }

  :host([tab-position='left']) .tab::after {
    right: -1px;
  }

  :host([tab-position='right']) .tab::after {
    left: -1px;
  }

  .tab:hover {
    color: var(--wc-color-primary);
    background-color: var(--wc-color-bg-hover);
  }

  .tab[aria-selected='true'] {
    color: var(--wc-color-primary);
    font-weight: var(--wc-font-weight-semibold);
  }

  .tab[aria-selected='true']::after {
    opacity: 1;
    transform: none;
  }

  .tab:focus-visible {
    box-shadow: 0 0 0 2px var(--wc-color-focus-ring);
  }

  .tab[data-disabled] {
    color: var(--wc-color-text-disabled);
    cursor: not-allowed;
    background-color: transparent;
  }
`;
