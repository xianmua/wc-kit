/**
 * SolidJS JSX 类型增强：让 <wc-*> 标签获得属性类型检查。
 * 由 @wc-kit/core 的元素类实例类型自动推导（Partial<T>），与核心包保持同步、零手工维护。
 *
 * Solid 对自定义元素默认把 props 设为 property（attr: 前缀才是 attribute），
 * 对象数组、函数等复杂值原样传入——与 Lit 组件天然契合。
 *
 * 在应用入口 `import '@wc-kit/solid'`（副作用导入会同时注册全部自定义元素）即可激活增强。
 */
import type { JSX } from 'solid-js';
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
 * Solid 自定义事件属性（on:wc-change 等，放宽为任意事件处理器）。
 */
type WcSolidTag<T extends HTMLElement> = Partial<T> &
  JSX.HTMLAttributes<T> & {
    [key: `on:${string}`]: unknown;
  };

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      // 基础
      'wc-button': WcSolidTag<wcButton>;
      'wc-button-group': WcSolidTag<wcButtonGroup>;
      'wc-icon': WcSolidTag<WcIcon>;
      'wc-divider': WcSolidTag<wcDivider>;
      'wc-tag': WcSolidTag<wcTag>;
      'wc-avatar': WcSolidTag<wcAvatar>;
      'wc-space': WcSolidTag<wcSpace>;
      'wc-splitter': WcSolidTag<wcSplitter>;
      'wc-splitter-panel': WcSolidTag<wcSplitterPanel>;
      'wc-row': WcSolidTag<wcRow>;
      'wc-col': WcSolidTag<wcCol>;
      'wc-layout': WcSolidTag<wcLayout>;
      'wc-layout-header': WcSolidTag<wcLayoutHeader>;
      'wc-layout-content': WcSolidTag<wcLayoutContent>;
      'wc-layout-footer': WcSolidTag<wcLayoutFooter>;
      'wc-layout-sider': WcSolidTag<wcLayoutSider>;
      'wc-text': WcSolidTag<wcText>;
      // 表单
      'wc-input': WcSolidTag<wcInput>;
      'wc-textarea': WcSolidTag<wcTextarea>;
      'wc-select': WcSolidTag<wcSelect>;
      'wc-option': WcSolidTag<wcOption>;
      'wc-checkbox': WcSolidTag<wcCheckbox>;
      'wc-radio': WcSolidTag<wcRadio>;
      'wc-switch': WcSolidTag<wcSwitch>;
      'wc-slider': WcSolidTag<wcSlider>;
      'wc-input-number': WcSolidTag<wcInputNumber>;
      'wc-date-picker': WcSolidTag<wcDatePicker>;
      'wc-date-range-picker': WcSolidTag<wcDateRangePicker>;
      'wc-form': WcSolidTag<wcForm>;
      'wc-form-item': WcSolidTag<wcFormItem>;
      'wc-upload': WcSolidTag<wcUpload>;
      // 反馈
      'wc-dialog': WcSolidTag<wcDialog>;
      'wc-alert': WcSolidTag<wcAlert>;
      'wc-drawer': WcSolidTag<wcDrawer>;
      'wc-message': WcSolidTag<wcMessage>;
      'wc-tooltip': WcSolidTag<wcTooltip>;
      'wc-popconfirm': WcSolidTag<wcPopconfirm>;
      'wc-dropdown': WcSolidTag<wcDropdown>;
      'wc-dropdown-item': WcSolidTag<wcDropdownItem>;
      'wc-menu': WcSolidTag<wcMenu>;
      'wc-menu-item': WcSolidTag<wcMenuItem>;
      'wc-sub-menu': WcSolidTag<wcSubMenu>;
      'wc-split-button': WcSolidTag<wcSplitButton>;
      'wc-float-button': WcSolidTag<wcFloatButton>;
      'wc-float-button-group': WcSolidTag<wcFloatButtonGroup>;
      // 导航
      'wc-tabs': WcSolidTag<wcTabs>;
      'wc-tab': WcSolidTag<wcTab>;
      'wc-breadcrumb': WcSolidTag<wcBreadcrumb>;
      'wc-breadcrumb-item': WcSolidTag<wcBreadcrumbItem>;
      'wc-anchor': WcSolidTag<wcAnchor>;
      'wc-anchor-link': WcSolidTag<wcAnchorLink>;
      'wc-pagination': WcSolidTag<wcPagination>;
      // 数据展示
      'wc-badge': WcSolidTag<wcBadge>;
      'wc-empty': WcSolidTag<wcEmpty>;
      'wc-progress': WcSolidTag<wcProgress>;
      'wc-card': WcSolidTag<wcCard>;
      'wc-list': WcSolidTag<wcList>;
      'wc-list-item': WcSolidTag<wcListItem>;
      'wc-table': WcSolidTag<wcTable>;
      'wc-table-pager': WcSolidTag<wcTablePager>;
      'wc-image': WcSolidTag<wcImage>;
      'wc-skeleton': WcSolidTag<wcSkeleton>;
      'wc-skeleton-item': WcSolidTag<wcSkeletonItem>;
      'wc-collapse': WcSolidTag<wcCollapse>;
      'wc-collapse-item': WcSolidTag<wcCollapseItem>;
      'wc-segmented': WcSolidTag<wcSegmented>;
      'wc-segmented-item': WcSolidTag<wcSegmentedItem>;
    }
  }
}

export {};
