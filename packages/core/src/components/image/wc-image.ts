import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { OverlaySideEffects } from '../../common/overlay-side-effects';
import { LocalizeController } from '../../i18n/localize-controller';
import '../icon/wc-icon.js';
import { imageStyles } from './wc-image.styles';

export type wcImageStatus = 'loading' | 'loaded' | 'error';
export type wcImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
export type wcImageShape = 'square' | 'rounded' | 'circle';

/** 缩放范围与步长 */
const SCALE_MIN = 0.25;
const SCALE_MAX = 5;
const SCALE_STEP = 0.25;

/**
 * 图片。支持加载/失败占位、fallback 替代图、懒加载与全屏大图预览（缩放/旋转/拖拽平移）。
 * 组件默认尺寸 240x160，可通过 CSS 设置宿主尺寸或覆写 --wc-image-width/height。
 *
 * @slot - 无（预留）
 * @csspart base - 图片容器
 * @csspart image - 实际图片
 * @csspart overlay - 预览遮罩层
 * @csspart preview-image - 预览大图
 * @csspart toolbar - 预览工具栏
 * @cssprop --wc-image-width - 图片宽度（默认 240px）
 * @cssprop --wc-image-height - 图片高度（默认 160px）
 * @cssprop --wc-image-bg - 加载中/失败占位背景
 * @cssprop --wc-image-mask-bg - 预览遮罩背景色
 * @fires wc-load - 图片加载成功时触发
 * @fires wc-error - 图片加载失败时触发
 * @fires wc-preview-open - 打开预览后触发
 * @fires wc-preview-close - 请求关闭预览时触发（可取消，detail.reason 标识来源）
 */
export class wcImage extends LitElement {
  static styles = [baseStyles, imageStyles];

  /** 图片地址 */
  @property() src = '';

  /** 原生 alt 描述 */
  @property() alt = '';

  /** 填充模式（同 object-fit） */
  @property() fit: wcImageFit = 'fill';

  /** 图片位置（同 object-position） */
  @property() position = 'center';

  /** 圆角形状 */
  @property({ reflect: true }) shape: wcImageShape = 'square';

  /** 懒加载：滚动进入视口后再发起请求 */
  @property({ type: Boolean }) lazy = false;

  /** 点击图片打开全屏预览 */
  @property({ type: Boolean, reflect: true }) preview = false;

  /** 预览大图地址（默认取 src） */
  @property({ attribute: 'preview-src' }) previewSrc = '';

  /** 加载失败时的替代图片地址 */
  @property() fallback = '';

  @state() private status: wcImageStatus = 'loading';

  /** 懒加载是否已触发（触发后才真正渲染 img） */
  @state() private shouldLoad = false;

  @state() private fallbackFailed = false;

  @state() private previewOpen = false;

  @state() private scale = 1;

  @state() private rotate = 0;

  @state() private x = 0;

  @state() private y = 0;

  @state() private dragging = false;

  private localize = new LocalizeController(this);

  /** 预览副作用：Escape 关闭 / 焦点陷阱 / 滚动锁（与 Dialog 共用） */
  private overlay = new OverlaySideEffects(this, {
    requestClose: () => this.requestClosePreview('escape'),
  });

  private io: IntersectionObserver | null = null;

  private dragStartX = 0;

  private dragStartY = 0;

