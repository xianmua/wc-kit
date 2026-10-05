import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcImage } from '@wc-kit/core';

const meta: Meta<wcImage> = {
  title: '数据展示/Image 图片',
  component: 'wc-image',
  tags: ['autodocs'],
  argTypes: {
    src: { description: '图片地址', control: 'text' },
    alt: { description: '原生 alt 描述', control: 'text' },
    fit: {
      description: '填充模式（同 object-fit）',
      control: 'select',
      options: ['contain', 'cover', 'fill', 'none', 'scale-down'],
    },
    position: { description: '图片位置（同 object-position）', control: 'text' },
    shape: {
      description: '圆角形状',
      control: 'select',
      options: ['square', 'rounded', 'circle'],
    },
    lazy: { description: '懒加载：滚动进入视口后再发起请求', control: 'boolean' },
    preview: { description: '点击图片打开全屏预览', control: 'boolean' },
    previewSrc: { description: '预览大图地址（默认取 src）', control: 'text' },
    fallback: { description: '加载失败时的替代图片地址', control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          '图片组件。支持加载中/失败占位、fallback 替代图、懒加载（IntersectionObserver）与全屏大图预览（滚轮/按钮缩放、旋转、拖拽平移、Esc/遮罩关闭）。',
          '',
          '默认尺寸 240×160，通过 CSS 设置宿主尺寸，或覆写 `--wc-image-width` / `--wc-image-height`。',
          '',
          '**事件**：`wc-load` / `wc-error`（detail.src）、`wc-preview-open`、`wc-preview-close`（可取消，detail.reason：close-btn / overlay / escape / api）。',
          '',
          '```html',
          '<!-- 基础用法 + 预览 -->',
          '<wc-image src="a.png" alt="图片" fit="cover" preview></wc-image>',
          '',
          '<!-- 失败 fallback -->',
          '<wc-image src="bad.png" fallback="fallback.png"></wc-image>',
          '```',
          '',
          '**React**（@wc-kit/react，事件 props 为 onWcLoad / onWcError / onWcPreviewClose）：',
          '',
          '```jsx',
          "import { WcImage } from '@wc-kit/react';",
          '',
          '<WcImage',
          '  src="a.png"',
          '  alt="图片"',
          '  fit="cover"',
          '  preview',
          '  onWcError={() => console.log("加载失败")}',
          '/>',
          '```',
          '',
          '**Vue**（@wc-kit/vue 为原生标签 + 类型增强，监听 `@wc-load` / `@wc-error` / `@wc-preview-close`）：',
          '',
          '```vue',
          '<template>',
          '  <wc-image',
          '    src="a.png"',
          '    alt="图片"',
          '    fit="cover"',
          '    preview',
          '    @wc-error="onError"',
          '  />',
          '</template>',
          '```',
        ].join('\n'),
      },
    },
  },
  render: (args) => html`
    <wc-image
      style="--wc-image-width: 280px; --wc-image-height: 180px"
      src=${args.src}
      alt=${args.alt}
      fit=${args.fit}
      position=${args.position}
      shape=${args.shape}
      ?lazy=${args.lazy}
      ?preview=${args.preview}
      preview-src=${args.previewSrc}
      fallback=${args.fallback}
    ></wc-image>
  `,
};

export default meta;

type Story = StoryObj<wcImage>;

export const Basic: Story = {
  name: '基础用法',
  args: {
    src: 'https://picsum.photos/id/1015/900/600',
    alt: '示例图片',
    fit: 'cover',
    preview: true,
  },
};

export const Fits: Story = {
  name: '填充模式',
  render: () =>
    html`<div style="display:flex;gap:16px;">
      ${['contain', 'cover', 'fill', 'none'].map(
        (fit) => html`<figure style="margin:0;text-align:center;">
          <wc-image
            style="--wc-image-width: 150px; --wc-image-height: 100px"
            src="https://picsum.photos/id/1025/900/300"
            fit=${fit as wcImage['fit']}
          ></wc-image>
          <figcaption style="margin-top:8px;font-size:12px;">${fit}</figcaption>
        </figure>`,
      )}
    </div>`,
};

export const Shapes: Story = {
  name: '圆角形状',
  render: () =>
    html`<div style="display:flex;gap:16px;align-items:center;">
      ${(['square', 'rounded', 'circle'] as const).map(
        (shape) => html`<figure style="margin:0;text-align:center;">
          <wc-image
            style="--wc-image-width: 100px; --wc-image-height: 100px"
            src="https://picsum.photos/id/237/300/300"
            fit="cover"
            shape=${shape}
          ></wc-image>
          <figcaption style="margin-top:8px;font-size:12px;">${shape}</figcaption>
        </figure>`,
      )}
    </div>`,
};

export const ErrorState: Story = {
  name: '加载失败与 fallback',
  render: () =>
    html`<div style="display:flex;gap:16px;">
      <figure style="margin:0;text-align:center;">
        <wc-image
          style="--wc-image-width: 200px; --wc-image-height: 130px"
          src="https://invalid.example.com/broken.png"
        ></wc-image>
        <figcaption style="margin-top:8px;font-size:12px;">默认失败占位</figcaption>
      </figure>
      <figure style="margin:0;text-align:center;">
        <wc-image
          style="--wc-image-width: 200px; --wc-image-height: 130px"
          src="https://invalid.example.com/broken.png"
          fallback="https://picsum.photos/id/1069/400/260"
        ></wc-image>
        <figcaption style="margin-top:8px;font-size:12px;">fallback 替代图</figcaption>
      </figure>
    </div>`,
};

export const Lazy: Story = {
  name: '懒加载',
  render: () =>
    html`<div>
      <p style="margin:0 0 12px;font-size:12px;">滚动下方容器，图片进入视口后才发起请求。</p>
      <div style="height:150px;overflow:auto;border:1px solid var(--wc-color-border);">
        <div style="height:300px;display:flex;align-items:flex-end;justify-content:center;">
          <wc-image
            style="--wc-image-width: 280px; --wc-image-height: 160px"
            src="https://picsum.photos/id/1043/900/600"
            fit="cover"
            lazy
          ></wc-image>
        </div>
      </div>
    </div>`,
};

export const Preview: Story = {
  name: '大图预览',
  render: () =>
    html`<div>
      <p style="margin:0 0 12px;font-size:12px;">
        点击图片打开全屏预览：工具栏缩放/旋转/重置，支持滚轮缩放、拖拽平移、Esc 或点击遮罩关闭。
      </p>
      <div style="display:flex;gap:16px;">
        <wc-image
          style="--wc-image-width: 220px; --wc-image-height: 140px"
          src="https://picsum.photos/id/1015/300/200"
          preview-src="https://picsum.photos/id/1015/1600/1000"
          fit="cover"
          preview
        ></wc-image>
        <wc-image
          style="--wc-image-width: 220px; --wc-image-height: 140px"
          src="https://picsum.photos/id/1016/300/200"
          preview-src="https://picsum.photos/id/1016/1600/1000"
          fit="cover"
          preview
        ></wc-image>
      </div>
    </div>`,
};
