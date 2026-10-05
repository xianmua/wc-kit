# wc 开发计划

基于 Web Components 的跨框架 UI 组件库，一次编写，React / Vue / 原生 HTML 通用。

## 1. 目标

- 框架无关：核心基于标准 Custom Element，React/Vue/Svelte/原生均可直接使用
- 统一主题：三层设计令牌（primitive → semantic → component），CSS 变量一键换肤
- API 规范：组件命名、参数、插槽、事件对齐 TDesign 风格，降低迁移成本
- 质量保障：类型完整、单测覆盖、可访问性（WAI-ARIA）达标

## 2. 技术栈

| 类别 | 选型                                         | 说明                                      |
| ---- | -------------------------------------------- | ----------------------------------------- |
| 基座 | Lit 3 + TypeScript                           | 装饰器、响应式属性、SSR 支持              |
| 样式 | Shadow DOM + CSS 变量                        | `::part` / CSS custom properties 穿透定制 |
| 构建 | Vite + vite-plugin-dts                       | ESM/CJS 双产物 + 类型声明                 |
| 测试 | Vitest + @open-wc/testing + Playwright(a11y) | 单测 + 组件测试                           |
| 文档 | VitePress（apps/website）                    | 组件演示、API 表、live demo               |
| 工程 | pnpm workspace + Changesets                  | monorepo 管理、版本发布                   |
| 适配 | @lit/react、Vue defineCustomElement          | 官方推荐的适配路径                        |

## 3. 目录结构

```
wc/
├── packages/
│   ├── core/                # @wc-kit/core 组件库本体（Lit）
│   │   ├── src/
│   │   │   ├── tokens/      # 设计令牌定义与生成
│   │   │   ├── styles/      # 基础样式、reset、工具类
│   │   │   ├── common/      # 公共工具（尺寸、校验、表单 mixin）
│   │   │   ├── components/  # 每个组件一个目录
│   │   │   │   └── button/
│   │   │   │       ├── wc-button.ts
│   │   │   │       ├── wc-button.styles.ts
│   │   │   │       └── index.ts
│   │   │   └── index.ts     # 统一出口
│   │   └── package.json
│   ├── react/               # @wc-kit/react（@lit/react 自动包装）
│   ├── vue/                 # @wc-kit/vue（类型 + 指令增强）
│   └── tokens/              # @wc-kit/tokens（CSS/JS 双格式令牌，供 Figma 同步）
├── apps/
│   └── docs/                # Storybook 文档站
├── docs/                    # 计划与规则文档
├── pnpm-workspace.yaml
└── package.json
```

## 4. 阶段规划

### Phase 0 — 工程基建

- [ ] pnpm monorepo 初始化（workspace、tsconfig 基础、ESLint + Prettier）
- [ ] core 包脚手架：Lit + Vite 构建、双格式产物、dts
- [ ] Vitest + @open-wc/testing 测试链路
- [ ] Storybook 文档站跑通
- [ ] Changesets 版本管理、CI（lint + test + build）

### Phase 1 — 设计系统基础

- [x] 国际化基建：`setLocale` / `registerLocale` / `LocalizeController`，内置 zh-CN、en-US
- [x] 令牌体系：颜色（品牌/功能色/中性色）、字体、间距、圆角、阴影、动效、z-index
- [x] 暗色主题支持：`data-theme` 切换 + `setTheme/initTheme` API + playground 验证页
- [x] 基础样式：reset.css（排版/表单/媒体/focus-visible 统一）+ base.css 组件基线 + focus-ring 令牌
- [x] 图标方案：`wc-icon` 组件 + 注册表/图标库双路径 + 13 个内置图标（可 tree-shaking）

### Phase 2 — 基础组件（8 个）✅

- [x] Button 按钮（theme/type/size/loading/block，playground 已含）
- [x] Icon 图标（图标系统 + 13 内置图标）
- [x] Divider 分隔线（虚线 / align 文案对齐 / vertical 竖向）
- [x] Space 间距（预设与自定义尺寸 / direction / wrap / gap 实现）
- [x] Layout(Row/Col) 布局（24 栅格 span/offset / gutter / justify·align）
- [x] Typography 排版（heading level 1~6 role=heading / 语义色 / 禁用态）
- [x] Tag 标签（theme 语义色 / dark·light·outline 变体 / closable / 尺寸）
- [x] Avatar 头像（circle·round·square 形状 / 预设与自定义尺寸）

### Phase 3 — 表单组件（10 个）

