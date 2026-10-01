import { css } from 'lit';

export const paginationStyles = css`
  :host {
    display: block;
  }

  .pagination {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--wc-space-1);
    font-size: var(--wc-font-size-medium);
  }

  .total {
    margin-right: var(--wc-space-2);
    color: var(--wc-color-text-secondary);
  }

  .page-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 var(--wc-space-2);
    color: var(--wc-color-text);
    font: inherit;
    background: transparent;
    border: none;
    border-radius: var(--wc-radius-small);
    cursor: pointer;
    transition:
      color var(--wc-duration-fast) var(--wc-easing-standard),
      background-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .page-button:hover:not(:disabled) {
    color: var(--wc-color-primary);
    background-color: var(--wc-color-bg-hover);
  }

  .page-button:disabled {
    color: var(--wc-color-text-disabled);
    cursor: not-allowed;
    background: transparent;
  }

  .page-button[aria-current='page'] {
    color: var(--wc-color-primary);
    font-weight: var(--wc-font-weight-medium);
    background-color: var(--wc-color-primary-light);
  }

  .ellipsis {
    min-width: 32px;
    color: var(--wc-color-text-placeholder);
    letter-spacing: 1px;
    text-align: center;
    user-select: none;
  }

  .jumper {
    display: inline-flex;
    align-items: center;
    gap: var(--wc-space-2);
    margin-left: var(--wc-space-2);
    color: var(--wc-color-text-secondary);
  }

  .jumper-input {
    width: 56px;
    height: 32px;
    padding: 0 var(--wc-space-2);
    font: inherit;
    color: var(--wc-color-text);
    text-align: center;
    background: transparent;
    border: 1px solid var(--wc-color-border);
    border-radius: var(--wc-radius-small);
  }

  .jumper-input:focus {
    outline: none;
    border-color: var(--wc-color-primary);
  }

  .jumper-input:disabled {
    color: var(--wc-color-text-disabled);
    background-color: var(--wc-color-bg-disabled, var(--wc-color-bg-hover));
    cursor: not-allowed;
  }
`;
