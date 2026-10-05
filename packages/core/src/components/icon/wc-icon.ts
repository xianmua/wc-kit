import { LitElement, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import type { PropertyValues } from 'lit';
import { baseStyles } from '../../styles/base.css.js';
import { getIcon, onIconRegister, registerIcon, resolveIcon } from '../../icons/library.js';
import { builtinIconsWithFeather } from '../../icons/index.js';
import { iconStyles } from './wc-icon.styles.js';

// 全部内置图标（291 个）随模块加载自动注册（用户同名注册优先，不覆盖）：
// 内部组件与 <wc-icon name="..."> 开箱即用、零配置
for (const icon of builtinIconsWithFeather) {
  if (!getIcon(icon.name)) {
    registerIcon(icon.name, icon.svg);
  }
}

/**
 * 图标
 *
 * 三种来源（优先级从高到低）：`src`（URL 直连）> `name` + `library`（图标库解析）。
 * 全部 291 个内置图标随本模块自动注册，开箱即用；
 * 自定义图标用 `registerIcon()`，自定义/远程库用 `registerIconLibrary()`。
 *
 * @slot - 无（内容由 name/src 解析而来）
 * @csspart base - 图标容器
 * @cssprop --wc-icon-size - 覆盖图标尺寸（默认 1em）
 */
export class WcIcon extends LitElement {
  static styles = [baseStyles, iconStyles];

  /** 图标名（在 library 对应的图标库中查找） */
  @property() name = '';

  /** 直接指定 SVG 地址，优先级高于 name */
  @property() src = '';

  /** 图标库名称，默认走同步注册表 */
  @property() library = 'default';

  /** 无障碍描述文案；提供时 role=img + aria-label，否则对读屏隐藏 */
  @property() label = '';

  /** 旋转动画（加载中） */
  @property({ type: Boolean, reflect: true }) spin = false;

  /** 缓动旋转动画 */
  @property({ type: Boolean, reflect: true }) pulse = false;

  @state() private svg = '';

  /** 竞态守卫：name 快速切换时只采纳最后一次解析结果 */
  private requestId = 0;

  /** 图标未注册时的订阅句柄（注册后重试） */
  private unwatchRegister: (() => void) | undefined;

  protected willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('src') || changed.has('name') || changed.has('library')) {
      void this.loadIcon();
    }
  }

  disconnectedCallback(): void {
    this.unwatchRegister?.();
  }

  private async loadIcon(): Promise<void> {
    this.unwatchRegister?.();
    this.unwatchRegister = undefined;
    const requestId = ++this.requestId;
    // 先订阅再解析：注册通知可能整个落在解析的 await 间隙里（如 registerBuiltinIcons
    // 晚于首渲染），后订阅会错过通知导致图标永久空白；解析成功后立即退订
    const unwatch =
      this.name && !this.src
        ? onIconRegister(() => {
            void this.loadIcon();
          })
        : null;
    let raw = '';
    if (this.src) {
      raw = await this.fetchSrc(this.src);
    } else if (this.name) {
      raw = await resolveIcon(this.library, this.name);
    }
    if (requestId !== this.requestId) {
      unwatch?.();
      return;
    }
    if (raw || !unwatch) {
      unwatch?.();
    } else {
      this.unwatchRegister = unwatch;
    }
    this.svg = raw;
  }

  private async fetchSrc(url: string): Promise<string> {
    if (typeof fetch !== 'function') {
      return '';
    }
    try {
      const res = await fetch(url);
      if (!res.ok) {
        return '';
      }
      return await res.text();
    } catch {
      return '';
    }
  }

  render() {
    return html`
      <span
        part="base"
        role=${this.label ? 'img' : 'presentation'}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
        >${this.svg ? unsafeSVG(this.svg) : nothing}</span
      >
    `;
  }
}

if (!customElements.get('wc-icon')) {
  customElements.define('wc-icon', WcIcon);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-icon': WcIcon;
  }
}
