# Image 图片

图片组件。支持加载中/失败占位、fallback 替代图、懒加载（IntersectionObserver）与全屏大图预览（滚轮/按钮缩放、旋转、拖拽平移、Esc/遮罩关闭）。

默认尺寸 240×160，通过 CSS 设置宿主尺寸，或覆写 `--wc-image-width` / `--wc-image-height`。

**事件**：`wc-load` / `wc-error`（detail.src）、`wc-preview-open`、`wc-preview-close`（可取消，detail.reason：close-btn / overlay / escape / api）。

```html
<!-- 基础用法 + 预览 -->
<wc-image src="a.png" alt="图片" fit="cover" preview></wc-image>

<!-- 失败 fallback -->
<wc-image src="bad.png" fallback="fallback.png"></wc-image>
```

**React**（@wc-kit/react，事件 props 为 onWcLoad / onWcError / onWcPreviewClose）：

```jsx
import { WcImage } from '@wc-kit/react';

<WcImage src="a.png" alt="图片" fit="cover" preview onWcError={() => console.log('加载失败')} />;
```

**Vue**（@wc-kit/vue 为原生标签 + 类型增强，监听 `@wc-load` / `@wc-error` / `@wc-preview-close`）：

```vue
<template>
  <wc-image src="a.png" alt="图片" fit="cover" preview @wc-error="onError" />
</template>
```

## 示例

### 填充模式

<div class="demo-block">
  <div style="display:flex;gap:16px;">
    <figure style="margin:0;text-align:center;">
      <wc-image
        style="--wc-image-width: 150px; --wc-image-height: 100px"
        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%235b8def%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232b4faa%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22198%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22738%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22450%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E900%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
        fit="contain"
      ></wc-image>
      <figcaption style="margin-top:8px;font-size:12px;">contain</figcaption>
    </figure>
    <figure style="margin:0;text-align:center;">
      <wc-image
        style="--wc-image-width: 150px; --wc-image-height: 100px"
        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%235b8def%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232b4faa%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22198%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22738%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22450%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E900%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
        fit="cover"
      ></wc-image>
      <figcaption style="margin-top:8px;font-size:12px;">cover</figcaption>
    </figure>
    <figure style="margin:0;text-align:center;">
      <wc-image
        style="--wc-image-width: 150px; --wc-image-height: 100px"
        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%235b8def%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232b4faa%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22198%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22738%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22450%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E900%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
        fit="fill"
      ></wc-image>
      <figcaption style="margin-top:8px;font-size:12px;">fill</figcaption>
    </figure>
    <figure style="margin:0;text-align:center;">
      <wc-image
        style="--wc-image-width: 150px; --wc-image-height: 100px"
        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%235b8def%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232b4faa%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22198%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22738%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22450%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E900%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
        fit="none"
      ></wc-image>
      <figcaption style="margin-top:8px;font-size:12px;">none</figcaption>
    </figure>
  </div>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:16px;">
  <figure style="margin:0;text-align:center;">
    <wc-image
      style="--wc-image-width: 150px; --wc-image-height: 100px"
      src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%235b8def%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232b4faa%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22198%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22738%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22450%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E900%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
      fit="contain"
    ></wc-image>
    <figcaption style="margin-top:8px;font-size:12px;">contain</figcaption>
  </figure>
  <figure style="margin:0;text-align:center;">
    <wc-image
      style="--wc-image-width: 150px; --wc-image-height: 100px"
      src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%235b8def%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232b4faa%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22198%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22738%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22450%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E900%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
      fit="cover"
    ></wc-image>
    <figcaption style="margin-top:8px;font-size:12px;">cover</figcaption>
  </figure>
  <figure style="margin:0;text-align:center;">
    <wc-image
      style="--wc-image-width: 150px; --wc-image-height: 100px"
      src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%235b8def%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232b4faa%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22198%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22738%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22450%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E900%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
      fit="fill"
    ></wc-image>
    <figcaption style="margin-top:8px;font-size:12px;">fill</figcaption>
  </figure>
  <figure style="margin:0;text-align:center;">
    <wc-image
      style="--wc-image-width: 150px; --wc-image-height: 100px"
      src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%235b8def%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232b4faa%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22198%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22738%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22450%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E900%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
      fit="none"
    ></wc-image>
    <figcaption style="margin-top:8px;font-size:12px;">none</figcaption>
  </figure>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:16px;">
    <figure style="margin:0;text-align:center;">
      <wc-image
        style="--wc-image-width: 150px; --wc-image-height: 100px"
        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%235b8def%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232b4faa%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22198%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22738%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22450%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E900%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
        fit="contain"
      ></wc-image>
      <figcaption style="margin-top:8px;font-size:12px;">contain</figcaption>
    </figure>
    <figure style="margin:0;text-align:center;">
      <wc-image
        style="--wc-image-width: 150px; --wc-image-height: 100px"
        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%235b8def%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232b4faa%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22198%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22738%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22450%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E900%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
        fit="cover"
      ></wc-image>
      <figcaption style="margin-top:8px;font-size:12px;">cover</figcaption>
    </figure>
    <figure style="margin:0;text-align:center;">
      <wc-image
        style="--wc-image-width: 150px; --wc-image-height: 100px"
        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%235b8def%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232b4faa%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22198%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22738%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22450%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E900%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
        fit="fill"
      ></wc-image>
      <figcaption style="margin-top:8px;font-size:12px;">fill</figcaption>
    </figure>
    <figure style="margin:0;text-align:center;">
      <wc-image
        style="--wc-image-width: 150px; --wc-image-height: 100px"
        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%235b8def%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232b4faa%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22198%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22738%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22450%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E900%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
        fit="none"
      ></wc-image>
      <figcaption style="margin-top:8px;font-size:12px;">none</figcaption>
    </figure>
  </div>
