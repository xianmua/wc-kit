import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { LocalizeController } from '../../i18n/localize-controller';
import '../icon/wc-icon.js';
import '../progress/wc-progress.js';
import { uploadStyles } from './wc-upload.styles';

export type wcUploadFileStatus = 'waiting' | 'uploading' | 'success' | 'error';

/** 文件条目：选择/拖拽加入的文件与上传状态 */
export interface wcUploadFile {
  /** 唯一标识，由组件生成（列表以引用不可变方式更新，回调需按 uid 定位） */
  uid: string;
  /** 原始 File 对象（选择/拖拽进来时存在） */
  raw?: File;
  /** 文件名 */
  name: string;
  /** 文件大小（字节） */
  size?: number;
  /** 上传进度 0-100 */
  percent?: number;
  /** 上传状态 */
  status: wcUploadFileStatus;
  /** 文件访问地址（成功响应含 url 字段时自动提取，也可手动赋值；有点击预览） */
  url?: string;
  /** 服务端响应内容 */
  response?: unknown;
}

/** 自定义上传方法：通过回调驱动进度/成功/失败 */
export type wcUploadRequestMethod = (
  file: wcUploadFile,
  options: {
    onProgress: (percent: number) => void;
    onSuccess: (response?: unknown) => void;
    onError: (message?: string) => void;
  },
) => void;

/**
 * 上传。支持点击/拖拽选择文件、max 数量限制、进度展示（内嵌 wc-progress）、
 * 失败重试与文件列表管理；通过 action（XHR POST FormData）或 requestMethod（自定义上传）实现上传。
 *
 * @slot tip - 提示说明，显示在触发区下方
 * @csspart base - 外层容器
 * @csspart trigger - 默认触发按钮（非拖拽模式）
 * @csspart dragger - 拖拽区域（draggable 模式）
 * @csspart list - 文件列表
 * @csspart item - 文件条目
 * @cssprop --wc-upload-radius - 触发区/拖拽区圆角（默认 --wc-radius-medium）
 * @cssprop --wc-upload-dragger-bg - 拖拽区背景色
 * @fires wc-select - 选择/拖入文件后触发，detail.files 为原始 File 数组
 * @fires wc-change - 文件列表变化时触发，detail.files 为当前列表
 * @fires wc-progress - 上传进度变化时触发，detail: { file, percent }
 * @fires wc-success - 单个文件上传成功时触发，detail: { file, response }
 * @fires wc-error - 单个文件上传失败时触发，detail: { file, message }
 * @fires wc-remove - 移除文件时触发（可取消，detail: { file, index }）
 * @fires wc-exceed - 超出 max 数量限制时触发，detail: { files, max }
 * @fires wc-preview - 点击带 url 的文件名时触发，detail.file
 */
export class wcUpload extends LitElement {
  static styles = [baseStyles, uploadStyles];

  /** 上传地址（设置后以内置 XHR 上传，POST FormData，字段名取 name） */
  @property() action = '';

  /** FormData 字段名 */
  @property() name = 'file';

  /** 接受的文件类型（原生 accept） */
  @property() accept = '';

  /** 是否支持多选 */
  @property({ type: Boolean }) multiple = false;

  /** 最大文件数量，0 表示不限制 */
  @property({ type: Number }) max = 0;

  /** 拖拽上传模式：渲染大面积拖拽区域 */
  @property({ type: Boolean, reflect: true }) draggable = false;

