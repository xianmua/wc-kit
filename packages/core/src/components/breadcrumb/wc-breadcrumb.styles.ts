import { css } from 'lit';

export const breadcrumbStyles = css`
  :host {
    display: block;
  }

  /* 条目由 shadow 渲染，light-DOM 子元素仅用于收集元数据 */
  slot {
    display: none;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--wc-space-1);
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: var(--wc-font-size-medium);
  }

  .item {
    display: inline-flex;
    align-items: center;
  }

  .separator {
    display: inline-flex;
    align-items: center;
    color: var(--wc-color-text-placeholder);
    user-select: none;
  }

  .link {
    color: var(--wc-color-text-secondary);
    text-decoration: none;
    cursor: pointer;
    transition: color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .link:hover {
    color: var(--wc-color-primary);
  }

  .link[data-disabled] {
    color: var(--wc-color-text-disabled);
    cursor: not-allowed;
  }

  .link[data-disabled]:hover {
    color: var(--wc-color-text-disabled);
  }

  .current {
    color: var(--wc-color-text);
    font-weight: var(--wc-font-weight-medium);
  }
`;
