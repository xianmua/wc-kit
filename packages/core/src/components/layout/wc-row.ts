import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { layoutStyles } from './wc-layout.styles';

export type wcRowJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type wcRowAlign = 'top' | 'middle' | 'bottom' | 'stretch';

/**
 * 行容器：flex 布局，配合 wc-col 的 span/offset 实现栅格。
 * gutter 为列间距（column-gap，px）。
 *
 * @slot - 放置 wc-col
 * @csspart base - 行容器
 */
export class wcRow extends LitElement {
  static styles = [baseStyles, layoutStyles];

  /** 列间距（px） */
  @property({ type: Number }) gutter = 0;

  /** 水平对齐 */
  @property({ reflect: true }) justify: wcRowJustify = 'start';

  /** 垂直对齐 */
  @property({ reflect: true }) align: wcRowAlign = 'top';

  /** 允许换行 */
  @property({ type: Boolean, reflect: true }) wrap = false;

  render() {
    return html`
      <div
        class="row ${`justify-${this.justify} align-${this.align}`}"
        part="base"
        style=${this.gutter ? `--wc-row-gutter:${this.gutter}px` : ''}
      >
        <slot></slot>
      </div>
    `;
  }
}

/**
 * 列容器：24 栅格。span 占几列，offset 左侧空几列。
 * host 以 display:contents 参与行布局，实际盒模型由内部 .col 呈现。
 *
 * @slot - 列内容
 * @csspart base - 列容器
 */
export class wcCol extends LitElement {
  static styles = [baseStyles, layoutStyles];

  /** 占据列数（1~24） */
  @property({ type: Number }) span = 24;

  /** 左侧偏移列数（1~23） */
  @property({ type: Number }) offset = 0;

  private get widthPercent(): string {
    const span = Math.min(24, Math.max(1, Math.round(this.span) || 24));
    return `${((span / 24) * 100).toFixed(4)}%`;
  }

  private get offsetPercent(): string {
    const offset = Math.min(23, Math.max(0, Math.round(this.offset) || 0));
    return `${((offset / 24) * 100).toFixed(4)}%`;
  }

  render() {
    return html`
      <div
        class="col"
        part="base"
        style=${`width:${this.widthPercent};margin-left:${this.offsetPercent}`}
      >
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get('wc-row')) {
  customElements.define('wc-row', wcRow);
}

if (!customElements.get('wc-col')) {
  customElements.define('wc-col', wcCol);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-row': wcRow;
    'wc-col': wcCol;
  }
}
