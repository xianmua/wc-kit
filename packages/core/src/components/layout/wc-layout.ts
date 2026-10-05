import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import {
  layoutBoxStyles,
  layoutContentStyles,
  layoutFooterStyles,
  layoutHeaderStyles,
  layoutSiderStyles,
} from './wc-layout-parts.styles.js';

/**
 * 页面级布局骨架（antd Layout 对齐）：配合 header / sider / content / footer 使用。
 * 含 wc-layout-sider 子元素时自动横向排列，也可用 has-sider 强制。
 *
 * @example
 * <wc-layout>
 *   <wc-layout-header>头部</wc-layout-header>
 *   <wc-layout>
 *     <wc-layout-sider collapsible>侧栏</wc-layout-sider>
 *     <wc-layout-content>内容</wc-layout-content>
 *   </wc-layout>
 *   <wc-layout-footer>底部</wc-layout-footer>
 * </wc-layout>
 *
 * @slot - 布局子元素（header / sider / content / footer / 嵌套 layout）
 * @csspart base - 容器
 * @cssprop --wc-layout-header-padding - 头部内边距（默认 16px 24px）
 * @cssprop --wc-layout-header-bg - 头部背景（默认 --wc-color-bg-container）
 * @cssprop --wc-layout-footer-padding - 底部内边距（默认 24px）
 * @cssprop --wc-layout-footer-bg - 底部背景（默认 --wc-color-bg-container）
 * @cssprop --wc-layout-sider-width - 侧栏展开宽度（默认 200px）
 * @cssprop --wc-layout-sider-collapsed-width - 侧栏折叠宽度（默认 80px）
 * @cssprop --wc-layout-sider-bg - 侧栏背景（dark 默认 --wc-color-gray-900，light 默认 --wc-color-bg-container）
 * @cssprop --wc-layout-sider-color - 侧栏文字色
 * @cssprop --wc-layout-sider-trigger-bg - 折叠触发器背景
 */
export class wcLayout extends LitElement {
  static styles = [baseStyles, layoutBoxStyles];

  /** 强制横向排列（默认检测到 sider 子元素时自动开启） */
  @property({ type: Boolean, reflect: true }) hasSider = false;

  private mutationObserver = new MutationObserver(() => this.collectSider());

  override connectedCallback(): void {
    super.connectedCallback();
    // 连接时同步收集一次，保证首渲染方向就正确（同 wc-tabs 的坑）
    this.collectSider();
    this.mutationObserver.observe(this, { childList: true, subtree: true });
  }

  override disconnectedCallback(): void {
    this.mutationObserver.disconnect();
    super.disconnectedCallback();
  }

  private collectSider(): void {
    // 自动横向：子元素含 sider 时在宿主上打类（flex 布局直接作用于宿主）
    this.classList.toggle('auto-sider', this.querySelector('wc-layout-sider') !== null);
  }

  render() {
    // 子元素是轻 DOM，直接参与宿主 flex 布局，无需包裹层
    return html`<slot @slotchange=${this.collectSider}></slot>`;
  }
}

/**
 * 头部区块
 *
 * @slot - 头部内容
 * @csspart base - 头部容器
 */
export class wcLayoutHeader extends LitElement {
  static styles = [baseStyles, layoutHeaderStyles];

  render() {
    return html`<header class="header" part="base"><slot></slot></header>`;
  }
}

/**
 * 内容区块
 *
 * @slot - 内容
 * @csspart base - 内容容器
 */
export class wcLayoutContent extends LitElement {
  static styles = [baseStyles, layoutContentStyles];

  render() {
    return html`<main class="content" part="base"><slot></slot></main>`;
  }
}

/**
 * 底部区块
 *
 * @slot - 底部内容
 * @csspart base - 底部容器
 */
export class wcLayoutFooter extends LitElement {
  static styles = [baseStyles, layoutFooterStyles];

  render() {
    return html`<footer class="footer" part="base"><slot></slot></footer>`;
  }
}

export type wcLayoutSiderBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/** 断点对应的最小视口宽度（antd 同款） */
const BREAKPOINTS: Record<wcLayoutSiderBreakpoint, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

/**
 * 侧边栏：支持折叠（collapsible）与响应式断点（breakpoint）。
 * 折叠状态由 collapsed 属性驱动，触发器点击 / 断点变化会派发 wc-collapse 事件。
 *
 * @slot - 侧栏内容
 * @slot trigger - 自定义折叠触发器内容（默认为箭头图标）
 * @csspart sider - 内容容器
 * @csspart trigger - 折叠触发器
 * @fires wc-collapse - 折叠状态变化，detail.isCollapsed 为当前状态
 */
