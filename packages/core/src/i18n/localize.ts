import { enUS } from './locales/en-us.js';
import { zhCN } from './locales/zh-cn.js';
import type { WcPartialTranslations, WcTranslations } from './types.js';

export type { WcPartialTranslations, WcTranslations } from './types.js';

/** 语言切换事件名，LocalizeController 监听此事件触发组件重渲染 */
export const LANGUAGE_CHANGE_EVENT = 'wc-language-change';

const registry = new Map<string, WcTranslations>([
  ['zh-CN', { ...zhCN }],
  ['en-US', { ...enUS }],
]);

let currentLocale = 'zh-CN';

/**
 * 注册或合并语言包。同名语言会做浅合并（可覆盖内置文案）。
 * @example registerLocale('ja-JP', { 'dialog.confirm': '確認', 'dialog.cancel': 'キャンセル' })
 */
export function registerLocale(name: string, translations: WcPartialTranslations): void {
  const existing = registry.get(name);
  registry.set(name, Object.assign({}, existing, translations));
  if (name === currentLocale) {
    dispatchLanguageChange();
  }
}

/** 设置全局语言（BCP 47 格式，如 'zh-CN' / 'en-US'），未注册时回退到基础语言匹配 */
export function setLocale(name: string): void {
  if (!/^[a-zA-Z]{2,3}(-[a-zA-Z0-9]+)*$/.test(name)) {
    throw new Error(`[wc] 无效的语言标识: "${name}"，需符合 BCP 47 格式，如 zh-CN`);
  }
  if (name === currentLocale) {
    return;
  }
  currentLocale = name;
  dispatchLanguageChange();
}

export function getLocale(): string {
  return currentLocale;
}

/** 解析可用的已注册语言：精确匹配 -> 基础语言匹配 -> 默认语言 */
export function resolveLocale(name: string): string {
  if (registry.has(name)) {
    return name;
  }
  const base = name.split('-')[0]?.toLowerCase();
  for (const key of registry.keys()) {
    if (key.split('-')[0]?.toLowerCase() === base) {
      return key;
    }
  }
  return 'zh-CN';
}

/** 取文案：当前语言 -> 默认语言 -> key 本身，并做 {var} 插值 */
export function getTerm(
  localeName: string,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const messages = registry.get(resolveLocale(localeName));
  const fallback = registry.get('zh-CN');
  let text = messages?.[key] ?? fallback?.[key] ?? key;
  if (vars) {
    text = text.replace(/\{(\w+)\}/g, (match, varName: string) =>
      varName in vars ? String(vars[varName]) : match,
    );
  }
  return text;
}

export function getRegisteredLocales(): string[] {
  return [...registry.keys()];
}

function dispatchLanguageChange(): void {
  document.dispatchEvent(
    new CustomEvent(LANGUAGE_CHANGE_EVENT, {
      detail: { locale: currentLocale },
      bubbles: true,
      composed: true,
    }),
  );
}
