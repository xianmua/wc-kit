import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { avatarStyles } from './wc-avatar.styles';

export type wcAvatarShape = 'circle' | 'round' | 'square';
export type wcAvatarSize = 'small' | 'medium' | 'large';

const PRESET_SIZES: wcAvatarSize[] = ['small', 'medium', 'large'];

/**
 * 头像。内容放默认插槽（文字 / wc-icon / img 均可）。
 * size 除三档预设外，也接受任意 CSS 尺寸（如 "48px" 或纯数字按 px 处理）。
 *
 * @slot - 头像内容
 * @csspart base - 头像主体
 * @cssprop --wc-avatar-size - 自定义尺寸时也可直接覆写此变量
 */
export class wcAvatar extends LitElement {
  static styles = [baseStyles, avatarStyles];

  /** 尺寸：预设档位或 CSS 尺寸值（纯数字按 px） */
  @property() size: wcAvatarSize | string = 'medium';

  /** 形状 */
  @property({ reflect: true }) shape: wcAvatarShape = 'circle';

  private get isPreset(): boolean {
    return PRESET_SIZES.includes(this.size as wcAvatarSize);
  }

  private get customStyle(): string {
    if (this.isPreset) return '';
    const raw = this.size.trim();
    const size = /^\d+$/.test(raw) ? `${raw}px` : raw;
    return `--wc-avatar-size:${size};--wc-avatar-font-size:${size}`;
  }

  render() {
    return html`
      <div
        class="avatar ${this.isPreset ? this.size : 'custom'} shape-${this.shape}"
        part="base"
        style=${this.customStyle}
      >
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get('wc-avatar')) {
  customElements.define('wc-avatar', wcAvatar);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-avatar': wcAvatar;
  }
}
