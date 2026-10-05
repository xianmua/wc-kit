import { css } from 'lit';

export const iconStyles = css`
  :host {
    display: inline-flex;
    /*
     * 覆盖 baseStyles 的 :host { color: var(--wc-color-text) }——组件自身 :host
     * 声明的优先级高于继承，不改为 inherit 的话，图标放进实色按钮等深色上下文
     * 时会被强制成文字色而非跟随 currentColor（currentColor → stroke 继承链断裂）。
     */
    color: inherit;
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
    /* 不设 fill：描边图标由 SVG 根的 fill="none" 决定（CSS 会覆盖 presentation attribute，
       设 fill: currentColor 会把闭合形状整体填充导致发糊）；填充型图标由各自 SVG 声明。
       颜色统一走 color → stroke="currentColor" 继承。 */
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