</template>
```

```tsx [React]
import { WcImage } from '@wc-kit/react';

<div style="display:flex;gap:16px;">
  <figure style="margin:0;text-align:center;">
    <WcImage
      style="--wc-image-width: 150px; --wc-image-height: 100px"
      src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%235b8def%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232b4faa%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22198%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22738%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22450%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E900%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
      fit="contain"
    ></WcImage>
    <figcaption style="margin-top:8px;font-size:12px;">contain</figcaption>
  </figure>
  <figure style="margin:0;text-align:center;">
    <WcImage
      style="--wc-image-width: 150px; --wc-image-height: 100px"
      src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%235b8def%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232b4faa%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22198%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22738%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22450%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E900%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
      fit="cover"
    ></WcImage>
    <figcaption style="margin-top:8px;font-size:12px;">cover</figcaption>
  </figure>
  <figure style="margin:0;text-align:center;">
    <WcImage
      style="--wc-image-width: 150px; --wc-image-height: 100px"
      src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%235b8def%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232b4faa%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22198%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22738%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22450%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E900%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
      fit="fill"
    ></WcImage>
    <figcaption style="margin-top:8px;font-size:12px;">fill</figcaption>
  </figure>
  <figure style="margin:0;text-align:center;">
    <WcImage
      style="--wc-image-width: 150px; --wc-image-height: 100px"
      src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%235b8def%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232b4faa%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22198%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22738%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22450%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E900%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
      fit="none"
    ></WcImage>
    <figcaption style="margin-top:8px;font-size:12px;">none</figcaption>
  </figure>
