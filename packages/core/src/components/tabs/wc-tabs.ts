import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { tabsStyles } from './wc-tabs.styles';
import './wc-tab.js';
import type { wcTab } from './wc-tab.js';

export type wcTabsChangeDetail = { value: string };

/** 标签栏单项元数据 */
interface TabMeta {
  value: string;
  label: string;
  disabled: boolean;
  element: wcTab;
}

/**
 * 标签页容器：子元素 <wc-tab>（label/value/disabled）声明标签页，
 * 点击或键盘（←/→/Home/End，自动激活）切换，派发 wc-change。
 *
 * @slot - <wc-tab> 子元素
 * @csspart bar - 标签栏
 * @csspart tab - 单个标签
 * @fires wc-change - 激活标签变化时触发，detail.value
 */
export class wcTabs extends LitElement {
  static styles = [baseStyles, tabsStyles];

  /** 激活标签的 value */
  @property({ reflect: true }) value = '';

  private tabs: TabMeta[] = [];

  private uid = `wc-tabs-${Math.random().toString(36).slice(2, 8)}`;

  /** 子元素 label/value/disabled 变化时刷新标签栏 */
  private mutationObserver = new MutationObserver(() => this.collectTabs());

  override connectedCallback(): void {
    super.connectedCallback();
    this.mutationObserver.observe(this, {
      childList: true,
      // subtree: true 使 attributeFilter 也能监视子元素 label/value/disabled 变化
      subtree: true,
      attributes: true,
      attributeFilter: ['label', 'value', 'disabled'],
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.mutationObserver.disconnect();
  }

  private collectTabs(): void {
    const children = Array.from(this.querySelectorAll<wcTab>('wc-tab'));
    this.tabs = children.map((element, index) => ({
      value: element.value || String(index),
      label: element.label || element.textContent?.trim() || String(index + 1),
      disabled: element.disabled,
      element,
    }));
    this.requestUpdate();
    this.syncActive();
  }

  /** 把 value 同步到子元素的 active 标志（驱动面板显隐） */
  private syncActive(): void {
    if (!this.value && this.tabs.length > 0 && !this.tabs.some((t) => t.value === this.value)) {
      this.value = this.tabs[0]!.value;
    }
    for (const tab of this.tabs) {
      tab.element.active = tab.value === this.value;
    }
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    if (changed.has('value')) this.syncActive();
  }

  private select(value: string): void {
    if (value === this.value) return;
    const tab = this.tabs.find((t) => t.value === value);
    if (!tab || tab.disabled) return;
    this.value = value;
    this.dispatchEvent(
      new CustomEvent<wcTabsChangeDetail>('wc-change', {
        detail: { value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private onTablistKeydown(e: KeyboardEvent): void {
    const selectable = this.tabs.filter((t) => !t.disabled);
    if (selectable.length === 0) return;
    const currentIndex = Math.max(
      0,
      selectable.findIndex((t) => t.value === this.value),
    );
    let next: TabMeta | undefined;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = selectable[(currentIndex + 1) % selectable.length];
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        next = selectable[(currentIndex - 1 + selectable.length) % selectable.length];
        break;
      case 'Home':
        next = selectable[0];
        break;
      case 'End':
        next = selectable[selectable.length - 1];
        break;
      default:
        return;
    }
    e.preventDefault();
    if (next) {
      this.select(next.value);
      this.focusTab(next.value);
    }
  }

  /** 焦点移到指定标签按钮（roving tabindex 的焦点跟随） */
  private focusTab(value: string): void {
    // jsdom 未实现 CSS.escape，用本地转义（属性选择器只需处理引号和反斜杠）
    const escaped = value.replace(/["\\]/g, '\\$&');
    this.shadowRoot!.querySelector<HTMLButtonElement>(`[data-value="${escaped}"]`)?.focus();
  }

  render() {
    return html`
      <div class="bar" part="bar" role="tablist" @keydown=${this.onTablistKeydown}>
        ${this.tabs.map(
          (tab) => html`
            <button
              type="button"
              class="tab"
              part="tab"
              role="tab"
              data-value=${tab.value}
              id=${`${this.uid}-tab-${tab.value}`}
              aria-selected=${tab.value === this.value ? 'true' : 'false'}
              aria-disabled=${tab.disabled ? 'true' : 'false'}
              tabindex=${tab.value === this.value ? '0' : '-1'}
              ?data-disabled=${tab.disabled}
              @click=${() => this.select(tab.value)}
            >
              ${tab.label}
            </button>
          `,
        )}
      </div>
      ${this.tabs.length > 0 ? html`<slot @slotchange=${this.collectTabs}></slot>` : nothing}
    `;
  }
}

if (!customElements.get('wc-tabs')) {
  customElements.define('wc-tabs', wcTabs);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-tabs': wcTabs;
  }
}
