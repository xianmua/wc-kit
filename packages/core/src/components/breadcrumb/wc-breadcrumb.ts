import { html, LitElement, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { LocalizeController } from '../../i18n/localize-controller';
import { breadcrumbStyles } from './wc-breadcrumb.styles';

interface ItemMeta {
  label: string;
  href: string;
  disabled: boolean;
  index: number;
}

/**
 * 面包屑。子条目用 light-DOM 的 <wc-breadcrumb-item> 声明，由容器收集后在
 * shadow 中统一渲染：最后一项为当前页（aria-current="page"），中间项可点击
 * 并派发 wc-select，带 href 的条目渲染为原生 <a>（点击后正常跳转）。
 *
 * @example
 * ```html
 * <wc-breadcrumb separator="/">
 *   <wc-breadcrumb-item href="/">首页</wc-breadcrumb-item>
 *   <wc-breadcrumb-item href="/list" disabled>列表</wc-breadcrumb-item>
 *   <wc-breadcrumb-item>详情</wc-breadcrumb-item>
 * </wc-breadcrumb>
 * ```
 *
 * @csspart nav - 导航容器
 * @csspart list - ol 列表
 * @csspart item - 条目
 * @csspart separator - 分隔符
 * @csspart link - 可点击条目
 * @csspart current - 当前页条目
 * @fires wc-select - 点击中间项时派发（detail: { index, label, href }）
 */
export class wcBreadcrumb extends LitElement {
  static styles = [baseStyles, breadcrumbStyles];

  /** 分隔符文本 */
  @property() separator = '/';

  private items: ItemMeta[] = [];

  private localize = new LocalizeController(this);

  /** 子条目 href/disabled 变化时刷新渲染 */
  private mutationObserver = new MutationObserver(() => this.collectItems());

  override connectedCallback(): void {
    super.connectedCallback();
    this.mutationObserver.observe(this, {
      childList: true,
      // subtree: true 使 attributeFilter 也能监视子元素 href/disabled 变化
      subtree: true,
      attributes: true,
      attributeFilter: ['href', 'disabled'],
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.mutationObserver.disconnect();
  }

  private collectItems(): void {
    const children = Array.from(this.querySelectorAll<HTMLElement>('wc-breadcrumb-item'));
    this.items = children.map((element, index) => ({
      label: element.textContent?.trim() || String(index + 1),
      href: element.getAttribute('href') || '',
      disabled: element.hasAttribute('disabled'),
      index,
    }));
    this.requestUpdate();
  }

  private onSelect(item: ItemMeta): void {
    this.dispatchEvent(
      new CustomEvent('wc-select', {
        detail: { index: item.index, label: item.label, href: item.href },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private renderItem(item: ItemMeta, isLast: boolean): TemplateResult {
    if (isLast) {
      return html`<span class="current" part="current" aria-current="page">${item.label}</span>`;
    }
    if (item.disabled) {
      return html`<span class="link" data-disabled aria-disabled="true">${item.label}</span>`;
    }
    if (item.href) {
      return html`<a class="link" part="link" href=${item.href} @click=${() => this.onSelect(item)}
        >${item.label}</a
      >`;
    }
    return html`<span class="link" part="link" @click=${() => this.onSelect(item)}
      >${item.label}</span
    >`;
  }

  protected override render(): TemplateResult {
    const last = this.items.length - 1;
    return html`
      <nav class="nav" part="nav" aria-label=${this.localize.term('breadcrumb.label')}>
        <ol class="list" part="list">
          ${this.items.map((item, index) => {
            return html`
              <li class="item" part="item">${this.renderItem(item, index === last)}</li>
              ${
                index < last
                  ? html`<li class="separator" part="separator" aria-hidden="true">
                      ${this.separator}
                    </li>`
                  : nothing
              }
            `;
          })}
        </ol>
        <slot @slotchange=${this.collectItems}></slot>
      </nav>
    `;
  }
}

if (!customElements.get('wc-breadcrumb')) {
  customElements.define('wc-breadcrumb', wcBreadcrumb);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-breadcrumb': wcBreadcrumb;
  }
}
