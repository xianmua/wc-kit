import {
  wcTabs,
  wcTab,
  wcBreadcrumb,
  wcBreadcrumbItem,
  wcAnchor,
  wcAnchorLink,
  wcPagination,
  wcDropdown,
  wcDropdownItem,
  wcMenu,
  wcMenuItem,
  wcSubMenu,
  wcSplitButton,
  wcFloatButton,
  wcFloatButtonGroup,
} from '@wc-kit/core';
import { createWrapper } from './create-wrapper.js';

export const WcTabs = createWrapper({
  tagName: 'wc-tabs',
  elementClass: wcTabs,
  events: { onWcChange: 'wc-change' },
  displayName: 'WcTabs',
});

export const WcTab = createWrapper({
  tagName: 'wc-tab',
  elementClass: wcTab,
  displayName: 'WcTab',
});

export const WcBreadcrumb = createWrapper({
  tagName: 'wc-breadcrumb',
  elementClass: wcBreadcrumb,
  events: { onWcSelect: 'wc-select' },
  displayName: 'WcBreadcrumb',
});

export const WcBreadcrumbItem = createWrapper({
  tagName: 'wc-breadcrumb-item',
  elementClass: wcBreadcrumbItem,
  displayName: 'WcBreadcrumbItem',
});

export const WcAnchor = createWrapper({
  tagName: 'wc-anchor',
  elementClass: wcAnchor,
  events: { onWcChange: 'wc-change', onWcClick: 'wc-click' },
  displayName: 'WcAnchor',
});

export const WcAnchorLink = createWrapper({
  tagName: 'wc-anchor-link',
  elementClass: wcAnchorLink,
  displayName: 'WcAnchorLink',
});

export const WcPagination = createWrapper({
  tagName: 'wc-pagination',
  elementClass: wcPagination,
  events: { onWcChange: 'wc-change' },
  displayName: 'WcPagination',
});

export const WcDropdown = createWrapper({
  tagName: 'wc-dropdown',
  elementClass: wcDropdown,
  events: {
    onWcOpen: 'wc-open',
    onWcClose: 'wc-close',
    onWcSelect: 'wc-select',
  },
  displayName: 'WcDropdown',
});

export const WcDropdownItem = createWrapper({
  tagName: 'wc-dropdown-item',
  elementClass: wcDropdownItem,
  displayName: 'WcDropdownItem',
});

export const WcMenu = createWrapper({
  tagName: 'wc-menu',
  elementClass: wcMenu,
  events: { onWcSelect: 'wc-select' },
  displayName: 'WcMenu',
});

export const WcMenuItem = createWrapper({
  tagName: 'wc-menu-item',
  elementClass: wcMenuItem,
  displayName: 'WcMenuItem',
});

export const WcSubMenu = createWrapper({
  tagName: 'wc-sub-menu',
  elementClass: wcSubMenu,
  events: { onWcOpen: 'wc-open', onWcClose: 'wc-close' },
  displayName: 'WcSubMenu',
});

export const WcSplitButton = createWrapper({
  tagName: 'wc-split-button',
  elementClass: wcSplitButton,
  events: {
    onWcMainClick: 'wc-main-click',
    onWcArrowClick: 'wc-arrow-click',
    onWcSelect: 'wc-select',
    onWcOpen: 'wc-open',
    onWcClose: 'wc-close',
  },
  displayName: 'WcSplitButton',
});

export const WcFloatButton = createWrapper({
  tagName: 'wc-float-button',
  elementClass: wcFloatButton,
  displayName: 'WcFloatButton',
});

export const WcFloatButtonGroup = createWrapper({
  tagName: 'wc-float-button-group',
  elementClass: wcFloatButtonGroup,
  events: { onWcOpen: 'wc-open', onWcClose: 'wc-close' },
  displayName: 'WcFloatButtonGroup',
});
