import { wcTabs, wcTab, wcBreadcrumb, wcBreadcrumbItem, wcPagination } from '@wc-kit/core';
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

export const WcPagination = createWrapper({
  tagName: 'wc-pagination',
  elementClass: wcPagination,
  events: { onWcChange: 'wc-change' },
  displayName: 'WcPagination',
});
