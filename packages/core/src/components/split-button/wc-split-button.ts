import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { LocalizeController } from '../../i18n/localize-controller';
import type { WcPlacement } from '../../common/position';
import '../button/wc-button.js';
import '../dropdown/wc-dropdown.js';
import '../icon/wc-icon.js';
import { splitButtonStyles } from './wc-split-button.styles';

export type wcSplitButtonTheme = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type wcSplitButtonType = 'base' | 'outline' | 'dashed' | 'text' | 'link';
export type wcSplitButtonSize = 'small' | 'medium' | 'large';

/**
 * 组合按钮：主操作按钮 + 下拉箭头（形态对齐 antd Dropdown.Button）。
 * 左侧主按钮派发 `wc-main-click`，右侧箭头派发 `wc-arrow-click` 并展开
 * 内置下拉菜单。菜单项用 `wc-dropdown-item` 作为默认子元素传入。
 *
 * @slot - 主按钮文案
 * @slot -（wc-dropdown-item 菜单项，自动进入下拉面板）
 * @csspart base - 组合容器
 * @cssprop --wc-split-button-radius - 两端保留的圆角
 * @fires wc-main-click - 点击主按钮
 * @fires wc-arrow-click - 点击下拉箭头（菜单随之开合）
 */
export class wcSplitButton extends LitElement {
  static styles = [baseStyles, splitButtonStyles];

  /** 按钮风格（透传两枚按钮） */
  @property({ reflect: true }) theme: wcSplitButtonTheme = 'default';

  /** 按钮类型（透传两枚按钮） */
  @property({ reflect: true }) type: wcSplitButtonType = 'base';

  /** 尺寸（透传两枚按钮） */
  @property({ reflect: true }) size: wcSplitButtonSize = 'medium';

  /** 下拉弹出方向 */
  @property({ reflect: true }) placement: WcPlacement = 'bottom-end';

  /** 禁用（透传两枚按钮与下拉） */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** 加载中（透传两枚按钮） */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** 幽灵模式（透传两枚按钮） */
  @property({ type: Boolean, reflect: true }) ghost = false;

  /** 渐变底（透传两枚按钮） */
  @property({ type: Boolean, reflect: true }) gradient = false;

  /** 点击波纹（透传两枚按钮） */
  @property({ type: Boolean, reflect: true }) ripple = false;

  private localize = new LocalizeController(this);

  private observer: MutationObserver | null = null;

  private get dropdown(): import('../dropdown/wc-dropdown.js').wcDropdown | null {
    return this.shadowRoot!.querySelector('wc-dropdown');
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.syncItemSlots();
    // 后续动态增删菜单项时自动补 slot（子元素变更只发生在宿主上，无需 subtree）
    this.observer = new MutationObserver(() => this.syncItemSlots());
    this.observer.observe(this, { childList: true });
  }

  override disconnectedCallback(): void {
    this.observer?.disconnect();
    this.observer = null;
    super.disconnectedCallback();
  }

  /*
   * 菜单项走命名 slot="menu"，避免与主按钮的默认 slot 争抢内容——两个默认
   * slot 时全部默认内容都会落进树序第一个。其余默认内容（文案）留给主按钮。
   */
  private syncItemSlots(): void {
    for (const child of this.children) {
      if (child.tagName === 'WC-DROPDOWN-ITEM' && !child.slot) {
        child.slot = 'menu';
      }
    }
  }

  /** 主按钮点击：拦截原生冒泡，改派 wc-main-click */
  private onMainClick(e: Event): void {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('wc-main-click', { bubbles: true, composed: true }));
  }

  /** 箭头点击：拦截原生冒泡（避免污染业务层），手动开合下拉并派发 wc-arrow-click */
  private onArrowClick(e: Event): void {
    e.stopPropagation();
    this.dropdown?.toggle();
    this.dispatchEvent(new CustomEvent('wc-arrow-click', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <span class="group" part="base">
        <wc-button
          class="main-btn"
          theme=${this.theme}
          type=${this.type}
          size=${this.size}
          ?disabled=${this.disabled}
          ?loading=${this.loading}
          ?ghost=${this.ghost}
          ?gradient=${this.gradient}
          ?ripple=${this.ripple}
          @click=${this.onMainClick}
          ><slot></slot
        ></wc-button>
        <wc-dropdown .placement=${this.placement} ?disabled=${this.disabled}>
          <wc-button
            class="arrow-btn"
            theme=${this.theme}
            type=${this.type}
            size=${this.size}
            ?disabled=${this.disabled}
            ?loading=${this.loading}
            ?ghost=${this.ghost}
            ?gradient=${this.gradient}
            ?ripple=${this.ripple}
            aria-label=${this.localize.term('dropdown.more')}
            @click=${this.onArrowClick}
          >
            <wc-icon slot="icon" name="chevron-down"></wc-icon>
          </wc-button>
          <slot name="menu"></slot>
        </wc-dropdown>
      </span>
    `;
  }
}

if (!customElements.get('wc-split-button')) {
  customElements.define('wc-split-button', wcSplitButton);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-split-button': wcSplitButton;
  }
}
