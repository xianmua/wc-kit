import { wcDialog, wcDrawer, wcMessage, wcTooltip, wcPopconfirm } from '@wc/core';
import { createWrapper } from './create-wrapper.js';

export const WcDialog = createWrapper({
  tagName: 'wc-dialog',
  elementClass: wcDialog,
  events: {
    onWcOpen: 'wc-open',
    onWcClose: 'wc-close',
    onWcConfirm: 'wc-confirm',
    onWcCancel: 'wc-cancel',
  },
  displayName: 'WcDialog',
});

export const WcDrawer = createWrapper({
  tagName: 'wc-drawer',
  elementClass: wcDrawer,
  events: {
    onWcOpen: 'wc-open',
    onWcClose: 'wc-close',
    onWcConfirm: 'wc-confirm',
    onWcCancel: 'wc-cancel',
  },
  displayName: 'WcDrawer',
});

export const WcMessage = createWrapper({
  tagName: 'wc-message',
  elementClass: wcMessage,
  events: { onWcClose: 'wc-close' },
  displayName: 'WcMessage',
});

export const WcTooltip = createWrapper({
  tagName: 'wc-tooltip',
  elementClass: wcTooltip,
  events: { onWcShow: 'wc-show', onWcHide: 'wc-hide' },
  displayName: 'WcTooltip',
});

export const WcPopconfirm = createWrapper({
  tagName: 'wc-popconfirm',
  elementClass: wcPopconfirm,
  events: { onWcConfirm: 'wc-confirm', onWcCancel: 'wc-cancel' },
  displayName: 'WcPopconfirm',
});
