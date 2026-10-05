import { css } from 'lit';

export const anchorStyles = css`
  :host {
    display: block;
  }

  .list {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--wc-space-2) 0;
  }

  /* 左侧导轨线（antd 锚点标志性视觉），选中指示条与其相邻 */
  .list::before {
    content: '';
    position: absolute;
    top: var(--wc-space-2);
    bottom: var(--wc-space-2);
    left: 0;
    width: 1px;
    background-color: var(--wc-color-border);
  }

  :host([direction='horizontal']) .list {
    flex-direction: row;
    gap: var(--wc-space-2);
    padding: 0;
  }

  :host([direction='horizontal']) .list::before {
    top: auto;
    right: 0;
    bottom: 0;
    left: 0;
    width: auto;
    height: 1px;
  }

  :host([direction='horizontal']) ::slotted(wc-anchor-link) {
    width: auto;
    flex: none;
  }
`;
