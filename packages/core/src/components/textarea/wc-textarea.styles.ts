import { css } from 'lit';

export const textareaStyles = css`
  :host {
    display: inline-block;
    width: 320px;

    /* component 层令牌 */
    --wc-textarea-min-height: 80px;
    --wc-textarea-padding-y: var(--wc-space-2);
    --wc-textarea-padding-x: var(--wc-space-2);
    --wc-textarea-font-size: var(--wc-font-size-medium);
    --wc-textarea-radius: var(--wc-radius-medium);
  }

  .textarea {
    position: relative;
    display: inline-flex;
    width: 100%;
    min-height: var(--wc-textarea-min-height);
    background-color: var(--wc-color-bg-container);
    border: 1px solid var(--wc-color-border);
    border-radius: var(--wc-textarea-radius);
    transition:
      border-color var(--wc-duration-fast) var(--wc-easing-standard),
      box-shadow var(--wc-duration-fast) var(--wc-easing-standard),
      background-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .textarea:focus-within {
    border-color: var(--wc-color-primary);
    box-shadow: 0 0 0 2px var(--wc-color-focus-ring);
  }

  .inner {
    flex: 1;
    width: 100%;
    padding: var(--wc-textarea-padding-y) var(--wc-textarea-padding-x);
    font-family: inherit;
    font-size: var(--wc-textarea-font-size);
    line-height: var(--wc-line-height-base);
    color: var(--wc-color-text);
    background: transparent;
    border: none;
    outline: none;
    resize: vertical;
    caret-color: var(--wc-color-primary);
  }

  /* autosize 时接管高度，禁用手动拉伸 */
  :host([autosize]) .inner {
    resize: none;
    overflow: hidden;
  }

  .inner::placeholder {
    color: var(--wc-color-text-placeholder);
  }

  .inner:disabled {
    cursor: not-allowed;
  }

  .count {
    position: absolute;
    right: var(--wc-textarea-padding-x);
    bottom: var(--wc-textarea-padding-y);
    font-size: var(--wc-font-size-small);
    color: var(--wc-color-text-placeholder);
    background: var(--wc-color-bg-container);
    pointer-events: none;
  }

  :host([status='success']) .textarea {
    border-color: var(--wc-color-success);
  }

  :host([status='warning']) .textarea {
    border-color: var(--wc-color-warning);
  }

  :host([status='error']) .textarea {
    border-color: var(--wc-color-error);
  }

  :host([status='error']) .textarea:focus-within {
    border-color: var(--wc-color-error);
    box-shadow: 0 0 0 2px var(--wc-color-error-light);
  }

  :host([disabled]) .textarea {
    background-color: var(--wc-color-bg-disabled);
    border-color: transparent;
    cursor: not-allowed;
  }

  :host([disabled]) .inner {
    color: var(--wc-color-text-disabled);
  }

  :host([readonly]) .textarea {
    border-style: dashed;
  }
`;
