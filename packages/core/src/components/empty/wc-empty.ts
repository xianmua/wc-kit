import { html, LitElement, type TemplateResult } from 'lit';
import { baseStyles } from '../../styles/base.css';
import { LocalizeController } from '../../i18n/localize-controller';
import '../icon/wc-icon.js';
import { emptyStyles } from './wc-empty.styles';

/**
 * 空状态。默认展示「空托盘」图标 + 「暂无数据」文案，均可用插槽自定义，
 * 另有 action 插槽放置操作按钮（如重试）。
 *
 * @example
 * ```html
 * <wc-empty>
 *   <wc-button slot="action" theme="primary">重新加载</wc-button>
 * </wc-empty>
 * ```
 *
 * @slot - 描述文案（默认 i18n「暂无数据」）
 * @slot icon - 自定义占位图形（默认内建 inbox 图标）
 * @slot action - 操作区
 * @csspart base - 容器
 * @csspart icon - 占位图形区
 * @csspart description - 描述文案区
 * @csspart action - 操作区
 * @cssprop --wc-empty-icon-size - 默认占位图标尺寸（默认 48px）
 */
export class wcEmpty extends LitElement {
  static styles = [baseStyles, emptyStyles];

  private localize = new LocalizeController(this);

  protected override render(): TemplateResult {
    return html`
      <div class="empty" part="base">
        <div class="icon" part="icon">
          <slot name="icon"><wc-icon name="inbox"></wc-icon></slot>
        </div>
        <div class="description" part="description">
          <slot>${this.localize.term('empty.noData')}</slot>
        </div>
        <div class="action" part="action">
          <slot name="action"></slot>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('wc-empty')) {
  customElements.define('wc-empty', wcEmpty);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-empty': wcEmpty;
  }
}
