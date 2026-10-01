import type { LitElement } from 'lit';

/** 参与滚动锁计数的模态弹层元素 */
const MODAL_SELECTOR = 'wc-dialog, wc-drawer';

export interface OverlaySideEffectsHooks {
  /** Escape 触发的关闭请求（reason 固定 'escape'） */
  requestClose: (reason: string) => void;
}

/**
 * 模态弹层打开副作用：Escape 关闭、焦点陷阱与归还、body 滚动锁。
 * 滚动锁按文档内打开的弹层数量判断（DOM 驱动，dialog/drawer 互相计数），
 * 同一弹层的 bind/unbind 由 bound 标志防重入
 * （带 open 属性创建时 connectedCallback 与首次 updated 都会触发 bind）。
 */
export class OverlaySideEffects {
  private bound = false;
  private prevFocused: Element | null = null;
  private prevBodyOverflow = '';

  constructor(
    private host: LitElement,
    private hooks: OverlaySideEffectsHooks,
  ) {}

  /** 文档内除宿主外仍打开的模态弹层数 */
  private otherOpenOverlays(): number {
    let count = 0;
    document.querySelectorAll(MODAL_SELECTOR).forEach((el) => {
      if (el !== this.host && (el as unknown as { open?: boolean }).open) count += 1;
    });
    return count;
  }

  private onDocumentKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      this.hooks.requestClose('escape');
    } else if (e.key === 'Tab') {
      this.trapFocus(e);
    }
  };

  /** 焦点陷阱：Tab 循环限制在弹层内（shadow + light DOM） */
  trapFocus(e: KeyboardEvent): void {
    const focusables = [
      ...Array.from(
        this.host.shadowRoot!.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        ),
      ),
      ...Array.from(
        this.host.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ),
    ].filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
    if (focusables.length === 0) return;
    const first = focusables[0]!;
    const last = focusables[focusables.length - 1]!;
    const active = this.host.shadowRoot!.activeElement ?? document.activeElement;
    if (e.shiftKey && (active === first || !this.host.contains(active as Node))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  bind(): void {
    if (this.bound) return;
    this.bound = true;
    // 记录打开前的焦点元素，关闭时归还
    this.prevFocused = document.activeElement;
    document.addEventListener('keydown', this.onDocumentKeydown, true);
    // body 滚动锁：仅当自己是唯一打开的弹层时加锁
    if (this.otherOpenOverlays() === 0) {
      this.prevBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    // 初始焦点：关闭按钮 > 弹层本体
    queueMicrotask(() => {
      const target =
        this.host.shadowRoot?.querySelector<HTMLElement>('[part="close-button"]') ??
        this.host.shadowRoot?.querySelector<HTMLElement>('[role="dialog"]');
      target?.focus();
    });
  }

  unbind(): void {
    if (!this.bound) return;
    this.bound = false;
    document.removeEventListener('keydown', this.onDocumentKeydown, true);
    // 还有其他弹层开着时不解锁
    if (this.otherOpenOverlays() === 0) {
      document.body.style.overflow = this.prevBodyOverflow;
    }
    // 归还焦点
    if (this.prevFocused && (this.prevFocused as HTMLElement).focus) {
      (this.prevFocused as HTMLElement).focus();
      this.prevFocused = null;
    }
  }
}