</div>;
```

:::
::::

### 圆角形状

<div class="demo-block">
  <div style="display:flex;gap:16px;align-items:center;">
    <figure style="margin:0;text-align:center;">
      <wc-image
        style="--wc-image-width: 100px; --wc-image-height: 100px"
        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6a04d%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23d2612c%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E300%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
        fit="cover"
        shape="square"
      ></wc-image>
      <figcaption style="margin-top:8px;font-size:12px;">square</figcaption>
    </figure>
    <figure style="margin:0;text-align:center;">
      <wc-image
        style="--wc-image-width: 100px; --wc-image-height: 100px"
        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6a04d%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23d2612c%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E300%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
        fit="cover"
        shape="rounded"
      ></wc-image>
      <figcaption style="margin-top:8px;font-size:12px;">rounded</figcaption>
    </figure>
    <figure style="margin:0;text-align:center;">
      <wc-image
        style="--wc-image-width: 100px; --wc-image-height: 100px"
        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6a04d%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23d2612c%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E300%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
        fit="cover"
        shape="circle"
      ></wc-image>
      <figcaption style="margin-top:8px;font-size:12px;">circle</figcaption>
    </figure>
  </div>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:16px;align-items:center;">
  <figure style="margin:0;text-align:center;">
    <wc-image
      style="--wc-image-width: 100px; --wc-image-height: 100px"
      src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6a04d%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23d2612c%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E300%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
      fit="cover"
      shape="square"
    ></wc-image>
    <figcaption style="margin-top:8px;font-size:12px;">square</figcaption>
  </figure>
  <figure style="margin:0;text-align:center;">
    <wc-image
      style="--wc-image-width: 100px; --wc-image-height: 100px"
      src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6a04d%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23d2612c%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E300%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
      fit="cover"
      shape="rounded"
    ></wc-image>
    <figcaption style="margin-top:8px;font-size:12px;">rounded</figcaption>
  </figure>
  <figure style="margin:0;text-align:center;">
    <wc-image
      style="--wc-image-width: 100px; --wc-image-height: 100px"
      src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6a04d%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23d2612c%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E300%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
      fit="cover"
      shape="circle"
    ></wc-image>
    <figcaption style="margin-top:8px;font-size:12px;">circle</figcaption>
  </figure>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:16px;align-items:center;">
    <figure style="margin:0;text-align:center;">
      <wc-image
        style="--wc-image-width: 100px; --wc-image-height: 100px"
        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6a04d%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23d2612c%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E300%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
        fit="cover"
        shape="square"
      ></wc-image>
      <figcaption style="margin-top:8px;font-size:12px;">square</figcaption>
    </figure>
    <figure style="margin:0;text-align:center;">
      <wc-image
        style="--wc-image-width: 100px; --wc-image-height: 100px"
        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6a04d%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23d2612c%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E300%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
        fit="cover"
        shape="rounded"
      ></wc-image>
      <figcaption style="margin-top:8px;font-size:12px;">rounded</figcaption>
    </figure>
    <figure style="margin:0;text-align:center;">
      <wc-image
        style="--wc-image-width: 100px; --wc-image-height: 100px"
        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6a04d%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23d2612c%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E300%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
        fit="cover"
        shape="circle"
      ></wc-image>
      <figcaption style="margin-top:8px;font-size:12px;">circle</figcaption>
    </figure>
  </div>
</template>
```

```tsx [React]
import { WcImage } from '@wc-kit/react';

<div style="display:flex;gap:16px;align-items:center;">
  <figure style="margin:0;text-align:center;">
    <WcImage
      style="--wc-image-width: 100px; --wc-image-height: 100px"
      src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6a04d%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23d2612c%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E300%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
      fit="cover"
      shape="square"
    ></WcImage>
    <figcaption style="margin-top:8px;font-size:12px;">square</figcaption>
  </figure>
  <figure style="margin:0;text-align:center;">
    <WcImage
      style="--wc-image-width: 100px; --wc-image-height: 100px"
      src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6a04d%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23d2612c%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E300%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
      fit="cover"
      shape="rounded"
    ></WcImage>
    <figcaption style="margin-top:8px;font-size:12px;">rounded</figcaption>
  </figure>
  <figure style="margin:0;text-align:center;">
    <WcImage
      style="--wc-image-width: 100px; --wc-image-height: 100px"
      src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f6a04d%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23d2612c%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2290%22%20r%3D%22135%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22234%22%20r%3D%22180%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22164%22%20font-family%3D%22sans-serif%22%20font-size%3D%2237%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3E300%20%C3%97%20300%3C%2Ftext%3E%3C%2Fsvg%3E"
      fit="cover"
      shape="circle"
    ></WcImage>
    <figcaption style="margin-top:8px;font-size:12px;">circle</figcaption>
  </figure>
</div>;
```

:::
::::

### 加载失败与 fallback

<div class="demo-block">

<div style="display:flex;gap:16px;">
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
          fallback="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22260%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%234cb782%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231f7a53%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22400%22%20height%3D%22260%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2288%22%20cy%3D%2278%22%20r%3D%22117%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22328%22%20cy%3D%22203%22%20r%3D%22156%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22200%22%20y%3D%22144%22%20font-family%3D%22sans-serif%22%20font-size%3D%2232%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EFallback%3C%2Ftext%3E%3C%2Fsvg%3E"
        ></wc-image>
        <figcaption style="margin-top:8px;font-size:12px;">fallback 替代图</figcaption>
      </figure>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:16px;">
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
      fallback="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22260%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%234cb782%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231f7a53%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22400%22%20height%3D%22260%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2288%22%20cy%3D%2278%22%20r%3D%22117%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22328%22%20cy%3D%22203%22%20r%3D%22156%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22200%22%20y%3D%22144%22%20font-family%3D%22sans-serif%22%20font-size%3D%2232%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EFallback%3C%2Ftext%3E%3C%2Fsvg%3E"
    ></wc-image>
    <figcaption style="margin-top:8px;font-size:12px;">fallback 替代图</figcaption>
  </figure>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:16px;">
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
        fallback="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22260%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%234cb782%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231f7a53%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22400%22%20height%3D%22260%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2288%22%20cy%3D%2278%22%20r%3D%22117%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22328%22%20cy%3D%22203%22%20r%3D%22156%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22200%22%20y%3D%22144%22%20font-family%3D%22sans-serif%22%20font-size%3D%2232%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EFallback%3C%2Ftext%3E%3C%2Fsvg%3E"
      ></wc-image>
      <figcaption style="margin-top:8px;font-size:12px;">fallback 替代图</figcaption>
    </figure>
  </div>