export class wcLayoutSider extends LitElement {
  static styles = [baseStyles, layoutSiderStyles];

  /** 开启折叠能力（显示默认触发器） */
  @property({ type: Boolean, reflect: true }) collapsible = false;

  /** 当前是否折叠 */
  @property({ type: Boolean, reflect: true }) collapsed = false;

  /** 响应式断点：视口宽度低于断点时自动折叠 */
  @property({ reflect: true }) breakpoint: wcLayoutSiderBreakpoint = 'lg';

  /** 展开宽度（px） */
  @property({ type: Number }) width = 200;

  /** 折叠宽度（px），设为 0 时完全隐藏 */
  @property({ type: Number, attribute: 'collapsed-width' }) collapsedWidth = 80;

  /** 主题（dark 深色 / light 浅色） */
  @property({ reflect: true }) theme: 'dark' | 'light' = 'dark';

  @state() private belowBreakpoint = false;

  private mediaQuery: MediaQueryList | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this.syncBreakpoint();
  }

  override disconnectedCallback(): void {
    this.mediaQuery?.removeEventListener('change', this.onMediaChange);
    this.mediaQuery = null;
    super.disconnectedCallback();
  }

  protected override updated(changed: Map<string, unknown>): void {
    if (changed.has('breakpoint')) {
      this.syncBreakpoint();
    }
  }

  private onMediaChange = (): void => {
    const below = this.mediaQuery?.matches ?? false;
    if (below !== this.belowBreakpoint) {
      this.belowBreakpoint = below;
      // 断点变化时自动折叠/展开（antd 同款）
      this.setCollapsed(below);
    }
  };

  private syncBreakpoint(): void {
    this.mediaQuery?.removeEventListener('change', this.onMediaChange);
    this.mediaQuery = null;
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const min = BREAKPOINTS[this.breakpoint] ?? BREAKPOINTS.lg;
    this.mediaQuery = window.matchMedia(`(max-width: ${min - 1}px)`);
    this.mediaQuery.addEventListener('change', this.onMediaChange);
    this.belowBreakpoint = this.mediaQuery.matches;
  }

  private setCollapsed(collapsed: boolean): void {
    if (this.collapsed === collapsed) return;
    this.collapsed = collapsed;
    this.dispatchEvent(
      new CustomEvent('wc-collapse', {
        detail: { isCollapsed: collapsed },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const zeroWidth = this.collapsedWidth <= 0;
    if (zeroWidth) {
      this.setAttribute('zero-width', '');
    } else {
      this.removeAttribute('zero-width');
    }
    const width = Math.max(0, this.width);
    const collapsedWidth = Math.max(0, this.collapsedWidth);
    return html`
      <div
        class="sider"
        part="sider"
        style=${`--wc-layout-sider-width:${width}px;--wc-layout-sider-collapsed-width:${collapsedWidth}px`}
      >
        <slot></slot>
      </div>
      ${
        this.collapsible
          ? html`
              <button
                class="trigger"
                part="trigger"
                type="button"
                aria-label=${this.collapsed ? '展开侧边栏' : '折叠侧边栏'}
                @click=${() => this.setCollapsed(!this.collapsed)}
              >
                <slot name="trigger">
                  <wc-icon name="chevron-left"></wc-icon>
                </slot>
              </button>
            `
          : nothing
      }
    `;
  }
}

if (!customElements.get('wc-layout')) {
  customElements.define('wc-layout', wcLayout);
}

if (!customElements.get('wc-layout-header')) {
  customElements.define('wc-layout-header', wcLayoutHeader);
}

if (!customElements.get('wc-layout-content')) {
  customElements.define('wc-layout-content', wcLayoutContent);
}

if (!customElements.get('wc-layout-footer')) {
  customElements.define('wc-layout-footer', wcLayoutFooter);
}

if (!customElements.get('wc-layout-sider')) {
  customElements.define('wc-layout-sider', wcLayoutSider);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-layout': wcLayout;
    'wc-layout-header': wcLayoutHeader;
    'wc-layout-content': wcLayoutContent;
    'wc-layout-footer': wcLayoutFooter;
    'wc-layout-sider': wcLayoutSider;
  }
}
