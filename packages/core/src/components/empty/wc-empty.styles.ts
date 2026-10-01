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
  }

  /* 默认占位图形：圆角方块 + 内嵌虚线圆，柔和示意「空」 */
  .placeholder {
    position: relative;
    display: block;
    width: 56px;
    height: 56px;
    background-color: var(--wc-color-bg-hover);
    border-radius: var(--wc-radius-xlarge);
  }

  .placeholder::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 24px;
    border: 2px dashed var(--wc-color-text-placeholder);
    border-radius: var(--wc-radius-circle);
    transform: translate(-50%, -50%);
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