</template>
```

```tsx [React]
import { WcImage } from '@wc-kit/react';

<div style="display:flex;gap:16px;">
  <figure style="margin:0;text-align:center;">
    <WcImage
      style="--wc-image-width: 200px; --wc-image-height: 130px"
      src="https://invalid.example.com/broken.png"
    ></WcImage>
    <figcaption style="margin-top:8px;font-size:12px;">默认失败占位</figcaption>
  </figure>
  <figure style="margin:0;text-align:center;">
    <WcImage
      style="--wc-image-width: 200px; --wc-image-height: 130px"
      src="https://invalid.example.com/broken.png"
      fallback="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22260%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%234cb782%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231f7a53%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22400%22%20height%3D%22260%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2288%22%20cy%3D%2278%22%20r%3D%22117%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22328%22%20cy%3D%22203%22%20r%3D%22156%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22200%22%20y%3D%22144%22%20font-family%3D%22sans-serif%22%20font-size%3D%2232%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EFallback%3C%2Ftext%3E%3C%2Fsvg%3E"
    ></WcImage>
    <figcaption style="margin-top:8px;font-size:12px;">fallback 替代图</figcaption>
  </figure>
</div>;
```

:::
::::

### 懒加载

<div class="demo-block">

<div>
      <p style="margin:0 0 12px;font-size:12px;">滚动下方容器，图片进入视口后才发起请求。</p>
      <div style="height:150px;overflow:auto;border:1px solid var(--wc-color-border);">
        <div style="height:300px;display:flex;align-items:flex-end;justify-content:center;">
          <wc-image
            style="--wc-image-width: 280px; --wc-image-height: 160px"
            src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22600%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%238f7bf2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%234f37a8%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22600%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22198%22%20cy%3D%22180%22%20r%3D%22270%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22738%22%20cy%3D%22468%22%20r%3D%22360%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22450%22%20y%3D%22314%22%20font-family%3D%22sans-serif%22%20font-size%3D%2275%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3ELazy%20900%20%C3%97%20600%3C%2Ftext%3E%3C%2Fsvg%3E"
            fit="cover"
            lazy
          ></wc-image>
        </div>
      </div>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div>
  <p style="margin:0 0 12px;font-size:12px;">滚动下方容器，图片进入视口后才发起请求。</p>
  <div style="height:150px;overflow:auto;border:1px solid var(--wc-color-border);">
    <div style="height:300px;display:flex;align-items:flex-end;justify-content:center;">
      <wc-image
        style="--wc-image-width: 280px; --wc-image-height: 160px"
        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22600%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%238f7bf2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%234f37a8%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22600%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22198%22%20cy%3D%22180%22%20r%3D%22270%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22738%22%20cy%3D%22468%22%20r%3D%22360%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22450%22%20y%3D%22314%22%20font-family%3D%22sans-serif%22%20font-size%3D%2275%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3ELazy%20900%20%C3%97%20600%3C%2Ftext%3E%3C%2Fsvg%3E"
        fit="cover"
        lazy
      ></wc-image>
    </div>
  </div>
</div>
```

```vue [Vue]
<template>
  <div>
    <p style="margin:0 0 12px;font-size:12px;">滚动下方容器，图片进入视口后才发起请求。</p>
    <div style="height:150px;overflow:auto;border:1px solid var(--wc-color-border);">
      <div style="height:300px;display:flex;align-items:flex-end;justify-content:center;">
        <wc-image
          style="--wc-image-width: 280px; --wc-image-height: 160px"
          src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22600%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%238f7bf2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%234f37a8%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22600%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22198%22%20cy%3D%22180%22%20r%3D%22270%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22738%22%20cy%3D%22468%22%20r%3D%22360%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22450%22%20y%3D%22314%22%20font-family%3D%22sans-serif%22%20font-size%3D%2275%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3ELazy%20900%20%C3%97%20600%3C%2Ftext%3E%3C%2Fsvg%3E"
          fit="cover"
          lazy
        ></wc-image>
      </div>
    </div>
  </div>
</template>
```

