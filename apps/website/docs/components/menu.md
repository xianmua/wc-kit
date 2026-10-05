# Menu 导航菜单

导航菜单组件（参考 antd Menu）：`wc-menu` 容器 + `wc-menu-item` 菜单项 + `wc-sub-menu` 子菜单。垂直（默认）/ 水平两种模式，支持图标、单选高亮、禁用、危险项与子菜单（垂直内联展开、水平弹出层）。

主要 API：容器 `mode` 布局方向、`selected` 当前选中项 value（单选）、`bordered` 显示边框；菜单项 `value`、`icon`、`disabled`、`danger`；子菜单 `label`、`icon`、`open`。事件：`wc-select`（detail.value / detail.label）、子菜单 `wc-open` / `wc-close`。方向键可在条目间移动焦点（水平模式左右键、垂直模式上下键）。

React 用法（`@wc-kit/react` 包装组件）：

```tsx
import { WcMenu, WcMenuItem } from '@wc-kit/react';

<WcMenu selected="home" onWcSelect={(e) => console.log(e.detail.value)}>
  <WcMenuItem value="home" icon="home">
    首页
  </WcMenuItem>
  <WcMenuItem value="about">关于</WcMenuItem>
</WcMenu>;
```

Vue 用法（`@wc-kit/vue` 为纯类型增强包，直接使用原生标签）：

```vue
<template>
  <wc-menu selected="home" @wc-select="(e) => console.log(e.detail.value)">
    <wc-menu-item value="home" icon="home">首页</wc-menu-item>
    <wc-menu-item value="about">关于</wc-menu-item>
  </wc-menu>
</template>
```

## 示例

### 基础用法

垂直菜单，`selected` 声明默认选中项，点击切换并派发 `wc-select`。

<div class="demo-block">
  <wc-menu selected="home" bordered style="width: 220px;">
    <wc-menu-item value="home" icon="home">首页</wc-menu-item>
    <wc-menu-item value="search" icon="search">搜索</wc-menu-item>
    <wc-menu-item value="mail" icon="mail">邮件</wc-menu-item>
    <wc-menu-item value="disabled" disabled>禁用项</wc-menu-item>
    <wc-menu-item value="delete" danger icon="trash-2">删除</wc-menu-item>
  </wc-menu>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-menu selected="home" bordered style="width: 220px">
  <wc-menu-item value="home" icon="home">首页</wc-menu-item>
  <wc-menu-item value="search" icon="search">搜索</wc-menu-item>
  <wc-menu-item value="mail" icon="mail">邮件</wc-menu-item>
  <wc-menu-item value="disabled" disabled>禁用项</wc-menu-item>
  <wc-menu-item value="delete" danger icon="trash-2">删除</wc-menu-item>
</wc-menu>
```

```vue [Vue]
<template>
  <wc-menu selected="home" bordered style="width: 220px">
    <wc-menu-item value="home" icon="home">首页</wc-menu-item>
    <wc-menu-item value="search" icon="search">搜索</wc-menu-item>
    <wc-menu-item value="mail" icon="mail">邮件</wc-menu-item>
    <wc-menu-item value="disabled" disabled>禁用项</wc-menu-item>
    <wc-menu-item value="delete" danger icon="trash-2">删除</wc-menu-item>
  </wc-menu>
</template>
```

```tsx [React]
import { WcMenu, WcMenuItem } from '@wc-kit/react';

<WcMenu selected="home" bordered style={{ width: 220 }}>
  <WcMenuItem value="home" icon="home">
    首页
  </WcMenuItem>
  <WcMenuItem value="search" icon="search">
    搜索
  </WcMenuItem>
  <WcMenuItem value="mail" icon="mail">
    邮件
  </WcMenuItem>
  <WcMenuItem value="disabled" disabled>
    禁用项
  </WcMenuItem>
  <WcMenuItem value="delete" danger icon="trash-2">
    删除
  </WcMenuItem>
