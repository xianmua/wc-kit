import type { wcMessage, wcMessageTheme } from './wc-message.js';
import './wc-message.js';

export interface WcMessageOptions {
  /** 提示类型，默认 info */
  theme?: wcMessageTheme;
  /** 自动关闭时长（ms），默认 3000，0 表示不自动关闭 */
  duration?: number;
  /** 显示关闭按钮，默认 false */
  closable?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
}

let container: HTMLDivElement | null = null;

/** 全局消息容器（单例）：固定顶部居中，纵向堆叠 */
function ensureContainer(): HTMLDivElement {
  if (container && container.isConnected) return container;
  container = document.createElement('div');
  container.className = 'wc-message-container';
  const zIndex = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--wc-z-index-message'),
  );
  container.style.cssText = [
    'position:fixed',
    'top:var(--wc-space-4, 16px)',
    'left:0',
    'right:0',
    'display:flex',
    'flex-direction:column',
    'align-items:center',
    'pointer-events:none',
    `z-index:${Number.isFinite(zIndex) && zIndex > 0 ? zIndex : 1500}`,
  ].join(';');
  document.body.appendChild(container);
  return container;
}

/** 命令式消息入口：message.success('已保存') */
function showMessage(content: string, options: WcMessageOptions = {}): wcMessage {
  const el = document.createElement('wc-message') as wcMessage;
  el.theme = options.theme ?? 'info';
  el.content = content;
  if (options.duration !== undefined) el.duration = options.duration;
  if (options.closable !== undefined) el.closable = options.closable;
  if (options.onClose) el.addEventListener('wc-close', () => options.onClose!());
  ensureContainer().appendChild(el);
  return el;
}

export const message = {
  /** 普通信息 */
  info: (content: string, options?: WcMessageOptions) =>
    showMessage(content, { ...options, theme: 'info' }),
  /** 成功 */
  success: (content: string, options?: WcMessageOptions) =>
    showMessage(content, { ...options, theme: 'success' }),
  /** 警告 */
  warning: (content: string, options?: WcMessageOptions) =>
    showMessage(content, { ...options, theme: 'warning' }),
  /** 错误 */
  error: (content: string, options?: WcMessageOptions) =>
    showMessage(content, { ...options, theme: 'error' }),
  /** 加载中（不自动关闭，需手动 close 或传 duration） */
  loading: (content: string, options?: WcMessageOptions) =>
    showMessage(content, { duration: 0, closable: false, ...options, theme: 'loading' }),
  /** 完整配置入口 */
  show: showMessage,
};
