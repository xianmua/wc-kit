import {
  wcButton,
  WcIcon as WcIconElement,
  wcButtonGroup,
  wcDivider,
  wcTag,
  wcAvatar,
  wcSpace,
  wcRow,
  wcCol,
  wcLayout,
  wcLayoutHeader,
  wcLayoutContent,
  wcLayoutFooter,
  wcLayoutSider,
  wcSplitter,
  wcSplitterPanel,
  wcText,
} from '@wc-kit/core';
import { createWrapper } from './create-wrapper.js';

export const WcButton = createWrapper({
  tagName: 'wc-button',
  elementClass: wcButton,
  displayName: 'WcButton',
});

export const WcButtonGroup = createWrapper({
  tagName: 'wc-button-group',
  elementClass: wcButtonGroup,
  displayName: 'WcButtonGroup',
});

export const WcIcon = createWrapper({
  tagName: 'wc-icon',
  elementClass: WcIconElement,
  displayName: 'WcIcon',
});

export const WcDivider = createWrapper({
  tagName: 'wc-divider',
  elementClass: wcDivider,
  displayName: 'WcDivider',
});

export const WcTag = createWrapper({
  tagName: 'wc-tag',
  elementClass: wcTag,
  events: { onWcClose: 'wc-close' },
  displayName: 'WcTag',
});

export const WcAvatar = createWrapper({
  tagName: 'wc-avatar',
  elementClass: wcAvatar,
  displayName: 'WcAvatar',
});

export const WcSpace = createWrapper({
  tagName: 'wc-space',
  elementClass: wcSpace,
  displayName: 'WcSpace',
});

export const WcRow = createWrapper({
  tagName: 'wc-row',
  elementClass: wcRow,
  displayName: 'WcRow',
});

export const WcCol = createWrapper({
  tagName: 'wc-col',
  elementClass: wcCol,
  displayName: 'WcCol',
});

export const WcLayout = createWrapper({
  tagName: 'wc-layout',
  elementClass: wcLayout,
  displayName: 'WcLayout',
});

export const WcLayoutHeader = createWrapper({
  tagName: 'wc-layout-header',
  elementClass: wcLayoutHeader,
  displayName: 'WcLayoutHeader',
});

export const WcLayoutContent = createWrapper({
  tagName: 'wc-layout-content',
  elementClass: wcLayoutContent,
  displayName: 'WcLayoutContent',
});

export const WcLayoutFooter = createWrapper({
  tagName: 'wc-layout-footer',
  elementClass: wcLayoutFooter,
  displayName: 'WcLayoutFooter',
});

export const WcLayoutSider = createWrapper({
  tagName: 'wc-layout-sider',
  elementClass: wcLayoutSider,
  events: { onWcCollapse: 'wc-collapse' },
  displayName: 'WcLayoutSider',
});

export const WcSplitter = createWrapper({
  tagName: 'wc-splitter',
  elementClass: wcSplitter,
  events: { onWcResize: 'wc-resize', onWcResizeEnd: 'wc-resize-end' },
  displayName: 'WcSplitter',
});

export const WcSplitterPanel = createWrapper({
  tagName: 'wc-splitter-panel',
  elementClass: wcSplitterPanel,
  displayName: 'WcSplitterPanel',
});

export const WcText = createWrapper({
  tagName: 'wc-text',
  elementClass: wcText,
  displayName: 'WcText',
});
