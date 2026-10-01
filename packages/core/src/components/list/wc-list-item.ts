import { html, LitElement, type TemplateResult } from 'lit';
import { baseStyles } from '../../styles/base.css';

/**
 * 列表条目。内容直接放在 light-DOM 中，样式（内边距 / 分隔线 / 斑马纹 /
 * 悬浮反馈）由父级 wc-list 通过 ::slotted 统一提供，条目自身仅负责分发内容。
 *
 * @slot - 条目内容（任意元素）
 */
export class wcListItem extends LitElement {
  static styles = [baseStyles];

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

if (!customElements.get('wc-list-item')) {
  customElements.define('wc-list-item', wcListItem);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-list-item': wcListItem;
  }
}
