import { html, LitElement, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { computePosition } from '../../common/position';
import '../icon/wc-icon.js';
import { menuItemStyles } from './wc-menu-item.styles';
import { subMenuStyles } from './wc-sub-menu.styles';

/**
 * 子菜单：折叠一组菜单项。垂直菜单内联展开；水平菜单弹出浮层。
 * 必须作为 wc-menu 的子元素使用，菜单项放默认插槽。
 *
 * @slot - 菜单项（wc-menu-item）
 * @slot label - 头部标题（缺省用 label 属性文本）
 * @csspart header - 展开头
 * @csspart base - 子菜单容器
 * @fires wc-open - 子菜单展开
 * @fires wc-close - 子菜单收起，detail.reason: 'toggle' | 'outside' | 'escape' | 'select'
 * @cssprop --wc-sub-menu-min-width - 水平弹出层最小宽度（默认 140px）
 */
export class wcSubMenu extends LitElement {
  static styles = [menuItemStyles, subMenuStyles];

  /** 头部标题文本（也可用 slot="label" 自定义） */
  @property({ reflect: true }) label = '';

  /** 前置图标（内置图标名） */
  @property() icon = '';

  /** 禁用（头部不响应点击/键盘） */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** 是否展开 */
  @property({ type: Boolean, reflect: true }) open = false;

  /** 所处菜单是否为水平模式（由 wc-menu 同步，水平模式弹出浮层而非内联展开） */
  @property({ type: Boolean, reflect: true, attribute: 'menu-horizontal' })
  menuHorizontal = false;

  /** 供 wc-menu 键盘导航聚焦内部头部 */
  focusFromMenu(): void {
    this.renderRoot.querySelector<HTMLElement>('.head')?.focus();
  }

  private get popup(): boolean {
    return this.menuHorizontal;
  }

  /* ---------- 开合 ---------- */

  toggle(): void {
    if (this.open) {
      this.open = false;
      this.unbindSideEffects();
      this.dispatchEvent(
        new CustomEvent('wc-close', {
          detail: { reason: 'toggle' },
          bubbles: true,
          composed: true,
        }),
      );
    } else {
      this.open = true;
      this.bindSideEffects();
      this.dispatchEvent(new CustomEvent('wc-open', { bubbles: true, composed: true }));
    }
  }

  private onOutsideClick = (e: Event): void => {
    if ((e.composedPath() as Array<EventTarget>).includes(this)) return;
    this.open = false;
    this.unbindSideEffects();
    this.dispatchEvent(
      new CustomEvent('wc-close', { detail: { reason: 'outside' }, bubbles: true, composed: true }),
    );
  };

  private onKeydown = (e: KeyboardEvent): void => {
    if (this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.toggle();
    }
  };

  private bindSideEffects(): void {
    document.addEventListener('click', this.onOutsideClick, true);
    // 仅弹出层需要定位；内联展开无定位诉求
    if (this.popup) this.updateComplete.then(() => this.position());
  }

  private unbindSideEffects(): void {
    document.removeEventListener('click', this.onOutsideClick, true);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unbindSideEffects();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    // 带 open 属性创建时需要补绑定副作用
    if (this.open) this.bindSideEffects();
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    if (changed.has('menuHorizontal') && this.open && this.popup) {
      this.updateComplete.then(() => this.position());
    }
  }

  /** 弹出层定位在头部正下方（空间不足自动翻转，同 dropdown） */
  private position(): void {
    const panel = this.renderRoot.querySelector<HTMLElement>('.sub');
    if (!panel) return;
    const anchor = this.renderRoot.querySelector<HTMLElement>('.head')!.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const viewport = { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight };
    const result = computePosition(anchor, panelRect, viewport, 'bottom-start');
    panel.style.left = `${result.x}px`;
    panel.style.top = `${result.y}px`;
  }

  /** 点击子项后收起弹出层（选择事件由 wc-menu 统一派发） */
  private onSubClick(e: Event): void {
    if (!this.popup || !this.open) return;
    const hit = (e.composedPath() as Element[]).some(
      (el) => el instanceof HTMLElement && el.localName === 'wc-menu-item',
    );
    if (hit) {
      this.open = false;
      this.unbindSideEffects();
      this.dispatchEvent(
        new CustomEvent('wc-close', {
          detail: { reason: 'select' },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class="item head ${this.disabled ? 'disabled' : ''}"
        part="header"
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded=${this.open}
        aria-disabled=${this.disabled}
        tabindex=${this.disabled ? -1 : 0}
        @click=${() => {
          if (!this.disabled) this.toggle();
        }}
        @keydown=${this.onKeydown}
      >
        ${this.icon ? html`<wc-icon class="ico" name=${this.icon}></wc-icon>` : nothing}
        <span class="label"><slot name="label">${this.label}</slot></span>
        <wc-icon class="ico arrow ${this.open ? 'up' : ''}" name="chevron-down"></wc-icon>
      </div>
      <div
        class="sub ${this.popup ? 'popup' : ''}"
        part="base"
        ?data-open=${this.open}
        @click=${this.onSubClick}
      >
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get('wc-sub-menu')) {
  customElements.define('wc-sub-menu', wcSubMenu);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-sub-menu': wcSubMenu;
  }
}
