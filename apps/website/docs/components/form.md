# Form 表单

表单容器组件，拦截提交并做整体校验、聚合校验结果。内部为原生 form（novalidate）；点击任意层级的
wc-button[type=submit] / wc-button[type=reset] 会触发提交流程 / 重置（事件委托，按钮可以是任意层级后代）。

**wc-form 方法**

- `validate()`：整体校验，返回 Promise`<FormValidateResult>`（{ valid, errors, firstError }），失败时聚焦第一个错误控件
- `reset()`：重置全部表单项（恢复控件默认值并清除错误）
- `submit()`：触发提交流程，并派发 wc-submit
- `getItems()` / `getItem(name)`：获取全部 / 按字段名获取 wc-form-item

**wc-form 事件**

- `wc-submit`：提交时触发（无论校验是否通过），detail 为 FormValidateResult（{ valid, errors: Record<字段名, 消息>, firstError }）

**wc-form-item 属性**

- `name`：字段名（提交与校验结果映射的键）；`label`：标签文本（列宽可用 CSS 变量 --wc-form-label-width 调整）
- `required`：必填（渲染红色星号，等价 rules=[{ required: true }]）
- `min` / `max`：数值下限 / 上限（Number(value) 比较）
- `min-length` / `max-length`：字符串最小 / 最大长度
- `pattern`：正则校验
- `rules`：完整规则列表（FormRule[]，attribute:false，含自定义 validator 时用 JS 设置，validator 支持异步，可用 message 自定义文案）
- 控件取默认插槽第一个元素；wc-input 等自家组件与原生 input/select/textarea 均可，校验失败自动给自家组件置 status="error"

**React 用法**

```tsx
import { WcForm, WcFormItem, WcInput, WcButton } from '@wc-kit/react';

<WcForm onWcSubmit={(e) => console.log(e.detail)}>
  <WcFormItem label="用户名" name="username" required>
    <WcInput name="username" />
  </WcFormItem>
  <WcButton theme="primary" html-type="submit">
    提交
  </WcButton>
</WcForm>;
```

**Vue 用法**

```html
<!-- @wc-kit/vue 仅提供类型增强，直接使用原生标签。
     事件为 wc-submit（detail 为 { valid, errors, firstError }）。
     输入控件不要用原生 v-model，用 :value + @wc-input/@wc-change 同步。 -->
<wc-form @wc-submit="(e) => console.log(e.detail)">
  <wc-form-item label="用户名" name="username" required>
    <wc-input name="username" :value="username" @wc-input="(e) => (username = e.detail.value)" />
  </wc-form-item>
  <wc-button theme="primary" html-type="submit">提交</wc-button>
  <wc-button type="outline" html-type="reset">重置</wc-button>
</wc-form>
```

## 示例

<script setup>
import { onMounted, ref } from 'vue'

// rules 为 attribute:false 的属性（validator 为函数），需 JS 赋值
const nicknameItem = ref(null)
const nicknameRules = [
  {
    validator: (v) => String(v).length >= 2 || '昵称至少 2 个字符',
  },
  {
    validator: (v) =>
      new Promise((resolve) => setTimeout(() => resolve(String(v) !== 'admin'), 500)),
    message: '该昵称已被占用（模拟异步校验）',
  },
]

function onFormSubmit(e) {
  console.log('wc-submit', e.detail)
}

onMounted(() => {
  if (nicknameItem.value) nicknameItem.value.rules = nicknameRules
})
</script>

### 校验规则

<div class="demo-block">
  <wc-form style="max-width:460px">
    <wc-form-item label="用户名" name="username" required>
      <wc-input name="username" placeholder="必填"></wc-input>
    </wc-form-item>
    <wc-form-item label="邮箱" name="email" pattern="^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$">
      <wc-input name="email" placeholder="正则校验：请输入邮箱"></wc-input>
    </wc-form-item>
    <wc-form-item label="年龄" name="age" min="18" max="60">
      <wc-input-number name="age" placeholder="18 ~ 60"></wc-input-number>
    </wc-form-item>
    <wc-form-item label="简介" name="bio" min-length="5" max-length="50">
      <wc-textarea name="bio" placeholder="长度 5 ~ 50 个字符"></wc-textarea>
    </wc-form-item>
    <div style="display:flex;gap:12px;">
      <wc-button theme="primary" html-type="submit">提交</wc-button>
      <wc-button type="outline" html-type="reset">重置</wc-button>
    </div>
  </wc-form>
