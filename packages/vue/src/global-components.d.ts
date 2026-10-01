/**
 * Vue 3 全局组件类型增强：让 SFC 模板中的 <wc-*> 标签获得属性与事件类型检查。
 * 由 @wc/core 的元素类实例类型自动推导（Partial<T>），与核心包保持同步、零手工维护。
 */
import type { DefineComponent } from 'vue';
import type {
  wcBadge,
  wcBreadcrumb,
  wcBreadcrumbItem,
  wcButton,
  wcAvatar,
  wcCard,
  wcCheckbox,
  wcCol,
  wcDatePicker,
  wcDialog,
  wcDivider,
  wcDrawer,
  wcEmpty,
  wcForm,
  wcFormItem,
  wcInput,
  wcInputNumber,
  wcList,
  wcListItem,
  wcMessage,
  wcOption,
  wcPagination,
  wcPopconfirm,
  wcProgress,
  wcRadio,
  wcRow,
  wcSelect,
  wcSlider,
  wcSpace,
  wcSwitch,
  wcTab,
  wcTable,
  wcTabs,
  wcTag,
  wcText,
  wcTextarea,
  wcTooltip,
  WcIcon,
} from '@wc/core';

type WcComponent<T extends HTMLElement> = DefineComponent<Partial<T>>;

declare module 'vue' {
  interface GlobalComponents {
    // 基础
    'wc-button': WcComponent<wcButton>;
    'wc-icon': WcComponent<WcIcon>;
    'wc-divider': WcComponent<wcDivider>;
    'wc-tag': WcComponent<wcTag>;
    'wc-avatar': WcComponent<wcAvatar>;
    'wc-space': WcComponent<wcSpace>;
    'wc-row': WcComponent<wcRow>;
    'wc-col': WcComponent<wcCol>;
    'wc-text': WcComponent<wcText>;
    // 表单
    'wc-input': WcComponent<wcInput>;
    'wc-textarea': WcComponent<wcTextarea>;
    'wc-select': WcComponent<wcSelect>;
    'wc-option': WcComponent<wcOption>;
    'wc-checkbox': WcComponent<wcCheckbox>;
    'wc-radio': WcComponent<wcRadio>;
    'wc-switch': WcComponent<wcSwitch>;
    'wc-slider': WcComponent<wcSlider>;
    'wc-input-number': WcComponent<wcInputNumber>;
    'wc-date-picker': WcComponent<wcDatePicker>;
    'wc-form': WcComponent<wcForm>;
    'wc-form-item': WcComponent<wcFormItem>;
    // 反馈
    'wc-dialog': WcComponent<wcDialog>;
    'wc-drawer': WcComponent<wcDrawer>;
    'wc-message': WcComponent<wcMessage>;
    'wc-tooltip': WcComponent<wcTooltip>;
    'wc-popconfirm': WcComponent<wcPopconfirm>;
    // 导航
    'wc-tabs': WcComponent<wcTabs>;
    'wc-tab': WcComponent<wcTab>;
    'wc-breadcrumb': WcComponent<wcBreadcrumb>;
    'wc-breadcrumb-item': WcComponent<wcBreadcrumbItem>;
    'wc-pagination': WcComponent<wcPagination>;
    // 数据展示
    'wc-badge': WcComponent<wcBadge>;
    'wc-empty': WcComponent<wcEmpty>;
    'wc-progress': WcComponent<wcProgress>;
    'wc-card': WcComponent<wcCard>;
    'wc-list': WcComponent<wcList>;
    'wc-list-item': WcComponent<wcListItem>;
    'wc-table': WcComponent<wcTable>;
  }
}

export {};