```tsx [React]
import { WcImage } from '@wc-kit/react';

<div>
  <p style="margin:0 0 12px;font-size:12px;">滚动下方容器，图片进入视口后才发起请求。</p>
  <div style="height:150px;overflow:auto;border:1px solid var(--wc-color-border);">
    <div style="height:300px;display:flex;align-items:flex-end;justify-content:center;">
      <WcImage
        style="--wc-image-width: 280px; --wc-image-height: 160px"
        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22600%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%238f7bf2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%234f37a8%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22600%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22198%22%20cy%3D%22180%22%20r%3D%22270%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22738%22%20cy%3D%22468%22%20r%3D%22360%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22450%22%20y%3D%22314%22%20font-family%3D%22sans-serif%22%20font-size%3D%2275%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3ELazy%20900%20%C3%97%20600%3C%2Ftext%3E%3C%2Fsvg%3E"
        fit="cover"
        lazy
      ></WcImage>
    </div>
  </div>
</div>;
```

:::
::::

### 大图预览

<div class="demo-block">

<div>
      <p style="margin:0 0 12px;font-size:12px;">
        点击图片打开全屏预览：工具栏缩放/旋转/重置，支持滚轮缩放、拖拽平移、Esc 或点击遮罩关闭。
      </p>
      <div style="display:flex;gap:16px;">
        <wc-image
          style="--wc-image-width: 220px; --wc-image-height: 140px"
          src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22200%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%234fb3c9%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231e6b7d%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22200%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2260%22%20r%3D%2290%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22156%22%20r%3D%22120%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22114%22%20font-family%3D%22sans-serif%22%20font-size%3D%2225%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EPreview%201%3C%2Ftext%3E%3C%2Fsvg%3E"
          preview-src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221600%22%20height%3D%221000%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%234fb3c9%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231e6b7d%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%221600%22%20height%3D%221000%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22352%22%20cy%3D%22300%22%20r%3D%22450%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%221312%22%20cy%3D%22780%22%20r%3D%22600%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22800%22%20y%3D%22514%22%20font-family%3D%22sans-serif%22%20font-size%3D%22125%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EPreview%201%20%281600%20%C3%97%201000%29%3C%2Ftext%3E%3C%2Fsvg%3E"
          fit="cover"
          preview
        ></wc-image>
        <wc-image
          style="--wc-image-width: 220px; --wc-image-height: 140px"
          src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22200%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23e77fb3%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2393315f%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22200%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2260%22%20r%3D%2290%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22156%22%20r%3D%22120%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22114%22%20font-family%3D%22sans-serif%22%20font-size%3D%2225%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EPreview%202%3C%2Ftext%3E%3C%2Fsvg%3E"
          preview-src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221600%22%20height%3D%221000%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23e77fb3%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2393315f%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%221600%22%20height%3D%221000%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22352%22%20cy%3D%22300%22%20r%3D%22450%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%221312%22%20cy%3D%22780%22%20r%3D%22600%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22800%22%20y%3D%22514%22%20font-family%3D%22sans-serif%22%20font-size%3D%22125%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EPreview%202%20%281600%20%C3%97%201000%29%3C%2Ftext%3E%3C%2Fsvg%3E"
          fit="cover"
          preview
        ></wc-image>
      </div>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div>
  <p style="margin:0 0 12px;font-size:12px;">
    点击图片打开全屏预览：工具栏缩放/旋转/重置，支持滚轮缩放、拖拽平移、Esc 或点击遮罩关闭。
  </p>
  <div style="display:flex;gap:16px;">
    <wc-image
      style="--wc-image-width: 220px; --wc-image-height: 140px"
      src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22200%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%234fb3c9%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231e6b7d%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22200%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2260%22%20r%3D%2290%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22156%22%20r%3D%22120%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22114%22%20font-family%3D%22sans-serif%22%20font-size%3D%2225%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EPreview%201%3C%2Ftext%3E%3C%2Fsvg%3E"
      preview-src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221600%22%20height%3D%221000%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%234fb3c9%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231e6b7d%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%221600%22%20height%3D%221000%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22352%22%20cy%3D%22300%22%20r%3D%22450%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%221312%22%20cy%3D%22780%22%20r%3D%22600%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22800%22%20y%3D%22514%22%20font-family%3D%22sans-serif%22%20font-size%3D%22125%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EPreview%201%20%281600%20%C3%97%201000%29%3C%2Ftext%3E%3C%2Fsvg%3E"
      fit="cover"
      preview
    ></wc-image>
    <wc-image
      style="--wc-image-width: 220px; --wc-image-height: 140px"
      src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22200%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23e77fb3%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2393315f%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22200%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2260%22%20r%3D%2290%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22156%22%20r%3D%22120%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22114%22%20font-family%3D%22sans-serif%22%20font-size%3D%2225%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EPreview%202%3C%2Ftext%3E%3C%2Fsvg%3E"
      preview-src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221600%22%20height%3D%221000%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23e77fb3%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2393315f%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%221600%22%20height%3D%221000%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22352%22%20cy%3D%22300%22%20r%3D%22450%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%221312%22%20cy%3D%22780%22%20r%3D%22600%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22800%22%20y%3D%22514%22%20font-family%3D%22sans-serif%22%20font-size%3D%22125%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EPreview%202%20%281600%20%C3%97%201000%29%3C%2Ftext%3E%3C%2Fsvg%3E"
      fit="cover"
      preview
    ></wc-image>
  </div>