</div>

声明式规则：`required` / `min` / `max` / `min-length` / `max-length` / `pattern`。控件交互（wc-change / blur）后自动重新校验，失败时显示错误消息并给自家组件置 `status="error"`。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-form style="max-width:460px">
  <wc-form-item label="用户名" name="username" required>
    <wc-input name="username" placeholder="必填"></wc-input>
  </wc-form-item>
  <wc-form-item label="邮箱" name="email" pattern="^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$">
    <wc-input name="email" placeholder="正则校验：请输入邮箱"></wc-input>
  </wc-form-item>
  <wc-form-item label="年龄" name="age" min="18" max="60">
    <wc-input-number name="age" placeholder="18 ~ 60"></wc-input-number>
  </wc-form-item>
  <wc-form-item label="简介" name="bio" min-length="5" max-length="50">
    <wc-textarea name="bio" placeholder="长度 5 ~ 50 个字符"></wc-textarea>
  </wc-form-item>
  <div style="display:flex;gap:12px;">
    <wc-button theme="primary" html-type="submit">提交</wc-button>
    <wc-button type="outline" html-type="reset">重置</wc-button>
  </div>
</wc-form>
```

```vue [Vue]
<template>
  <wc-form style="max-width:460px">
    <wc-form-item label="用户名" name="username" required>
      <wc-input name="username" placeholder="必填"></wc-input>
    </wc-form-item>
    <wc-form-item label="邮箱" name="email" pattern="^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$">
      <wc-input name="email" placeholder="正则校验：请输入邮箱"></wc-input>
    </wc-form-item>
    <wc-form-item label="年龄" name="age" min="18" max="60">
      <wc-input-number name="age" placeholder="18 ~ 60"></wc-input-number>
    </wc-form-item>
    <wc-form-item label="简介" name="bio" min-length="5" max-length="50">
      <wc-textarea name="bio" placeholder="长度 5 ~ 50 个字符"></wc-textarea>
    </wc-form-item>
    <div style="display:flex;gap:12px;">
      <wc-button theme="primary" html-type="submit">提交</wc-button>
      <wc-button type="outline" html-type="reset">重置</wc-button>
    </div>
  </wc-form>
</template>
```

```tsx [React]
import { WcButton, WcForm, WcFormItem, WcInput, WcInputNumber, WcTextarea } from '@wc-kit/react';

<WcForm style="max-width:460px">
  <WcFormItem label="用户名" name="username" required>
    <WcInput name="username" placeholder="必填"></WcInput>
  </WcFormItem>
  <WcFormItem label="邮箱" name="email" pattern="^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$">
    <WcInput name="email" placeholder="正则校验：请输入邮箱"></WcInput>
  </WcFormItem>
  <WcFormItem label="年龄" name="age" min={18} max={60}>
    <WcInputNumber name="age" placeholder="18 ~ 60"></WcInputNumber>
  </WcFormItem>
  <WcFormItem label="简介" name="bio" minLength={5} maxLength={50}>
    <WcTextarea name="bio" placeholder="长度 5 ~ 50 个字符"></WcTextarea>
  </WcFormItem>
  <div style="display:flex;gap:12px;">
    <WcButton theme="primary" html-type="submit">
      提交
    </WcButton>
    <WcButton type="outline" html-type="reset">
      重置
    </WcButton>
  </div>
