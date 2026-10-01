import { registerIcon } from './library.js';
import type { WcIconData } from './library.js';
import { arrowLeft } from './arrow-left.js';
import { arrowRight } from './arrow-right.js';
import { calendar } from './calendar.js';
import { check } from './check.js';
import { chevronDown } from './chevron-down.js';
import { chevronLeft } from './chevron-left.js';
import { chevronRight } from './chevron-right.js';
import { chevronUp } from './chevron-up.js';
import { close } from './close.js';
import { loader } from './loader.js';
import { minus } from './minus.js';
import { plus } from './plus.js';
import { search } from './search.js';

export type { WcIconData } from './library.js';
export * from './library.js';

export { arrowLeft } from './arrow-left.js';
export { arrowRight } from './arrow-right.js';
export { calendar } from './calendar.js';
export { check } from './check.js';
export { chevronDown } from './chevron-down.js';
export { chevronLeft } from './chevron-left.js';
export { chevronRight } from './chevron-right.js';
export { chevronUp } from './chevron-up.js';
export { close } from './close.js';
export { loader } from './loader.js';
export { minus } from './minus.js';
export { plus } from './plus.js';
export { search } from './search.js';

/** 全部内置图标，供 registerBuiltinIcons 批量注册 */
export const builtinIcons: WcIconData[] = [
  arrowLeft,
  arrowRight,
  calendar,
  check,
  chevronDown,
  chevronLeft,
  chevronRight,
  chevronUp,
  close,
  loader,
  minus,
  plus,
  search,
];

/**
 * 批量注册全部内置图标（13 个）。
 * 应用入口调用一次即可；也可以从各图标文件单独 import + registerIcon 按需注册。
 */
export function registerBuiltinIcons(): void {
  for (const icon of builtinIcons) {
    registerIcon(icon.name, icon.svg);
  }
}
