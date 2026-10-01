import { css } from 'lit';

export const iconStyles = css`
  :host {
    display: inline-flex;
    /* 尺寸默认 1em，跟随 font-size 缩放；颜色继承 currentColor */
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    line-height: 1;
  }

  [part='base'] {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
    fill: currentColor;
    /* 描边风格图标的关键：继承文字颜色 */
    color: currentColor;
    pointer-events: none;
  }

  :host([spin]) svg,
  :host([pulse]) svg {
    transform-origin: center;
    animation: wc-spin var(--wc-duration-slow, 1s) linear infinite;
  }

  /* pulse：旋转 + 缓动呼吸感，用于加载中区分度更高的场景 */
  :host([pulse]) svg {
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  }

  @keyframes wc-spin {
    from {
      rotate: 0deg;
    }
    to {
      rotate: 360deg;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :host([spin]) svg,
    :host([pulse]) svg {
      animation: none;
    }
  }
`;
