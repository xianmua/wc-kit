import { css } from 'lit';
import { skeletonSharedStyles } from './wc-skeleton.styles';

/* wc-skeleton-item：自由拼装的占位块，尺寸默认由宿主控制，变体只定形状 */
export const skeletonItemStyles = css`
  ${skeletonSharedStyles}

  :host {
    display: block;
    height: var(--wc-space-6);
  }

  :host([variant='text']) {
    height: var(--wc-space-4);
  }

  :host([variant='circle']) {
    width: var(--wc-space-10);
    aspect-ratio: 1;
  }

  .item {
    width: 100%;
    height: 100%;
    background-color: var(--wc-skeleton-bg);
    border-radius: var(--wc-skeleton-radius);
  }

  :host([variant='circle']) .item {
    border-radius: var(--wc-radius-circle);
  }

  :host([variant='rect']) .item {
    border-radius: var(--wc-skeleton-radius);
  }
`;