- [x] Input 输入框（clearable / prefix+suffix 插槽 / status 校验态 / 表单关联）
- [x] Textarea 多行输入（maxlength 字数统计 / autosize / status / 表单关联）
- [x] Select 选择器（单选 / 键盘导航 / clearable / status / 表单关联）
- [x] Checkbox 复选框（checked/indeterminate/表单关联）
- [x] Radio 单选框（name 同表单互斥分组/表单关联）
- [x] Switch 开关（checkedValue/uncheckedValue/表单关联）
- [x] Slider 滑块（原生 range 键盘导航 / min-max-step / 表单关联）
- [x] DatePicker 日期选择（日历面板 / 键盘导航 activedescendant / first-day-of-week / i18n Intl 格式化 / 表单关联）
- [x] Form(校验) 表单（wc-form + wc-form-item / 声明式规则 + 自定义 validator / wc-submit 事件 / submit·reset 按钮委托）
- [x] InputNumber 数字输入（步进按钮 row/column/normal 主题 / ↑↓ 键盘步进 / 表单关联）

### Phase 4 — 反馈与导航（8 个）

- [x] Dialog 对话框（open/show/close / 可取消 wc-close / 焦点陷阱 + 焦点归还 / 滚动锁 / Escape / 遮罩点击）
- [x] Message 全局提示（命令式 message.info/success/warning/error/loading API + 单例容器 + duration 自动关闭）
- [x] Drawer 抽屉（四方向 placement / size 档位 / 复用 OverlaySideEffects 弹层副作用）
- [x] Tooltip 文字提示（auto-placement 定位引擎 common/position.ts / hover·click·manual 触发 / 12 方向 / 箭头）
- [x] Popconfirm 气泡确认（复用 position.ts 定位 / wc-confirm·wc-cancel 事件 / 外部点击·Esc 关闭）
- [x] Tabs 标签页（light-DOM wc-tab 子元素 / MutationObserver 元数据收集 / roving tabindex 键盘导航 / 激活下划线动画）
- [x] Breadcrumb 面包屑（light-DOM wc-breadcrumb-item 子元素 / href 原生链接 / disabled / separator / 末项 aria-current / wc-select 事件）
- [x] Pagination 分页（total/page-size 推导页数 / folded-page-count 折叠省略号 / prev·next 边界禁用 / show-total / show-jumper 跳页 / wc-change 事件 / 越界静默夹紧）

Phase 4 完成（8/8）。

### Phase 5 — 数据展示（6 个）

Table、Card、List、Badge、Empty、Progress

- [x] Badge 徽标（count/max「99+」/ dot 圆点 / theme 语义色 / 包裹或独立 / count=0 隐藏）
- [x] Empty 空状态（默认占位图形 + i18n「暂无数据」/ icon·description·action 插槽）
- [x] Progress 进度条（line/circle 双主题 / value 夹紧 / status 语义色+状态图标 / show-label / stroke-width / progressbar ARIA）
- [x] Card 卡片（title/subtitle 头部 + header/actions/footer 插槽 / bordered·hoverable / slotchange 恒渲染 slot + hidden 切换）
- [x] List 列表（::slotted 统一条目样式 / size·striped·hoverable / 空态回退 wc-empty + empty 插槽覆盖）
- [x] Table 表格（columns/data 驱动 / sortable 升降取消循环 + aria-sort / width·align·ellipsis / render 自定义单元格 / 空态回退 wc-empty / loading 遮罩 / wc-sort·wc-row-click 事件 / striped·bordered·size）

Phase 5 完成（6/6）。

### Phase 7 — 组件补遗（Phase 6 收尾后）

- [x] Image 图片（加载/失败态 + fallback、懒加载、大图预览缩放旋转，复用浮层基建）
- [x] Upload 上传（文件选择 + 拖拽、上传进度对接 Progress、预览列表、requestMethod 自定义上传）

### Phase 6 — 框架适配与发布

- [x] `@wc-kit/react`：@lit/react 包装 + Events 映射（38 个标签全量包装；事件回调参数标注 CustomEvent；vitest 需 alias @lit/react 到浏览器构建——node 条件命中 SSR 构建会静默丢弃 props/事件）
- [x] `@wc-kit/vue`：GlobalComponents 类型声明（38 标签 → DefineComponent<Partial<元素类>>，实例类型自动推导零手工维护）+ v-model 适配说明（README：wc-input 等派发 wc-input/wc-change 自定义事件，原生 v-model 不生效，用 :value + @wc-input/@wc-change）
- [x] 文档站补全每组件的 React/Vue 用法示例（31 个 story 文件 / 145 个 story，五大分组；Meta/StoryObj 须从 @storybook/web-components 导入，vite 框架包只导出 StorybookConfig）
- [x] npm 首次发布（2026-10-05：`@wc-kit/core@0.0.1` + `@wc-kit/react@0.0.2` + `@wc-kit/vue@0.0.2`，scope 因 `@wc` 被占用改为 `@wc-kit`；发布流程 pnpm pack 替换 workspace 协议后 npm publish，esm.sh CDN 端到端验证通过）

## 5. 里程碑验收标准

- 每个组件：类型完整、单测覆盖核心交互、Storybook story、a11y 无 critical 违规
- 主题：仅改 CSS 变量即可完成品牌色换肤与暗色模式
- 产物：ESM + CJS + 类型声明，按需引入（sideEffects: false）
