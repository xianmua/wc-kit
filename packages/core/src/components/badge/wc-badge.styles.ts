import { css } from 'lit';

export const badgeStyles = css`
  :host {
    position: relative;
    display: inline-flex;
  }

  .badge {
    position: absolute;
    top: 0;
    right: 0;
    z-index: var(--wc-z-index-popover, 1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    color: var(--wc-color-text-anti);
    font-size: var(--wc-font-size-xsmall);
    line-height: 1;
    white-space: nowrap;
    background-color: var(--wc-color-error);
    border-radius: var(--wc-radius-round);
    transform: translate(50%, -50%);
  }

  :host([dot]) .badge {
    min-width: 6px;
    width: 6px;
    height: 6px;
    padding: 0;
  }

  :host([theme='primary']) .badge {
    background-color: var(--wc-color-primary);
  }

  :host([theme='success']) .badge {
    background-color: var(--wc-color-success);
  }

  :host([theme='warning']) .badge {
    background-color: var(--wc-color-warning);
  }

  :host([theme='danger']) .badge {
    background-color: var(--wc-color-error);
  }
`;