</WcMenu>;
```

:::
::::

### 水平模式

`mode="horizontal"` 顶部导航，选中项以底部指示条标记（与 Tabs 同语言）。

<div class="demo-block">
  <wc-menu mode="horizontal" selected="home" style="width: 100%;">
    <wc-menu-item value="home">首页</wc-menu-item>
    <wc-menu-item value="list">列表</wc-menu-item>
    <wc-menu-item value="data">数据</wc-menu-item>
  </wc-menu>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-menu mode="horizontal" selected="home">
  <wc-menu-item value="home">首页</wc-menu-item>
  <wc-menu-item value="list">列表</wc-menu-item>
  <wc-menu-item value="data">数据</wc-menu-item>
</wc-menu>
```

```vue [Vue]
<template>
  <wc-menu mode="horizontal" selected="home">
    <wc-menu-item value="home">首页</wc-menu-item>
    <wc-menu-item value="list">列表</wc-menu-item>
    <wc-menu-item value="data">数据</wc-menu-item>
  </wc-menu>
</template>
```

```tsx [React]
import { WcMenu, WcMenuItem } from '@wc-kit/react';

<WcMenu mode="horizontal" selected="home">
  <WcMenuItem value="home">首页</WcMenuItem>
  <WcMenuItem value="list">列表</WcMenuItem>
  <WcMenuItem value="data">数据</WcMenuItem>
</WcMenu>;
```

:::
::::

### 子菜单

`wc-sub-menu` 折叠一组菜单项：垂直菜单内联展开（箭头旋转），水平菜单弹出浮层。

<div class="demo-block">
  <div style="display:flex; gap:24px; align-items:flex-start; flex-wrap:wrap;">
    <wc-menu selected="profile" bordered style="width: 220px;">
      <wc-menu-item value="home" icon="home">首页</wc-menu-item>
      <wc-sub-menu label="设置" icon="settings">
        <wc-menu-item value="profile">个人资料</wc-menu-item>
        <wc-menu-item value="security">安全</wc-menu-item>
      </wc-sub-menu>
    </wc-menu>
    <wc-menu mode="horizontal" style="width: 320px;">
      <wc-menu-item value="home">首页</wc-menu-item>
      <wc-sub-menu label="更多">
        <wc-menu-item value="about">关于</wc-menu-item>
        <wc-menu-item value="help">帮助</wc-menu-item>
      </wc-sub-menu>
    </wc-menu>
  </div>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-menu selected="profile" bordered style="width: 220px">
  <wc-menu-item value="home" icon="home">首页</wc-menu-item>
  <wc-sub-menu label="设置" icon="settings">
    <wc-menu-item value="profile">个人资料</wc-menu-item>
    <wc-menu-item value="security">安全</wc-menu-item>
  </wc-sub-menu>
</wc-menu>

<wc-menu mode="horizontal" style="width: 320px">
  <wc-menu-item value="home">首页</wc-menu-item>
  <wc-sub-menu label="更多">
    <wc-menu-item value="about">关于</wc-menu-item>
    <wc-menu-item value="help">帮助</wc-menu-item>
  </wc-sub-menu>
</wc-menu>
```

```vue [Vue]
<template>
  <wc-menu selected="profile" bordered style="width: 220px">
    <wc-menu-item value="home" icon="home">首页</wc-menu-item>
    <wc-sub-menu label="设置" icon="settings">
      <wc-menu-item value="profile">个人资料</wc-menu-item>
      <wc-menu-item value="security">安全</wc-menu-item>
    </wc-sub-menu>
  </wc-menu>

  <wc-menu mode="horizontal" style="width: 320px">
    <wc-menu-item value="home">首页</wc-menu-item>
    <wc-sub-menu label="更多">
      <wc-menu-item value="about">关于</wc-menu-item>
      <wc-menu-item value="help">帮助</wc-menu-item>
    </wc-sub-menu>
  </wc-menu>
</template>
```

```tsx [React]
import { WcMenu, WcMenuItem, WcSubMenu } from '@wc-kit/react';

<WcMenu selected="profile" bordered style={{ width: 220 }}>
  <WcMenuItem value="home" icon="home">
    首页
  </WcMenuItem>
  <WcSubMenu label="设置" icon="settings">
    <WcMenuItem value="profile">个人资料</WcMenuItem>
    <WcMenuItem value="security">安全</WcMenuItem>
  </WcSubMenu>
</WcMenu>;

<WcMenu mode="horizontal" style={{ width: 320 }}>
  <WcMenuItem value="home">首页</WcMenuItem>
  <WcSubMenu label="更多">
    <WcMenuItem value="about">关于</WcMenuItem>
    <WcMenuItem value="help">帮助</WcMenuItem>
  </WcSubMenu>
