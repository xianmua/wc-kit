import { html, LitElement, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { skeletonItemStyles } from './wc-skeleton-item.styles';
import { skeletonPulseStyles } from './wc-skeleton.styles';

export type wcSkeletonItemVariant = 'rect' | 'text' | 'circle';

/**
 * 骨架屏占位块：自由拼装自定义骨架布局的基础块（配合 wc-skeleton 使用）。
 * 尺寸由使用方通过样式控制（默认块高 24px、text 高 16px、circle 40px 正圆），
 * `variant` 只决定形状；animated 开启呼吸动画。
 *
 * @example
 * ```html
 * <wc-skeleton-item variant="circle" animated></wc-skeleton-item>
 * <wc-skeleton-item variant="text" style="width: 60%"></wc-skeleton-item>
 * ```
 *
 * @csspart base - 占位块
 * @cssprop --wc-skeleton-bg - 占位块颜色（默认 --wc-color-bg-disabled）
 * @cssprop --wc-skeleton-radius - 占位块圆角（默认 --wc-radius-small）
 * @cssprop --wc-skeleton-duration - 呼吸动画周期（默认 1.4s）
 */
export class wcSkeletonItem extends LitElement {
  static styles = [baseStyles, skeletonItemStyles, skeletonPulseStyles];

  /** 形状：rect 方块 / text 文本行 / circle 正圆 */
  @property({ reflect: true }) variant: wcSkeletonItemVariant = 'rect';

  /** 呼吸动画（默认关闭，显式开启） */
  @property({ type: Boolean, reflect: true }) animated = false;

  protected override render(): TemplateResult {
    return html`<div class="item ${this.animated ? 'animated' : ''}" part="base"></div>`;
  }
}

if (!customElements.get('wc-skeleton-item')) {
  customElements.define('wc-skeleton-item', wcSkeletonItem);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-skeleton-item': wcSkeletonItem;
  }
}
