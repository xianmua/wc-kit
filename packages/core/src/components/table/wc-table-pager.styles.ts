import { css } from 'lit';

export const tablePagerStyles = css`
  :host {
    display: block;
  }

  .table-pager {
    display: block;
  }

  /* 分页区靠左对齐 */
  .pager {
    display: flex;
    justify-content: flex-start;
    margin-top: var(--wc-space-3);
  }
`;
