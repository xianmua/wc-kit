import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { dividerStyles } from './wc-divider.styles';

export type wcDividerAlign = 'left' | 'center' | 'right';

/**
 * 分隔线。水平模式可携带文案（文案位置由 align 控制），
 * vertical 时渲染竖向分隔（忽略插槽内容）。
 *
 * @slot - 分隔线文案
 * @csspart base - 外层容器
 * @csspart line - 分隔线
 */
export class wcDivider extends LitElement {
  static styles = [baseStyles, dividerStyles];

  /** 虚线 */
  @property({ type: Boolean, reflect: true }) dashed = false;

  /** 水平模式下文案位置 */
  @property({ reflect: true }) align: wcDividerAlign = 'center';

  /** 竖向分隔线 */
  @property({ type: Boolean, reflect: true }) vertical = false;

  /** 是否有插槽文案（slotchange 检测） */
  private _hasContent = false;

  /** 注释节点与纯空白文本不算文案，否则隐藏失败会以 0 宽 content 夹出两个 flex gap 断缝 */
  private onSlotChange(e: Event): void {
    const nodes = (e.target as HTMLSlotElement).assignedNodes({ flatten: true });
    this._hasContent = nodes.some(
      (n) =>
        n.nodeType === Node.ELEMENT_NODE ||
        (n.nodeType === Node.TEXT_NODE && n.textContent.trim() !== ''),
    );
    this.requestUpdate();
  }

  render() {
    if (this.vertical) {
      return html`<span class="line vertical" part="line"></span>`;
    }
    return html`
      <div class="divider ${`align-${this.align}`}" part="base">
        <span class="line start" part="line" ?hidden=${this.align === 'left'}></span>
        <span class="content" part="content" ?hidden=${!this._hasContent}>
          <slot @slotchange=${this.onSlotChange}></slot>
        </span>
        <span class="line end" part="line" ?hidden=${this.align === 'right'}></span>
      </div>
    `;
  }
}

if (!customElements.get('wc-divider')) {
  customElements.define('wc-divider', wcDivider);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-divider': wcDivider;
  }
}
