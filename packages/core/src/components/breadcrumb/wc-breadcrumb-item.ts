import { html, LitElement, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * 面包屑条目（light-DOM 子元素）。内容由 wc-breadcrumb 在其 shadow 中统一渲染，
 * 条目自身不产出可见内容。label 取元素的文本内容。
 */
export class wcBreadcrumbItem extends LitElement {
  /** 目标链接（有值渲染为 <a>，否则为可点击文本） */
  @property() href = '';

  /** 禁用（仅中间项有意义，最后一项始终渲染为当前页文本） */
  @property({ type: Boolean, reflect: true }) disabled = false;

  protected override render(): TemplateResult {
    // 条目由 wc-breadcrumb 收集渲染，自身不产出内容
    return html``;
  }
}

if (!customElements.get('wc-breadcrumb-item')) {
  customElements.define('wc-breadcrumb-item', wcBreadcrumbItem);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-breadcrumb-item': wcBreadcrumbItem;
  }
}
