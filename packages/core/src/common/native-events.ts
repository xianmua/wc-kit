export type NativeEventType = 'input' | 'change';

/**
 * 在宿主元素上派发原生 input / change 伴发事件。
 *
 * 框架对自定义元素的双向绑定走原生事件通道（如 Vue 的 v-model 在
 * isCustomElement 下等价于设置 el.value + 监听原生 input），组件在派发
 * wc-* 语义事件的同时伴发原生事件，消费方即可零包装直接使用 v-model。
 *
 * 注意：组件内部的原生 input 元素派发的 input 事件本身是 composed 的，
 * 会穿过 shadow 边界造成双重触发，内层 handler 应先 stopPropagation，
 * 统一改由宿主派发本事件。
 */
export function emitNativeEvent(el: HTMLElement, type: NativeEventType): void {
  el.dispatchEvent(new Event(type, { bubbles: true, composed: true }));
}

/** 阻断内层原生 input 事件向 shadow 边界外泄漏（composed），由宿主统一派发 */
export function stopInnerEvent(e: Event): void {
  e.stopPropagation();
}
