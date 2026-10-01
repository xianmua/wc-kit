/**
 * 主题切换控制：通过 documentElement 上的 data-theme 属性驱动 tokens.css
 * 的 semantic 层覆盖（见 RULES.md 第 5 条）。
 *
 * @example
 * setTheme('dark');                       // 手动切暗色
 * setTheme('auto', { persist: true });    // 跟随系统并写入 localStorage
 * initTheme();                            // 应用启动时恢复持久化主题
 */

export type WcTheme = 'light' | 'dark' | 'auto';

/** 主题变更事件名，detail 携带实际生效主题（light | dark） */
export const THEME_CHANGE_EVENT = 'wc-theme-change';

const STORAGE_KEY = 'wc-theme';

let currentTheme: WcTheme = 'light';
let mediaQuery: MediaQueryList | null = null;

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

/** 实际生效的主题（'auto' 解析为系统偏好） */
export function getEffectiveTheme(): 'light' | 'dark' {
  return currentTheme === 'auto' ? getSystemTheme() : currentTheme;
}

export function getTheme(): WcTheme {
  return currentTheme;
}

/**
 * 设置主题。
 * @param theme 'light' | 'dark' | 'auto'（跟随系统 prefers-color-scheme）
 * @param options.persist 为 true 时写入 localStorage，配合 initTheme() 恢复
 */
export function setTheme(theme: WcTheme, options?: { persist?: boolean }): void {
  if (theme !== 'light' && theme !== 'dark' && theme !== 'auto') {
    throw new Error(`[wc] 无效主题: "${String(theme)}"，可选 light | dark | auto`);
  }
  currentTheme = theme;

  if (typeof localStorage !== 'undefined') {
    if (options?.persist) {
      localStorage.setItem(STORAGE_KEY, theme);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  syncAutoListener();
  applyTheme();
}

/** 应用启动时调用：恢复 localStorage 中持久化的主题（无记录则跟随系统） */
export function initTheme(): void {
  let stored: string | null = null;
  if (typeof localStorage !== 'undefined') {
    stored = localStorage.getItem(STORAGE_KEY);
  }
  setTheme(stored === 'light' || stored === 'dark' || stored === 'auto' ? stored : 'auto');
}

function syncAutoListener(): void {
  const shouldListen = currentTheme === 'auto' && typeof window.matchMedia === 'function';
  if (shouldListen && !mediaQuery) {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', applyTheme);
  } else if (!shouldListen && mediaQuery) {
    mediaQuery.removeEventListener('change', applyTheme);
    mediaQuery = null;
  }
}

function applyTheme(): void {
  const effective = getEffectiveTheme();
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = effective;
  }
  document.dispatchEvent(
    new CustomEvent(THEME_CHANGE_EVENT, {
      detail: { theme: currentTheme, effective },
      bubbles: true,
      composed: true,
    }),
  );
}
