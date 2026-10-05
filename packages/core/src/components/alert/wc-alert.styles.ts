import { css } from 'lit';

export const alertStyles = css`
  :host {
    display: block;
    /* component 层令牌：引用 semantic 层，允许按实例覆盖 */
    --wc-alert-radius: var(--wc-radius-medium);
  }

  :host([closed]) {
    display: none;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: var(--wc-space-2);
    padding: var(--wc-space-3);
    overflow: hidden;
    font-size: var(--wc-font-size-medium);
    line-height: 1.6;
    background-color: var(--wc-color-info-bg);
    border-radius: var(--wc-alert-radius);
  }

  /* 左侧语义色圆头竖条：与 menu/anchor 选中指示条同一视觉语言 */
  .indicator {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 3px;
    background-color: var(--wc-color-info);
    border-radius: var(--wc-radius-round);
  }

  :host([theme='success']) .alert {
    background-color: var(--wc-color-success-bg);
  }
  :host([theme='success']) .indicator {
    background-color: var(--wc-color-success);
  }
  :host([theme='success']) .icon {
    color: var(--wc-color-success);
  }

  :host([theme='warning']) .alert {
    background-color: var(--wc-color-warning-bg);
  }
  :host([theme='warning']) .indicator {
    background-color: var(--wc-color-warning);
  }
  :host([theme='warning']) .icon {
    color: var(--wc-color-warning);
  }

  :host([theme='danger']) .alert {
    background-color: var(--wc-color-error-bg);
  }
  :host([theme='danger']) .indicator {
    background-color: var(--wc-color-error);
  }
  :host([theme='danger']) .icon {
    color: var(--wc-color-error);
  }

  .icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    margin-top: 3px;
    color: var(--wc-color-info);
    background: none;
    font-size: var(--wc-font-size-large);
  }

  .body {
    flex: 1;
    min-width: 0;
  }

  .title {
    margin-bottom: var(--wc-space-1);
    color: var(--wc-color-text);
    font-weight: 600;
    line-height: 1.5;
  }

  .content {
    color: var(--wc-color-text-secondary);
  }

  .close {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--wc-color-text-placeholder);
    cursor: pointer;
    font-size: var(--wc-font-size-medium);
    transition: color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .close:hover {
    color: var(--wc-color-text);
  }
`;
