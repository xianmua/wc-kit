import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { vi } from 'vitest';
import './wc-message.js';
import './message.js';
import { message } from './message.js';
import type { wcMessage } from './wc-message.js';

/** 清理命令式 API 留在 body 上的容器 */
function cleanupBody(): void {
  document.querySelectorAll('.wc-message-container').forEach((el) => el.remove());
}

describe('wc-message', () => {
  afterEach(() => {
    cleanupBody();
    vi.useRealTimers();
  });

  it('默认属性：info 主题、3s 自动关闭、无关闭按钮', async () => {
    const el = await fixture<wcMessage>(html`<wc-message content="提示"></wc-message>`);
    expect(el.theme).to.equal('info');
    expect(el.duration).to.equal(3000);
    expect(el.closable).to.be.false;
    expect(el.shadowRoot!.querySelector('[part="close-button"]')).to.not.exist;
  });

  it('content 属性渲染到内容区，主题图标按主题映射', async () => {
    const el = await fixture<wcMessage>(
      html`<wc-message theme="success" content="已保存"></wc-message>`,
    );
    expect(el.shadowRoot!.querySelector('.content')!.textContent).to.contain('已保存');
    expect(el.getAttribute('theme')).to.equal('success');
    expect(el.shadowRoot!.querySelector('wc-icon')!.getAttribute('name')).to.equal('check');
  });

  it('默认插槽覆盖 content', async () => {
    const el = await fixture<wcMessage>(html`<wc-message content="属性"><b>插槽</b></wc-message>`);
    const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('.content slot')!;
    expect(slot.assignedElements()[0]!.textContent).to.contain('插槽');
  });

  it('loading 主题图标旋转', async () => {
    const el = await fixture<wcMessage>(
      html`<wc-message theme="loading" content="加载中"></wc-message>`,
    );
    const icon = el.shadowRoot!.querySelector('wc-icon')!;
    expect(icon.getAttribute('name')).to.equal('loader');
    expect(icon.hasAttribute('spin')).to.be.true;
  });

  it('closable 显示关闭按钮，点击派发 wc-close 并从 DOM 移除', async () => {
    const parent = document.createElement('div');
    document.body.appendChild(parent);
    const el = document.createElement('wc-message') as wcMessage;
    el.closable = true;
    el.content = '可关闭';
    parent.appendChild(el);
    await el.updateComplete;

    const listener = oneEvent(el, 'wc-close');
    el.shadowRoot!.querySelector<HTMLButtonElement>('[part="close-button"]')!.click();
    await listener.catch(() => {});
    expect(el.isConnected).to.be.false;
  });

  it('close() 手动关闭并触发 onClose', async () => {
    let closed = false;
    const parent = document.createElement('div');
    document.body.appendChild(parent);
    const el = document.createElement('wc-message') as wcMessage;
    el.content = '手动';
    el.addEventListener('wc-close', () => {
      closed = true;
    });
    parent.appendChild(el);
    await el.updateComplete;
    el.close();
    expect(closed).to.be.true;
    expect(el.isConnected).to.be.false;
  });

  it('duration 到时自动关闭', async () => {
    vi.useFakeTimers();
    const parent = document.createElement('div');
    document.body.appendChild(parent);
    const el = document.createElement('wc-message') as wcMessage;
    el.content = '自动';
    el.duration = 1000;
    parent.appendChild(el);
    await el.updateComplete;
    vi.advanceTimersByTime(1000);
    expect(el.isConnected).to.be.false;
  });

  it('duration=0 不自动关闭', async () => {
    vi.useFakeTimers();
    const parent = document.createElement('div');
    document.body.appendChild(parent);
    const el = document.createElement('wc-message') as wcMessage;
    el.content = '常驻';
    el.duration = 0;
    parent.appendChild(el);
    await el.updateComplete;
    vi.advanceTimersByTime(60_000);
    expect(el.isConnected).to.be.true;
  });

  it('暴露 part="base" / "icon" / "content"', async () => {
    const el = await fixture<wcMessage>(html`<wc-message content="提示"></wc-message>`);
    const root = el.shadowRoot!;
    expect(root.querySelector('[part="base"]')).to.exist;
    expect(root.querySelector('[part="icon"]')).to.exist;
    expect(root.querySelector('[part="content"]')).to.exist;
  });
});

describe('message 命令式 API', () => {
  afterEach(() => {
    cleanupBody();
    vi.useRealTimers();
  });

  it('message.info/success/warning/error 创建对应主题的消息', () => {
    message.info('普通');
    message.success('成功');
    message.warning('警告');
    message.error('错误');
    const items = document.querySelectorAll<wcMessage>('.wc-message-container wc-message');
    expect(items.length).to.equal(4);
    expect(items[0]!.theme).to.equal('info');
    expect(items[1]!.theme).to.equal('success');
    expect(items[2]!.theme).to.equal('warning');
    expect(items[3]!.theme).to.equal('error');
  });

  it('消息进入单例容器，重复调用不重复创建容器', () => {
    message.info('第一条');
    message.success('第二条');
    const containers = document.querySelectorAll('.wc-message-container');
    expect(containers.length).to.equal(1);
    expect(containers[0]!.querySelectorAll('wc-message').length).to.equal(2);
  });

  it('容器 z-index 取自令牌（jsdom 无样式回退 1500）', () => {
    message.info('提示');
    const containerEl = document.querySelector('.wc-message-container') as HTMLElement;
    expect(containerEl.style.zIndex).to.equal('1500');
  });

  it('onClose 回调在关闭时触发', async () => {
    vi.useFakeTimers();
    let closed = false;
    message.info('回调', { duration: 500, onClose: () => (closed = true) });
    vi.advanceTimersByTime(500);
    expect(closed).to.be.true;
  });

  it('loading 默认不自动关闭', () => {
    vi.useFakeTimers();
    message.loading('上传中');
    vi.advanceTimersByTime(10_000);
    expect(document.querySelector('wc-message')!.isConnected).to.be.true;
  });
});
