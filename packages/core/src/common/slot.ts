/**
 * slot 内容检测（button / input / card / float-button 等 slotchange 处理共用）。
 */

/** slot 是否分配了元素（穿透嵌套 slot） */
export function hasAssignedElements(slot: HTMLSlotElement): boolean {
  return slot.assignedElements({ flatten: true }).length > 0;
}

/** slot 是否有非空白内容（纯缩进/换行文本节点视为空） */
export function hasVisibleContent(slot: HTMLSlotElement): boolean {
  return slot.assignedNodes({ flatten: true }).some((n) => (n.textContent ?? '').trim() !== '');
}
