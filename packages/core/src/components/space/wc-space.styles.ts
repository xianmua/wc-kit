import { css } from 'lit';

export const spaceStyles = css`
  :host {
    display: inline-block;
  }

  :host([direction='vertical']) {
    display: block;
  }

  .space {
    display: flex;
    gap: var(--wc-space-gap, var(--wc-space-4));
  }

  /* slot 透明化，让 slotted 子元素直接成为 flex item，gap 才能生效 */
  .space slot {
    display: contents;
  }

  :host([direction='vertical']) .space {
    flex-direction: column;
  }

  :host([wrap]) .space {
    flex-wrap: wrap;
  }

  .align-start {
    align-items: flex-start;
  }

  .align-center {
    align-items: center;
  }

  .align-end {
    align-items: flex-end;
  }

  .align-baseline {
    align-items: baseline;
  }

  .align-stretch {
    align-items: stretch;
  }
`;
