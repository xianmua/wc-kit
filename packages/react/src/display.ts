import {
  wcBadge,
  wcEmpty,
  wcProgress,
  wcCard,
  wcList,
  wcListItem,
  wcTable,
  wcTablePager,
  wcImage,
  wcSkeleton,
  wcSkeletonItem,
  wcCollapse,
  wcCollapseItem,
  wcSegmented,
  wcSegmentedItem,
} from '@wc-kit/core';
import { createWrapper } from './create-wrapper.js';

export const WcBadge = createWrapper({
  tagName: 'wc-badge',
  elementClass: wcBadge,
  displayName: 'WcBadge',
});

export const WcEmpty = createWrapper({
  tagName: 'wc-empty',
  elementClass: wcEmpty,
  displayName: 'WcEmpty',
});

export const WcProgress = createWrapper({
  tagName: 'wc-progress',
  elementClass: wcProgress,
  displayName: 'WcProgress',
});

export const WcCard = createWrapper({
  tagName: 'wc-card',
  elementClass: wcCard,
  displayName: 'WcCard',
});

export const WcList = createWrapper({
  tagName: 'wc-list',
  elementClass: wcList,
  displayName: 'WcList',
});

export const WcListItem = createWrapper({
  tagName: 'wc-list-item',
  elementClass: wcListItem,
  displayName: 'WcListItem',
});

export const WcTable = createWrapper({
  tagName: 'wc-table',
  elementClass: wcTable,
  events: {
    onWcSort: 'wc-sort',
    onWcRowClick: 'wc-row-click',
    onWcExpand: 'wc-expand',
    onWcExpandedRowsChange: 'wc-expanded-rows-change',
  },
  displayName: 'WcTable',
});

export const WcTablePager = createWrapper({
  tagName: 'wc-table-pager',
  elementClass: wcTablePager,
  events: {
    onWcSort: 'wc-sort',
    onWcRowClick: 'wc-row-click',
    onWcExpand: 'wc-expand',
    onWcExpandedRowsChange: 'wc-expanded-rows-change',
    onWcChange: 'wc-change',
    onWcSizeChange: 'wc-size-change',
  },
  displayName: 'WcTablePager',
});

export const WcImage = createWrapper({
  tagName: 'wc-image',
  elementClass: wcImage,
  events: { onWcLoad: 'wc-load', onWcError: 'wc-error', onWcPreviewClose: 'wc-preview-close' },
  displayName: 'WcImage',
});

export const WcSkeleton = createWrapper({
  tagName: 'wc-skeleton',
  elementClass: wcSkeleton,
  displayName: 'WcSkeleton',
});

export const WcSkeletonItem = createWrapper({
  tagName: 'wc-skeleton-item',
  elementClass: wcSkeletonItem,
  displayName: 'WcSkeletonItem',
});

export const WcCollapse = createWrapper({
  tagName: 'wc-collapse',
  elementClass: wcCollapse,
  events: { onWcChange: 'wc-change' },
  displayName: 'WcCollapse',
});

export const WcCollapseItem = createWrapper({
  tagName: 'wc-collapse-item',
  elementClass: wcCollapseItem,
  events: { onWcChange: 'wc-change' },
  displayName: 'WcCollapseItem',
});

export const WcSegmented = createWrapper({
  tagName: 'wc-segmented',
  elementClass: wcSegmented,
  events: { onWcChange: 'wc-change' },
  displayName: 'WcSegmented',
});

export const WcSegmentedItem = createWrapper({
  tagName: 'wc-segmented-item',
  elementClass: wcSegmentedItem,
  displayName: 'WcSegmentedItem',
});
