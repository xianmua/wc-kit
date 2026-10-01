import { css } from 'lit';

/** wc-form 与 wc-form-item 共用样式 */
export const formStyles = css`
  :host {
    display: block;
  }

  .form {
    margin: 0;
    padding: 0;
  }

  .item {
    display: grid;
    grid-template-columns: var(--wc-form-label-width, 80px) 1fr;
    gap: var(--wc-space-2);
    align-items: start;
    margin-bottom: var(--wc-space-4);
  }

  .label {
    padding-right: var(--wc-space-2);
    font-size: var(--wc-font-size-medium);
    line-height: var(--wc-form-line-height, 32px);
    color: var(--wc-color-text);
    text-align: right;
    overflow-wrap: break-word;
  }

  .asterisk {
    margin-right: 2px;
    color: var(--wc-color-error);
  }

  .asterisk[hidden] {
    display: none;
  }

  .control {
    min-width: 0;
  }

  .error {
    margin-top: var(--wc-space-1);
    font-size: var(--wc-font-size-small);
    color: var(--wc-color-error);
  }

  .error[hidden] {
    display: none;
  }

  :host([disabled]) .label {
    color: var(--wc-color-text-disabled);
  }
`;
