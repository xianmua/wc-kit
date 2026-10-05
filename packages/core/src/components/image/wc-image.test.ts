import { expect, fixture, html } from '@open-wc/testing';
import { vi } from 'vitest';
import './wc-image.js';
import type { wcImage } from './wc-image.js';

async function flush(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

/** 模拟图片加载成功（jsdom 不真正加载图片） */
async function simulateLoad(el: wcImage): Promise<void> {
  const img = el.shadowRoot!.querySelector('img');
  img!.dispatchEvent(new Event('load'));
  await el.updateComplete;
}

describe('wc-image', () => {
  it('非懒加载默认立即发起加载，渲染 img 与加载占位', async () => {
    const el = await fixture<wcImage>(html`<wc-image src="a.png" alt="图片"></wc-image>`);
    expect(el.shadowRoot!.querySelector('img')!.getAttribute('src')).to.equal('a.png');
    expect(el.shadowRoot!.querySelector('.layer')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="image"]')).to.exist;
  });

  it('load 事件后进入成功态并派发 wc-load', async () => {
    const el = await fixture<wcImage>(html`<wc-image src="a.png"></wc-image>`);
    let fired = '';
    el.addEventListener('wc-load', (e) => {
      fired = (e as CustomEvent).detail.src;
    });
    await simulateLoad(el);
    expect(el.shadowRoot!.querySelector('.layer')).to.not.exist;
    expect(fired).to.equal('a.png');
  });

  it('error 事件后显示失败占位并派发 wc-error', async () => {
    const el = await fixture<wcImage>(html`<wc-image src="bad.png"></wc-image>`);
    let fired = '';
    el.addEventListener('wc-error', (e) => {
      fired = (e as CustomEvent).detail.src;
    });
    el.shadowRoot!.querySelector('img')!.dispatchEvent(new Event('error'));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.layer')).to.exist;
    expect(el.shadowRoot!.querySelector('.layer')!.textContent).to.contain('图片加载失败');
    expect(el.shadowRoot!.querySelector('wc-icon[name="image-off"]')).to.exist;
    expect(fired).to.equal('bad.png');
  });

  it('设置 fallback 后失败时渲染替代图，替代图再失败才显示占位', async () => {
    const el = await fixture<wcImage>(
      html`<wc-image src="bad.png" fallback="fallback.png"></wc-image>`,
    );
    el.shadowRoot!.querySelector('img')!.dispatchEvent(new Event('error'));
    await el.updateComplete;
    const fallbackImg = el.shadowRoot!.querySelector('img');
    expect(fallbackImg!.getAttribute('src')).to.equal('fallback.png');
    // 替代图也失败 → 占位层
    fallbackImg!.dispatchEvent(new Event('error'));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.layer')).to.exist;
    expect(el.shadowRoot!.querySelector('.layer')!.textContent).to.contain('图片加载失败');
  });

  it('src 变更后重置为加载中', async () => {
    const el = await fixture<wcImage>(html`<wc-image src="a.png"></wc-image>`);
    await simulateLoad(el);
    el.src = 'b.png';
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.layer')).to.exist;
    expect(el.shadowRoot!.querySelector('img')!.getAttribute('src')).to.equal('b.png');
  });

  it('懒加载：IntersectionObserver 命中后才发起加载', async () => {
    let observeCallback: IntersectionObserverCallback = () => {};
    class MockIntersectionObserver {
      constructor(cb: IntersectionObserverCallback) {
        observeCallback = cb;
      }
      observe(): void {}
      disconnect(): void {}
      unobserve(): void {}
    }
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    try {
      const el = await fixture<wcImage>(html`<wc-image src="a.png" lazy></wc-image>`);
      expect(el.shadowRoot!.querySelector('img')).to.not.exist;
      observeCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
      await el.updateComplete;
      expect(el.shadowRoot!.querySelector('img')!.getAttribute('src')).to.equal('a.png');
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('fit 与 position 写入内联样式', async () => {
    const el = await fixture<wcImage>(
      html`<wc-image src="a.png" fit="cover" position="top"></wc-image>`,
    );
    const style = el.shadowRoot!.querySelector('img')!.getAttribute('style')!;
    expect(style).to.contain('object-fit:cover');
    expect(style).to.contain('object-position:top');
  });

  describe('预览', () => {
    async function previewFixture(): Promise<wcImage> {
      return fixture<wcImage>(html`<wc-image src="a.png" preview></wc-image>`);
    }

    async function openPreview(el: wcImage): Promise<void> {
      await simulateLoad(el);
      el.shadowRoot!.querySelector<HTMLElement>('.trigger')!.click();
      await el.updateComplete;
    }

    it('未开启 preview 时不渲染触发层', async () => {
      const el = await fixture<wcImage>(html`<wc-image src="a.png"></wc-image>`);
      await simulateLoad(el);
      expect(el.shadowRoot!.querySelector('.trigger')).to.not.exist;
    });

    it('开启 preview 且加载成功后出现触发层，点击打开预览并派发 wc-preview-open', async () => {
      const el = await previewFixture();
      await simulateLoad(el);
      expect(el.shadowRoot!.querySelector('.trigger')).to.exist;
      let opened = false;
      el.addEventListener('wc-preview-open', () => {
        opened = true;
      });
      await openPreview(el);
      expect(el.shadowRoot!.querySelector('[role="dialog"]')).to.exist;
      expect(el.shadowRoot!.querySelector('[part="preview-image"]')!.getAttribute('src')).to.equal(
        'a.png',
      );
      expect(opened).to.be.true;
    });

    it('未加载成功时点击触发层不打开预览', async () => {
      const el = await previewFixture();
      // status 仍是 loading，触发层不存在
      expect(el.shadowRoot!.querySelector('.trigger')).to.not.exist;
      expect(el.shadowRoot!.querySelector('[role="dialog"]')).to.not.exist;
    });

    it('preview-src 优先作为大图地址', async () => {
      const el = await fixture<wcImage>(
        html`<wc-image src="a.png" preview-src="large.png" preview></wc-image>`,
      );
      await openPreview(el);
      expect(el.shadowRoot!.querySelector('[part="preview-image"]')!.getAttribute('src')).to.equal(
        'large.png',
      );
    });

    it('关闭按钮：派发可取消 wc-preview-close 并关闭', async () => {
      const el = await previewFixture();
      await openPreview(el);
      const events: string[] = [];
      el.addEventListener('wc-preview-close', (e) => {
        events.push((e as CustomEvent).detail.reason);
      });
      el.shadowRoot!.querySelector<HTMLButtonElement>('[part="close-button"]')!.click();
      await el.updateComplete;
      expect(events).to.deep.equal(['close-btn']);
      expect(el.shadowRoot!.querySelector('[role="dialog"]')).to.not.exist;
    });

    it('wc-preview-close preventDefault 可阻止关闭', async () => {
      const el = await previewFixture();
      await openPreview(el);
      el.addEventListener('wc-preview-close', (e) => e.preventDefault());
      el.requestClosePreview('api');
      await el.updateComplete;
      expect(el.shadowRoot!.querySelector('[role="dialog"]')).to.exist;
    });

    it('Escape 关闭预览，reason 为 escape', async () => {
      const el = await previewFixture();
      await openPreview(el);
      let reason = '';
      el.addEventListener('wc-preview-close', (e) => {
        reason = (e as CustomEvent).detail.reason;
      });
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await flush();
      await el.updateComplete;
      expect(reason).to.equal('escape');
      expect(el.shadowRoot!.querySelector('[role="dialog"]')).to.not.exist;
    });

    it('遮罩点击关闭', async () => {
      const el = await previewFixture();
      await openPreview(el);
      el.shadowRoot!.querySelector<HTMLElement>('.overlay')!.click();
      await el.updateComplete;
      expect(el.shadowRoot!.querySelector('[role="dialog"]')).to.not.exist;
    });

    it('工具栏：放大/缩小/旋转/重置', async () => {
      const el = await previewFixture();
      await openPreview(el);
      const buttons = el.shadowRoot!.querySelectorAll('.toolbar button');
      // 放大
      buttons[0]!.click();
      await el.updateComplete;
      expect((el as unknown as { scale: number }).scale).to.equal(1.25);
      // 缩小两次到 0.75
      buttons[1]!.click();
      buttons[1]!.click();
      await el.updateComplete;
      expect((el as unknown as { scale: number }).scale).to.equal(0.75);
      // 旋转
      buttons[2]!.click();
      await el.updateComplete;
      expect((el as unknown as { rotate: number }).rotate).to.equal(90);
      // 重置
      buttons[3]!.click();
      await el.updateComplete;
      expect((el as unknown as { scale: number }).scale).to.equal(1);
      expect((el as unknown as { rotate: number }).rotate).to.equal(0);
    });

    it('缩放边界：不超出 [0.25, 5]', async () => {
      const el = await previewFixture();
      await openPreview(el);
      (el as unknown as { zoomBy: (delta: number) => void }).zoomBy(99);
      expect((el as unknown as { scale: number }).scale).to.equal(5);
      (el as unknown as { zoomBy: (delta: number) => void }).zoomBy(-99);
      expect((el as unknown as { scale: number }).scale).to.equal(0.25);
    });
  });
});
