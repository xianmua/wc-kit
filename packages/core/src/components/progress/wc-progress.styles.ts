import { css } from 'lit';

export const progressStyles = css`
  :host {
    display: block;
  }

  /* ---- line ---- */
  .line {
    display: flex;
    align-items: center;
    gap: var(--wc-space-2);
  }

  .track {
    position: relative;
    flex: 1;
    overflow: hidden;
    background-color: var(--wc-color-bg-hover);
    border-radius: var(--wc-radius-round);
  }

  .indicator {
    height: 100%;
    background-color: var(--wc-color-primary);
    border-radius: var(--wc-radius-round);
    transition: width var(--wc-duration-slow, 300ms) var(--wc-easing-standard);
  }

  :host([status='success']) .indicator {
    background-color: var(--wc-color-success);
  }

  :host([status='warning']) .indicator {
    background-color: var(--wc-color-warning);
  }

  :host([status='error']) .indicator {
    background-color: var(--wc-color-error);
  }

  .label {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    color: var(--wc-color-text-secondary);
    font-size: var(--wc-font-size-small);
    line-height: 1;
    white-space: nowrap;
  }

  :host([status='success']) .label {
    color: var(--wc-color-success);
  }

  :host([status='error']) .label {
    color: var(--wc-color-error);
  }

  .label wc-icon {
    --icon-size: 1em;
  }

  /* ---- circle ---- */
  .circle-wrap {
    position: relative;
    display: inline-block;
    width: 72px;
    height: 72px;
  }

  .circle {
    display: block;
    width: 100%;
    height: 100%;
  }

  .circle .track {
    fill: none;
    stroke: var(--wc-color-bg-hover);
    stroke-width: 6;
  }

  .circle .indicator {
    fill: none;
    stroke: var(--wc-color-primary);
    stroke-width: 6;
    stroke-linecap: round;
    transition: stroke-dashoffset var(--wc-duration-slow, 300ms) var(--wc-easing-standard);
  }

  :host([status='success']) .circle .indicator {
    stroke: var(--wc-color-success);
  }

  :host([status='warning']) .circle .indicator {
    stroke: var(--wc-color-warning);
  }

  :host([status='error']) .circle .indicator {
    stroke: var(--wc-color-error);
  }

  .circle-label {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--wc-color-text);
    font-size: var(--wc-font-size-small);
  }

  .circle-label .label {
    color: inherit;
  }
`;
