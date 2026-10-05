import { afterEach, describe, expect, it, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './wc-upload.js';
import type { wcUpload, wcUploadFile, wcUploadRequestMethod } from './wc-upload.js';

/** 构造测试用 File 对象 */
function makeFile(name: string, size = 10): File {
  return new File(['x'.repeat(size)], name, { type: 'text/plain' });
}

/** 模拟选择文件：向隐藏 input 写入 files 并派发 change */
async function pickFiles(el: wcUpload, files: File[]): Promise<void> {
  const input = el.shadowRoot!.querySelector<HTMLInputElement>('input[type="file"]')!;
  Object.defineProperty(input, 'files', { value: files, configurable: true });
  input.dispatchEvent(new Event('change'));
  await el.updateComplete;
}

/** 捕获 requestMethod 调用与回调 */
function captureMethod() {
  const calls: Array<{ file: wcUploadFile; options: Parameters<wcUploadRequestMethod>[1] }> = [];
  const method: wcUploadRequestMethod = (file, options) => {
    calls.push({ file, options });
  };
  return { calls, method };
}

describe('wc-upload', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('渲染默认触发按钮（zh-CN 文案）', async () => {
    const el = await fixture<wcUpload>(html`<wc-upload></wc-upload>`);
    const trigger = el.shadowRoot!.querySelector('[part="trigger"]');
    expect(trigger).to.exist;
    expect(trigger!.textContent).to.contain('上传文件');
  });

  it('draggable 渲染拖拽区域并支持 tip 插槽', async () => {
    const el = await fixture<wcUpload>(
      html`<wc-upload draggable><span slot="tip">提示</span></wc-upload>`,
    );
    const dragger = el.shadowRoot!.querySelector('[part="dragger"]');
    expect(dragger).to.exist;
    expect(
      (el.shadowRoot!.querySelector('slot[name="tip"]') as HTMLSlotElement).assignedElements(),
    ).to.have.lengthOf(1);
  });

  it('选择文件加入列表并派发 wc-select 与 wc-change', async () => {
    const el = await fixture<wcUpload>(html`<wc-upload></wc-upload>`);
    const selected: File[][] = [];
    const changes: number[] = [];
    el.addEventListener('wc-select', (e) => selected.push((e as CustomEvent).detail.files));
    el.addEventListener('wc-change', () => changes.push(1));
    await pickFiles(el, [makeFile('a.txt'), makeFile('b.txt')]);
    expect(el.files).to.have.lengthOf(2);
    expect(el.files[0]!.status).to.equal('waiting');
    expect(selected).to.have.lengthOf(1);
    expect(selected[0]).to.have.lengthOf(2);
    expect(changes.length).to.be.greaterThan(0);
    expect(el.shadowRoot!.querySelectorAll('[part="item"]')).to.have.lengthOf(2);
  });

  it('未配置上传方式时保持 waiting 并警告', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const el = await fixture<wcUpload>(html`<wc-upload></wc-upload>`);
    await pickFiles(el, [makeFile('a.txt')]);
    expect(el.files[0]!.status).to.equal('waiting');
    expect(warn.mock.calls.filter((c) => String(c[0]).includes('wc-upload'))).to.have.lengthOf(1);
  });

  describe('上传流程（requestMethod）', () => {
    it('自动上传：进度与成功回调更新状态并派发事件', async () => {
      const { calls, method } = captureMethod();
      const el = await fixture<wcUpload>(html`<wc-upload .requestMethod=${method}></wc-upload>`);
      const progresses: number[] = [];
      const successes: wcUploadFile[] = [];
      el.addEventListener('wc-progress', (e) => progresses.push((e as CustomEvent).detail.percent));
      el.addEventListener('wc-success', (e) => successes.push((e as CustomEvent).detail.file));
      await pickFiles(el, [makeFile('a.txt')]);
      expect(calls).to.have.lengthOf(1);
      calls[0]!.options.onProgress(50);
      await el.updateComplete;
      expect(el.files[0]!.status).to.equal('uploading');
      expect(el.files[0]!.percent).to.equal(50);
      calls[0]!.options.onSuccess({ url: 'https://example.com/a.txt' });
      await el.updateComplete;
      expect(el.files[0]!.status).to.equal('success');
      expect(el.files[0]!.percent).to.equal(100);
      expect(el.files[0]!.url).to.equal('https://example.com/a.txt');
      expect(successes).to.have.lengthOf(1);
      expect(progresses).to.deep.equal([50]);
    });

    it('失败进入 error，可点击重试', async () => {
      const { calls, method } = captureMethod();
      const el = await fixture<wcUpload>(html`<wc-upload .requestMethod=${method}></wc-upload>`);
      const errors: string[] = [];
      el.addEventListener('wc-error', (e) => errors.push((e as CustomEvent).detail.message));
      await pickFiles(el, [makeFile('a.txt')]);
      calls[0]!.options.onError('boom');
      await el.updateComplete;
      expect(el.files[0]!.status).to.equal('error');
      expect(errors).to.deep.equal(['boom']);
      const retryBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.icon-btn');
      expect(retryBtn).to.exist;
      retryBtn!.click();
      await el.updateComplete;
      expect(calls).to.have.lengthOf(2);
      calls[1]!.options.onSuccess();
      await el.updateComplete;
      expect(el.files[0]!.status).to.equal('success');
    });

    it('autoUpload=false 时等待 submit() 手动上传', async () => {
      const { calls, method } = captureMethod();
      const el = await fixture<wcUpload>(
        html`<wc-upload auto-upload="false" .requestMethod=${method}></wc-upload>`,
      );
      await pickFiles(el, [makeFile('a.txt')]);
      expect(el.files[0]!.status).to.equal('waiting');
      expect(calls).to.have.lengthOf(0);
      el.submit();
      await el.updateComplete;
      expect(calls).to.have.lengthOf(1);
    });

    it('文件名带 url 后点击派发 wc-preview', async () => {
      const { calls, method } = captureMethod();
      const el = await fixture<wcUpload>(html`<wc-upload .requestMethod=${method}></wc-upload>`);
      const previews: wcUploadFile[] = [];
      el.addEventListener('wc-preview', (e) => previews.push((e as CustomEvent).detail.file));
      await pickFiles(el, [makeFile('a.txt')]);
      calls[0]!.options.onSuccess({ url: 'https://example.com/a.txt' });
      await el.updateComplete;
      const name = el.shadowRoot!.querySelector<HTMLElement>('.name.link')!;
      expect(name).to.exist;
      name.click();
      await el.updateComplete;
      expect(previews).to.have.lengthOf(1);
      expect(previews[0]!.url).to.equal('https://example.com/a.txt');
    });
  });

  it('max 限制数量并派发 wc-exceed', async () => {
    const el = await fixture<wcUpload>(html`<wc-upload max="2"></wc-upload>`);
    const exceeds: Array<{ files: File[]; max: number }> = [];
    el.addEventListener('wc-exceed', (e) => exceeds.push((e as CustomEvent).detail));
    await pickFiles(el, [makeFile('a.txt'), makeFile('b.txt'), makeFile('c.txt')]);
    expect(el.files).to.have.lengthOf(2);
    expect(exceeds).to.have.lengthOf(1);
    expect(exceeds[0]!.files).to.have.lengthOf(1);
    expect(exceeds[0]!.max).to.equal(2);
  });

  it('移除文件可取消；接受后从列表移除并派发 wc-change', async () => {
    const el = await fixture<wcUpload>(html`<wc-upload></wc-upload>`);
    await pickFiles(el, [makeFile('a.txt')]);
    // 取消移除
    el.addEventListener('wc-remove', (e) => e.preventDefault(), { once: true });
    el.shadowRoot!.querySelector<HTMLButtonElement>('.remove')!.click();
    await el.updateComplete;
    expect(el.files).to.have.lengthOf(1);
    // 接受移除
    el.shadowRoot!.querySelector<HTMLButtonElement>('.remove')!.click();
    await el.updateComplete;
    expect(el.files).to.have.lengthOf(0);
    expect(el.shadowRoot!.querySelector('[part="list"]')).to.not.exist;
  });

  it('clearFiles 清空列表', async () => {
    const el = await fixture<wcUpload>(html`<wc-upload></wc-upload>`);
    await pickFiles(el, [makeFile('a.txt'), makeFile('b.txt')]);
    el.clearFiles();
    await el.updateComplete;
    expect(el.files).to.have.lengthOf(0);
  });

  it('disabled 时 input 禁用且拖拽区域不可交互', async () => {
    const el = await fixture<wcUpload>(html`<wc-upload draggable disabled></wc-upload>`);
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('input[type="file"]')!;
    expect(input.disabled).to.be.true;
    const dragger = el.shadowRoot!.querySelector('[part="dragger"]')!;
    expect(dragger.getAttribute('aria-disabled')).to.equal('true');
    expect(dragger.getAttribute('tabindex')).to.equal('-1');
  });

  it('拖拽 drop 添加文件并切换高亮态', async () => {
    const el = await fixture<wcUpload>(html`<wc-upload draggable></wc-upload>`);
    const dragger = el.shadowRoot!.querySelector('[part="dragger"]')! as HTMLElement;
    const over = new Event('dragover', { bubbles: true, cancelable: true });
    dragger.dispatchEvent(over);
    await el.updateComplete;
    expect(dragger.classList.contains('drag-over')).to.be.true;
    const drop = new Event('drop', { bubbles: true, cancelable: true });
    Object.defineProperty(drop, 'dataTransfer', { value: { files: [makeFile('d.txt')] } });
    dragger.dispatchEvent(drop);
    await el.updateComplete;
    expect(dragger.classList.contains('drag-over')).to.be.false;
    expect(el.files).to.have.lengthOf(1);
    expect(el.files[0]!.name).to.equal('d.txt');
  });

  it('percent 进度夹紧到 0-100', async () => {
    const { calls, method } = captureMethod();
    const el = await fixture<wcUpload>(html`<wc-upload .requestMethod=${method}></wc-upload>`);
    await pickFiles(el, [makeFile('a.txt')]);
    calls[0]!.options.onProgress(150);
    await el.updateComplete;
    expect(el.files[0]!.percent).to.equal(100);
    calls[0]!.options.onProgress(-5);
    await el.updateComplete;
    expect(el.files[0]!.percent).to.equal(0);
  });

  it('大小格式化：B / KB / MB', async () => {
    const el = await fixture<wcUpload>(html`<wc-upload></wc-upload>`);
    const format = (el as unknown as { formatSize(size?: number): string }).formatSize;
    expect(format.call(el, 512)).to.equal('512 B');
    expect(format.call(el, 2048)).to.equal('2.0 KB');
    expect(format.call(el, 5 * 1024 * 1024)).to.equal('5.0 MB');
    expect(format.call(el, undefined)).to.equal('');
  });
});
