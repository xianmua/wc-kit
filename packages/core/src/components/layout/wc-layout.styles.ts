import { css } from 'lit';

export const layoutStyles = css`
  :host {
    display: block;
  }

  wc-row,
  :host(wc-row) {
    display: block;
  }

  wc-col,
  :host(wc-col) {
    display: contents;
  }

  .row {
    display: flex;
    column-gap: var(--wc-row-gutter, 0);
  }

  .row slot {
    display: contents;
  }

  :host([wrap]) .row {
    flex-wrap: wrap;
  }

  .justify-start {
    justify-content: flex-start;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-end {
    justify-content: flex-end;
  }

  .justify-space-between {
    justify-content: space-between;
  }

  .justify-space-around {
    justify-content: space-around;
  }

  .justify-space-evenly {
    justify-content: space-evenly;
  }

  .align-top {
    align-items: flex-start;
  }

  .align-middle {
    align-items: center;
  }

  .align-bottom {
    align-items: flex-end;
  }

  .align-stretch {
    align-items: stretch;
  }

  .col {
    box-sizing: border-box;
    min-width: 0;
    padding-right: calc(var(--wc-row-gutter, 0) / 2);
    padding-left: calc(var(--wc-row-gutter, 0) / 2);
  }
`;
