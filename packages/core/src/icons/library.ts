/**
 * 图标注册系统
 *
 * 两条注册路径：
 * 1. registerIcon(name, svg)        —— 同步注册表，本地 SVG 字符串，单图标单文件可 tree-shaking
 * 2. registerIconLibrary(name, lib) —— 分组图标库，resolver 支持返回 Promise（CDN 懒加载），
 *    可选 mutator 统一调整注入前的 SVG 根元素（如强制 stroke 风格）
 *
 * 安全约定：register* 属于受信 API，SVG 内容不做消毒，
 * 禁止将用户输入直接作为 SVG 来源（同 Shoelace 的做法）。
 */
export interface WcIconData {
  name: string;
  svg: string;
}

export interface WcIconLibrary {
  /** 给定图标名返回 SVG 字符串；支持返回 Promise 实现懒加载 */
  resolver: (name: string) => string | Promise<string>;
  /** 可选：对解析后的 SVG 根元素做统一调整（在注入 Shadow DOM 之前执行） */
  mutator?: (svg: SVGSVGElement) => void;
}

/** 同步注册表：内置与用户本地图标 */
const registry = new Map<string, string>();

/** 分组图标库 */
const libraries = new Map<string, WcIconLibrary>();

/** 解析结果缓存，key 为 `${library}:${name}`，避免同一图标重复请求/解析 */
const cache = new Map<string, Promise<string>>();

/** 注册本地图标（同步），同名覆盖 */
export function registerIcon(name: string, svg: string): void {
  registry.set(name, svg);
}

export function getIcon(name: string): string | undefined {
  return registry.get(name);
}

/** 注册分组图标库，同名覆盖。'default' 为内置保留库名 */
export function registerIconLibrary(name: string, library: WcIconLibrary): void {
  libraries.set(name, library);
}

export function getIconLibrary(name: string): WcIconLibrary | undefined {
  return libraries.get(name);
}

/**
 * 图标数据工厂：统一 24×24 viewBox 与 lucide 风格默认属性（currentColor 描边）。
 * 内置图标统一用它生成，保证风格一致。
 */
export function createIcon(name: string, content: string, viewBox = '0 0 24 24'): WcIconData {
  return {
    name,
    svg:
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none" ` +
      `stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">` +
      `${content}</svg>`,
  };
}

// 默认库：走同步注册表
registerIconLibrary('default', {
  resolver: (name) => registry.get(name) ?? '',
});

/**
 * 解析图标为 SVG 字符串（带缓存与竞态隔离）。
 * 找不到时返回空字符串，开发环境下输出警告。
 */
export async function resolveIcon(libraryName: string, iconName: string): Promise<string> {
  const library = libraries.get(libraryName);
  if (!library) {
    if (import.meta.env?.DEV) {
      console.warn(`[wc-icon] 未注册的图标库 "${libraryName}"`);
    }
    return '';
  }

  const cacheKey = `${libraryName}:${iconName}`;
  let pending = cache.get(cacheKey);
  if (!pending) {
    pending = Promise.resolve(library.resolver(iconName)).catch((err: unknown) => {
      if (import.meta.env?.DEV) {
        console.warn(`[wc-icon] 图标 "${libraryName}:${iconName}" 加载失败`, err);
      }
      return '';
    });
    cache.set(cacheKey, pending);
  }

  const raw = await pending;
  if (!raw) {
    if (import.meta.env?.DEV && registry.size === 0 && libraryName === 'default') {
      console.warn(
        `[wc-icon] 未找到图标 "${iconName}"，且注册表为空。` +
          `请先调用 registerBuiltinIcons() 或 registerIcon()`,
      );
    }
    return '';
  }

  if (library.mutator && typeof DOMParser !== 'undefined') {
    const doc = new DOMParser().parseFromString(raw, 'text/html');
    const svg = doc.querySelector('svg');
    if (svg) {
      library.mutator(svg as unknown as SVGSVGElement);
      return svg.outerHTML;
    }
  }
  return raw;
}
