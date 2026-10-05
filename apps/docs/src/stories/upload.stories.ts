import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { message, registerBuiltinIcons } from '@wc-kit/core';
import type { wcUpload, wcUploadRequestMethod } from '@wc-kit/core';

registerBuiltinIcons();

/** 模拟上传：进度步进；文件名含 "fail" 时失败 */
const simulateRequestMethod: wcUploadRequestMethod = (file, { onProgress, onSuccess, onError }) => {
  let percent = 0;
  const timer = window.setInterval(() => {
    percent = Math.min(100, percent + 20);
    onProgress(percent);
    if (percent >= 100) {
      window.clearInterval(timer);
      if (file.name.includes('fail')) {
        onError('模拟上传失败');
      } else {
        onSuccess({ url: `https://example.com/${file.name}` });
      }
    }
  }, 200);
};

/** 按 id 获取元素（各 story 用独立 id 避免相互干扰） */
function byId<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

const meta: Meta<wcUpload> = {
  title: '表单组件/Upload 上传',
  component: 'wc-upload',
  tags: ['autodocs'],
  argTypes: {
    action: { description: '上传地址（设置后以内置 XHR POST FormData）', control: 'text' },
    name: { description: 'FormData 字段名', control: 'text' },
    accept: { description: '接受的文件类型（原生 accept）', control: 'text' },
    multiple: { description: '是否支持多选', control: 'boolean' },
    max: { description: '最大文件数量，0 表示不限制', control: 'number' },
    draggable: { description: '拖拽上传模式：渲染大面积拖拽区域', control: 'boolean' },
    autoUpload: {
      description: '选择文件后自动上传；false 时通过 submit() 手动触发',
      control: 'boolean',
    },
    disabled: { description: '是否禁用', control: 'boolean' },
    requestMethod: {
      description: '自定义上传方法（属性型，仅 JS 赋值；设置后优先于 action）',
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          '上传组件。支持点击/拖拽选择文件、max 数量限制（wc-exceed）、上传进度展示（内嵌 wc-progress）、失败重试与文件列表管理。',
          '',
          '上传通道二选一：`action`（内置 XHR，POST FormData，字段名取 `name`）或 `requestMethod`（自定义上传方法，属性型仅 JS 赋值，通过 onProgress/onSuccess/onError 回调驱动状态）。成功响应为对象且含 `url` 字符串字段时自动提取为文件地址，文件名变为可点击并派发 `wc-preview`。',
          '',
          '**事件**：`wc-select`（detail.files 原始 File 数组）、`wc-change`（detail.files 当前列表）、`wc-progress`（detail: { file, percent }）、`wc-success`（detail: { file, response }）、`wc-error`（detail: { file, message }）、`wc-remove`（可取消，detail: { file, index }）、`wc-exceed`（detail: { files, max }）、`wc-preview`（detail.file）。',
          '',
          '**方法**：`submit()`（手动上传全部 waiting 文件）、`clearFiles()`（清空并中断）。文件列表可通过 `el.files` 读取。',
          '',
          '```html',
          '<!-- 点击上传（自定义上传方法需 JS 赋值） -->',
          '<wc-upload id="uploader" multiple></wc-upload>',
          '',
          '<!-- 拖拽 + 数量限制 + 提示 -->',
          '<wc-upload draggable multiple max="3" action="/api/upload">',
          '  <span slot="tip">单个文件不超过 500MB</span>',
          '</wc-upload>',
          '',
          '<!-- 手动上传 -->',
          '<wc-upload auto-upload="false"></wc-upload>',
          '```',
          '',
          '**React**（@wc-kit/react，事件 props 为 onWcChange / onWcSuccess / onWcError 等）：',
          '',
          '```jsx',
          "import { WcUpload } from '@wc-kit/react';",
          'import { createRef, useEffect } from "react";',
          '',
          'const ref = createRef();',
          'useEffect(() => {',
          '  ref.current.requestMethod = (file, { onSuccess }) => onSuccess({ url: "/a.png" });',
          '}, []);',
          '',
          '<WcUpload ref={ref} multiple onWcError={(e) => console.log(e.detail.message)} />',
          '```',
          '',
          '**Vue**（@wc-kit/vue 为原生标签 + 类型增强，监听 `@wc-change` 等事件）：',
          '',
          '```vue',
          '<template>',
          '  <wc-upload ref="uploader" multiple @wc-error="onError"></wc-upload>',
          '</template>',
          '',
          '<script setup>',
          'import { onMounted, ref } from "vue";',
          'const uploader = ref();',
          'onMounted(() => {',
          '  uploader.value.requestMethod = (file, { onSuccess }) => onSuccess({ url: "/a.png" });',
          '});',
          '</script>',
          '```',
        ].join('\n'),
      },
    },
  },
  render: (args) => html`
    <wc-upload
      action=${args.action}
      name=${args.name}
      accept=${args.accept}
      ?multiple=${args.multiple}
      max=${args.max}
      ?draggable=${args.draggable}
      auto-upload=${args.autoUpload ? '' : 'false'}
      ?disabled=${args.disabled}
      .requestMethod=${args.requestMethod ?? simulateRequestMethod}
    ></wc-upload>
  `,
};

export default meta;

type Story = StoryObj<wcUpload>;

export const Basic: Story = {
  name: '基础用法',
  args: { multiple: true, autoUpload: true },
  render: () => html`<wc-upload multiple .requestMethod=${simulateRequestMethod}></wc-upload>`,
};

export const Draggable: Story = {
  name: '拖拽上传',
  render: () =>
    html`<wc-upload
      draggable
      multiple
      max="3"
      .requestMethod=${simulateRequestMethod}
      @wc-exceed=${(e: CustomEvent) => message.warning(`最多上传 ${e.detail.max} 个文件`)}
    >
      <span slot="tip">单个文件不超过 500MB，最多 3 个</span>
    </wc-upload>`,
};

export const Manual: Story = {
  name: '手动上传',
  render: () =>
    html`<div>
      <wc-upload
        id="upload-manual"
        auto-upload="false"
        .requestMethod=${simulateRequestMethod}
      ></wc-upload>
      <div style="margin-top:12px;">
        <wc-button size="small" @click=${() => byId<wcUpload>('upload-manual')?.submit()}
          >开始上传</wc-button
        >
      </div>
    </div>`,
};

export const ErrorRetry: Story = {
  name: '失败与重试',
  render: () =>
    html`<div>
      <p style="margin:0 0 12px;font-size:12px;">
        选择文件名包含 "fail" 的文件（如 fail.txt）模拟上传失败，点击失败图标可重试。
      </p>
      <wc-upload multiple .requestMethod=${simulateRequestMethod}></wc-upload>
    </div>`,
};

export const MaxCount: Story = {
  name: '限制数量',
  render: () =>
    html`<wc-upload
      multiple
      max="2"
      .requestMethod=${simulateRequestMethod}
      @wc-exceed=${(e: CustomEvent) => message.warning(`最多上传 ${e.detail.max} 个文件`)}
    ></wc-upload>`,
};

export const Disabled: Story = {
  name: '禁用',
  render: () =>
    html`<div style="display:grid;gap:16px;">
      <wc-upload disabled></wc-upload>
      <wc-upload draggable disabled></wc-upload>
    </div>`,
};