</WcForm>;
```

:::
::::

### 自定义校验

<div class="demo-block">
  <wc-form style="max-width:420px">
    <wc-form-item label="用户名" name="username" required>
      <wc-input name="username" placeholder="必填"></wc-input>
    </wc-form-item>
    <wc-form-item ref="nicknameItem" label="昵称" name="nickname">
      <wc-input name="nickname" placeholder="试试输入 admin 触发异步校验"></wc-input>
    </wc-form-item>
    <div style="display:flex;gap:12px;">
      <wc-button theme="primary" html-type="submit">提交</wc-button>
      <wc-button type="outline" html-type="reset">重置</wc-button>
    </div>
  </wc-form>
</div>

通过 `rules` 属性（JS 设置，attribute:false）传入自定义 validator：返回 false 或非空字符串表示失败，返回字符串时直接作为错误消息，支持异步（Promise）。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-form style="max-width:420px">
  <wc-form-item label="用户名" name="username" required>
    <wc-input name="username" placeholder="必填"></wc-input>
  </wc-form-item>
  <wc-form-item label="昵称" name="nickname" id="nicknameItem">
    <wc-input name="nickname" placeholder="试试输入 admin 触发异步校验"></wc-input>
  </wc-form-item>
  <div style="display:flex;gap:12px;">
    <wc-button theme="primary" html-type="submit">提交</wc-button>
    <wc-button type="outline" html-type="reset">重置</wc-button>
  </div>
</wc-form>

<script type="module">
  const nicknameItem = document.getElementById('nicknameItem');

  // rules 为 attribute:false 的属性（validator 为函数），需 JS 赋值

  const nicknameRules = [
    { validator: (v) => String(v).length >= 2 || '昵称至少 2 个字符' },
    {
      validator: (v) =>
        new Promise((resolve) => setTimeout(() => resolve(String(v) !== 'admin'), 500)),
      message: '该昵称已被占用（模拟异步校验）',
    },
  ];

  if (nicknameItem) nicknameItem.rules = nicknameRules;
</script>
```

```vue [Vue]
<template>
  <wc-form style="max-width:420px">
    <wc-form-item label="用户名" name="username" required>
      <wc-input name="username" placeholder="必填"></wc-input>
    </wc-form-item>
    <wc-form-item ref="nicknameItem" label="昵称" name="nickname">
      <wc-input name="nickname" placeholder="试试输入 admin 触发异步校验"></wc-input>
    </wc-form-item>
    <div style="display:flex;gap:12px;">
      <wc-button theme="primary" html-type="submit">提交</wc-button>
      <wc-button type="outline" html-type="reset">重置</wc-button>
    </div>
  </wc-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

// rules 为 attribute:false 的属性（validator 为函数），需 JS 赋值
const nicknameItem = ref(null);
const nicknameRules = [
  { validator: (v) => String(v).length >= 2 || '昵称至少 2 个字符' },
  {
    validator: (v) =>
      new Promise((resolve) => setTimeout(() => resolve(String(v) !== 'admin'), 500)),
    message: '该昵称已被占用（模拟异步校验）',
  },
];

onMounted(() => {
  if (nicknameItem.value) nicknameItem.value.rules = nicknameRules;
});
</script>
```

```tsx [React]
import { WcButton, WcForm, WcFormItem, WcInput } from '@wc-kit/react';

<WcForm style="max-width:420px">
  <WcFormItem label="用户名" name="username" required>
    <WcInput name="username" placeholder="必填"></WcInput>
  </WcFormItem>
  <WcFormItem ref={nicknameItem} label="昵称" name="nickname">
    <WcInput name="nickname" placeholder="试试输入 admin 触发异步校验"></WcInput>
  </WcFormItem>
  <div style="display:flex;gap:12px;">
    <WcButton theme="primary" html-type="submit">
      提交
    </WcButton>
    <WcButton type="outline" html-type="reset">
      重置
    </WcButton>
  </div>
</WcForm>;

// rules 为 attribute:false 的属性（validator 为函数），需 JS 赋值
const nicknameItem = useRef(null);
const nicknameRules = [
  { validator: (v) => String(v).length >= 2 || '昵称至少 2 个字符' },
  {
    validator: (v) =>
      new Promise((resolve) => setTimeout(() => resolve(String(v) !== 'admin'), 500)),
    message: '该昵称已被占用（模拟异步校验）',
  },
];

useEffect(() => {
  if (nicknameItem.current) nicknameItem.current.rules = nicknameRules;
}, []);
```

