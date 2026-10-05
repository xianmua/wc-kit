/**
 * document 点击外部关闭（capture 阶段），Tooltip / Dropdown / Select 等弹层组件共用。
 * host 连接期间常驻监听：点击目标不在 host 组合路径内时回调；
 * 开关状态判断由回调自行负责（面板关闭时应为无害空操作）。
 */
import type { ReactiveController, ReactiveElement } from 'lit';

export class OutsideClickController implements ReactiveController {
  private readonly handler = (e: Event): void => {
    if (!(e.composedPath() as Array<EventTarget>).includes(this.host))
      this.onClick(e as MouseEvent);
  };

  constructor(
    private readonly host: ReactiveElement,
    private readonly onClick: (e: MouseEvent) => void,
  ) {
    host.addController(this);
  }

  hostConnected(): void {
    document.addEventListener('click', this.handler, true);
  }

  hostDisconnected(): void {
    document.removeEventListener('click', this.handler, true);
  }
}
