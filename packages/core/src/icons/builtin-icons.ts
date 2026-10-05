import type { WcIconData } from './library.js';
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

export { arrowLeft, arrowRight, arrowUp, calendar, check, chevronDown, chevronLeft, chevronRight, chevronUp, close, error, file, imageOff, info, loader, minus, plus, rotateCw, search, upload, warning, zoomIn, zoomOut };

/**
 * 手挑内置图标（组件内部依赖 + 高频图标；与 Feather 全集重名时以这些为准）。
 * 这批图标由 wc-icon 模块加载时自动注册（用户同名注册优先），保证外部项目
 * 安装即用、零配置；全量 291 个仍需 registerBuiltinIcons() 手动开启。
 */
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
