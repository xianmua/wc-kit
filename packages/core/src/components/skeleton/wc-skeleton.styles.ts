import { css } from 'lit';

/* 骨架屏基础样式：wc-skeleton 与 wc-skeleton-item 共用一套底色/圆角/动画令牌 */
export const skeletonSharedStyles = css`
  :host {
    /* component 层令牌：引用 semantic 层，允许按实例覆盖 */
    --wc-skeleton-bg: var(--wc-color-bg-disabled);
    --wc-skeleton-radius: var(--wc-radius-small);
    --wc-skeleton-duration: 1.4s;
  }
`;

export const skeletonPulseStyles = css`
  @keyframes wc-skeleton-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.55;
    }
  }

  .animated {
    animation: wc-skeleton-pulse var(--wc-skeleton-duration) var(--wc-easing-standard) infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .animated {
      animation: none;
    }
  }
`;

/* wc-skeleton 组合布局（头像 + 标题行 + 正文行） */
export const skeletonStyles = css`
  ${skeletonSharedStyles}

  :host {
    display: block;
  }

  .skeleton {
    display: flex;
    gap: var(--wc-space-3);
  }

  .avatar {
    flex: none;
    width: var(--wc-space-10);
    height: var(--wc-space-10);
    background-color: var(--wc-skeleton-bg);
    border-radius: var(--wc-radius-circle);
  }

  .lines {
    flex: 1;
    min-width: 0;
  }

  .line {
    height: var(--wc-space-4);
    margin-bottom: var(--wc-space-3);
    background-color: var(--wc-skeleton-bg);
    border-radius: var(--wc-skeleton-radius);
  }

  .line.title {
    width: 33%;
  }

  .line.last {
    width: 60%;
    margin-bottom: 0;
  }
`;
