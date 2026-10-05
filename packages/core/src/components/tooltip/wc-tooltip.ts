import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { positionPanel, splitPlacement, type WcPlacement } from '../../common/position';
import { OutsideClickController } from '../../common/outside-click';
import '../icon/wc-icon.js';
import { tooltipStyles } from './wc-tooltip.styles';

export type wcTooltipTrigger = 'hover' | 'click' | 'manual';

/** 显示/隐藏防抖延迟（ms） */
const SHOW_DELAY = 100;
const HIDE_DELAY = 150;

let tooltipUid = 0;

/**
 * 文字提示：悬浮/聚焦触发，auto-placement 会在空间不足时自动翻转方向。
 * content 属性或 content 插槽提供内容；trigger="manual" 时用 show()/hide() 控制。
 *
 * @slot - 触发元素
 * @slot content - 富文本内容（覆盖 content 属性）
 * @csspart trigger - 触发区
 * @csspart base - 提示面板
 * @csspart arrow - 箭头
 * @cssprop --wc-tooltip-max-width - 面板最大宽度（默认 240px）
 * @fires wc-show - 开始显示时触发
 * @fires wc-hide - 开始隐藏时触发
 */
export class wcTooltip extends LitElement {
  static styles = [baseStyles, tooltipStyles];

  /** 提示内容 */
  @property() content = '';

  /** 期望弹出方向（空间不足自动翻转） */
  @property() placement: WcPlacement = 'top';

  /** 触发方式：hover（含 focus）/ click / manual */
  @property({ reflect: true }) trigger: wcTooltipTrigger = 'hover';

  /** 当前是否可见 */
  @property({ type: Boolean, reflect: true }) open = false;

  private panelId = `wc-tooltip-panel-${++tooltipUid}`;

  private showTimer: ReturnType<typeof setTimeout> | null = null;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;

  private outsideClick = new OutsideClickController(this, () => {
    // 仅 click 触发模式响应外点关闭；hover 模式由 mouseleave 收起
    if (this.trigger === 'click') this.hide();
  });

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.clearTimers();
  }

  /** 显示（manual 模式或编程调用） */
  show(): void {
    this.clearTimers();
    this.showTimer = setTimeout(() => {
      if (!this.open) {
        this.open = true;
        this.dispatchEvent(new CustomEvent('wc-show', { bubbles: true, composed: true }));
      }
    }, SHOW_DELAY);
  }

  /** 隐藏 */
  hide(): void {
    this.clearTimers();
    this.hideTimer = setTimeout(() => {
      if (this.open) {
        this.open = false;
        this.dispatchEvent(new CustomEvent('wc-hide', { bubbles: true, composed: true }));
      }
    }, HIDE_DELAY);
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

  private onTriggerEnter(): void {
    if (this.trigger !== 'hover') return;
    this.show();
  }

  private onTriggerLeave(): void {
    if (this.trigger !== 'hover') return;
    this.hide();
  }

  private onTriggerClick(e: Event): void {
    if (this.trigger !== 'click') return;
    // 避免点击触发元素本身触发 document 关闭逻辑
    e.stopPropagation();
    if (this.open) this.hide();
    else this.show();
  }

  private onTriggerKeydown(e: KeyboardEvent): void {
    if (this.trigger === 'click' && e.key === 'Escape' && this.open) {
      this.hide();
    }
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    if (changed.has('open') && this.open) {
      this.position();
    }
  }

  /** 计算并应用 fixed 定位与箭头偏移 */
  private position(): void {
    positionPanel(
      this,
      this.shadowRoot!.querySelector<HTMLElement>('.panel'),
      this.placement,
      undefined,
      '--wc-tooltip-arrow-offset',
    );
  }

  render() {
    const { base } = splitPlacement(this.placement);
    return html`
      <span
        class="trigger"
        part="trigger"
        aria-describedby=${this.panelId}
        @mouseenter=${this.onTriggerEnter}
        @mouseleave=${this.onTriggerLeave}
        @focusin=${this.onTriggerEnter}
        @focusout=${this.onTriggerLeave}
        @click=${this.onTriggerClick}
        @keydown=${this.onTriggerKeydown}
      >
        <slot></slot>
      </span>
      <div
        class="panel side-${base}"
        part="base"
        id=${this.panelId}
        role="tooltip"
        ?data-open=${this.open}
      >
        <div class="arrow" part="arrow"></div>
        <div class="body"><slot name="content">${this.content}</slot></div>
      </div>
    `;
  }
}

if (!customElements.get('wc-tooltip')) {
  customElements.define('wc-tooltip', wcTooltip);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-tooltip': wcTooltip;
  }
}
