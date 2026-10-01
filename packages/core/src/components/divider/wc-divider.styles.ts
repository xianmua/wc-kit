import { css } from 'lit';

export const dividerStyles = css`
  :host {
    display: block;

    /* component 层令牌 */
    --wc-divider-color: var(--wc-color-border);
    --wc-divider-text-gap: var(--wc-space-3);
  }

  :host([vertical]) {
    display: inline-block;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: var(--wc-divider-text-gap);
    margin: var(--wc-space-4) 0;
  }

  .content {
    flex-shrink: 0;
    font-size: var(--wc-font-size-medium);
    color: var(--wc-color-text-secondary);
    white-space: nowrap;
  }

  .content[hidden] {
    display: none;
  }

  .line {
    display: block;
    flex: 1;
    height: 0;
    background-color: var(--wc-divider-color);
  }

  :host([dashed]) .line {
    height: 0;
    background: none;
    border-top: 1px dashed var(--wc-divider-color);
  }

  .line.vertical {
    display: inline-block;
    flex: none;
    width: 1px;
    height: 1em;
    margin: 0 var(--wc-space-2);
    vertical-align: middle;
  }

  :host([dashed]) .line.vertical {
    width: 0;
    height: 1em;
    background: none;
    border-left: 1px dashed var(--wc-divider-color);
  }

  /* 文案对齐：一侧线固定短 */
  .align-left .line.start {
    flex: 0 0 var(--wc-space-4);
  }

  .align-right .line.end {
    flex: 0 0 var(--wc-space-4);
  }

  .align-left .content {
    order: -1;
  }

  :host([vertical]) .divider {
    margin: 0;
  }
`;
