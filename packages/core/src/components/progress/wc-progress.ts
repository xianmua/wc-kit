import { html, LitElement, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import '../icon/wc-icon.js';
import { progressStyles } from './wc-progress.styles';

export type wcProgressTheme = 'line' | 'circle';
export type wcProgressStatus = 'normal' | 'success' | 'warning' | 'error';

const CIRCLE_RADIUS = 32;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

/**
 * 进度条。line 线形 / circle 环形两种主题，value 取 0-100 自动夹紧；
 * status 语义色会同步指示条与标签（success/error 附带状态图标）。
 *
 * @example
 * ```html
 * <wc-progress value="60"></wc-progress>
 * <wc-progress theme="circle" value="80" status="success"></wc-progress>
 * ```
 *
 * @csspart base - 容器
 * @csspart track - 轨道
 * @csspart indicator - 指示条
 * @csspart label - 标签
 */
export class wcProgress extends LitElement {
  static styles = [baseStyles, progressStyles];

  /** 进度值 0-100（自动夹紧） */
  @property({ type: Number }) value = 0;

  /** 主题：line 线形 / circle 环形 */
  @property({ reflect: true }) theme: wcProgressTheme = 'line';

  /** 状态色（normal/success/warning/error，附带状态图标） */
  @property({ reflect: true }) status: wcProgressStatus = 'normal';

  /** 是否显示标签文本 */
  @property({ type: Boolean, attribute: 'show-label' }) showLabel = true;

  /** 线形轨道粗细（px） */
  @property({ type: Number, attribute: 'stroke-width' }) strokeWidth = 6;

  /** 自定义标签文本（默认显示百分比） */
  @property() label = '';

  /** 夹紧后的百分比 */
  private get percent(): number {
    return Math.min(100, Math.max(0, this.value));
  }

  /** 标签文本：label 属性优先，否则百分比 */
  private get labelText(): string {
    return this.label || `${Math.round(this.percent)}%`;
  }

  private renderStatusLabel(): TemplateResult | typeof nothing {
    if (!this.showLabel) return nothing;
    // 注意 nothing 是 truthy 符号，必须先算出图标名再判空串
    const iconName = this.status === 'success' ? 'check' : this.status === 'error' ? 'close' : '';
    return html`<span class="label" part="label">
      ${iconName ? html`<wc-icon name=${iconName}></wc-icon>` : nothing}${this.labelText}
    </span>`;
  }

  private renderLine(): TemplateResult {
    return html`<div class="line" part="base">
      <div
        class="track"
        part="track"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${Math.round(this.percent)}
        aria-label=${this.labelText}
        style="height: ${this.strokeWidth}px"
      >
        <div class="indicator" part="indicator" style="width: ${this.percent}%"></div>
      </div>
      ${this.renderStatusLabel()}
    </div>`;
  }

  private renderCircle(): TemplateResult {
    return html`<div class="circle-wrap" part="base">
      <svg
        class="circle"
        viewBox="0 0 72 72"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${Math.round(this.percent)}
        aria-label=${this.labelText}
      >
        <circle class="track" part="track" cx="36" cy="36" r="${CIRCLE_RADIUS}"></circle>
        <circle
          class="indicator"
          part="indicator"
          cx="36"
          cy="36"
          r="${CIRCLE_RADIUS}"
          stroke-dasharray="${CIRCLE_CIRCUMFERENCE}"
          stroke-dashoffset=${CIRCLE_CIRCUMFERENCE * (1 - this.percent / 100)}
          transform="rotate(-90 36 36)"
        ></circle>
      </svg>
      <div class="circle-label">${this.renderStatusLabel()}</div>
    </div>`;
  }

  protected override render(): TemplateResult {
    return this.theme === 'circle' ? this.renderCircle() : this.renderLine();
  }
}

if (!customElements.get('wc-progress')) {
  customElements.define('wc-progress', wcProgress);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-progress': wcProgress;
  }
}