  override connectedCallback(): void {
    super.connectedCallback();
    if (this.lazy && typeof IntersectionObserver !== 'undefined') {
      this.io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.startLoad();
          this.io?.disconnect();
        }
      });
      this.io.observe(this);
    } else {
      this.startLoad();
    }
    if (this.previewOpen) this.overlay.bind();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.io?.disconnect();
    this.overlay.unbind();
  }

  protected override willUpdate(changed: Map<string, unknown>): void {
    super.willUpdate(changed);
    // src 变更后重新走加载流程（须在 render 前重置状态）
    if (changed.has('src')) {
      this.status = 'loading';
      this.fallbackFailed = false;
    }
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    if (changed.has('previewOpen')) {
      if (this.previewOpen) {
        this.dispatchEvent(new CustomEvent('wc-preview-open', { bubbles: true, composed: true }));
        this.overlay.bind();
      } else {
        this.overlay.unbind();
      }
    }
  }

  private startLoad(): void {
    if (this.shouldLoad) return;
    this.shouldLoad = true;
  }

  private onImgLoad(): void {
    this.status = 'loaded';
    this.dispatchEvent(
      new CustomEvent('wc-load', { detail: { src: this.src }, bubbles: true, composed: true }),
    );
  }

  private onImgError(): void {
    this.status = 'error';
    this.dispatchEvent(
      new CustomEvent('wc-error', { detail: { src: this.src }, bubbles: true, composed: true }),
    );
  }

  /** 打开全屏预览（需开启 preview 且加载成功） */
  openPreview(): void {
    if (!this.preview || this.status !== 'loaded') return;
    this.resetTransform();
    this.previewOpen = true;
  }

  /** 请求关闭预览（发出可取消的 wc-preview-close） */
  requestClosePreview(reason: 'overlay' | 'escape' | 'close-btn' | 'api' = 'api'): void {
    if (!this.previewOpen) return;
    const accepted = this.dispatchEvent(
      new CustomEvent('wc-preview-close', {
        detail: { reason },
        bubbles: true,
        composed: true,
        cancelable: true,
      }),
    );
    if (accepted) this.previewOpen = false;
  }

  private zoomBy(delta: number): void {
    const next = Math.round((this.scale + delta) * 100) / 100;
    this.scale = Math.min(SCALE_MAX, Math.max(SCALE_MIN, next));
  }

  private rotateBy(): void {
    this.rotate = (this.rotate + 90) % 360;
  }

  private resetTransform(): void {
    this.scale = 1;
    this.rotate = 0;
    this.x = 0;
    this.y = 0;
  }

  private onOverlayWheel(e: WheelEvent): void {
    e.preventDefault();
    this.zoomBy(e.deltaY < 0 ? SCALE_STEP : -SCALE_STEP);
  }

  private onStagePointerDown(e: PointerEvent): void {
    if (e.button !== 0) return;
    this.dragging = true;
    this.dragStartX = e.clientX - this.x;
    this.dragStartY = e.clientY - this.y;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  private onStagePointerMove(e: PointerEvent): void {
    if (!this.dragging) return;
    this.x = e.clientX - this.dragStartX;
    this.y = e.clientY - this.dragStartY;
  }

  private onStagePointerUp(): void {
    this.dragging = false;
  }

  private onTriggerKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.openPreview();
    }
  }

  private imgStyle(): string {
    return `object-fit:${this.fit};object-position:${this.position}`;
  }

  private previewStyle(): string {
    return `transform:translate(${this.x}px, ${this.y}px) scale(${this.scale}) rotate(${this.rotate}deg)`;
  }

  render() {
    const effectivePreviewSrc = this.previewSrc || this.src;
    return html`
      <div class="frame" part="base">
        ${
          this.shouldLoad && this.status !== 'error'
            ? html`<img
                part="image"
                src=${this.src}
                alt=${this.alt}
                style=${this.imgStyle()}
                @load=${this.onImgLoad}
                @error=${this.onImgError}
              />`
            : ''
        }
        ${
          this.status === 'error' && this.fallback && !this.fallbackFailed
            ? html`<img
                part="image"
                src=${this.fallback}
                alt=${this.alt}
                style=${this.imgStyle()}
                @error=${() => (this.fallbackFailed = true)}
              />`
            : ''
        }
        ${
          this.status === 'loading'
            ? html`<div class="layer">
                <wc-icon name="loader" spin></wc-icon>
              </div>`
            : ''
        }
        ${
          this.status === 'error' && (!this.fallback || this.fallbackFailed)
            ? html`<div class="layer">
                <wc-icon name="image-off"></wc-icon>
                <span>${this.localize.term('image.loadError')}</span>
              </div>`
            : ''
        }
        ${
          this.preview && this.status === 'loaded'
            ? html`<div
                class="trigger"
                role="button"
                tabindex="0"
                aria-label=${this.localize.term('image.preview')}
                @click=${() => this.openPreview()}
                @keydown=${this.onTriggerKeydown}
              ></div>`
            : ''
        }
      </div>
      ${
        this.previewOpen
          ? html`<div
              class="overlay"
              part="overlay"
              role="dialog"
              aria-modal="true"
              aria-label=${this.localize.term('image.preview')}
              tabindex="-1"
              @wheel=${this.onOverlayWheel}
              @click=${(e: MouseEvent) => {
                if (e.target === e.currentTarget) this.requestClosePreview('overlay');
              }}
            >
              <div
                class="stage ${this.dragging ? 'dragging' : ''}"
                @pointerdown=${this.onStagePointerDown}
                @pointermove=${this.onStagePointerMove}
                @pointerup=${this.onStagePointerUp}
                @pointercancel=${this.onStagePointerUp}
              >
                <img
                  part="preview-image"
                  src=${effectivePreviewSrc}
                  alt=${this.alt}
                  draggable="false"
                  style=${this.previewStyle()}
                />
              </div>
              <div class="toolbar" part="toolbar">
                <button
                  type="button"
                  aria-label=${this.localize.term('image.zoomIn')}
                  @click=${() => this.zoomBy(SCALE_STEP)}
                >
                  <wc-icon name="zoom-in"></wc-icon>
                </button>
                <button
                  type="button"
                  aria-label=${this.localize.term('image.zoomOut')}
                  @click=${() => this.zoomBy(-SCALE_STEP)}
                >
                  <wc-icon name="zoom-out"></wc-icon>
                </button>
                <button
                  type="button"
                  aria-label=${this.localize.term('image.rotate')}
                  @click=${() => this.rotateBy()}
                >
                  <wc-icon name="rotate-cw"></wc-icon>
                </button>
                <button
                  type="button"
                  aria-label=${this.localize.term('image.reset')}
                  title=${this.localize.term('image.reset')}
                  @click=${() => this.resetTransform()}
                >
                  1:1
                </button>
                <button
                  type="button"
                  part="close-button"
                  aria-label=${this.localize.term('image.close')}
                  @click=${() => this.requestClosePreview('close-btn')}
                >
                  <wc-icon name="close"></wc-icon>
                </button>
              </div>
            </div>`
          : ''
      }
    `;
  }
}

if (!customElements.get('wc-image')) {
  customElements.define('wc-image', wcImage);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-image': wcImage;
  }
}