</div>
```

```vue [Vue]
<template>
  <div>
    <p style="margin:0 0 12px;font-size:12px;">
      点击图片打开全屏预览：工具栏缩放/旋转/重置，支持滚轮缩放、拖拽平移、Esc 或点击遮罩关闭。
    </p>
    <div style="display:flex;gap:16px;">
      <wc-image
        style="--wc-image-width: 220px; --wc-image-height: 140px"
        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22200%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%234fb3c9%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231e6b7d%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22200%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2260%22%20r%3D%2290%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22156%22%20r%3D%22120%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22114%22%20font-family%3D%22sans-serif%22%20font-size%3D%2225%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EPreview%201%3C%2Ftext%3E%3C%2Fsvg%3E"
        preview-src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221600%22%20height%3D%221000%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%234fb3c9%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231e6b7d%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%221600%22%20height%3D%221000%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22352%22%20cy%3D%22300%22%20r%3D%22450%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%221312%22%20cy%3D%22780%22%20r%3D%22600%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22800%22%20y%3D%22514%22%20font-family%3D%22sans-serif%22%20font-size%3D%22125%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EPreview%201%20%281600%20%C3%97%201000%29%3C%2Ftext%3E%3C%2Fsvg%3E"
        fit="cover"
        preview
      ></wc-image>
      <wc-image
        style="--wc-image-width: 220px; --wc-image-height: 140px"
        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22200%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23e77fb3%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2393315f%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22200%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2260%22%20r%3D%2290%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22156%22%20r%3D%22120%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22114%22%20font-family%3D%22sans-serif%22%20font-size%3D%2225%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EPreview%202%3C%2Ftext%3E%3C%2Fsvg%3E"
        preview-src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221600%22%20height%3D%221000%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23e77fb3%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2393315f%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%221600%22%20height%3D%221000%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22352%22%20cy%3D%22300%22%20r%3D%22450%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%221312%22%20cy%3D%22780%22%20r%3D%22600%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22800%22%20y%3D%22514%22%20font-family%3D%22sans-serif%22%20font-size%3D%22125%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EPreview%202%20%281600%20%C3%97%201000%29%3C%2Ftext%3E%3C%2Fsvg%3E"
        fit="cover"
        preview
      ></wc-image>
    </div>
  </div>
</template>
```

```tsx [React]
import { WcImage } from '@wc-kit/react';

