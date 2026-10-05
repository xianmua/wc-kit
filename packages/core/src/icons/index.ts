import { registerIcon } from './library.js';
import type { WcIconData } from './library.js';
import { featherIcons } from './feather-icons.js';
import { arrowLeft } from './arrow-left.js';
import { arrowRight } from './arrow-right.js';
import { arrowUp } from './arrow-up.js';
import { calendar } from './calendar.js';
import { check } from './check.js';
import { chevronDown } from './chevron-down.js';
import { chevronLeft } from './chevron-left.js';
import { chevronRight } from './chevron-right.js';
import { chevronUp } from './chevron-up.js';
import { close } from './close.js';
import { error } from './error.js';
import { file } from './file.js';
import { imageOff } from './image-off.js';
import { info } from './info.js';
import { loader } from './loader.js';
import { minus } from './minus.js';
import { plus } from './plus.js';
import { rotateCw } from './rotate-cw.js';
import { search } from './search.js';
import { upload } from './upload.js';
import { warning } from './warning.js';
import { zoomIn } from './zoom-in.js';
import { zoomOut } from './zoom-out.js';

export type { WcIconData } from './library.js';
export * from './library.js';

export { arrowLeft } from './arrow-left.js';
export { arrowRight } from './arrow-right.js';
export { arrowUp } from './arrow-up.js';
export { calendar } from './calendar.js';
export { check } from './check.js';
export { chevronDown } from './chevron-down.js';
export { chevronLeft } from './chevron-left.js';
export { chevronRight } from './chevron-right.js';
export { chevronUp } from './chevron-up.js';
export { close } from './close.js';
export { error } from './error.js';
export { file } from './file.js';
export { imageOff } from './image-off.js';
export { info } from './info.js';
export { loader } from './loader.js';
export { minus } from './minus.js';
export { plus } from './plus.js';
export { rotateCw } from './rotate-cw.js';
export { search } from './search.js';
export { upload } from './upload.js';
export { warning } from './warning.js';
export { zoomIn } from './zoom-in.js';
export { zoomOut } from './zoom-out.js';

/** 手挑内置图标（组件内部依赖 + 高频图标；与 Feather 全集重名时以这些为准） */
export const builtinIcons: WcIconData[] = [
  arrowLeft,
  arrowRight,
  arrowUp,
  calendar,
  check,
  chevronDown,
  chevronLeft,
  chevronRight,
  chevronUp,
  close,
  error,
  file,
  imageOff,
  info,
  loader,
  minus,
  plus,
  rotateCw,
  search,
  upload,
  warning,
  zoomIn,
  zoomOut,
];

/** Feather 全集中与手挑重名的名称（registerBuiltinIcons 剔除，避免覆盖手挑版本） */
const preferredNames = new Set(builtinIcons.map((icon) => icon.name));

/** 全部内置图标 = 手挑优先版 + Feather 全集其余，供 registerBuiltinIcons 批量注册 */
export const builtinIconsWithFeather: WcIconData[] = [
  ...builtinIcons,
  ...featherIcons.filter((icon) => !preferredNames.has(icon.name)),
];

/**
 * 批量注册全部内置图标（手挑 23 个 + Feather 其余 268 个 = 291 个）。
 * 应用入口调用一次即可；也可以从各图标文件单独 import + registerIcon 按需注册。
 */
export function registerBuiltinIcons(): void {
  for (const icon of builtinIconsWithFeather) {
    registerIcon(icon.name, icon.svg);
  }
}
