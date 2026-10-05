import { css } from 'lit';

export const emptyStyles = css`
  :host {
    display: block;
  }

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--wc-space-8) var(--wc-space-4);
    text-align: center;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--wc-color-text-placeholder);
    /* 默认 inbox 图标 1em 跟随 font-size；自定义 slot 内容同样继承此尺寸 */
    font-size: var(--wc-empty-icon-size, 48px);
  }

  /* baseStyles 的 :host font-size(14px) 会掐断继承链，外层树规则强制接管（同 color 继承案） */
  .icon wc-icon,
  .icon ::slotted(wc-icon) {
    font-size: inherit;
  }

  .description {
    margin-top: var(--wc-space-3);
    color: var(--wc-color-text-secondary);
    font-size: var(--wc-font-size-medium);
  }

  .action {
    margin-top: var(--wc-space-4);
  }

  .action:empty {
    display: none;
  }
`;