:::
::::

### 提交与重置

<div class="demo-block">
  <wc-form style="max-width:420px" @wc-submit="onFormSubmit">
    <wc-form-item label="邮箱" name="email" required>
      <wc-input name="email" placeholder="请输入邮箱"></wc-input>
    </wc-form-item>
    <div style="display:flex;gap:12px;">
      <wc-button theme="primary" html-type="submit">提交</wc-button>
      <wc-button type="outline" html-type="reset">重置</wc-button>
    </div>
  </wc-form>
</div>

点击 `wc-button[type=submit]` 触发整体校验并派发 wc-submit（无论通过与否，detail 为 `{ valid, errors, firstError }`，见控制台）；`wc-button[type=reset]` 恢复控件默认值并清除错误。二者基于事件委托，按钮放在表单任意层级皆可。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-form style="max-width:420px" id="form-3-btn0">
  <wc-form-item label="邮箱" name="email" required>
    <wc-input name="email" placeholder="请输入邮箱"></wc-input>
  </wc-form-item>
  <div style="display:flex;gap:12px;">
    <wc-button theme="primary" html-type="submit">提交</wc-button>
    <wc-button type="outline" html-type="reset">重置</wc-button>
  </div>
</wc-form>

<script type="module">
  function onFormSubmit(e) {
    console.log('wc-submit', e.detail);
  }

  const form3Btn0 = document.getElementById('form-3-btn0');
  form3Btn0.addEventListener('wc-submit', () => {
    onFormSubmit();
  });

  function onFormSubmit(e) {
    console.log('wc-submit', e.detail);
  }
</script>
```

```vue [Vue]
<template>
  <wc-form style="max-width:420px" @wc-submit="onFormSubmit">
    <wc-form-item label="邮箱" name="email" required>
      <wc-input name="email" placeholder="请输入邮箱"></wc-input>
    </wc-form-item>
    <div style="display:flex;gap:12px;">
      <wc-button theme="primary" html-type="submit">提交</wc-button>
      <wc-button type="outline" html-type="reset">重置</wc-button>
    </div>
  </wc-form>
</template>

<script setup lang="ts">
function onFormSubmit(e) {
  console.log('wc-submit', e.detail);
}
</script>
```

```tsx [React]
import { WcButton, WcForm, WcFormItem, WcInput } from '@wc-kit/react';

<WcForm
  style="max-width:420px"
  onWcSubmit={() => {
    onFormSubmit;
  }}
>
  <WcFormItem label="邮箱" name="email" required>
    <WcInput name="email" placeholder="请输入邮箱"></WcInput>
  </WcFormItem>
  <div style="display:flex;gap:12px;">
    <WcButton theme="primary" html-type="submit">
      提交
    </WcButton>
    <WcButton type="outline" html-type="reset">
      重置
    </WcButton>
  </div>
</WcForm>;

function onFormSubmit(e) {
  console.log('wc-submit', e.detail);
}

function onFormSubmit(e) {
  console.log('wc-submit', e.detail);
}
```

:::
::::

## API

### 事件

| 事件        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| `wc-submit` | 提交时触发（无论校验是否通过），detail 为 FormValidateResult |

### 方法

| 方法                                             | 说明                                                   |
| ------------------------------------------------ | ------------------------------------------------------ |
| `getItems(): wcFormItem[]`                       | 全部表单项                                             |
| `getItem(name: string): wcFormItem \| undefined` | 按字段名取表单项                                       |
| `async validate(): Promise<FormValidateResult>`  | 整体校验：逐项执行并聚合结果，失败时聚焦第一个错误控件 |
| `reset(): void`                                  | 重置全部表单项（恢复控件默认值并清除错误）             |
| `async submit(): Promise<void>`                  | 触发提交流程（等同点击 submit 按钮）                   |

### 插槽

| 名称     | 说明                     |
| -------- | ------------------------ |
| （默认） | 放置 wc-form-item 与按钮 |

### CSS Parts

`form`
