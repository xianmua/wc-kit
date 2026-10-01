import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { OverlaySideEffects } from '../../common/overlay-side-effects';
import { LocalizeController } from '../../i18n/localize-controller';
import '../button/wc-button.js';
import '../icon/wc-icon.js';
import { drawerStyles } from './wc-drawer.styles';

export type wcDrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type wcDrawerCloseReason = 'close-btn' | 'overlay' | 'escape' | 'confirm' | 'cancel' | 'api';

/** 预设尺寸档位（左右为宽，上下为高） */
const PRESET_SIZES: Record<string, string> = {
  small: '300px',
  medium: '500px',
  large: '760px',
};

/**
 * 抽屉：从屏幕边缘滑出的模态面板，复用 Dialog 的弹层副作用
 * （Escape / 焦点陷阱与归还 / 跨弹层滚动锁）。
 * 关闭统一走可取消的 wc-close 事件（preventDefault 可阻止关闭）。
 *
 * @slot - 抽屉内容
 * @slot header - 自定义页头（覆盖 header 属性）
 * @slot footer - 自定义页脚（覆盖默认确认/取消按钮）
 * @csspart overlay - 遮罩层
 * @csspart base - 抽屉面板
 * @csspart header - 页头
 * @csspart body - 内容区
 * @csspart footer - 页脚
 * @cssprop --wc-drawer-size - 面板尺寸（placement 决定是宽还是高）
 * @fires wc-open - 打开后触发
 * @fires wc-close - 请求关闭时触发（可取消，detail.reason 标识来源）
 * @fires wc-confirm - 点击默认确认按钮触发（确认后自动请求关闭）
 * @fires wc-cancel - 点击默认取消按钮触发（取消后自动请求关闭）
 */
export class wcDrawer extends LitElement {
  static styles = [baseStyles, drawerStyles];

  /** 是否打开 */
  @property({ type: Boolean, reflect: true }) open = false;

  /** 弹出边缘 */
  @property({ reflect: true }) placement: wcDrawerPlacement = 'right';

  /** 面板尺寸：small / medium / large / 纯数字（px）/ CSS 尺寸值 */
  @property() size: keyof typeof PRESET_SIZES | string = 'medium';

  /** 页头标题（header 插槽优先） */
  @property() header = '';

  /** 是否展示页脚（默认确认/取消） */
  @property({ type: Boolean }) footer = true;

  /** 展示关闭按钮 */
  @property({ type: Boolean, reflect: true }) closable = true;

  /** 点击遮罩关闭（抽屉默认开启） */
  @property({ type: Boolean, attribute: 'close-on-overlay-click' }) closeOnOverlayClick = true;

  private localize = new LocalizeController(this);

  /** 打开副作用：Escape / 焦点陷阱 / 滚动锁（与 Dialog 共用） */
  private overlay = new OverlaySideEffects(this, {
    requestClose: (reason) => this.requestClose(reason as wcDrawerCloseReason),
  });

  override connectedCallback(): void {
    super.connectedCallback();
    if (this.open) this.overlay.bind();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.overlay.unbind();
  }

  /** 打开抽屉 */
  show(): void {
    if (this.open) return;
    this.open = true;
  }

  /** 请求关闭（发出可取消的 wc-close） */
  requestClose(reason: wcDrawerCloseReason = 'api'): void {
    const accepted = this.dispatchEvent(
      new CustomEvent('wc-close', {
        detail: { reason },
        bubbles: true,
        composed: true,
        cancelable: true,
      }),
    );
    if (accepted) this.open = false;
  }

  /** 默认确认：派发 wc-confirm 并关闭 */
  confirm(): void {
    this.dispatchEvent(new CustomEvent('wc-confirm', { bubbles: true, composed: true }));
    this.requestClose('confirm');
  }

  /** 默认取消：派发 wc-cancel 并关闭 */
  cancel(): void {
    this.dispatchEvent(new CustomEvent('wc-cancel', { bubbles: true, composed: true }));
    this.requestClose('cancel');
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    if (!changed.has('open')) return;
    if (this.open) {
      this.dispatchEvent(new CustomEvent('wc-open', { bubbles: true, composed: true }));
      this.overlay.bind();
    } else {
      this.overlay.unbind();
    }
  }

  private onOverlayClick(e: MouseEvent): void {
    if (e.target !== e.currentTarget) return;
    if (this.closeOnOverlayClick) this.requestClose('overlay');
  }

  private sizeStyle(): string {
    const preset = PRESET_SIZES[this.size];
    const raw = preset ?? this.size.trim();
    const size = /^\d+$/.test(raw) ? `${raw}px` : raw;
    return `--wc-drawer-size:${size}`;
  }

  render() {
    return html`
      <div class="overlay" part="overlay" ?hidden=${!this.open} @click=${this.onOverlayClick}>
        <div
          class="drawer placement-${this.placement}"
          part="base"
          role="dialog"
          aria-modal="true"
          aria-label=${this.header || 'drawer'}
          tabindex="-1"
          style=${this.sizeStyle()}
        >
          ${
            this.header || this.closable
              ? html`
                  <div class="header" part="header">
                    <div class="title"><slot name="header">${this.header}</slot></div>
                    ${
                      this.closable
                        ? html`
                            <button
                              type="button"
                              class="close"
                              part="close-button"
                              aria-label=${this.localize.term('dialog.close')}
                              @click=${() => this.requestClose('close-btn')}
                            >
                              <wc-icon name="close"></wc-icon>
                            </button>
                          `
                        : ''
                    }
                  </div>
                `
              : ''
          }
          <div class="body" part="body"><slot></slot></div>
          ${
            this.footer
              ? html`
                  <div class="footer" part="footer">
                    <slot name="footer">
                      <wc-button @click=${() => this.cancel()}>
                        ${this.localize.term('dialog.cancel')}
                      </wc-button>
                      <wc-button theme="primary" @click=${() => this.confirm()}>
                        ${this.localize.term('dialog.confirm')}
                      </wc-button>
                    </slot>
                  </div>
                `
              : ''
          }
        </div>
      </div>
    `;
  }
}

if (!customElements.get('wc-drawer')) {
  customElements.define('wc-drawer', wcDrawer);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-drawer': wcDrawer;
  }
}
