import { css } from 'lit';

export const optionStyles = css`
  :host {
    display: block;
  }

  .option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--wc-space-2);
    padding: 0 var(--wc-space-3);
    height: 32px;
    font-size: var(--wc-font-size-medium);
    color: var(--wc-color-text);
    cursor: pointer;
    user-select: none;
    transition: background-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .text {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .check {
    width: 14px;
    height: 14px;
    color: var(--wc-color-primary);
    flex-shrink: 0;
    opacity: 0;
  }

  :host([selected]) .check {
    opacity: 1;
  }

  :host([selected]:not([active])) .text {
    color: var(--wc-color-primary);
    font-weight: var(--wc-font-weight-medium);
  }

  :host(:hover:not([disabled])) .option,
  :host([active]:not([disabled])) .option {
    background-color: var(--wc-color-bg-hover);
  }

  :host([disabled]) .option {
    color: var(--wc-color-text-disabled);
    cursor: not-allowed;
  }
`;
