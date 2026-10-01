import {
  wcButton,
  WcIcon as WcIconElement,
  wcDivider,
  wcTag,
  wcAvatar,
  wcSpace,
  wcRow,
  wcCol,
  wcText,
} from '@wc/core';
import { createWrapper } from './create-wrapper.js';

export const WcButton = createWrapper({
  tagName: 'wc-button',
  elementClass: wcButton,
  displayName: 'WcButton',
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

export const WcText = createWrapper({
  tagName: 'wc-text',
  elementClass: wcText,
  displayName: 'WcText',
});