  /** 选择文件后自动开始上传；设为 false 时通过 submit() 手动触发 */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'auto-upload',
    converter: (value) => (value == null ? true : value !== 'false'),
  })
  autoUpload = true;

  /** 是否禁用 */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** 自定义上传方法（属性型，仅 JS 赋值；设置后优先于 action） */
  @property({ attribute: false })
  requestMethod: wcUploadRequestMethod | null = null;

  /** 当前文件列表（组件内部维护，可读取用于回显/提交） */
  @state() files: wcUploadFile[] = [];

  @state() private dragOver = false;

  private localize = new LocalizeController(this);

  /** 进行中的 XHR（按文件 uid 键控），用于移除文件时中断 */
  private xhrMap = new Map<string, XMLHttpRequest>();

  private uidCounter = 0;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    for (const xhr of this.xhrMap.values()) xhr.abort();
    this.xhrMap.clear();
  }

  /* ---------- 公开方法 ---------- */

  /** 手动上传全部 waiting 状态的文件（autoUpload=false 时使用） */
  submit(): void {
    for (const file of this.files) {
      if (file.status === 'waiting') this.startUpload(file);
    }
  }

  /** 清空文件列表并中断进行中的上传 */
  clearFiles(): void {
    for (const xhr of this.xhrMap.values()) xhr.abort();
    this.xhrMap.clear();
    if (!this.files.length) return;
    this.files = [];
    this.emitChange();
  }

  private nextUid(): string {
    this.uidCounter += 1;
    return `wc-upload-file-${this.uidCounter}`;
  }

  /* ---------- 选择与拖拽 ---------- */

  private pick(): void {
    if (this.disabled) return;
    const input = this.shadowRoot?.querySelector<HTMLInputElement>('input[type="file"]');
    input?.click();
  }

  private onInputChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files?.length) this.addFiles(input.files);
    input.value = '';
  }

  private onDragOver(e: DragEvent): void {
    e.preventDefault();
    if (!this.disabled) this.dragOver = true;
  }

  private onDragLeave(): void {
    this.dragOver = false;
  }

  private onDrop(e: DragEvent): void {
    e.preventDefault();
    this.dragOver = false;
    if (this.disabled) return;
    if (e.dataTransfer?.files?.length) this.addFiles(e.dataTransfer.files);
  }

  private onDraggerKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.pick();
    }
  }

  private addFiles(list: FileList | File[]): void {
    const incoming = Array.from(list);
    if (!incoming.length) return;
    let allowed = incoming;
    if (this.max > 0) {
      const remaining = this.max - this.files.length;
      if (remaining < incoming.length) {
        const rejected = incoming.slice(Math.max(0, remaining));
        this.dispatchEvent(
          new CustomEvent('wc-exceed', {
            detail: { files: rejected, max: this.max },
            bubbles: true,
            composed: true,
          }),
        );
        allowed = incoming.slice(0, Math.max(0, remaining));
      }
    }
    if (!allowed.length) return;
    const items: wcUploadFile[] = allowed.map((raw) => ({
      uid: this.nextUid(),
      raw,
      name: raw.name,
      size: raw.size,
      percent: 0,
      status: 'waiting',
    }));
    this.files = [...this.files, ...items];
    this.dispatchEvent(
      new CustomEvent('wc-select', {
        detail: { files: allowed },
        bubbles: true,
        composed: true,
      }),
    );
    this.emitChange();
    if (this.autoUpload) {
      for (const item of items) this.startUpload(item);
    }
  }

  /* ---------- 上传流程 ---------- */

  private startUpload(file: wcUploadFile): void {
    if (this.disabled || file.status === 'uploading') return;
    if (!this.action && !this.requestMethod) {
      console.warn('[wc-upload] 未配置 action 或 requestMethod，文件保持待上传状态');
      return;
    }
    this.updateFile(file, { status: 'uploading', percent: 0 });
    if (this.requestMethod) {
      this.requestMethod(file, {
        onProgress: (percent) => this.handleProgress(file, percent),
        onSuccess: (response) => this.handleSuccess(file, response),
        onError: (message) => this.handleError(file, message),
      });
    } else {
      this.uploadWithXhr(file);
    }
  }

  private uploadWithXhr(file: wcUploadFile): void {
    const xhr = new XMLHttpRequest();
    this.xhrMap.set(file.uid, xhr);
    const form = new FormData();
    form.append(this.name, file.raw as File);
    xhr.open('POST', this.action);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) this.handleProgress(file, (e.loaded / e.total) * 100);
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let response: unknown = xhr.responseText;
        try {
          response = JSON.parse(xhr.responseText);
        } catch {
          /* 非 JSON 响应保留原始文本 */
        }
        this.handleSuccess(file, response);
      } else {
        this.handleError(file, `HTTP ${xhr.status}`);
      }
    };
    xhr.onerror = () => this.handleError(file, 'network error');
    xhr.send(form);
  }

  private handleProgress(file: wcUploadFile, percent: number): void {
    const clamped = Math.min(100, Math.max(0, Math.round(percent)));
    this.updateFile(file, { percent: clamped });
    this.dispatchEvent(
      new CustomEvent('wc-progress', {
        detail: { file: this.snapshot(file), percent: clamped },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleSuccess(file: wcUploadFile, response?: unknown): void {
    this.xhrMap.delete(file.uid);
    // 约定：响应为对象且含 url 字符串字段时自动提取为文件地址
    const url =
      typeof (response as { url?: unknown } | null)?.url === 'string'
        ? (response as { url: string }).url
        : undefined;
    this.updateFile(file, { status: 'success', percent: 100, response, url });
    this.dispatchEvent(
      new CustomEvent('wc-success', {
        detail: { file: this.snapshot(file), response },
        bubbles: true,
        composed: true,
      }),
    );
    this.emitChange();
  }

  private handleError(file: wcUploadFile, message?: string): void {
    this.xhrMap.delete(file.uid);
    this.updateFile(file, { status: 'error' });
    this.dispatchEvent(
      new CustomEvent('wc-error', {
        detail: { file: this.snapshot(file), message },
        bubbles: true,
        composed: true,
      }),
    );
    this.emitChange();
  }

  /* ---------- 列表操作 ---------- */

  private removeFile(index: number): void {
    const file = this.files[index];
    if (!file) return;
    const accepted = this.dispatchEvent(
      new CustomEvent('wc-remove', {
        detail: { file, index },
        bubbles: true,
        composed: true,
        cancelable: true,
      }),
    );
    if (!accepted) return;
    this.xhrMap.get(file.uid)?.abort();
    this.xhrMap.delete(file.uid);
    this.files = this.files.filter((_, i) => i !== index);
    this.emitChange();
  }

  private retry(file: wcUploadFile): void {
    if (file.status !== 'error') return;
    this.startUpload(file);
  }

  private onNameClick(file: wcUploadFile): void {
    if (!file.url) return;
    this.dispatchEvent(
      new CustomEvent('wc-preview', { detail: { file }, bubbles: true, composed: true }),
    );
  }

  private updateFile(file: wcUploadFile, patch: Partial<wcUploadFile>): void {
    this.files = this.files.map((f) => (f.uid === file.uid ? { ...f, ...patch } : f));
  }

  private snapshot(file: wcUploadFile): wcUploadFile {
    return this.files.find((f) => f.uid === file.uid) ?? file;
  }

  private emitChange(): void {
    this.dispatchEvent(
      new CustomEvent('wc-change', {
        detail: { files: [...this.files] },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private formatSize(size?: number): string {
    if (size == null) return '';
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  }

  render() {
    return html`
      <div class="upload" part="base">
        <input
          class="hidden-input"
          type="file"
          accept=${this.accept}
          ?multiple=${this.multiple}
          ?disabled=${this.disabled}
          @change=${this.onInputChange}
        />
        ${
          this.draggable
            ? html`<div
                class="dragger ${this.dragOver ? 'drag-over' : ''}"
                part="dragger"
                role="button"
                tabindex=${this.disabled ? -1 : 0}
                aria-disabled=${this.disabled}
                @click=${this.pick}
                @keydown=${this.onDraggerKeydown}
                @dragover=${this.onDragOver}
                @dragleave=${this.onDragLeave}
                @drop=${this.onDrop}
              >
                <wc-icon name="upload" class="dragger-icon"></wc-icon>
                <span class="dragger-text">${this.localize.term('upload.clickOrDrag')}</span>
                <span class="tip"><slot name="tip"></slot></span>
              </div>`
            : html`<div class="trigger-wrap">
                <button
                  type="button"
                  class="trigger"
                  part="trigger"
                  ?disabled=${this.disabled}
                  @click=${this.pick}
                >
                  <wc-icon name="upload"></wc-icon>
                  <span>${this.localize.term('upload.upload')}</span>
                </button>
                <span class="tip"><slot name="tip"></slot></span>
              </div>`
        }
        ${
          this.files.length
            ? html`<ul class="list" part="list">
                ${this.files.map(
                  (file, index) => html`
                    <li class="item ${file.status}" part="item">
                      <div class="row">
                        <wc-icon name="file" class="type-icon"></wc-icon>
                        <span
                          class="name ${file.url ? 'link' : ''}"
                          title=${file.name}
                          role=${file.url ? 'button' : undefined}
                          tabindex=${file.url ? 0 : undefined}
                          @click=${() => this.onNameClick(file)}
                          @keydown=${(e: KeyboardEvent) => {
                            if (file.url && (e.key === 'Enter' || e.key === ' ')) {
                              e.preventDefault();
                              this.onNameClick(file);
                            }
                          }}
                          >${file.name}</span
                        >
                        ${
                          file.status === 'uploading'
                            ? html`<span class="percent">${Math.round(file.percent ?? 0)}%</span>`
                            : file.status === 'error'
                              ? html`<span class="fail-text"
                                  >${this.localize.term('upload.failed')}</span
                                >`
                              : html`<span class="size">${this.formatSize(file.size)}</span>`
                        }
                        ${
                          file.status === 'success'
                            ? html`<wc-icon name="check" class="status-icon success"></wc-icon>`
                            : file.status === 'error'
                              ? html`<button
                                  type="button"
                                  class="icon-btn"
                                  title=${this.localize.term('upload.retry')}
                                  aria-label=${this.localize.term('upload.retry')}
                                  @click=${() => this.retry(file)}
                                >
                                  <wc-icon name="error" class="status-icon error"></wc-icon>
                                </button>`
                              : file.status === 'waiting'
                                ? html`<wc-icon
                                    name="loader"
                                    spin
                                    class="status-icon waiting"
                                  ></wc-icon>`
                                : ''
                        }
                        <button
                          type="button"
                          class="remove"
                          part="remove-button"
                          aria-label=${this.localize.term('upload.remove')}
                          @click=${() => this.removeFile(index)}
                        >
                          <wc-icon name="close"></wc-icon>
                        </button>
                      </div>
                      ${
                        file.status === 'uploading'
                          ? html`<wc-progress
                              class="bar"
                              value=${file.percent ?? 0}
                              stroke-width="4"
                              ?show-label=${false}
                            ></wc-progress>`
                          : ''
                      }
                    </li>
                  `,
                )}
              </ul>`
            : ''
        }
      </div>
    `;
  }
}

if (!customElements.get('wc-upload')) {
  customElements.define('wc-upload', wcUpload);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-upload': wcUpload;
  }
}
