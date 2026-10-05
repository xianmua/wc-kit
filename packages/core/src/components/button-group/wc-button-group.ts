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
    return html`<div class="group" part="base">
      <slot @slotchange=${this._syncMargins}></slot>
    </div>`;
  }

  /*
   * 相邻边框合并必须用内联样式：CSS 规则（::slotted margin-left）会被宿主页面
   * 的全局 reset（如 * { margin: 0 }）覆盖——外层文档样式对 slotted 元素
   * 永远优先于 ::slotted 声明。内联样式优先级最高，且 slotchange 时同步。
   */
  private _syncMargins(e: Event) {
    const els = (e.target as HTMLSlotElement).assignedElements({ flatten: true }) as HTMLElement[];
    for (let i = 0; i < els.length; i++) {
      els[i]!.style.marginLeft = i > 0 ? '-1px' : '';
    }
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
