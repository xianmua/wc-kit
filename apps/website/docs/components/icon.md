# Icon 图标

图标组件。图标来源优先级：src（SVG 地址直连）> name + library（图标库解析）。

内置 291 个图标 = **Feather Icons 全集**（287 个）+ error / image-off / warning 补充（Feather 缺失）；其中与 Feather 重名的 19 个（如 arrow-up 带回顶横线）为按组件需求定制过的版本，以定制为准。

**零配置**：全部 291 个内置图标随 `@wc-kit/core` 导入自动注册，开箱即用；用户同名注册优先，不会被覆盖。自定义图标用 `registerIcon(name, svg)` 注册单个图标、`registerIconLibrary(name, lib)` 注册自定义/远程图标库。`registerBuiltinIcons()` 保留作兼容（重复注册无副作用），新代码无需调用。

主要 API：`name` 图标名、`src` SVG 地址、`library` 图标库（默认 default）、`label` 无障碍描述、`spin` 旋转动画、`pulse` 缓动旋转动画。尺寸默认跟随字号（1em），可用 CSS 变量 `--wc-icon-size` 覆盖。

React 用法（`@wc-kit/react` 包装组件）：

```tsx
import { WcIcon } from '@wc-kit/react';

// 全部内置图标已自动注册，直接用

<WcIcon name="search" />
<WcIcon name="loader" spin />
<WcIcon name="check" style={{ fontSize: 24 }} />
```

Vue 用法（`@wc-kit/vue` 为纯类型增强包，直接使用原生标签）：

```vue
<template>
  <wc-icon name="search"></wc-icon>
  <wc-icon name="loader" spin></wc-icon>
</template>
```

## 示例

### 全部内置图标

<div class="demo-block">
  <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;">
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="arrow-left" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">arrow-left</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="arrow-right" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">arrow-right</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="arrow-up" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">arrow-up</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="calendar" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">calendar</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="check" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">check</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="chevron-down" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">chevron-down</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="chevron-left" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">chevron-left</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="chevron-right" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">chevron-right</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="chevron-up" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">chevron-up</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="close" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">close</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="error" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">error</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="file" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">file</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="image-off" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">image-off</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="info" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">info</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="loader" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">loader</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="minus" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">minus</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="plus" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">plus</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="rotate-cw" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">rotate-cw</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="search" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">search</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="upload" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">upload</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="warning" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">warning</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="zoom-in" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">zoom-in</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="zoom-out" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">zoom-out</span>
    </div>
  </div>
</div>

全部 291 个图标均已自动注册，直接按名称使用。

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;">
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="arrow-left" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">arrow-left</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="arrow-right" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">arrow-right</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="calendar" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">calendar</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="check" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">check</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="chevron-down" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">chevron-down</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="chevron-left" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">chevron-left</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="chevron-right" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">chevron-right</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="chevron-up" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">chevron-up</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="close" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">close</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="error" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">error</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="file" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">file</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="image-off" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">image-off</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="info" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">info</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="loader" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">loader</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="minus" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">minus</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="plus" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">plus</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="rotate-cw" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">rotate-cw</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="search" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">search</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="upload" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">upload</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="warning" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">warning</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="zoom-in" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">zoom-in</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <wc-icon name="zoom-out" style="font-size:22px;"></wc-icon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">zoom-out</span>
  </div>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;">
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="arrow-left" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">arrow-left</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="arrow-right" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">arrow-right</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="arrow-up" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">arrow-up</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="calendar" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">calendar</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="check" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">check</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="chevron-down" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">chevron-down</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="chevron-left" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">chevron-left</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="chevron-right" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">chevron-right</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="chevron-up" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">chevron-up</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="close" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">close</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="error" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">error</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="file" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">file</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="image-off" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">image-off</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="info" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">info</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="loader" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">loader</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="minus" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">minus</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="plus" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">plus</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="rotate-cw" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">rotate-cw</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="search" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">search</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="upload" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">upload</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="warning" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">warning</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="zoom-in" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">zoom-in</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
      <wc-icon name="zoom-out" style="font-size:22px;"></wc-icon>
      <span style="font-size:12px;color:var(--wc-color-gray-500);">zoom-out</span>
    </div>
  </div>
</template>
```

```tsx [React]
import { WcIcon } from '@wc-kit/react';

