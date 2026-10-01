import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { tabStyles } from './wc-tab.styles';

/**
 * 标签页面板：作为 <wc-tabs> 的子元素声明一个标签页。
 * label 显示在标签栏，value 用于匹配激活态（缺省按索引），
 * 内容仅在激活时显示。
 *
 * @slot - 面板内容
 * @csspart panel - 面板容器
 */
export class wcTab extends LitElement {
  static styles = [baseStyles, tabStyles];

  /** 匹配 wc-tabs.value 的唯一值（缺省按索引） */
  @property() value = '';

  /** 标签栏显示文本 */
  @property() label = '';

  /** 禁用（不可选中，键盘导航跳过） */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** 激活态，由 wc-tabs 同步（host 据此显隐） */
  @property({ type: Boolean, reflect: true }) active = false;

  render() {
    return html`<div class="panel" part="panel" role="tabpanel" aria-label=${this.label}>
      <slot></slot>
    </div>`;
  }
}

if (!customElements.get('wc-tab')) {
  customElements.define('wc-tab', wcTab);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-tab': wcTab;
  }
}
