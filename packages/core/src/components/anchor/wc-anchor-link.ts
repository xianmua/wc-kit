import { html, LitElement, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { anchorLinkStyles } from './wc-anchor-link.styles';

/**
 * 锚点链接，作为 wc-anchor 的子元素使用。选中态由 wc-anchor 统一管理。
 * 嵌套的 wc-anchor-link 会自动分流到命名 slot，形成层级缩进。
 *
 * @slot - 链接标题文本
 * @slot sub - 嵌套的 wc-anchor-link（自动分配，无需手工声明）
 * @csspart base - 链接根元素
 * @cssprop --wc-anchor-link-height - 链接高度（默认 32px）
 * @cssprop --wc-anchor-link-radius - 链接圆角（默认 --wc-radius-small）
 */
export class wcAnchorLink extends LitElement {
  static styles = [anchorLinkStyles];

  /** 目标锚点（#id 形式，对应页面中带该 id 的元素） */
  @property({ reflect: true }) href = '';

  /** 选中态（由 wc-anchor 同步，勿手工维护） */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** 所处锚点是否为水平方向（由 wc-anchor 同步） */
  @property({ type: Boolean, reflect: true, attribute: 'anchor-horizontal' })
  anchorHorizontal = false;

  /** 链接标题（自身直接文本，不含嵌套链接文字） */
  get title(): string {
    return Array.from(this.childNodes)
      .filter((n) => n.nodeType === Node.TEXT_NODE)
      .map((n) => n.textContent ?? '')
      .join('')
      .trim();
  }

  /** 把嵌套的 wc-anchor-link 分流到命名 slot，避免落入 <a> 内部的默认 slot */
  private onSlotChange(): void {
    for (const n of Array.from(this.children)) {
      if (n.localName === 'wc-anchor-link' && n.getAttribute('slot') !== 'sub') {
        n.setAttribute('slot', 'sub');
      }
    }
  }

  render(): TemplateResult {
    return html`
      <a
        class="link ${this.selected ? 'selected' : ''}"
        part="base"
        href=${this.href}
        aria-current=${this.selected ? 'true' : nothing}
        aria-label=${this.title || nothing}
      >
        <slot @slotchange=${this.onSlotChange}></slot>
      </a>
      <slot name="sub"></slot>
    `;
  }
}

if (!customElements.get('wc-anchor-link')) {
  customElements.define('wc-anchor-link', wcAnchorLink);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-anchor-link': wcAnchorLink;
  }
}
