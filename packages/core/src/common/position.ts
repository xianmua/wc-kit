/**
 * 弹层定位引擎（零依赖，纯函数）。
 * 输入锚点/弹层/视口的矩形，输出弹层坐标、最终 placement 与箭头偏移。
 * 不够空间时沿主轴翻转（top↔bottom、left↔right），再向视口内夹紧；
 * Tooltip / Popconfirm 等浮层组件共用。
 */

export type WcPlacementBase = 'top' | 'bottom' | 'left' | 'right';
export type WcPlacementAlign = 'start' | 'end';

export type WcPlacement = WcPlacementBase | `${WcPlacementBase}-start` | `${WcPlacementBase}-end`;

export interface WcRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WcPositionResult {
  /** 弹层 left（px，position:fixed） */
  x: number;
  /** 弹层 top（px，position:fixed） */
  y: number;
  /** 翻转后的最终 placement */
  placement: WcPlacement;
  /** 箭头中心距弹层起始边（左或上）的偏移（px） */
  arrowOffset: number;
}

/** 弹层与锚点的间距 */
export const POSITION_GAP = 8;

/** 箭头中心距弹层边缘的最小/最大留白 */
export const ARROW_INSET = 12;

export function splitPlacement(placement: WcPlacement): {
  base: WcPlacementBase;
  align?: WcPlacementAlign;
} {
  const index = placement.indexOf('-');
  if (index === -1) return { base: placement as WcPlacementBase };
  return {
    base: placement.slice(0, index) as WcPlacementBase,
    align: placement.slice(index + 1) as WcPlacementAlign,
  };
}

function oppositeBase(base: WcPlacementBase): WcPlacementBase {
  switch (base) {
    case 'top':
      return 'bottom';
    case 'bottom':
      return 'top';
    case 'left':
      return 'right';
    case 'right':
      return 'left';
  }
}

/** 主轴方向该侧是否放得下 */
function fitsOnSide(
  base: WcPlacementBase,
  anchor: WcRect,
  panel: WcRect,
  viewport: WcRect,
): boolean {
  switch (base) {
    case 'top':
      return anchor.y - panel.height - POSITION_GAP >= viewport.y;
    case 'bottom':
      return anchor.y + anchor.height + panel.height + POSITION_GAP <= viewport.y + viewport.height;
    case 'left':
      return anchor.x - panel.width - POSITION_GAP >= viewport.x;
    case 'right':
      return anchor.x + anchor.width + panel.width + POSITION_GAP <= viewport.x + viewport.width;
  }
}

function clamp(value: number, min: number, max: number): number {
  // 下限优先：弹层大于视口时 max 可能小于 min，保证不产生负偏移
  return Math.max(min, Math.min(value, max));
}

/**
 * 计算 fixed 定位坐标。
 * @param anchor 锚点矩形（getBoundingClientRect）
 * @param panel 弹层矩形（需已渲染可测量；不可见时可 visibility:hidden，不能 display:none）
 * @param viewport 可用视口矩形（window.innerWidth/innerHeight 构造）
 * @param preferred 期望 placement
 */
export function computePosition(
  anchor: WcRect,
  panel: WcRect,
  viewport: WcRect,
  preferred: WcPlacement,
): WcPositionResult {
  const { base, align } = splitPlacement(preferred);
  let useBase = base;
  if (
    !fitsOnSide(base, anchor, panel, viewport) &&
    fitsOnSide(oppositeBase(base), anchor, panel, viewport)
  ) {
    useBase = oppositeBase(base);
  }

  // 交叉轴对齐坐标（未夹紧）
  const alignStart = align === 'start';
  const alignEnd = align === 'end';
  let x: number;
  let y: number;

  const alignCross = (anchorStart: number, anchorSize: number, panelSize: number): number => {
    if (alignStart) return anchorStart;
    if (alignEnd) return anchorStart + anchorSize - panelSize;
    return anchorStart + anchorSize / 2 - panelSize / 2;
  };

  if (useBase === 'top' || useBase === 'bottom') {
    x = alignCross(anchor.x, anchor.width, panel.width);
    y =
      useBase === 'top'
        ? anchor.y - panel.height - POSITION_GAP
        : anchor.y + anchor.height + POSITION_GAP;
  } else {
    y = alignCross(anchor.y, anchor.height, panel.height);
    x =
      useBase === 'left'
        ? anchor.x - panel.width - POSITION_GAP
        : anchor.x + anchor.width + POSITION_GAP;
  }

  // 向视口内夹紧
  x = clamp(x, viewport.x, viewport.x + viewport.width - panel.width);
  y = clamp(y, viewport.y, viewport.y + viewport.height - panel.height);

  // 箭头：位于弹层朝向锚点的边上，中心对准锚点中心（夹紧留白）
  const anchorCrossCenter =
    useBase === 'top' || useBase === 'bottom'
      ? anchor.x + anchor.width / 2 - x
      : anchor.y + anchor.height / 2 - y;
  const maxOffset =
    (useBase === 'top' || useBase === 'bottom' ? panel.width : panel.height) - ARROW_INSET;
  const arrowOffset = clamp(anchorCrossCenter, ARROW_INSET, Math.max(ARROW_INSET, maxOffset));

  const placement: WcPlacement = align ? `${useBase}-${align}` : useBase;
  return { x, y, placement, arrowOffset };
}
