import { css } from 'lit';

export const tablePagerStyles = css`
  :host {
    display: block;
  }

  .table-pager {
    display: block;
  }

  /* 总条数独立靠左，其余分页控件靠右；未显示总条数时整体靠右 */
  .pager {
    display: flex;
    justify-content: flex-end;
    margin-top: var(--wc-space-3);
  }

  .pager.has-total {
    justify-content: space-between;
  }

  .total {
    color: var(--wc-color-text-secondary);
  }
`;