</WcMenu>;
```

:::
::::

### 事件

点击菜单项派发 `wc-select`（composed，可在宿主文档监听）；子菜单展开/收起派发 `wc-open` / `wc-close`。

```ts
const menu = document.querySelector('wc-menu');
menu.addEventListener('wc-select', (e) => {
  console.log('选中', (e as CustomEvent).detail.value, (e as CustomEvent).detail.label);
});
menu.querySelector('wc-sub-menu')?.addEventListener('wc-open', () => {
  console.log('子菜单展开');
});
```

## API

### wc-menu

#### 属性

| 属性       | attribute  | 类型                         | 默认值       | 说明                     |
| ---------- | ---------- | ---------------------------- | ------------ | ------------------------ |
| `mode`     | `mode`     | `'vertical' \| 'horizontal'` | `'vertical'` | 布局模式                 |
| `selected` | `selected` | `string`                     | `''`         | 当前选中项 value（单选） |
| `bordered` | `bordered` | `boolean`                    | `false`      | 显示边框                 |

#### 事件

| 事件        | 说明                   | detail                             |
| ----------- | ---------------------- | ---------------------------------- |
| `wc-select` | 选中菜单项（composed） | `{ value: string; label: string }` |

#### 插槽

| 名称     | 说明                           |
| -------- | ------------------------------ |
| （默认） | `wc-menu-item` / `wc-sub-menu` |

#### CSS Parts

`base`（菜单容器）

#### CSS 变量

| 变量                    | 说明                                |
| ----------------------- | ----------------------------------- |
| `--wc-menu-radius`      | 容器圆角（默认 --wc-radius-medium） |
| `--wc-menu-item-height` | 条目高度（默认 40px，透传条目）     |

### wc-menu-item

#### 属性

| 属性       | attribute  | 类型      | 默认值  | 说明                              |
| ---------- | ---------- | --------- | ------- | --------------------------------- |
| `value`    | `value`    | `string`  | `''`    | 菜单项值（选中匹配与事件 detail） |
| `icon`     | `icon`     | `string`  | `''`    | 前置图标（内置图标名）            |
| `disabled` | `disabled` | `boolean` | `false` | 禁用                              |
| `danger`   | `danger`   | `boolean` | `false` | 危险操作（红色文字）              |

`selected` / `menu-horizontal` 由 wc-menu 同步维护，请勿手工设置。

#### 插槽

| 名称     | 说明       |
| -------- | ---------- |
| （默认） | 菜单项文本 |

#### CSS Parts

`base`（菜单项根元素）

#### CSS 变量

| 变量                    | 说明                               |
| ----------------------- | ---------------------------------- |
| `--wc-menu-item-height` | 条目高度（默认 40px）              |
| `--wc-menu-item-radius` | 条目圆角（默认 --wc-radius-small） |

### wc-sub-menu

#### 属性

| 属性       | attribute  | 类型      | 默认值  | 说明         |
| ---------- | ---------- | --------- | ------- | ------------ |
| `label`    | `label`    | `string`  | `''`    | 头部标题文本 |
| `icon`     | `icon`     | `string`  | `''`    | 前置图标     |
| `disabled` | `disabled` | `boolean` | `false` | 禁用         |
| `open`     | `open`     | `boolean` | `false` | 是否展开     |

#### 事件

| 事件       | 说明                   | detail                                                      |
| ---------- | ---------------------- | ----------------------------------------------------------- |
| `wc-open`  | 子菜单展开（composed） | —                                                           |
| `wc-close` | 子菜单收起（composed） | `{ reason: 'toggle' \| 'outside' \| 'escape' \| 'select' }` |

#### 插槽

| 名称     | 说明                          |
| -------- | ----------------------------- |
| （默认） | 菜单项（wc-menu-item）        |
| `label`  | 头部标题（缺省用 label 属性） |

#### CSS Parts

`header`（展开头）、`base`（子菜单容器）

#### CSS 变量

| 变量                      | 说明                             |
| ------------------------- | -------------------------------- |
| `--wc-sub-menu-min-width` | 水平弹出层最小宽度（默认 140px） |
