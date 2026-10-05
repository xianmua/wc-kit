import { html, LitElement } from 'lit';
import { baseStyles } from '../../styles/base.css';
import { buttonGroupStyles } from './wc-button-group.styles';

/**
 * 按钮分组。包裹多个 `wc-button` 形成组合：中间按钮去圆角、相邻边框合并，
 * 首尾按钮保留外侧圆角。仅接受 `wc-button` 作为直接子元素。
 *
 * @slot - wc-button 子元素
 * @csspart base - 分组容器
 * @cssprop --wc-button-group-radius - 覆盖首尾按钮保留的圆角
 */
export class wcButtonGroup extends LitElement {
  static styles = [baseStyles, buttonGroupStyles];

  render() {
    return html`<div class="group" part="base"><slot></slot></div>`;
  }
}

if (!customElements.get('wc-button-group')) {
  customElements.define('wc-button-group', wcButtonGroup);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-button-group': wcButtonGroup;
  }
}
