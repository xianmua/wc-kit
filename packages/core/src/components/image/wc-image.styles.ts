import { css } from 'lit';

export const imageStyles = css`
  :host {
    --wc-image-bg: var(--wc-color-bg-container-secondary);
    --wc-image-radius: var(--wc-radius-medium);
    --wc-image-mask-bg: rgb(0 0 0 / 75%);
    --wc-image-tool-bg: rgb(255 255 255 / 16%);
    --wc-image-tool-bg-hover: rgb(255 255 255 / 28%);
    --wc-image-tool-color: #fff;
    display: inline-block;
    vertical-align: middle;
  }

  .frame {
    position: relative;
    width: var(--wc-image-width, 240px);
    height: var(--wc-image-height, 160px);
    overflow: hidden;
    background: var(--wc-image-bg);
  }

  :host([shape='rounded']) .frame {
    border-radius: var(--wc-image-radius);
  }

  :host([shape='circle']) .frame {
    border-radius: 50%;
  }

  .frame img {
    display: block;
    width: 100%;
    height: 100%;
  }

  /* 点击触发层：仅在开启预览且加载成功时出现 */
  .trigger {
    position: absolute;
    inset: 0;
    z-index: 1;
    cursor: zoom-in;
  }

  .trigger:focus-visible {
    outline: 2px solid var(--wc-color-primary);
    outline-offset: -2px;
  }

  /* 加载中 / 失败占位层 */
  .layer {
    position: absolute;
    inset: 0;
    z-index: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--wc-space-2);
    color: var(--wc-color-text-placeholder);
    font-size: var(--wc-font-size-small);
  }

  /* 大图预览浮层 */
  .overlay {
    position: fixed;
    inset: 0;
    z-index: var(--wc-z-index-modal);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--wc-image-mask-bg);
    animation: wc-image-fade var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .stage {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: grab;
  }

  .stage.dragging {
    cursor: grabbing;
  }

  .stage img {
    max-width: 90vw;
    max-height: 90vh;
    user-select: none;
    transition: transform var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .stage.dragging img {
    transition: none;
  }

  .toolbar {
    position: absolute;
    left: 50%;
    bottom: var(--wc-space-6);
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: var(--wc-space-1);
    padding: var(--wc-space-2) var(--wc-space-3);
    background: var(--wc-image-tool-bg);
    border-radius: var(--wc-radius-circle);
    backdrop-filter: blur(4px);
  }

  .toolbar button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--wc-image-tool-color);
    font-size: var(--wc-font-size-small);
    cursor: pointer;
    transition: background var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .toolbar button:hover {
    background: var(--wc-image-tool-bg-hover);
  }

  @keyframes wc-image-fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
