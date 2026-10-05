import { html, LitElement, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { skeletonPulseStyles, skeletonStyles } from './wc-skeleton.styles';

/**
 * 骨架屏。在内容加载完成前提供占位示意：圆头像（可选）+ 标题行 + rows 行正文行
 * （末行缩短）。animated 开启呼吸动画。
 *
 * @example
 * ```html
 * <wc-skeleton animated rows="4"></wc-skeleton>
 * <wc-skeleton avatar animated></wc-skeleton>
 * ```
 *
 * @csspart base - 骨架屏容器
 * @csspart avatar - 圆头像占位
 * @csspart line - 占位行
 * @cssprop --wc-skeleton-bg - 占位块颜色（默认 --wc-color-bg-disabled）
 * @cssprop --wc-skeleton-duration - 呼吸动画周期（默认 1.4s）
 */
export class wcSkeleton extends LitElement {
  static styles = [baseStyles, skeletonStyles, skeletonPulseStyles];

  /** 展示圆头像占位 */
  @property({ type: Boolean, reflect: true }) avatar = false;

  /** 正文占位行数 */
  @property({ type: Number, reflect: true }) rows = 3;

  /** 呼吸动画（默认关闭，与 antd active 一致为显式开启） */
  @property({ type: Boolean, reflect: true }) animated = false;

  protected override render(): TemplateResult {
    return html`
      <div class="skeleton ${this.animated ? 'animated' : ''}" part="base" aria-hidden="true">
        ${this.avatar ? html`<div class="avatar" part="avatar"></div>` : nothing}
        <div class="lines">
          <div class="line title" part="line"></div>
          ${Array.from({ length: Math.max(0, this.rows) }, (_, i) =>
            i === this.rows - 1
              ? html`<div class="line last" part="line"></div>`
              : html`<div class="line" part="line"></div>`,
          )}
        </div>
      </div>
    `;
  }
}

if (!customElements.get('wc-skeleton')) {
  customElements.define('wc-skeleton', wcSkeleton);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-skeleton': wcSkeleton;
  }
}
