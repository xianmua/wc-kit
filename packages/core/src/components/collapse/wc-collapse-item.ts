import { html, LitElement, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import '../icon/wc-icon.js';
import { collapseItemStyles } from './wc-collapse.styles';

let uid = 0;

/**
 * 折叠面板的单个面板，必须作为 `wc-collapse` 的子元素使用。
 *
 * @example
 * ```html
 * <wc-collapse>
 *   <wc-collapse-item header="标题一" open>内容一</wc-collapse-item>
 *   <wc-collapse-item header="标题二">内容二</wc-collapse-item>
 * </wc-collapse>
 * ```
 *
 * @slot - 面板内容
 * @slot header - 自定义标题（覆盖 header 属性）
 * @csspart item - 面板根元素
 * @csspart header - 标题按钮
 * @csspart content - 内容区
 * @fires wc-change - 展开/收起后触发，detail: { name, open }（bubbles + composed，可在 wc-collapse 上统一监听）
 */
export class wcCollapseItem extends LitElement {
  static styles = [baseStyles, collapseItemStyles];

  /** 标题文案（可用 header 插槽覆盖） */
  @property() header = '';

  /** 面板标识，随 wc-change 事件的 detail.name 抛出 */
  @property() name = '';

  /** 当前是否展开（读写均可；点击标题自动切换） */
  @property({ type: Boolean, reflect: true }) open = false;

  /** 禁用面板（标题不可点击） */
  @property({ type: Boolean, reflect: true }) disabled = false;

  private contentId = `wc-collapse-item-content-${++uid}`;

  private onHeaderClick(): void {
    if (this.disabled) return;
    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent('wc-change', {
        detail: { name: this.name, open: this.open },
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected override render(): TemplateResult {
    return html`
      <div class="item" part="item">
        <button
          type="button"
          class="header"
          part="header"
          ?disabled=${this.disabled}
          aria-expanded=${this.open}
          aria-controls=${this.contentId}
          @click=${() => this.onHeaderClick()}
        >
          <wc-icon class="arrow" name="chevron-down"></wc-icon>
          <span class="title"><slot name="header">${this.header}</slot></span>
        </button>
        <div class="content-wrap" id=${this.contentId} role="region">
          <div class="content" part="content">
            <div class="inner"><slot></slot></div>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('wc-collapse-item')) {
  customElements.define('wc-collapse-item', wcCollapseItem);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-collapse-item': wcCollapseItem;
  }
}
