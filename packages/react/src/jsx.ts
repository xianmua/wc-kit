/**
 * 原生标签的 JSX 类型增强：React 用户在 TSX 里直接写 <wc-button> 等标签也有完整类型。
 * - ref 会推导为对应的 core 元素类（如 RefObject<WcButtonElement>）
 * - 属性层面放行任意 attribute（原生自定义元素的 attribute 本就是弱类型字符串；
 *   需要严格的属性/事件类型请用本包导出的包装组件，如 <WcButton onWcClick={...} />）
 * - 新增组件时同步在 WcTags 登记一条（与 core 各组件的 HTMLElementTagNameMap 保持一致）
 *
 * 兼容 React 18（全局 JSX namespace）与 React 19（React.JSX namespace）两种类型布局。
 */
import type * as React from 'react';
import type {
  wcAlert,
  wcAnchor,
  wcAnchorLink,
  wcAvatar,
  wcBadge,
  wcBreadcrumb,
  wcBreadcrumbItem,
  wcButton,
  wcButtonGroup,
  wcCard,
  wcCheckbox,
  wcCol,
  wcCollapse,
  wcCollapseItem,
  wcDatePicker,
  wcDateRangePicker,
  wcDialog,
  wcDivider,
  wcDrawer,
  wcDropdown,
  wcDropdownItem,
  wcEmpty,
  wcFloatButton,
  wcFloatButtonGroup,
  wcForm,
  wcFormItem,
  WcIcon,
  wcImage,
  wcInput,
  wcInputNumber,
  wcList,
  wcListItem,
  wcMenu,
  wcMenuItem,
  wcMessage,
  wcOption,
  wcPagination,
  wcPopconfirm,
  wcProgress,
  wcRadio,
  wcRow,
  wcSelect,
  wcSegmented,
  wcSegmentedItem,
  wcSkeleton,
  wcSkeletonItem,
  wcSlider,
  wcSpace,
  wcSplitButton,
  wcSplitter,
  wcSplitterPanel,
  wcSubMenu,
  wcSwitch,
  wcTab,
  wcTable,
  wcTabs,
  wcTag,
  wcText,
  wcTextarea,
  wcTooltip,
  wcUpload,
} from '@wc-kit/core';

type WcIntrinsic<T extends HTMLElement> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
> &
  Record<string, any>;

interface WcTags {
  'wc-alert': WcIntrinsic<wcAlert>;
  'wc-anchor': WcIntrinsic<wcAnchor>;
  'wc-anchor-link': WcIntrinsic<wcAnchorLink>;
  'wc-avatar': WcIntrinsic<wcAvatar>;
  'wc-badge': WcIntrinsic<wcBadge>;
  'wc-breadcrumb': WcIntrinsic<wcBreadcrumb>;
  'wc-breadcrumb-item': WcIntrinsic<wcBreadcrumbItem>;
  'wc-button': WcIntrinsic<wcButton>;
  'wc-button-group': WcIntrinsic<wcButtonGroup>;
  'wc-card': WcIntrinsic<wcCard>;
  'wc-checkbox': WcIntrinsic<wcCheckbox>;
  'wc-col': WcIntrinsic<wcCol>;
  'wc-collapse': WcIntrinsic<wcCollapse>;
  'wc-collapse-item': WcIntrinsic<wcCollapseItem>;
  'wc-date-picker': WcIntrinsic<wcDatePicker>;
  'wc-date-range-picker': WcIntrinsic<wcDateRangePicker>;
  'wc-dialog': WcIntrinsic<wcDialog>;
  'wc-divider': WcIntrinsic<wcDivider>;
  'wc-drawer': WcIntrinsic<wcDrawer>;
  'wc-dropdown': WcIntrinsic<wcDropdown>;
  'wc-dropdown-item': WcIntrinsic<wcDropdownItem>;
  'wc-empty': WcIntrinsic<wcEmpty>;
  'wc-float-button': WcIntrinsic<wcFloatButton>;
  'wc-float-button-group': WcIntrinsic<wcFloatButtonGroup>;
  'wc-form': WcIntrinsic<wcForm>;
  'wc-form-item': WcIntrinsic<wcFormItem>;
  'wc-icon': WcIntrinsic<WcIcon>;
  'wc-image': WcIntrinsic<wcImage>;
  'wc-input': WcIntrinsic<wcInput>;
  'wc-input-number': WcIntrinsic<wcInputNumber>;
  'wc-list': WcIntrinsic<wcList>;
  'wc-list-item': WcIntrinsic<wcListItem>;
  'wc-menu': WcIntrinsic<wcMenu>;
  'wc-menu-item': WcIntrinsic<wcMenuItem>;
  'wc-message': WcIntrinsic<wcMessage>;
  'wc-option': WcIntrinsic<wcOption>;
  'wc-pagination': WcIntrinsic<wcPagination>;
  'wc-popconfirm': WcIntrinsic<wcPopconfirm>;
  'wc-progress': WcIntrinsic<wcProgress>;
  'wc-radio': WcIntrinsic<wcRadio>;
  'wc-row': WcIntrinsic<wcRow>;
  'wc-select': WcIntrinsic<wcSelect>;
  'wc-segmented': WcIntrinsic<wcSegmented>;
  'wc-segmented-item': WcIntrinsic<wcSegmentedItem>;
  'wc-skeleton': WcIntrinsic<wcSkeleton>;
  'wc-skeleton-item': WcIntrinsic<wcSkeletonItem>;
  'wc-slider': WcIntrinsic<wcSlider>;
  'wc-space': WcIntrinsic<wcSpace>;
  'wc-split-button': WcIntrinsic<wcSplitButton>;
  'wc-splitter': WcIntrinsic<wcSplitter>;
  'wc-splitter-panel': WcIntrinsic<wcSplitterPanel>;
  'wc-sub-menu': WcIntrinsic<wcSubMenu>;
  'wc-switch': WcIntrinsic<wcSwitch>;
  'wc-tab': WcIntrinsic<wcTab>;
  'wc-table': WcIntrinsic<wcTable>;
  'wc-tabs': WcIntrinsic<wcTabs>;
  'wc-tag': WcIntrinsic<wcTag>;
  'wc-text': WcIntrinsic<wcText>;
  'wc-textarea': WcIntrinsic<wcTextarea>;
  'wc-tooltip': WcIntrinsic<wcTooltip>;
  'wc-upload': WcIntrinsic<wcUpload>;
}

declare global {
  namespace JSX {
    // React 18 类型布局：全局 JSX namespace
    interface IntrinsicElements extends WcTags {}
  }
}

declare module 'react' {
  namespace JSX {
    // React 19 类型布局：JSX namespace 移入 react 模块
    interface IntrinsicElements extends WcTags {}
  }
}

// 导出类型使本模块被 index 引用，从而让 JSX 增强随包发布并生效
export type { WcTags };
