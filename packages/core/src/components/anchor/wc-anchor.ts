import { html, LitElement, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import './wc-anchor-link.js';
import { anchorStyles } from './wc-anchor.styles';
import type { wcAnchorLink } from './wc-anchor-link.js';

export type wcAnchorDirection = 'vertical' | 'horizontal';

/**
 * 锚点：页面内导航，滚动时自动高亮当前区块对应的链接，点击平滑滚动到目标位置。
 * 参考 antd Anchor。目标元素通过链接的 href（#id）定位，支持嵌套形成层级。
 *
 * @slot - wc-anchor-link（可嵌套形成层级）
 * @csspart base - 容器
 * @fires wc-change - 当前高亮锚点变化，detail.value（href）
 * @fires wc-click - 点击链接，detail.href / detail.title
 * @cssprop --wc-anchor-link-height - 链接高度（默认 32px，透传给链接）
 */
export class wcAnchor extends LitElement {
  static styles = [anchorStyles];

  /** 方向：垂直（默认）/ 水平 */
  @property({ reflect: true }) direction: wcAnchorDirection = 'vertical';

  /** 点击滚动后目标距容器顶部的偏移（px） */
  @property({ type: Number }) offset = 0;

  /** @deprecated 旧属性名，等价 offset */
  @property({ type: Number, attribute: 'target-offset' })
  get targetOffset(): number {
    return this.offset;
  }
  set targetOffset(v: number) {
    this.offset = Number(v);
  }

  /** 高亮判定边界（px）：目标顶部越过 offset + bounds 即高亮 */
  @property({ type: Number }) bounds = 5;

  /** 滚动容器（CSS 选择器）。默认自动向上查找最近的滚动祖先，找不到用页面 */
  @property() container = '';

  /** 当前高亮的 href（#id） */
  @property({ reflect: true }) current = '';

  private links: wcAnchorLink[] = [];

  private scrollContainer: HTMLElement | Document = document;

  private onScroll = (): void => this.updateCurrent();

  protected override firstUpdated(): void {
    this.bindContainer();
    this.updateCurrent();
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    if (changed.has('direction')) this.syncDirection();
    if (changed.has('current')) this.syncSelected();
  }

  override disconnectedCallback(): void {
    this.unbindContainer();
    super.disconnectedCallback();
  }

  /* ---------- 链接收集与状态同步 ---------- */

  private onSlotChange(): void {
    this.links = Array.from(this.querySelectorAll('wc-anchor-link')) as wcAnchorLink[];
    this.syncDirection();
    this.syncSelected();
    this.bindContainer();
    this.updateCurrent();
  }

  private syncDirection(): void {
    for (const link of this.links) link.anchorHorizontal = this.horizontal;
  }

  private syncSelected(): void {
    for (const link of this.links) link.selected = link.href === this.current;
  }

  private get horizontal(): boolean {
    return this.direction === 'horizontal';
  }

  /* ---------- 滚动监听 ---------- */

  /** 取滚动容器：container 选择器优先，其次最近的滚动祖先（overflow auto/scroll），最后页面 */
  private findScrollContainer(): HTMLElement | Document {
    if (this.container) {
      const el =
        document.querySelector<HTMLElement>(this.container) ??
        (this.getRootNode() instanceof ShadowRoot
          ? (this.getRootNode() as ShadowRoot).querySelector<HTMLElement>(this.container)
          : null);
      if (el) return el;
    }
    let node: HTMLElement | null = this.parentElement;
    while (node && node !== document.body) {
      const oy = getComputedStyle(node).overflowY;
      if (oy === 'auto' || oy === 'scroll') return node;
      node = node.parentElement;
    }
    return document;
  }

  /** capture 监听：挂在 document 时可同时捕获页面内后代滚动容器的滚动 */
  private bindContainer(): void {
    this.unbindContainer();
    this.scrollContainer = this.findScrollContainer();
    this.scrollContainer.addEventListener('scroll', this.onScroll, {
      passive: true,
      capture: true,
    });
  }

  private unbindContainer(): void {
    this.scrollContainer.removeEventListener('scroll', this.onScroll, { capture: true });
  }

  /** 容器滚动顶部（命名避开 HTMLElement.scrollTop——TS 私有成员遮蔽公开属性会导致框架包装类型不兼容） */
  private get containerScrollTop(): number {
    return this.scrollContainer instanceof Document
      ? window.scrollY || document.documentElement.scrollTop || 0
      : this.scrollContainer.scrollTop;
  }

  private get viewportHeight(): number {
    return this.scrollContainer instanceof Document
      ? window.innerHeight || document.documentElement.clientHeight || 0
      : this.scrollContainer.clientHeight;
  }

  /** 容器滚动高度（命名避开 HTMLElement.scrollHeight——TS 私有成员遮蔽公开属性会导致 react 包装类型不兼容） */
  private get containerScrollHeight(): number {
    return this.scrollContainer instanceof Document
      ? document.documentElement.scrollHeight
      : this.scrollContainer.scrollHeight;
  }

  /** 目标解析：文档内 #id 优先，其次自身所在根（ShadowRoot 内使用也能命中） */
  private resolveTarget(selector: string): HTMLElement | null {
    if (selector.startsWith('#')) {
      const id = selector.slice(1);
      const inDoc = document.getElementById(id);
      if (inDoc) return inDoc;
      const root = this.getRootNode();
      return root instanceof ShadowRoot ? root.querySelector(`[id="${id}"]`) : null;
    }
    try {
      return document.querySelector(selector);
    } catch {
      return null;
    }
  }

  private targetOf(link: wcAnchorLink): HTMLElement | null {
    return link.href ? this.resolveTarget(link.href) : null;
  }

  /** 目标相对滚动容器视口顶部的位置（页面自身滚动不影响判定） */
  private relativeTop(target: HTMLElement): number {
    const containerTop =
      this.scrollContainer instanceof Document
        ? 0
        : this.scrollContainer.getBoundingClientRect().top;
    return target.getBoundingClientRect().top - containerTop;
  }

  /** 滚动监听：目标顶部越过 offset + bounds 的最后一个生效；顶部回第一个、底部回最后一个 */
  private updateCurrent(): void {
    const valid = this.links.filter((l) => this.targetOf(l));
    if (!valid.length) return;
    const offset = this.offset + this.bounds;
    let next = '';
    for (const link of valid) {
      if (this.relativeTop(this.targetOf(link)!) <= offset) next = link.href;
    }
    if (this.containerScrollTop <= 0) next = valid[0].href;
    else if (
      this.containerScrollHeight > this.viewportHeight &&
      this.containerScrollTop + this.viewportHeight >= this.containerScrollHeight - 1
    ) {
      next = valid[valid.length - 1].href;
    }
    if (next && next !== this.current) this.setCurrent(next);
  }

  private setCurrent(value: string): void {
    this.current = value;
    this.syncSelected();
    this.dispatchEvent(
      new CustomEvent('wc-change', { detail: { value }, bubbles: true, composed: true }),
    );
  }

  /* ---------- 点击滚动 ---------- */

  private onClick(e: MouseEvent): void {
    const path = e.composedPath() as Element[];
    const link = path.find(
      (el) => el instanceof HTMLElement && el.localName === 'wc-anchor-link',
    ) as wcAnchorLink | undefined;
    if (!link?.href) return;
    e.preventDefault();
    if (this.current !== link.href) this.setCurrent(link.href);
    this.dispatchEvent(
      new CustomEvent('wc-click', {
        detail: { href: link.href, title: link.title },
        bubbles: true,
        composed: true,
      }),
    );
    this.scrollToTarget(link.href);
  }

  private scrollToTarget(href: string): void {
    const target = this.resolveTarget(href);
    if (!target) return;
    const top = this.relativeTop(target) - this.offset + this.containerScrollTop;
    if (this.scrollContainer instanceof Document) {
      window.scrollTo?.({ top, behavior: 'smooth' });
    } else {
      this.scrollContainer.scrollTo?.({ top, behavior: 'smooth' });
    }
  }

  protected override render(): TemplateResult {
    return html`
      <nav class="list" part="base" @click=${this.onClick}>
        <slot @slotchange=${this.onSlotChange}></slot>
      </nav>
    `;
  }
}

if (!customElements.get('wc-anchor')) {
  customElements.define('wc-anchor', wcAnchor);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-anchor': wcAnchor;
  }
}
