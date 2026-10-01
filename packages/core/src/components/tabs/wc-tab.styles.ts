import { css } from 'lit';

export const tabStyles = css`
  :host {
    display: block;
    padding-top: var(--wc-space-3);
    font-size: var(--wc-font-size-medium);
    line-height: var(--wc-font-line-height, 1.6);
    color: var(--wc-color-text);
  }

  :host(:not([active])) {
    display: none;
  }
`;
