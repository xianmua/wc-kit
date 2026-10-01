import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { spaceStyles } from './wc-space.styles';

export type wcSpaceDirection = 'horizontal' | 'vertical';
export type wcSpaceAlign = 'start' | 'center' | 'end' | 'baseline';

/** 预设间距档位 → 语义令牌 */
const PRESET_SIZES: Record<string, string> = {
  small: 'var(--wc-space-2)',
  medium: 'var(--wc-space-4)',
  large: 'var(--wc-space-6)',
};

/**
 * 间距容器：为子元素批量提供间距（gap 实现，不产生额外 DOM 包裹）。
 * size 支持预设档位、纯数字（按 px）或任意 CSS 尺寸值。
 *
 * @slot - 任意子元素
 * @csspart base - 间距容器
 * @cssprop --wc-space-gap - 也可直接覆写间距
 */
export class wcSpace extends LitElement {
  static styles = [baseStyles, spaceStyles];

  /** 间距：small / medium / large / 纯数字（px）/ CSS 尺寸值 */
  @property() size: keyof typeof PRESET_SIZES | string = 'medium';

  /** 排列方向 */
  @property({ reflect: true }) direction: wcSpaceDirection = 'horizontal';

  /** 对齐方式 */
  @property({ reflect: true }) align?: wcSpaceAlign;

  /** 允许换行 */
  @property({ type: Boolean, reflect: true }) wrap = false;

  private get gapValue(): string {
    const preset = PRESET_SIZES[this.size];
    if (preset) return preset;
    const raw = this.size.trim();
    return /^\d+$/.test(raw) ? `${raw}px` : raw;
  }

  render() {
    return html`
      <div
        class="space ${`align-${this.align ?? (this.direction === 'vertical' ? 'stretch' : 'center')}`}"
        part="base"
        style=${`--wc-space-gap:${this.gapValue}`}
      >
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get('wc-space')) {
  customElements.define('wc-space', wcSpace);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-space': wcSpace;
  }
}
