import { css } from 'lit';

export const tablePagerStyles = css`
  :host {
    display: block;
  }

  .table-pager {
    display: block;
  }

  /* 分页区右对齐（antd Table bottomRight 同款） */
  .pager {
    display: flex;
    justify-content: flex-end;
    margin-top: var(--wc-space-3);
  }
`;
