import { registerIcon } from './library.js';
import type { WcIconData } from './library.js';
import { featherIcons } from './feather-icons.js';
import { builtinIcons } from './builtin-icons.js';

export type { WcIconData } from './library.js';
export * from './library.js';
export * from './builtin-icons.js';

/** Feather 全集中与手挑重名的名称（registerBuiltinIcons 剔除，避免覆盖手挑版本） */
const preferredNames = new Set(builtinIcons.map((icon) => icon.name));

/** 全部内置图标 = 手挑优先版 + Feather 全集其余，供 registerBuiltinIcons 批量注册 */
export const builtinIconsWithFeather: WcIconData[] = [
  ...builtinIcons,
  ...featherIcons.filter((icon) => !preferredNames.has(icon.name)),
];

/**
 * 批量注册全部内置图标（手挑 23 个 + Feather 其余 268 个 = 291 个）。
 * 手挑 23 个已随 wc-icon 模块自动注册，此处调用只是为了解锁
 * Feather 全集其余 268 个；也可以从各图标文件单独 import + registerIcon 按需注册。
 */
export function registerBuiltinIcons(): void {
  for (const icon of builtinIconsWithFeather) {
    registerIcon(icon.name, icon.svg);
  }
}
