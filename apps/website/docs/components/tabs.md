# Tabs 标签页

标签页组件。容器 `<wc-tabs>` 收集子元素 `<wc-tab>` 渲染标签栏与面板：wc-tab 用 label 声明
标签栏文本、value 声明唯一值（缺省按索引）、disabled 禁用。点击标签或键盘（←/→/↑/↓ 循环切换，
Home/End 跳转首尾，自动激活并跳过禁用项）切换，激活变化后派发 wc-change（detail: { value }）。
容器 value 表示当前激活项，可初始指定，缺省自动激活第一个；子元素的 active 由容器自动同步以驱动面板显隐，无需手写。

支持 `tab-position` 四向标签栏（参考 antd Tabs tabPosition）：`top`（默认，横排）/ `bottom`（底部横排）/
`left`（左侧竖排）/ `right`（右侧竖排），竖排时指示条贴合分隔线、面板与首个标签顶对齐。

主要 API：

- wc-tabs：value（激活标签的 value）、tab-position（标签栏位置，默认 top）；事件 wc-change（detail: { value }）；默认插槽放 wc-tab
- wc-tab：label / value / disabled；默认插槽为面板内容

React 用法（@wc-kit/react 包装组件）：

```tsx
import { WcTabs, WcTab } from '@wc-kit/react';

export default function Demo() {
  return (
    <WcTabs value="user" onWcChange={(e) => console.log(e.detail.value)}>
      <WcTab label="用户管理" value="user">
        用户管理内容
      </WcTab>
      <WcTab label="订单管理" value="order">
        订单管理内容
      </WcTab>
    </WcTabs>
  );
}
```

Vue 用法（原生标签，@wc-kit/vue 提供类型增强）：

```vue
<template>
  <wc-tabs value="user" @wc-change="(e) => console.log(e.detail.value)">
    <wc-tab label="用户管理" value="user">用户管理内容</wc-tab>
    <wc-tab label="订单管理" value="order">订单管理内容</wc-tab>
  </wc-tabs>
</template>
```

## 示例

### 受控用法

<div class="demo-block">

<wc-tabs value="pending">
      <wc-tab label="全部订单" value="all">全部订单的内容区域</wc-tab>
      <wc-tab label="待支付" value="pending">待支付的内容区域</wc-tab>
      <wc-tab label="已完成" value="done">已完成的内容区域</wc-tab>
    </wc-tabs>

</div>

<details><summary>查看代码</summary>

```html
<wc-tabs value="pending">
  <wc-tab label="全部订单" value="all">全部订单的内容区域</wc-tab>
  <wc-tab label="待支付" value="pending">待支付的内容区域</wc-tab>
  <wc-tab label="已完成" value="done">已完成的内容区域</wc-tab>
</wc-tabs>
```

</details>

### 禁用项

<div class="demo-block">

<wc-tabs value="a">
      <wc-tab label="可点击" value="a">可点击的内容区域</wc-tab>
      <wc-tab label="禁用项" value="b" disabled>禁用项的内容区域</wc-tab>
      <wc-tab label="也可点击" value="c">也可点击的内容区域</wc-tab>
    </wc-tabs>

</div>

<details><summary>查看代码</summary>

```html
<wc-tabs value="a">
  <wc-tab label="可点击" value="a">可点击的内容区域</wc-tab>
  <wc-tab label="禁用项" value="b" disabled>禁用项的内容区域</wc-tab>
  <wc-tab label="也可点击" value="c">也可点击的内容区域</wc-tab>
</wc-tabs>
```

</details>

### 键盘导航

<div class="demo-block">

<wc-tabs value="home">
      <wc-tab label="首页" value="home">首页的内容区域</wc-tab>
      <wc-tab label="发现" value="discover">发现的内容区域</wc-tab>
      <wc-tab label="我的" value="mine">我的的内容区域</wc-tab>
    </wc-tabs>

</div>

<details><summary>查看代码</summary>

```html
<wc-tabs value="home">
  <wc-tab label="首页" value="home">首页的内容区域</wc-tab>
  <wc-tab label="发现" value="discover">发现的内容区域</wc-tab>
  <wc-tab label="我的" value="mine">我的的内容区域</wc-tab>
</wc-tabs>
```

</details>

### 垂直标签栏

`tab-position` 支持 `left` / `right`（竖排）与 `bottom`（底部横排）。

<div class="demo-block">

<div style="display: flex; gap: 24px;">

<wc-tabs tab-position="left" style="flex: 1; min-height: 180px">
  <wc-tab label="账户" value="account">左侧标签栏的账户面板</wc-tab>
  <wc-tab label="安全" value="security">左侧标签栏的安全面板</wc-tab>
  <wc-tab label="通知" value="notify">左侧标签栏的通知面板</wc-tab>
</wc-tabs>

<wc-tabs tab-position="right" style="flex: 1; min-height: 180px">
  <wc-tab label="账户" value="account">右侧标签栏的账户面板</wc-tab>
  <wc-tab label="安全" value="security">右侧标签栏的安全面板</wc-tab>
  <wc-tab label="通知" value="notify">右侧标签栏的通知面板</wc-tab>
</wc-tabs>

</div>

<div style="margin-top: 16px;">

<wc-tabs tab-position="bottom">
  <wc-tab label="账户" value="account">底部标签栏的账户面板</wc-tab>
  <wc-tab label="安全" value="security">底部标签栏的安全面板</wc-tab>
  <wc-tab label="通知" value="notify">底部标签栏的通知面板</wc-tab>
</wc-tabs>

</div>

</div>

<details><summary>查看代码</summary>

```html
<wc-tabs tab-position="left">
  <wc-tab label="账户" value="account">左侧标签栏的账户面板</wc-tab>
  <wc-tab label="安全" value="security">左侧标签栏的安全面板</wc-tab>
  <wc-tab label="通知" value="notify">左侧标签栏的通知面板</wc-tab>
</wc-tabs>

<wc-tabs tab-position="right">
  <wc-tab label="账户" value="account">右侧标签栏的账户面板</wc-tab>
  <wc-tab label="安全" value="security">右侧标签栏的安全面板</wc-tab>
  <wc-tab label="通知" value="notify">右侧标签栏的通知面板</wc-tab>
</wc-tabs>

<wc-tabs tab-position="bottom">
  <wc-tab label="账户" value="account">底部标签栏的账户面板</wc-tab>
  <wc-tab label="安全" value="security">底部标签栏的安全面板</wc-tab>
  <wc-tab label="通知" value="notify">底部标签栏的通知面板</wc-tab>
</wc-tabs>
```

</details>

## API

### 属性

| 属性          | attribute      | 类型                                     | 默认值 | 说明                          |
| ------------- | -------------- | ---------------------------------------- | ------ | ----------------------------- |
| `value`       | `value`        | `string`                                 | `''`   | 激活标签的 value              |
| `tabPosition` | `tab-position` | `'top' \| 'right' \| 'bottom' \| 'left'` | `top`  | 标签栏位置，left/right 为竖排 |

### 事件

| 事件        | 说明                             |
| ----------- | -------------------------------- |
| `wc-change` | 激活标签变化时触发，detail.value |

### 插槽

| 名称     | 说明              |
| -------- | ----------------- |
| （默认） | `<wc-tab>` 子元素 |

### CSS Parts

`bar` / `tab`
