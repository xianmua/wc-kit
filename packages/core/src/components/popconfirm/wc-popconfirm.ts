import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { computePosition, splitPlacement, type WcPlacement } from '../../common/position';
import { LocalizeController } from '../../i18n/localize-controller';
import '../button/wc-button.js';
import '../icon/wc-icon.js';
import { popconfirmStyles } from './wc-popconfirm.styles';

let popconfirmUid = 0;

/**
 * 气泡确认：点击触发的二次确认浮层。
 * 定位复用 position.ts（空间不足自动翻转），确认/取消派发 wc-confirm / wc-cancel
 * 并自动关闭。点击外部或 Esc 也会关闭。
 *
 * @slot - 触发元素
 * @slot content - 确认文案（覆盖 content 属性）
 * @csspart trigger - 触发区
 * @csspart base - 气泡面板
 * @csspart icon - 提示图标
 * @csspart actions - 按钮区
 * @fires wc-confirm - 点击确认（之后自动关闭）
 * @fires wc-cancel - 点击取消 / 外部点击 / Esc（之后自动关闭）
 */
export class wcPopconfirm extends LitElement {
  static styles = [baseStyles, popconfirmStyles];

  /** 确认文案 */
  @property() content = '';

  /** 期望弹出方向（空间不足自动翻转） */
  @property() placement: WcPlacement = 'top';

  /** 确认按钮文案（默认 i18n「确认」） */
  @property({ attribute: 'confirm-text' }) confirmText = '';

  /** 取消按钮文案（默认 i18n「取消」） */
  @property({ attribute: 'cancel-text' }) cancelText = '';

  /** 确认按钮主题（primary/danger 等，透传 wc-button） */
  @property() theme = 'primary';

  /** 图标名称（内置图标名，空字符串隐藏） */
  @property() icon = 'warning';

  /** 当前是否打开 */
  @property({ type: Boolean, reflect: true }) open = false;

  private panelId = `wc-popconfirm-panel-${++popconfirmUid}`;

  private localize = new LocalizeController(this);

  private onDocumentClick = (e: Event): void => {
    if (e.composedPath().includes(this)) return;
    this.cancel('outside');
  };

  private onDocumentKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      this.cancel('escape');
    }
  };

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unbindSideEffects();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    // 带 open 属性创建时 show() 不会执行，副作用需在此绑定
    if (this.open) this.bindSideEffects();
  }

  /** 打开气泡 */
  show(): void {
    if (this.open) return;
    this.open = true;
    this.bindSideEffects();
  }

  /** 关闭气泡（不派发事件） */
  hide(): void {
    if (!this.open) return;
    this.open = false;
    this.unbindSideEffects();
  }

  /** 确认：派发 wc-confirm 并关闭 */
  confirm(): void {
    this.dispatchEvent(new CustomEvent('wc-confirm', { bubbles: true, composed: true }));
    this.hide();
  }

  /** 取消：派发 wc-cancel 并关闭 */
  cancel(reason: 'button' | 'outside' | 'escape' = 'button'): void {
    if (!this.open) return;
    this.dispatchEvent(
      new CustomEvent('wc-cancel', { detail: { reason }, bubbles: true, composed: true }),
    );
    this.hide();
  }

  private bindSideEffects(): void {
    document.addEventListener('click', this.onDocumentClick, true);
    document.addEventListener('keydown', this.onDocumentKeydown, true);
    // 焦点移到确认按钮；关闭时归还给触发元素
    queueMicrotask(() => {
      this.shadowRoot!.querySelector<HTMLElement>('[part="confirm-button"]')?.focus();
    });
  }

  private unbindSideEffects(): void {
    document.removeEventListener('click', this.onDocumentClick, true);
    document.removeEventListener('keydown', this.onDocumentKeydown, true);
    this.shadowRoot!.querySelector<HTMLElement>('.trigger')?.focus();
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    if (!changed.has('open')) return;
    if (this.open) {
      this.bindSideEffects();
      this.position();
    } else {
      this.unbindSideEffects();
    }
  }

  /** 计算并应用 fixed 定位与箭头偏移（同 Tooltip） */
  private position(): void {
    const panel = this.shadowRoot!.querySelector<HTMLElement>('.panel');
    if (!panel) return;
    const anchor = this.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const viewport = { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight };
    const result = computePosition(anchor, panelRect, viewport, this.placement);
    panel.style.left = `${result.x}px`;
    panel.style.top = `${result.y}px`;
    panel.dataset.placement = result.placement;
    panel.style.setProperty('--wc-popconfirm-arrow-offset', `${result.arrowOffset}px`);
  }

  private onTriggerClick(e: Event): void {
    // 防止触发元素的点击冒泡到 document 立即又关闭
    e.stopPropagation();
    if (this.open) this.hide();
    else this.show();
  }

  render() {
    const { base } = splitPlacement(this.placement);
    return html`
      <span
        class="trigger"
        part="trigger"
        tabindex="0"
        role="button"
        aria-describedby=${this.open ? this.panelId : ''}
        @click=${this.onTriggerClick}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.onTriggerClick(e);
          }
        }}
      >
        <slot></slot>
      </span>
      <div
        class="panel side-${base}"
        part="base"
        id=${this.panelId}
        role="dialog"
        aria-label=${this.content || 'popconfirm'}
        ?data-open=${this.open}
      >
        <div class="arrow" part="arrow"></div>
        <div class="main">
          ${this.icon ? html`<wc-icon class="icon" part="icon" name=${this.icon}></wc-icon>` : ''}
          <div class="content"><slot name="content">${this.content}</slot></div>
        </div>
        <div class="actions" part="actions">
          <wc-button size="small" @click=${() => this.cancel('button')}>
            ${this.cancelText || this.localize.term('dialog.cancel')}
          </wc-button>
          <wc-button
            size="small"
            theme=${this.theme}
            part="confirm-button"
            @click=${() => this.confirm()}
          >
            ${this.confirmText || this.localize.term('dialog.confirm')}
          </wc-button>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('wc-popconfirm')) {
  customElements.define('wc-popconfirm', wcPopconfirm);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-popconfirm': wcPopconfirm;
  }
}
