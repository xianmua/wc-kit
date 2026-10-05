import { html, LitElement, nothing, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { LocalizeController } from '../../i18n/localize-controller';
import { POSITION_GAP } from '../../common/position';
import '../icon/wc-icon.js';
import { floatButtonStyles } from './wc-float-button.styles';

export type wcFloatButtonShape = 'circle' | 'square';
export type wcFloatButtonType = 'default' | 'primary';

let floatButtonUid = 0;

/** tooltip 显示/隐藏防抖延迟（ms） */
const SHOW_DELAY = 100;
const HIDE_DELAY = 150;

/**
 * 悬浮按钮：固定在视口角落的圆形/方形操作按钮（形态对齐 antd FloatButton）。
 * 有 href 渲染链接，dot/count 渲染右上角徽标，tooltip 悬浮显示气泡；
 * backtop 为「回到顶部」预设——滚动超过 visibility-height 才显示，点击滚回顶部。
 * 组合用法见 wc-float-button-group。
 *
 * @example
 * ```html
 * <wc-float-button icon="plus" tooltip="新增"></wc-float-button>
 * <wc-float-button backtop></wc-float-button>
 * ```
 *
 * @slot icon - 图标（覆盖 icon 属性）
 * @slot - 文字描述（覆盖 description 属性）
 * @csspart base - 按钮本体
 * @csspart badge - 徽标
 * @cssprop --wc-float-button-bottom - 距视口底部距离（默认 24px）
 * @cssprop --wc-float-button-right - 距视口右侧距离（默认 24px）
 * @cssprop --wc-float-button-size - 按钮尺寸（默认 40px）
 */
export class wcFloatButton extends LitElement {
  static styles = [baseStyles, floatButtonStyles];

  /** 形状 */
  @property({ reflect: true }) shape: wcFloatButtonShape = 'circle';

  /** 类型：default 白底 / primary 主题色底 */
  @property({ reflect: true }) type: wcFloatButtonType = 'default';

  /** 图标名称（内置图标库） */
  @property() icon = '';

  /** 文字描述（square 形状下显示在图标下方） */
  @property() description = '';

  /** 悬浮提示内容（backtop 时缺省为「回到顶部」） */
  @property() tooltip = '';

  /** 链接地址（有值渲染 <a>，否则渲染 <button>） */
  @property() href = '';

  /** 链接打开方式（仅 href 存在时生效） */
  @property() target = '';

  /** 禁用 */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** 右上角红点（忽略 count，恒显示） */
  @property({ type: Boolean, reflect: true }) dot = false;

  /** 右上角徽标数字（<= 0 隐藏） */
  @property({ type: Number }) count = 0;

  /** 徽标数字上限，超出显示「max+」 */
  @property({ type: Number }) max = 99;

  /** 回到顶部预设 */
  @property({ type: Boolean, reflect: true }) backtop = false;

  /** 回到顶部：滚动超过该距离（px）才显示 */
  @property({ type: Number, attribute: 'visibility-height' }) visibilityHeight = 400;

  private localize = new LocalizeController(this);

  private tipId = `wc-float-button-tip-${++floatButtonUid}`;

  /** icon/description 插槽是否有内容（空容器会撑出 flex gap 偏移，需隐藏） */
  @state() private _hasIcon = false;

  @state() private _hasText = false;

  private onIconSlotChange(e: Event): void {
    this._hasIcon = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  }

  private onTextSlotChange(e: Event): void {
    // 过滤纯空白文本节点（嵌套写法/模板缩进会产生，会让空 desc 参与布局挤偏图标）
    const nodes = (e.target as HTMLSlotElement).assignedNodes({ flatten: true });
    this._hasText = nodes.some((n) => (n.textContent ?? '').trim() !== '');
  }

  private showTimer: ReturnType<typeof setTimeout> | null = null;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;

  private onScroll = (): void => {
    this.toggleAttribute('data-visible', window.scrollY > this.visibilityHeight);
  };

  private onDocumentClick = (e: Event): void => {
    if (e.composedPath().includes(this)) return;
    this.hideTip();
  };

  override connectedCallback(): void {
    super.connectedCallback();
    if (this.backtop) this.bindBacktop();
  }

  override disconnectedCallback(): void {
    this.unbindBacktop();
    this.unbindOutsideClose();
    this.clearTimers();
    super.disconnectedCallback();
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    if (changed.has('backtop')) {
      if (this.backtop) this.bindBacktop();
      else {
        this.unbindBacktop();
        this.removeAttribute('data-visible');
      }
    }
    if (changed.has('tooltip') && this.tooltipIsOpen) {
      this.updateComplete.then(() => this.positionTip());
    }
  }

  private bindBacktop(): void {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
  }

  private unbindBacktop(): void {
    window.removeEventListener('scroll', this.onScroll);
  }

  /* ---------- 内建 tooltip ---------- */

  private tooltipIsOpen = false;

  /** 实际展示的提示文本（backtop 缺省取 i18n 文案） */
  private get effectiveTooltip(): string {
    if (this.backtop && !this.tooltip) return this.localize.term('floatbutton.backtop');
    return this.tooltip;
  }

  private showTip(): void {
    if (!this.effectiveTooltip || this.disabled) return;
    this.clearTimers();
    this.showTimer = setTimeout(() => {
      if (this.tooltipIsOpen) return;
      this.tooltipIsOpen = true;
      this.bindOutsideClose();
      this.updateComplete.then(() => this.positionTip());
      this.requestUpdate();
    }, SHOW_DELAY);
  }

  private hideTip(): void {
    this.clearTimers();
    this.hideTimer = setTimeout(() => {
      if (!this.tooltipIsOpen) return;
      this.tooltipIsOpen = false;
      this.unbindOutsideClose();
      this.requestUpdate();
    }, HIDE_DELAY);
  }

  /** 气泡 fixed 定位于按钮左侧，垂直居中（空间不足贴边时夹近视口） */
  private positionTip(): void {
    const tip = this.shadowRoot!.querySelector<HTMLElement>('.tip');
    if (!tip) return;
    const rect = this.getBoundingClientRect();
    tip.style.visibility = 'hidden';
    tip.style.left = '0px';
    tip.style.top = '0px';
    const tipRect = tip.getBoundingClientRect();
    const x = rect.left - tipRect.width - POSITION_GAP;
    const y = rect.top + rect.height / 2 - tipRect.height / 2;
    tip.style.left = `${Math.max(POSITION_GAP, x)}px`;
    tip.style.top = `${Math.min(Math.max(POSITION_GAP, y), window.innerHeight - tipRect.height - POSITION_GAP)}px`;
    tip.style.visibility = '';
  }

  private bindOutsideClose(): void {
    document.addEventListener('click', this.onDocumentClick, true);
  }

  private unbindOutsideClose(): void {
    document.removeEventListener('click', this.onDocumentClick, true);
  }

  private clearTimers(): void {
    if (this.showTimer !== null) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
    if (this.hideTimer !== null) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }

  /* ---------- 点击 ---------- */

  private onClick(e: MouseEvent): void {
    if (this.disabled) return;
    if (this.backtop) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /** 实际展示的徽标文本 */
  private get displayCount(): string {
    if (this.count > this.max) return `${this.max}+`;
    return String(Math.max(0, this.count));
  }

  render(): TemplateResult {
    const badgeVisible = this.dot || this.count > 0;
    const tip = this.effectiveTooltip;
    // backtop 缺省内建 arrow-up 图标（未被 icon 属性 / icon 插槽覆盖时）
    const effectiveIcon = this.icon || (this.backtop ? 'arrow-up' : '');
    const icon = html`
      <span class="ico" part="icon" ?hidden=${!effectiveIcon && !this._hasIcon}>
        ${
          effectiveIcon
            ? html`<wc-icon name=${effectiveIcon}></wc-icon>`
            : html`<slot name="icon" @slotchange=${this.onIconSlotChange}></slot>`
        }
      </span>
    `;
    const inner = html`${icon}<span
        class="desc"
        part="description"
        ?hidden=${!this.description && !this._hasText}
        ><slot @slotchange=${this.onTextSlotChange}>${this.description}</slot></span
      >`;
    const fab =
      this.href && !this.disabled
        ? html`<a
            class="fab"
            part="base"
            href=${this.href}
            target=${this.target || nothing}
            rel=${this.target === '_blank' ? 'noopener noreferrer' : nothing}
            aria-describedby=${this.tooltipIsOpen ? this.tipId : nothing}
            @mouseenter=${this.showTip}
            @mouseleave=${this.hideTip}
            @focusin=${this.showTip}
            @focusout=${this.hideTip}
            @click=${this.onClick}
            >${inner}</a
          >`
        : html`<button
            class="fab"
            part="base"
            type="button"
            ?disabled=${this.disabled}
            aria-describedby=${this.tooltipIsOpen ? this.tipId : nothing}
            @mouseenter=${this.showTip}
            @mouseleave=${this.hideTip}
            @focusin=${this.showTip}
            @focusout=${this.hideTip}
            @click=${this.onClick}
          >
            ${inner}
          </button>`;

    return html`${fab}
    ${
      badgeVisible
        ? html`<sup class="badge" part="badge">${this.dot ? nothing : this.displayCount}</sup>`
        : nothing
    }
    ${
      tip
        ? html`<div
            class="tip"
            part="tooltip"
            role="tooltip"
            id=${this.tipId}
            ?data-open=${this.tooltipIsOpen}
          >
            ${tip}
          </div>`
        : nothing
    }`;
  }
}

if (!customElements.get('wc-float-button')) {
  customElements.define('wc-float-button', wcFloatButton);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-float-button': wcFloatButton;
  }
}
