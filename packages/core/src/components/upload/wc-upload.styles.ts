import { css } from 'lit';

export const uploadStyles = css`
  :host {
    display: block;

    /* component 层令牌 */
    --wc-upload-font-size: var(--wc-font-size-medium);
    --wc-upload-radius: var(--wc-radius-medium);
    --wc-upload-dragger-bg: var(--wc-color-bg-container);
  }

  .hidden-input {
    display: none;
  }

  /* ---- 默认触发按钮 ---- */
  .trigger-wrap {
    display: flex;
    align-items: center;
    gap: var(--wc-space-2);
  }

  .trigger {
    display: inline-flex;
    align-items: center;
    gap: var(--wc-space-1);
    height: 32px;
    padding: 0 var(--wc-space-3);
    font-family: inherit;
    font-size: var(--wc-upload-font-size);
    color: var(--wc-color-text);
    background-color: var(--wc-color-bg-container);
    border: 1px solid var(--wc-color-border);
    border-radius: var(--wc-upload-radius);
    cursor: pointer;
    user-select: none;
    transition:
      border-color var(--wc-duration-fast) var(--wc-easing-standard),
      color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .trigger:hover:not(:disabled) {
    border-color: var(--wc-color-primary);
    color: var(--wc-color-primary);
  }

  .trigger:disabled {
    background-color: var(--wc-color-bg-disabled);
    border-color: transparent;
    color: var(--wc-color-text-disabled);
    cursor: not-allowed;
  }

  /* ---- 拖拽区域 ---- */
  .dragger {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--wc-space-6) var(--wc-space-4);
    background-color: var(--wc-upload-dragger-bg);
    border: 1px dashed var(--wc-color-border);
    border-radius: var(--wc-upload-radius);
    cursor: pointer;
    user-select: none;
    text-align: center;
    transition:
      border-color var(--wc-duration-fast) var(--wc-easing-standard),
      background-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .dragger:hover:not([aria-disabled='true']),
  .dragger.drag-over {
    border-color: var(--wc-color-primary);
    background-color: var(--wc-color-bg-hover);
  }

  .dragger[aria-disabled='true'] {
    cursor: not-allowed;
    color: var(--wc-color-text-disabled);
  }

  .dragger-icon {
    font-size: 28px;
    color: var(--wc-color-text-placeholder);
  }

  .dragger:hover:not([aria-disabled='true']) .dragger-icon,
  .dragger.drag-over .dragger-icon {
    color: var(--wc-color-primary);
  }

  .dragger-text {
    margin-top: var(--wc-space-2);
    font-size: var(--wc-upload-font-size);
    color: var(--wc-color-text);
  }

  /* ---- 提示文字（tip 插槽） ---- */
  .tip {
    display: inline-block;
    margin-top: var(--wc-space-1);
    font-size: var(--wc-font-size-small);
    color: var(--wc-color-text-placeholder);
  }

  .tip:empty {
    display: none;
  }

  /* ---- 文件列表 ---- */
  .list {
    margin: var(--wc-space-2) 0 0;
    padding: 0;
    list-style: none;
  }

  .item {
    padding: var(--wc-space-1) var(--wc-space-2);
    border-radius: var(--wc-radius-small);
    transition: background-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .item:hover {
    background-color: var(--wc-color-bg-hover);
  }

  .row {
    display: flex;
    align-items: center;
    gap: var(--wc-space-2);
    min-height: 24px;
  }

  .type-icon {
    font-size: 16px;
    color: var(--wc-color-text-placeholder);
    flex-shrink: 0;
  }

  .item.success .type-icon {
    color: var(--wc-color-success);
  }

  .item.error .type-icon {
    color: var(--wc-color-error);
  }

  .name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: var(--wc-upload-font-size);
    color: var(--wc-color-text);
  }

  .name.link {
    color: var(--wc-color-primary);
    cursor: pointer;
  }

  .name.link:hover {
    text-decoration: underline;
  }

  .size,
  .percent,
  .fail-text {
    flex-shrink: 0;
    font-size: var(--wc-font-size-small);
    color: var(--wc-color-text-placeholder);
  }

  .fail-text {
    color: var(--wc-color-error);
  }

  .status-icon {
    font-size: 16px;
    flex-shrink: 0;
  }

  .status-icon.success {
    color: var(--wc-color-success);
  }

  .status-icon.error {
    color: var(--wc-color-error);
  }

  .status-icon.waiting {
    color: var(--wc-color-text-placeholder);
  }

  .icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .remove {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: var(--wc-radius-circle);
    color: var(--wc-color-text-placeholder);
    cursor: pointer;
    flex-shrink: 0;
  }

  /* wc-icon 的 :host 自带 text 色，这里让叉号跟随按钮的灰阶 */
  .remove wc-icon {
    color: inherit;
  }

  .remove:hover {
    color: var(--wc-color-text-secondary);
  }

  .bar {
    margin: var(--wc-space-1) 0 0 var(--wc-space-6);
  }
`;
