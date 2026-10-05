import { html, LitElement, nothing, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { cardStyles } from './wc-card.styles';

/**
 * 卡片。header 区由 title / subtitle 属性或 header 插槽组成，actions 插槽
 * 放标题右侧操作区，footer 插槽放底部操作区（有内容才渲染对应区域）。
 *
 * @example
 * ```html
 * <wc-card title="卡片标题" subtitle="副标题" hoverable>
 *   <p>卡片内容</p>
 *   <wc-button slot="footer" theme="primary">操作</wc-button>
 * </wc-card>
 * ```
 *
 * @slot - 卡片内容
 * @slot header - 自定义整个头部（覆盖 title/subtitle）
 * @slot actions - 头部右侧操作区
 * @slot footer - 底部操作区
 * @csspart base - 卡片容器
 * @csspart header - 头部
 * @csspart title - 标题
 * @csspart subtitle - 副标题
 * @csspart actions - 头部操作区
 * @csspart body - 内容区
 * @csspart footer - 底部
 * @cssprop --wc-card-radius - 卡片圆角（默认 --wc-radius-medium）
 */
export class wcCard extends LitElement {
  static styles = [baseStyles, cardStyles];

  /** 卡片标题 */
  @property() title = '';

  /** 副标题（title 右侧小字） */
  @property() subtitle = '';

  /** 显示边框 */
  @property({ type: Boolean, reflect: true }) bordered = true;

  /** 悬浮时展示阴影 */
  @property({ type: Boolean, reflect: true }) hoverable = false;

  @state() private hasHeaderSlot = false;

  @state() private hasActions = false;

  @state() private hasFooter = false;

  private onSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    const has = slot.assignedElements().length > 0;
    if (slot.name === 'header') this.hasHeaderSlot = has;
    else if (slot.name === 'actions') this.hasActions = has;
    else if (slot.name === 'footer') this.hasFooter = has;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    // 首渲染前的种子状态（slotchange 只在已渲染的 slot 上触发）
    this.hasHeaderSlot = this.querySelector('[slot="header"]') !== null;
    this.hasActions = this.querySelector('[slot="actions"]') !== null;
    this.hasFooter = this.querySelector('[slot="footer"]') !== null;
  }

  private renderHeader(): TemplateResult {
    const showHeader = Boolean(
      this.title || this.subtitle || this.hasHeaderSlot || this.hasActions,
    );
    return html`<div class="header" part="header" ?hidden=${!showHeader}>
      <div class="titles" ?hidden=${this.hasHeaderSlot}>
        ${this.title ? html`<div class="title" part="title">${this.title}</div>` : nothing}
        ${
          this.subtitle
            ? html`<div class="subtitle" part="subtitle">${this.subtitle}</div>`
            : nothing
        }
      </div>
      <slot name="header" @slotchange=${this.onSlotChange} ?hidden=${!this.hasHeaderSlot}></slot>
      <div class="actions" part="actions" ?hidden=${!this.hasActions}>
        <slot name="actions" @slotchange=${this.onSlotChange}></slot>
      </div>
    </div>`;
  }

  protected override render(): TemplateResult {
    return html`<div class="card" part="base">
      ${this.renderHeader()}
      <div class="body" part="body"><slot></slot></div>
      <div class="footer" part="footer" ?hidden=${!this.hasFooter}>
        <slot name="footer" @slotchange=${this.onSlotChange}></slot>
      </div>
    </div>`;
  }
}

if (!customElements.get('wc-card')) {
  customElements.define('wc-card', wcCard);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-card': wcCard;
  }
}
