import { html, LitElement, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import '../icon/wc-icon.js';
import './wc-splitter-panel.js';
import { splitterStyles } from './wc-splitter.styles';
import type { wcSplitterPanel } from './wc-splitter-panel.js';

export type wcSplitterLayout = 'horizontal' | 'vertical';

/**
 * 分隔板：可拖拽调整子面板尺寸的容器，参考 antd Splitter。
 * 子元素必须为 `wc-splitter-panel`（面板占位与拖拽约束在面板上声明）。
 *
 * @slot - wc-splitter-panel 面板（其他子元素不渲染）
 * @csspart base - 容器根元素
 * @csspart pane - 面板占位容器
 * @csspart divider - 分隔条
 * @fires wc-resize - 拖拽/键盘/折叠过程中占比变化，detail.sizes 为各面板百分比数组
 * @fires wc-resize-end - 拖拽/键盘调整结束，detail.sizes 同上
 * @cssprop --wc-splitter-divider-bg - 分隔线颜色（默认 --wc-color-border）
 * @cssprop --wc-splitter-divider-hover-bg - 分隔线 hover/拖拽/聚焦颜色（默认 --wc-color-primary）
 * @cssprop --wc-splitter-grip-bg - 线中央拖拽把手颜色（默认 --wc-color-text-disabled）
 * @cssprop --wc-splitter-focus-ring-offset - 分隔条聚焦环偏移（默认 -2px）
 */
export class wcSplitter extends LitElement {
  static styles = [baseStyles, splitterStyles];

  /** 布局方向 */
  @property({ reflect: true }) layout: wcSplitterLayout = 'horizontal';

  /** 面板列表（slotchange 时收集） */
  private panels: wcSplitterPanel[] = [];

  /** 各面板占比（百分比，总和恒为 100） */
  private sizes: number[] = [];

  /** 折叠状态：被折叠侧 + 折叠前占比快照（再次点击恢复） */
  private collapsed: { divider: number; dir: 'prev' | 'next'; sizes: number[] } | null = null;

  /** 已初始化的面板数（面板增删时重算占比） */
  private initializedCount = -1;

  private get horizontal(): boolean {
    return this.layout !== 'vertical';
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    if (changed.has('layout')) this.requestUpdate();
  }

  /* ---------- 面板收集与占比初始化 ---------- */

  private onSlotChange(): void {
    // 以 light DOM 子元素为收集源：面板被分配命名 slot 后会脱离隐藏默认 slot，
    // 再次触发的 slotchange 里 assignedElements 必为空，不能作为收集依据。
    const all = Array.from(
      this.querySelectorAll(':scope > wc-splitter-panel'),
    ) as wcSplitterPanel[];
    if (all.length === this.initializedCount) return; // 仅命名槽迁移引发的重复触发
    this.panels = all;
    this.panels.forEach((p, i) => p.setAttribute('slot', `panel-${i}`));
    this.initSizes();
    this.initializedCount = this.panels.length;
    this.collapsed = null;
    this.requestUpdate();
  }

  private initSizes(): void {
    const declared = this.panels.map((p) => (p.size > 0 ? p.size : 0));
    const used = declared.reduce((s, v) => s + v, 0);
    const restCount = declared.filter((v) => v === 0).length;
    const rest = restCount > 0 ? Math.max(0, 100 - used) / restCount : 0;
    this.sizes = declared.map((v) => (v > 0 ? Math.min(v, 100) : rest));
    // 修正舍入误差：差额塞给最后一个有空间的面板
    this.fitTotal();
  }

  /** 占比总和修正到 100 */
  private fitTotal(): void {
    let diff = 100 - this.sizes.reduce((s, v) => s + v, 0);
    for (let i = 0; i < this.sizes.length && Math.abs(diff) > 0.01; i++) {
      const room = this.panels[i].max - this.sizes[i];
      const add = Math.max(-this.sizes[i], Math.min(room, diff));
      this.sizes[i] += add;
      diff -= add;
    }
  }

  private clampSize(index: number, value: number): number {
    const p = this.panels[index];
    return Math.min(p.max, Math.max(p.min, value));
  }

  private emitResize(end = false): void {
    this.dispatchEvent(
      new CustomEvent(end ? 'wc-resize-end' : 'wc-resize', {
        detail: { sizes: [...this.sizes] },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /* ---------- 拖拽 ---------- */

  private onDividerPointerDown(e: PointerEvent, d: number): void {
    // d = 分隔条索引：调整 panels[d] 与 panels[d + 1]
    if (!this.panels[d]?.resizable || !this.panels[d + 1]?.resizable) return;
    if (e.button !== 0) return;
    e.preventDefault();

    const divider = this.shadowRoot!.querySelectorAll<HTMLElement>('.divider')[d];
    divider?.setAttribute('data-dragging', '');
    const hostRect = this.getBoundingClientRect();
    const total = this.horizontal ? hostRect.width : hostRect.height;
    const startPos = this.horizontal ? e.clientX : e.clientY;
    const startSizes = [...this.sizes];
    const sum = startSizes[d] + startSizes[d + 1];
    const minA = this.panels[d].min;
    const minB = this.panels[d + 1].min;

    const onMove = (ev: Event) => {
      const me = ev as MouseEvent;
      const delta = (((this.horizontal ? me.clientX : me.clientY) - startPos) / total) * 100;
      // 双向约束：A 拖多了塞给 B，B 撞到 min 再弹回 A
      let a = Math.min(Math.max(startSizes[d] + delta, minA), sum - minB);
      let b = sum - a;
      b = Math.min(Math.max(b, minB), sum - minA);
      a = sum - b;
      if (a !== this.sizes[d] || b !== this.sizes[d + 1]) {
        this.sizes[d] = a;
        this.sizes[d + 1] = b;
        this.collapsed = null;
        this.requestUpdate();
        this.emitResize();
      }
    };
    const onUp = () => {
      document.removeEventListener('pointermove', onMove, true);
      document.removeEventListener('pointerup', onUp, true);
      divider?.removeAttribute('data-dragging');
      this.emitResize(true);
    };
    document.addEventListener('pointermove', onMove, true);
    document.addEventListener('pointerup', onUp, true);
  }

  /* ---------- 键盘调整（聚焦分隔条后方向键 ±1%） ---------- */

  private onDividerKeydown(e: KeyboardEvent, d: number): void {
    const growPrevKey = this.horizontal ? 'ArrowLeft' : 'ArrowUp';
    const growNextKey = this.horizontal ? 'ArrowRight' : 'ArrowDown';
    if (e.key !== growPrevKey && e.key !== growNextKey) return;
    e.preventDefault();
    if (!this.panels[d]?.resizable || !this.panels[d + 1]?.resizable) return;
    const step = e.key === growPrevKey ? -1 : 1;
    const sum = this.sizes[d] + this.sizes[d + 1];
    const a = Math.min(
      Math.max(this.sizes[d] + step, this.panels[d].min),
      sum - this.panels[d + 1].min,
    );
    this.sizes[d] = a;
    this.sizes[d + 1] = sum - a;
    this.collapsed = null;
    this.requestUpdate();
    this.emitResize();
  }

  /* ---------- 折叠 ---------- */

  private toggleCollapse(d: number, dir: 'prev' | 'next'): void {
    const index = dir === 'prev' ? d : d + 1;
    // 目标面板已折叠（折叠面板为 0 宽）：相邻两条分隔条重叠在同一边界，
    // 任一侧箭头都视为「恢复」，还原折叠前占比（antd 同款切换语义）
    if (this.sizes[index] === 0) {
      if (!this.collapsed) return;
      this.sizes = [...this.collapsed.sizes];
      this.collapsed = null;
      this.requestUpdate();
      this.emitResize();
      this.emitResize(true);
      return;
    }
    const neighbor = dir === 'prev' ? d + 1 : d;
    const saved = [...this.sizes];
    this.sizes[index] = 0;
    this.sizes[neighbor] = this.clampSize(neighbor, saved[neighbor] + saved[index]);
    this.fitTotal();
    this.collapsed = { divider: d, dir, sizes: saved };
    this.requestUpdate();
    this.emitResize();
    this.emitResize(true);
  }

  /* ---------- 渲染 ---------- */

  private renderDivider(d: number, pos: number): TemplateResult {
    // 调用方保证 d 与 d + 1 均在面板范围内
    const prev = this.panels[d]!;
    const next = this.panels[d + 1]!;
    const prevIcon = this.horizontal ? 'chevron-left' : 'chevron-up';
    const nextIcon = this.horizontal ? 'chevron-right' : 'chevron-down';
    // 折叠态箭头反向（antd 同款）：指向被折叠面板的一侧翻转为「展开」方向
    const prevCollapsed = this.sizes[d] === 0;
    const nextCollapsed = this.sizes[d + 1] === 0;
    const draggable = prev.resizable && next.resizable;
    return html`
      <div
        class="divider"
        part="divider"
        role="separator"
        aria-orientation=${this.horizontal ? 'vertical' : 'horizontal'}
        tabindex="0"
        style=${this.horizontal ? `left:${pos}%` : `top:${pos}%`}
        @pointerdown=${(e: PointerEvent) => this.onDividerPointerDown(e, d)}
        @keydown=${(e: KeyboardEvent) => this.onDividerKeydown(e, d)}
      >
        ${draggable ? html`<div class="grip"></div>` : nothing}
        ${
          prev.collapsible
            ? html`
                <button
                  class="col"
                  data-dir="prev"
                  type="button"
                  tabindex="-1"
                  aria-label=${prevCollapsed ? '展开上一面板' : '折叠上一面板'}
                  @click=${() => this.toggleCollapse(d, 'prev')}
                >
                  <wc-icon name=${prevCollapsed ? nextIcon : prevIcon}></wc-icon>
                </button>
              `
            : nothing
        }
        <div class="bar"></div>
        ${
          next.collapsible
            ? html`
                <button
                  class="col"
                  data-dir="next"
                  type="button"
                  tabindex="-1"
                  aria-label=${nextCollapsed ? '展开下一面板' : '折叠下一面板'}
                  @click=${() => this.toggleCollapse(d, 'next')}
                >
                  <wc-icon name=${nextCollapsed ? prevIcon : nextIcon}></wc-icon>
                </button>
              `
            : nothing
        }
      </div>
    `;
  }

  render() {
    const panes: TemplateResult[] = [];
    let cum = 0; // 累计占比 = 分隔条骑在的边界线位置
    for (let i = 0; i < this.panels.length; i++) {
      if (i > 0) panes.push(this.renderDivider(i - 1, cum));
      panes.push(html`
        <div class="pane" part="pane" style="flex-basis:${this.sizes[i] ?? 0}%;">
          <slot name="panel-${i}"></slot>
        </div>
      `);
      cum += this.sizes[i] ?? 0;
    }
    return html`<div class="splitter" part="base">
      <slot @slotchange=${this.onSlotChange} style="display:none"></slot>
      ${panes}
    </div>`;
  }
}

if (!customElements.get('wc-splitter')) {
  customElements.define('wc-splitter', wcSplitter);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-splitter': wcSplitter;
  }
}