<div>
  <p style="margin:0 0 12px;font-size:12px;">
    点击图片打开全屏预览：工具栏缩放/旋转/重置，支持滚轮缩放、拖拽平移、Esc 或点击遮罩关闭。
  </p>
  <div style="display:flex;gap:16px;">
    <WcImage
      style="--wc-image-width: 220px; --wc-image-height: 140px"
      src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22200%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%234fb3c9%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231e6b7d%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22200%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2260%22%20r%3D%2290%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22156%22%20r%3D%22120%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22114%22%20font-family%3D%22sans-serif%22%20font-size%3D%2225%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EPreview%201%3C%2Ftext%3E%3C%2Fsvg%3E"
      previewSrc="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221600%22%20height%3D%221000%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%234fb3c9%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231e6b7d%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%221600%22%20height%3D%221000%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22352%22%20cy%3D%22300%22%20r%3D%22450%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%221312%22%20cy%3D%22780%22%20r%3D%22600%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22800%22%20y%3D%22514%22%20font-family%3D%22sans-serif%22%20font-size%3D%22125%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EPreview%201%20%281600%20%C3%97%201000%29%3C%2Ftext%3E%3C%2Fsvg%3E"
      fit="cover"
      preview
    ></WcImage>
    <WcImage
      style="--wc-image-width: 220px; --wc-image-height: 140px"
      src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22200%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23e77fb3%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2393315f%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22200%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2260%22%20r%3D%2290%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22156%22%20r%3D%22120%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22114%22%20font-family%3D%22sans-serif%22%20font-size%3D%2225%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EPreview%202%3C%2Ftext%3E%3C%2Fsvg%3E"
      previewSrc="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221600%22%20height%3D%221000%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23e77fb3%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2393315f%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%221600%22%20height%3D%221000%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ccircle%20cx%3D%22352%22%20cy%3D%22300%22%20r%3D%22450%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%221312%22%20cy%3D%22780%22%20r%3D%22600%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.12%22%2F%3E%3Ctext%20x%3D%22800%22%20y%3D%22514%22%20font-family%3D%22sans-serif%22%20font-size%3D%22125%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EPreview%202%20%281600%20%C3%97%201000%29%3C%2Ftext%3E%3C%2Fsvg%3E"
      fit="cover"
      preview
    ></WcImage>
  </div>
</div>;
```

:::
::::

## API

### 属性

| 属性         | attribute     | 类型                                                       | 默认值     | 说明                             |
| ------------ | ------------- | ---------------------------------------------------------- | ---------- | -------------------------------- |
| `src`        | `src`         | `string`                                                   | `''`       | 图片地址                         |
| `alt`        | `alt`         | `string`                                                   | `''`       | 原生 alt 描述                    |
| `fit`        | `fit`         | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | `'fill'`   | 填充模式（同 object-fit）        |
| `position`   | `position`    | `string`                                                   | `'center'` | 图片位置（同 object-position）   |
| `shape`      | `shape`       | `'square' \| 'rounded' \| 'circle'`                        | `'square'` | 圆角形状                         |
| `lazy`       | `lazy`        | `boolean`                                                  | `false`    | 懒加载：滚动进入视口后再发起请求 |
| `preview`    | `preview`     | `boolean`                                                  | `false`    | 点击图片打开全屏预览             |
| `previewSrc` | `preview-src` | `string`                                                   | `''`       | 预览大图地址（默认取 src）       |
| `fallback`   | `fallback`    | `string`                                                   | `''`       | 加载失败时的替代图片地址         |

### 事件

| 事件               | 说明                                                 |
| ------------------ | ---------------------------------------------------- |
| `wc-load`          | 图片加载成功时触发                                   |
| `wc-error`         | 图片加载失败时触发                                   |
| `wc-preview-open`  | 打开预览后触发                                       |
| `wc-preview-close` | 请求关闭预览时触发（可取消，detail.reason 标识来源） |

### 方法

| 方法                                                                                       | 说明                                          |
| ------------------------------------------------------------------------------------------ | --------------------------------------------- |
| `openPreview(): void`                                                                      | 打开全屏预览（需开启 preview 且加载成功）     |
| `requestClosePreview(reason: 'overlay' \| 'escape' \| 'close-btn' \| 'api' = 'api'): void` | 请求关闭预览（发出可取消的 wc-preview-close） |

### 插槽

| 名称     | 说明       |
| -------- | ---------- |
| （默认） | 无（预留） |

### CSS 变量

| 变量                 | 说明                   |
| -------------------- | ---------------------- |
| `--wc-image-width`   | 图片宽度（默认 240px） |
| `--wc-image-height`  | 图片高度（默认 160px） |
| `--wc-image-bg`      | 加载中/失败占位背景    |
| `--wc-image-mask-bg` | 预览遮罩背景色         |

### CSS Parts

`base` / `image` / `overlay` / `preview-image` / `toolbar`
