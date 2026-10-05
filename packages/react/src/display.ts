import {
  wcBadge,
  wcEmpty,
  wcProgress,
  wcCard,
  wcList,
  wcListItem,
  wcTable,
  wcImage,
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
  events: { onWcSort: 'wc-sort', onWcRowClick: 'wc-row-click' },
  displayName: 'WcTable',
});

export const WcImage = createWrapper({
  tagName: 'wc-image',
  elementClass: wcImage,
  events: { onWcLoad: 'wc-load', onWcError: 'wc-error', onWcPreviewClose: 'wc-preview-close' },
  displayName: 'WcImage',
});
