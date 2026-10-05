// 组件侧边栏（手工维护；历史：曾由 gen-from-stories.mjs 自动生成，该脚本已随 Storybook 一并移除）。
export interface SidebarEntry {
  text: string;
  link: string;
}
export interface SidebarGroup {
  text: string;
  collapsed: boolean;
  items: SidebarEntry[];
}

export const componentSidebar: SidebarGroup[] = [
  {
    text: '基础组件',
    collapsed: false,
    items: [
      { text: 'Avatar 头像', link: '/components/avatar' },
      { text: 'Button 按钮', link: '/components/button' },
      { text: 'Divider 分隔线', link: '/components/divider' },
      { text: 'Grid 栅格', link: '/components/row' },
      { text: 'Icon 图标', link: '/components/icon' },
      { text: 'Layout 布局', link: '/components/layout' },
      { text: 'Space 间距', link: '/components/space' },
      { text: 'Splitter 分隔板', link: '/components/splitter' },
      { text: 'Tag 标签', link: '/components/tag' },
      { text: 'Typography 排版', link: '/components/text' },
    ],
  },
  {
    text: '表单组件',
    collapsed: false,
    items: [
      { text: 'Checkbox 复选框', link: '/components/checkbox' },
      { text: 'DatePicker 日期选择器', link: '/components/date-picker' },
      { text: 'DateRangePicker 日期范围选择器', link: '/components/date-range-picker' },
      { text: 'Form 表单', link: '/components/form' },
      { text: 'Input 输入框', link: '/components/input' },
      { text: 'InputNumber 数字输入框', link: '/components/input-number' },
      { text: 'Radio 单选框', link: '/components/radio' },
      { text: 'Select 选择器', link: '/components/select' },
      { text: 'Slider 滑块', link: '/components/slider' },
      { text: 'Switch 开关', link: '/components/switch' },
      { text: 'Textarea 多行输入框', link: '/components/textarea' },
      { text: 'Upload 上传', link: '/components/upload' },
    ],
  },
  {
    text: '反馈组件',
    collapsed: false,
    items: [
      { text: 'Alert 警告提示', link: '/components/alert' },
      { text: 'Dialog 对话框', link: '/components/dialog' },
      { text: 'Drawer 抽屉', link: '/components/drawer' },
      { text: 'Message 全局提示', link: '/components/message' },
      { text: 'Popconfirm 气泡确认框', link: '/components/popconfirm' },
      { text: 'Tooltip 气泡提示', link: '/components/tooltip' },
    ],
  },
  {
    text: '导航组件',
    collapsed: false,
    items: [
      { text: 'Anchor 锚点', link: '/components/anchor' },
      { text: 'Breadcrumb 面包屑', link: '/components/breadcrumb' },
      { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
      { text: 'FloatButton 悬浮按钮', link: '/components/float-button' },
      { text: 'Menu 导航菜单', link: '/components/menu' },
      { text: 'Pagination 分页', link: '/components/pagination' },
      { text: 'SplitButton 组合按钮', link: '/components/split-button' },
      { text: 'Tabs 标签页', link: '/components/tabs' },
    ],
  },
  {
    text: '数据展示',
    collapsed: false,
    items: [
      { text: 'Badge 徽标', link: '/components/badge' },
      { text: 'Card 卡片', link: '/components/card' },
      { text: 'Collapse 折叠面板', link: '/components/collapse' },
      { text: 'Empty 空状态', link: '/components/empty' },
      { text: 'Image 图片', link: '/components/image' },
      { text: 'List 列表', link: '/components/list' },
      { text: 'Progress 进度条', link: '/components/progress' },
      { text: 'Segmented 分段控制器', link: '/components/segmented' },
      { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
      { text: 'Table 表格', link: '/components/table' },
    ],
  },
];
