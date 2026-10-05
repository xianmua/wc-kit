import { html, LitElement } from 'lit';
import { css } from 'lit';
import { property } from 'lit/decorators.js';

import './wc-splitter.js';

/**
 * 分隔板面板，必须作为 wc-splitter 的直接子元素使用。
 * 尺寸由 wc-splitter 拖拽/折叠统一管理，`size` 仅作为初始占比声明。
 *
 * @slot - 面板内容
 * @csspart base - 面板根元素
 * @cssprop --wc-splitter-panel-padding - 面板内边距（默认 0）
 */
export class wcSplitterPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-width: 0;
      min-height: 0;
      overflow: auto;
    }
    .panel {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: var(--wc-splitter-panel-padding, 0);
    }
  `;

  /** 初始尺寸（百分比，0 = 与未声明面板平分剩余空间；拖拽后以实际占比为准） */
  @property({ type: Number }) size = 0;

  /** 最小占比（百分比） */
  @property({ type: Number }) min = 0;

  /** 最大占比（百分比） */
  @property({ type: Number }) max = 100;

  /** 允许折叠（相邻分隔条上显示折叠箭头） */
  @property({ type: Boolean, reflect: true }) collapsible = false;

  /** 允许拖拽调整（与相邻面板共同决定分隔条是否可拖） */
  @property({ type: Boolean, reflect: true }) resizable = true;

  render() {
    return html`<div class="panel" part="base"><slot></slot></div>`;
  }
}

if (!customElements.get('wc-splitter-panel')) {
  customElements.define('wc-splitter-panel', wcSplitterPanel);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-splitter-panel': wcSplitterPanel;
  }
}
