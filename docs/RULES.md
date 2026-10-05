# wc 编码规则

所有组件开发必须遵守以下规则。规则目的是保证跨框架行为一致、主题可定制、事件不与宿主框架冲突。

## 1. 命名规范

| 对象     | 规则                    | 示例                                |
| -------- | ----------------------- | ----------------------------------- |
| 标签名   | `wc-` 前缀 + kebab-case | `<wc-button>`、`<wc-date-picker>`   |
| 类名     | 大驼峰，`wc` 前缀       | `wcButton`                          |
| 文件名   | 与标签名一致            | `wc-button.ts`                      |
| CSS 变量 | `--wc-` 前缀            | `--wc-color-primary`                |
| 事件名   | `wc-` 前缀 + kebab-case | `wc-change`、`wc-select-change`     |
| part 名  | kebab-case，语义化      | `part="base" / "prefix" / "suffix"` |

> 事件必须带 `wc-` 前缀：原生事件名（`change`/`input`）在 Vue 中会与框架行为冲突，禁止直接派发。

## 2. Props / Attributes

- 使用 `@property()` 声明，attribute 名为 kebab-case
- 布尔属性：`type: Boolean`，存在即真，支持空串
- 枚举值：`attribute` 反射字符串，TS 侧用联合类型收敛

```ts
@property() type: 'base' | 'outline' | 'text' = 'base';
@property({ type: Boolean, reflect: true }) disabled = false;
```

- 对象/数组/函数只作 property，不映射 attribute
- 需要外部 CSS 选择的视觉状态必须 `reflect: true`（如 `disabled`、`checked`、`size`）

## 3. 事件

- 统一派发 `CustomEvent`，必须 `bubbles: true, composed: true`（穿透 Shadow DOM）
- 需要 `preventDefault()` 语义的事件（如 `wc-before-close`）设置 `cancelable: true`
- 事件 payload 放在 `detail`，表单类组件 `detail` 携带 `value`

```ts
this.dispatchEvent(
  new CustomEvent('wc-change', {
    detail: { value },
    bubbles: true,
    composed: true,
  }),
);
```

## 4. 插槽与样式钩子

- 内容定制优先用 slot（默认插槽 + named slot），属性只承载简单配置
- 每个组件必须暴露 `part="base"`，可定制的子区域逐个声明 part
- 组件内部禁止写死颜色/字号，一律引用 token

## 5. 设计令牌（三层）

```
1. primitive   --wc-color-blue-500        # 原子值，不直接在组件中使用
2. semantic    --wc-color-primary          # 语义映射，主题切换只改这层
3. component   --wc-button-height-medium   # 组件级默认值，引用 semantic 层
```

- 主题切换：根节点切换 `data-theme="dark"`，只覆盖 semantic 层变量；统一走 `setTheme() / initTheme()` API，禁止手动操作 DOM 属性
- 组件内 `:host` 上声明自己的 component 级变量默认值，允许使用者按实例覆盖

## 6. 组件结构

每个组件目录固定四件套：

```
components/button/
├── wc-button.ts           # 逻辑 + 模板
├── wc-button.styles.ts    # 样式（static styles）
├── wc-button.test.ts      # 测试
└── index.ts                # export
```

- 样式超过 100 行时必须拆到独立 `.styles.ts`
- 公共逻辑抽 mixin 放 `common/`（如 `FormAssociatedMixin`、`SizeMixin`）

## 7. 表单组件

- 必须接入 `ElementInternals`（form association），支持 `<form>` 提交与原生校验
- 实现 `FormAssociatedMixin`：`value`、`name`、`disabled`、`formResetCallback`
- label 关联：渲染内部 `<label part="label">` 并正确绑定 `for`/`id`

## 8. 可访问性（强制）

- 遵循 WAI-ARIA APG 对应组件模式，角色/状态/属性齐全（`aria-disabled`、`aria-expanded` 等）
- 完整键盘导航：Tab、方向键、Esc、Enter/Space 按 APG 规定实现
- 焦点管理：Shadow DOM 内 focus 必须通过 `delegatesFocus` 或显式处理
- 测试包含 axe 扫描，无 critical 违规

## 9. 工程规则

- TypeScript `strict: true`，禁止 `any`（公共 API 处绝对禁止）
- 格式化用 oxfmt（`pnpm format`，配置见 `.oxfmtrc.json`），lint 用 ESLint；提交前必须通过 `format:check` + `lint`
- 提交信息遵循 Conventional Commits
- 每个组件 PR 必须包含：实现 + 测试 + VitePress 文档页（apps/website/docs/components/）+ 文档注释（tsdoc）
- 版本发布只通过 Changesets，禁止手动改版本号
- core 包 `sideEffects: false`，保证按需 tree-shaking

## 10. 兼容性基线

- 浏览器：Chrome/Edge 最新两个大版本、Firefox ESR、Safari 最近两个大版本
- 不提供 IE polyfill；React 18+ / Vue 3.2+ 适配为官方支持范围

## 11. 国际化（i18n）

- 组件内**禁止硬编码用户可见文案**，一律通过 `LocalizeController.term(key)` 取词
- 文案 key 扁平点分命名，按组件分组：`{组件}.{语义}`，如 `select.placeholder`、`pagination.total`
- 新增文案 key 必须同步补充所有内置语言包（`zh-CN` / `en-US`），`zh-CN` 为默认语言与回退源
- 插值统一 `{var}` 格式，运行时替换：`term('pagination.total', { total })`
- 语言解析优先级：元素 `lang` 属性 > 全局 `setLocale()` > 默认 `zh-CN`；
  元素 `lang` 属性必须透传到内部用于 `Intl` 格式化的节点
- 日期/数字格式化统一走 `LocalizeController.date()/number()`（内部 Intl），禁止手写格式化
- 全局切换语言通过 `setLocale()`，组件经 `wc-language-change` 事件自动重渲染，组件无需自行订阅
- 语言标识遵循 BCP 47；自定义语言包用 `registerLocale()`，同名浅合并支持覆盖内置文案

## 12. 图标系统

- 图标统一用 `<wc-icon name="...">` 渲染，禁止在组件里内联写死 SVG（内置依赖图标除外）
- 尺寸默认 `1em`、颜色 `currentColor`，跟随文字缩放；禁止在组件样式中写死图标颜色/尺寸
- 注册路径二选一：
  - 本地图标：`registerIcon(name, svg)`（同步注册表，单图标单文件，可 tree-shaking）
  - 远程/批量图标：`registerIconLibrary(name, { resolver, mutator? })`，resolver 支持返回 Promise 懒加载
- 内置图标统一 `createIcon()` 工厂生成：24×24 viewBox、lucide 风格描边（stroke=currentColor, width=2）
- 新增内置图标：`src/icons/<name>.ts` 建文件 + 加入 `index.ts` 的 `builtinIcons` 数组，命名 kebab-case
- 安全：`registerIcon*` 属于受信 API，SVG 不做消毒，禁止把用户输入直接当 SVG 来源
- a11y：装饰性图标不传 `label`（自动 aria-hidden）；有语义的图标必须传 `label`
- 图标库解析带缓存（`${library}:${name}`），组件侧用竞态守卫防止快速切换时旧结果覆盖新结果