<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;">
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="arrow-left" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">arrow-left</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="arrow-right" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">arrow-right</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="calendar" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">calendar</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="check" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">check</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="chevron-down" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">chevron-down</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="chevron-left" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">chevron-left</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="chevron-right" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">chevron-right</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="chevron-up" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">chevron-up</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="close" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">close</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="error" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">error</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="file" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">file</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="image-off" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">image-off</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="info" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">info</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="loader" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">loader</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="minus" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">minus</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="plus" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">plus</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="rotate-cw" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">rotate-cw</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="search" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">search</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="upload" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">upload</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="warning" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">warning</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="zoom-in" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">zoom-in</span>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
    <WcIcon name="zoom-out" style="font-size:22px;"></WcIcon>
    <span style="font-size:12px;color:var(--wc-color-gray-500);">zoom-out</span>
  </div>
</div>;
```

:::
::::

### 尺寸

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-icon name="check" style="font-size:14px;"></wc-icon>
      <wc-icon name="check" style="font-size:20px;"></wc-icon>
      <wc-icon name="check" style="font-size:32px;"></wc-icon>
      <wc-icon name="check" style="font-size:48px;"></wc-icon>
      <!-- 也可用 CSS 变量 --wc-icon-size 覆盖尺寸 -->
      <wc-icon name="check" style="--wc-icon-size:40px;color:var(--wc-color-primary);"></wc-icon>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;">
  <wc-icon name="check" style="font-size:14px;"></wc-icon>
  <wc-icon name="check" style="font-size:20px;"></wc-icon>
  <wc-icon name="check" style="font-size:32px;"></wc-icon>
  <wc-icon name="check" style="font-size:48px;"></wc-icon>
  <!-- 也可用 CSS 变量 --wc-icon-size 覆盖尺寸 -->
  <wc-icon name="check" style="--wc-icon-size:40px;color:var(--wc-color-primary);"></wc-icon>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-icon name="check" style="font-size:14px;"></wc-icon>
    <wc-icon name="check" style="font-size:20px;"></wc-icon>
    <wc-icon name="check" style="font-size:32px;"></wc-icon>
    <wc-icon name="check" style="font-size:48px;"></wc-icon>
    <!-- 也可用 CSS 变量 --wc-icon-size 覆盖尺寸 -->
    <wc-icon name="check" style="--wc-icon-size:40px;color:var(--wc-color-primary);"></wc-icon>
  </div>
</template>
```

```tsx [React]
import { WcIcon } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;">
      <WcIcon name="check" style="font-size:14px;"></WcIcon>
      <WcIcon name="check" style="font-size:20px;"></WcIcon>
      <WcIcon name="check" style="font-size:32px;"></WcIcon>
      <WcIcon name="check" style="font-size:48px;"></WcIcon>
      <!-- 也可用 CSS 变量 --wc-icon-size 覆盖尺寸 -->
      <WcIcon name="check" style="--wc-icon-size:40px;color:var(--wc-color-primary);"></WcIcon>
    </div>
```

:::
::::

### 动画

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;font-size:24px;">
      <wc-icon name="loader" spin></wc-icon>
      <wc-icon name="warning" pulse></wc-icon>
      <wc-icon name="search" spin></wc-icon>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;font-size:24px;">
  <wc-icon name="loader" spin></wc-icon>
  <wc-icon name="warning" pulse></wc-icon>
  <wc-icon name="search" spin></wc-icon>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;font-size:24px;">
    <wc-icon name="loader" spin></wc-icon>
    <wc-icon name="warning" pulse></wc-icon>
    <wc-icon name="search" spin></wc-icon>
  </div>
</template>
```

```tsx [React]
import { WcIcon } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;font-size:24px;">
  <WcIcon name="loader" spin></WcIcon>
  <WcIcon name="warning" pulse></WcIcon>
  <WcIcon name="search" spin></WcIcon>
</div>;
```

:::
::::

## API

### 属性

| 属性      | attribute | 类型      | 默认值      | 说明                                                         |
| --------- | --------- | --------- | ----------- | ------------------------------------------------------------ |
| `name`    | `name`    | `string`  | `''`        | 图标名（在 library 对应的图标库中查找）                      |
| `src`     | `src`     | `string`  | `''`        | 直接指定 SVG 地址，优先级高于 name                           |
| `library` | `library` | `string`  | `'default'` | 图标库名称，默认走同步注册表                                 |
| `label`   | `label`   | `string`  | `''`        | 无障碍描述文案；提供时 role=img + aria-label，否则对读屏隐藏 |
| `spin`    | `spin`    | `boolean` | `false`     | 旋转动画（加载中）                                           |
| `pulse`   | `pulse`   | `boolean` | `false`     | 缓动旋转动画                                                 |

### 插槽

| 名称     | 说明                           |
| -------- | ------------------------------ |
| （默认） | 无（内容由 name/src 解析而来） |

### CSS 变量

| 变量             | 说明                     |
| ---------------- | ------------------------ |
| `--wc-icon-size` | 覆盖图标尺寸（默认 1em） |

### CSS Parts

`base`
