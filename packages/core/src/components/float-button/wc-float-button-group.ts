import { html, LitElement, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { LocalizeController } from '../../i18n/localize-controller';
import '../icon/wc-icon.js';
import './wc-float-button.js';
import { floatButtonGroupStyles } from './wc-float-button-group.styles';
import type { wcFloatButtonShape } from './wc-float-button.js';

export type wcFloatButtonGroupTrigger = '' | 'click' | 'hover';

/**
 * 悬浮按钮组：子元素 `wc-float-button` 垂直堆叠于宿主上方（形态对齐
 * antd FloatButton.Group，但按钮间用间距分离）。trigger="click"/"hover"
 * 时变为 speed-dial：收起只显示触发按钮（plus 展开时旋转成 ×），点击/悬浮展开。
 * group 的 shape 会同步给未显式设置 shape 的子按钮。
 *
 * @example
 * ```html
 * <wc-float-button-group trigger="click">
 *   <wc-float-button icon="plus" tooltip="新增"></wc-float-button>
 *   <wc-float-button icon="search" tooltip="搜索"></wc-float-button>
 * </wc-float-button-group>
 * ```
 *
 * @slot - 子按钮（wc-float-button）
 * @csspart trigger - 触发按钮（仅 trigger 模式）
 * @csspart items - 子按钮容器
 * @cssprop --wc-float-button-bottom - 距视口底部距离（默认 24px）
 * @cssprop --wc-float-button-right - 距视口右侧距离（默认 24px）
 * @cssprop --wc-float-button-gap - 按钮间距（默认 8px）
 * @fires wc-open - 展开
 * @fires wc-close - 收起，detail.reason: 'outside' | 'escape' | 'toggle'
 */
export class wcFloatButtonGroup extends LitElement {
  static styles = [baseStyles, floatButtonGroupStyles];

  /** 形状（同步给未显式设置 shape 的子按钮与触发按钮） */
  @property({ reflect: true }) shape: wcFloatButtonShape = 'circle';

  /** 触发方式：空 = 子按钮常显堆叠 */
  @property({ reflect: true }) trigger: wcFloatButtonGroupTrigger = '';

  /** 当前是否展开（仅 trigger 模式生效） */
  @property({ type: Boolean, reflect: true }) open = false;

  /** 触发按钮图标（默认 plus） */
  @property() icon = '';

  private localize = new LocalizeController(this);

  constructor() {
    super();
    this.addEventListener('keydown', this.handleKeydown);
    // mouseenter/leave 不冒泡，直接挂宿主（speed-dial 悬浮开合）
    this.addEventListener('mouseenter', this.onHostMouseenter);
    this.addEventListener('mouseleave', this.onHostMouseleave);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unbindOutsideClose();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    // 带 open 属性创建时 show() 不会执行，副作用需在此绑定
    if (this.open && this.trigger === 'click') this.bindOutsideClose();
  }

  /* ---------- 开合 ---------- */

  /** 展开（仅 trigger 模式） */
  show(): void {
    if (!this.trigger || this.open) return;
    this.open = true;
    if (this.trigger === 'click') this.bindOutsideClose();
    this.dispatchEvent(new CustomEvent('wc-open', { bubbles: true, composed: true }));
  }

  /** 收起（不派发事件） */
  hide(): void {
    if (!this.open) return;
    this.open = false;
    this.unbindOutsideClose();
  }

  /** 切换开合 */
  toggle(): void {
    if (this.open) {
      this.hide();
      this.emitClose('toggle');
    } else {
      this.show();
    }
  }

  private emitClose(reason: 'outside' | 'escape' | 'toggle'): void {
    this.dispatchEvent(
      new CustomEvent('wc-close', { detail: { reason }, bubbles: true, composed: true }),
    );
  }

  private onDocumentClick = (e: Event): void => {
    if ((e.composedPath() as Array<EventTarget>).includes(this)) return;
    const wasOpen = this.open;
    this.hide();
    if (wasOpen) this.emitClose('outside');
  };

  private bindOutsideClose(): void {
    document.addEventListener('click', this.onDocumentClick, true);
  }

  private unbindOutsideClose(): void {
    document.removeEventListener('click', this.onDocumentClick, true);
  }

  private handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.open) {
      this.hide();
      this.emitClose('escape');
    }
  };

  private onTriggerClick(): void {
    if (this.trigger !== 'click') return;
    this.toggle();
  }

  private onHostMouseenter(): void {
    if (this.trigger === 'hover') this.show();
  }

  private onHostMouseleave(): void {
    if (this.trigger === 'hover') {
      const wasOpen = this.open;
      this.hide();
      if (wasOpen) this.emitClose('toggle');
    }
  }

  /* ---------- 子按钮 shape 同步 ---------- */

  private onSlotChange(e: Event): void {
    this.syncShapes((e.target as HTMLSlotElement).assignedElements());
  }

  private syncShapes(els: Element[]): void {
    for (const el of els) {
      if (el.tagName === 'WC-FLOAT-BUTTON' && !el.hasAttribute('shape')) {
        el.setAttribute('shape', this.shape);
      }
    }
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    if (changed.has('shape')) {
      const slot = this.shadowRoot!.querySelector('slot');
      if (slot) this.syncShapes(slot.assignedElements());
    }
  }

  render(): TemplateResult {
    return html`
      ${
        this.trigger
          ? html`<wc-float-button
              class="trigger-btn"
              part="trigger"
              shape=${this.shape}
              aria-expanded=${this.open}
              aria-label=${this.localize.term('floatbutton.menu')}
              @click=${this.onTriggerClick}
            >
              <wc-icon slot="icon" class="trigger-ico" name=${this.icon || 'plus'}></wc-icon>
            </wc-float-button>`
          : nothing
      }
      <div class="items" part="items" ?data-open=${!this.trigger || this.open}>
        <slot @slotchange=${this.onSlotChange}></slot>
      </div>
    `;
  }
}

if (!customElements.get('wc-float-button-group')) {
  customElements.define('wc-float-button-group', wcFloatButtonGroup);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-float-button-group': wcFloatButtonGroup;
  }
}
