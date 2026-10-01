import { expect, fixture, html } from '@open-wc/testing';
import { vi } from 'vitest';
import './wc-tooltip.js';
import type { wcTooltip } from './wc-tooltip.js';

describe('wc-tooltip', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('默认不可见，触发区带 aria-describedby', async () => {
    const el = await fixture<wcTooltip>(
      html`<wc-tooltip content="提示"><button>目标</button></wc-tooltip>`,
    );
    expect(el.open).to.be.false;
    expect(el.shadowRoot!.querySelector('.panel')!.hasAttribute('data-open')).to.be.false;
    const trigger = el.shadowRoot!.querySelector('.trigger')!;
    expect(trigger.getAttribute('aria-describedby')).to.match(/^wc-tooltip-panel-/);
    // panel id 与 aria-describedby 一致
    const id = trigger.getAttribute('aria-describedby')!;
    expect(el.shadowRoot!.querySelector(`#${id}`)).to.exist;
  });

  it('hover 触发：延迟后显示并派发 wc-show，移开后隐藏', async () => {
    vi.useFakeTimers();
    const el = await fixture<wcTooltip>(
      html`<wc-tooltip content="提示"><button>目标</button></wc-tooltip>`,
    );
    const shows: number[] = [];
    el.addEventListener('wc-show', () => shows.push(1));
    el.shadowRoot!.querySelector('.trigger')!.dispatchEvent(new Event('mouseenter'));
    vi.advanceTimersByTime(100);
    await el.updateComplete;
    expect(el.open).to.be.true;
    expect(el.shadowRoot!.querySelector('.panel')!.hasAttribute('data-open')).to.be.true;
    expect(shows.length).to.equal(1);

    el.shadowRoot!.querySelector('.trigger')!.dispatchEvent(new Event('mouseleave'));
    vi.advanceTimersByTime(150);
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('focus 触发同样生效（键盘可访问）', async () => {
    vi.useFakeTimers();
    const el = await fixture<wcTooltip>(
      html`<wc-tooltip content="提示"><button>目标</button></wc-tooltip>`,
    );
    el.shadowRoot!.querySelector('.trigger')!.dispatchEvent(new Event('focusin'));
    vi.advanceTimersByTime(100);
    expect(el.open).to.be.true;
  });

  it('快速进出只保留最后一次意图', async () => {
    vi.useFakeTimers();
    const el = await fixture<wcTooltip>(
      html`<wc-tooltip content="提示"><button>目标</button></wc-tooltip>`,
    );
    const trigger = el.shadowRoot!.querySelector('.trigger')!;
    trigger.dispatchEvent(new Event('mouseenter'));
    trigger.dispatchEvent(new Event('mouseleave'));
    trigger.dispatchEvent(new Event('mouseenter'));
    vi.advanceTimersByTime(200);
    expect(el.open).to.be.true;
  });

  it('click 触发：点击切换，Escape 关闭', async () => {
    vi.useFakeTimers();
    const el = await fixture<wcTooltip>(
      html`<wc-tooltip trigger="click" content="提示"><button>目标</button></wc-tooltip>`,
    );
    const trigger = el.shadowRoot!.querySelector('.trigger')!;
    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    vi.advanceTimersByTime(100);
    expect(el.open).to.be.true;

    trigger.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }),
    );
    vi.advanceTimersByTime(150);
    expect(el.open).to.be.false;
  });

  it('manual 模式：hover 无效，show()/hide() 生效', async () => {
    vi.useFakeTimers();
    const el = await fixture<wcTooltip>(
      html`<wc-tooltip trigger="manual" content="提示"><button>目标</button></wc-tooltip>`,
    );
    el.shadowRoot!.querySelector('.trigger')!.dispatchEvent(new Event('mouseenter'));
    vi.advanceTimersByTime(200);
    expect(el.open).to.be.false;

    el.show();
    vi.advanceTimersByTime(100);
    expect(el.open).to.be.true;
    el.hide();
    vi.advanceTimersByTime(150);
    expect(el.open).to.be.false;
  });

  it('placement 反映在面板 side 类上，open 后写入 dataset.placement', async () => {
    vi.useFakeTimers();
    const el = await fixture<wcTooltip>(
      html`<wc-tooltip placement="right-start" content="提示"><button>目标</button></wc-tooltip>`,
    );
    expect(el.shadowRoot!.querySelector('.panel')!.classList.contains('side-right')).to.be.true;
    el.show();
    vi.advanceTimersByTime(100);
    await el.updateComplete;
    // jsdom 中矩形全 0，翻转/夹紧逻辑不触发，最终 placement 保持期望值
    expect(el.shadowRoot!.querySelector('.panel')!.getAttribute('data-placement')).to.equal(
      'right-start',
    );
  });

  it('content 插槽覆盖文本内容', async () => {
    const el = await fixture<wcTooltip>(
      html`<wc-tooltip content="属性文本"
        ><button>目标</button><em slot="content">插槽富文本</em></wc-tooltip
      >`,
    );
    const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="content"]')!;
    expect(slot.assignedElements()[0]!.textContent).to.contain('插槽富文本');
  });

  it('暴露 part="trigger" / "base" / "arrow"', async () => {
    const el = await fixture<wcTooltip>(
      html`<wc-tooltip content="提示"><button>目标</button></wc-tooltip>`,
    );
    const root = el.shadowRoot!;
    expect(root.querySelector('[part="trigger"]')).to.exist;
    expect(root.querySelector('[part="base"]')).to.exist;
    expect(root.querySelector('[part="arrow"]')).to.exist;
  });
});
