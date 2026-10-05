/**
 * Svelte 类型增强：让模板中的 <wc-*> 标签获得属性类型检查。
 * 由 @wc-kit/core 的元素类实例类型自动推导（Partial<T>），与核心包保持同步、零手工维护。
 *
 * Svelte 4/5 对自定义元素会检测 `key in element`，存在同名 property 时直接设
 * property（对象数组、函数等复杂值原样传入），其余走 attribute——与 Lit 组件天然契合。
 *
 * 在应用入口 `import '@wc-kit/svelte'`（副作用导入会同时注册全部自定义元素）
 * 或 tsconfig `types` 中引入本模块即可激活增强。
 */
import type { HTMLAttributes } from 'svelte/elements';
import type {
  wcBadge,
  wcBreadcrumb,
  wcBreadcrumbItem,
  wcButton,
  wcButtonGroup,
  wcAvatar,
  wcCard,
  wcCheckbox,
  wcCol,
  wcDatePicker,
  wcDateRangePicker,
  wcDialog,
  wcDivider,
  wcDrawer,
  wcDropdown,
  wcDropdownItem,
  wcSplitButton,
  wcFloatButton,
  wcFloatButtonGroup,
  wcEmpty,
  wcForm,
  wcFormItem,
  wcInput,
  wcInputNumber,
  wcList,
  wcListItem,
  wcMessage,
  wcMenu,
  wcMenuItem,
  wcSubMenu,
  wcAnchor,
  wcAnchorLink,
  wcAlert,
  wcSkeleton,
  wcSkeletonItem,
  wcCollapse,
  wcCollapseItem,
  wcSegmented,
  wcSegmentedItem,
  wcOption,
  wcPagination,
  wcPopconfirm,
  wcProgress,
  wcRadio,
  wcRow,
  wcLayout,
  wcLayoutHeader,
  wcLayoutContent,
  wcLayoutFooter,
  wcLayoutSider,
  wcSelect,
  wcSlider,
  wcSpace,
  wcSplitter,
  wcSplitterPanel,
  wcSwitch,
  wcTab,
  wcTable,
  wcTablePager,
  wcImage,
  wcTabs,
  wcTag,
  wcText,
  wcTextarea,
  wcTooltip,
  wcUpload,
  WcIcon,
} from '@wc-kit/core';

/**
 * 单个 <wc-*> 标签的类型：元素实例属性（Partial<T>）+ 标准 HTML 属性 +
 * Svelte 5 事件属性（onwc-change 等，统一放宽为任意事件处理器，保留事件名拼写检查由用户自理）。
 */
type WcSvelteTag<T extends HTMLElement> = HTMLAttributes<HTMLElement> &
  Partial<T> & {
    [key: `on${string}`]: unknown;
  };

declare module 'svelte/elements' {
  interface SvelteHTMLElements {
    // 基础
    'wc-button': WcSvelteTag<wcButton>;
    'wc-button-group': WcSvelteTag<wcButtonGroup>;
    'wc-icon': WcSvelteTag<WcIcon>;
    'wc-divider': WcSvelteTag<wcDivider>;
    'wc-tag': WcSvelteTag<wcTag>;
    'wc-avatar': WcSvelteTag<wcAvatar>;
    'wc-space': WcSvelteTag<wcSpace>;
    'wc-splitter': WcSvelteTag<wcSplitter>;
    'wc-splitter-panel': WcSvelteTag<wcSplitterPanel>;
    'wc-row': WcSvelteTag<wcRow>;
    'wc-col': WcSvelteTag<wcCol>;
    'wc-layout': WcSvelteTag<wcLayout>;
    'wc-layout-header': WcSvelteTag<wcLayoutHeader>;
    'wc-layout-content': WcSvelteTag<wcLayoutContent>;
    'wc-layout-footer': WcSvelteTag<wcLayoutFooter>;
    'wc-layout-sider': WcSvelteTag<wcLayoutSider>;
    'wc-text': WcSvelteTag<wcText>;
    // 表单
    'wc-input': WcSvelteTag<wcInput>;
    'wc-textarea': WcSvelteTag<wcTextarea>;
    'wc-select': WcSvelteTag<wcSelect>;
    'wc-option': WcSvelteTag<wcOption>;
    'wc-checkbox': WcSvelteTag<wcCheckbox>;
    'wc-radio': WcSvelteTag<wcRadio>;
    'wc-switch': WcSvelteTag<wcSwitch>;
    'wc-slider': WcSvelteTag<wcSlider>;
    'wc-input-number': WcSvelteTag<wcInputNumber>;
    'wc-date-picker': WcSvelteTag<wcDatePicker>;
    'wc-date-range-picker': WcSvelteTag<wcDateRangePicker>;
    'wc-form': WcSvelteTag<wcForm>;
    'wc-form-item': WcSvelteTag<wcFormItem>;
    'wc-upload': WcSvelteTag<wcUpload>;
    // 反馈
    'wc-dialog': WcSvelteTag<wcDialog>;
    'wc-alert': WcSvelteTag<wcAlert>;
    'wc-drawer': WcSvelteTag<wcDrawer>;
    'wc-message': WcSvelteTag<wcMessage>;
    'wc-tooltip': WcSvelteTag<wcTooltip>;
    'wc-popconfirm': WcSvelteTag<wcPopconfirm>;
    'wc-dropdown': WcSvelteTag<wcDropdown>;
    'wc-dropdown-item': WcSvelteTag<wcDropdownItem>;
    'wc-menu': WcSvelteTag<wcMenu>;
    'wc-menu-item': WcSvelteTag<wcMenuItem>;
    'wc-sub-menu': WcSvelteTag<wcSubMenu>;
    'wc-split-button': WcSvelteTag<wcSplitButton>;
    'wc-float-button': WcSvelteTag<wcFloatButton>;
    'wc-float-button-group': WcSvelteTag<wcFloatButtonGroup>;
    // 导航
    'wc-tabs': WcSvelteTag<wcTabs>;
    'wc-tab': WcSvelteTag<wcTab>;
    'wc-breadcrumb': WcSvelteTag<wcBreadcrumb>;
    'wc-breadcrumb-item': WcSvelteTag<wcBreadcrumbItem>;
    'wc-anchor': WcSvelteTag<wcAnchor>;
    'wc-anchor-link': WcSvelteTag<wcAnchorLink>;
    'wc-pagination': WcSvelteTag<wcPagination>;
    // 数据展示
    'wc-badge': WcSvelteTag<wcBadge>;
    'wc-empty': WcSvelteTag<wcEmpty>;
    'wc-progress': WcSvelteTag<wcProgress>;
    'wc-card': WcSvelteTag<wcCard>;
    'wc-list': WcSvelteTag<wcList>;
    'wc-list-item': WcSvelteTag<wcListItem>;
    'wc-table': WcSvelteTag<wcTable>;
    'wc-table-pager': WcSvelteTag<wcTablePager>;
    'wc-image': WcSvelteTag<wcImage>;
    'wc-skeleton': WcSvelteTag<wcSkeleton>;
    'wc-skeleton-item': WcSvelteTag<wcSkeletonItem>;
    'wc-collapse': WcSvelteTag<wcCollapse>;
    'wc-collapse-item': WcSvelteTag<wcCollapseItem>;
    'wc-segmented': WcSvelteTag<wcSegmented>;
    'wc-segmented-item': WcSvelteTag<wcSegmentedItem>;
  }
}

export {};
