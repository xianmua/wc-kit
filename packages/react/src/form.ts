import {
  wcInput,
  wcTextarea,
  wcSelect,
  wcOption,
  wcCheckbox,
  wcRadio,
  wcSwitch,
  wcSlider,
  wcInputNumber,
  wcDatePicker,
  wcForm,
  wcFormItem,
} from '@wc/core';
import { createWrapper } from './create-wrapper.js';

export const WcInput = createWrapper({
  tagName: 'wc-input',
  elementClass: wcInput,
  events: { onWcInput: 'wc-input', onWcChange: 'wc-change', onWcClear: 'wc-clear' },
  displayName: 'WcInput',
});

export const WcTextarea = createWrapper({
  tagName: 'wc-textarea',
  elementClass: wcTextarea,
  events: { onWcInput: 'wc-input', onWcChange: 'wc-change' },
  displayName: 'WcTextarea',
});

export const WcSelect = createWrapper({
  tagName: 'wc-select',
  elementClass: wcSelect,
  events: { onWcChange: 'wc-change', onWcClear: 'wc-clear' },
  displayName: 'WcSelect',
});

export const WcOption = createWrapper({
  tagName: 'wc-option',
  elementClass: wcOption,
  displayName: 'WcOption',
});

export const WcCheckbox = createWrapper({
  tagName: 'wc-checkbox',
  elementClass: wcCheckbox,
  events: { onWcChange: 'wc-change' },
  displayName: 'WcCheckbox',
});

export const WcRadio = createWrapper({
  tagName: 'wc-radio',
  elementClass: wcRadio,
  events: { onWcChange: 'wc-change' },
  displayName: 'WcRadio',
});

export const WcSwitch = createWrapper({
  tagName: 'wc-switch',
  elementClass: wcSwitch,
  events: { onWcChange: 'wc-change' },
  displayName: 'WcSwitch',
});

export const WcSlider = createWrapper({
  tagName: 'wc-slider',
  elementClass: wcSlider,
  events: { onWcInput: 'wc-input', onWcChange: 'wc-change' },
  displayName: 'WcSlider',
});

export const WcInputNumber = createWrapper({
  tagName: 'wc-input-number',
  elementClass: wcInputNumber,
  events: { onWcInput: 'wc-input', onWcChange: 'wc-change' },
  displayName: 'WcInputNumber',
});

export const WcDatePicker = createWrapper({
  tagName: 'wc-date-picker',
  elementClass: wcDatePicker,
  events: { onWcChange: 'wc-change', onWcClear: 'wc-clear' },
  displayName: 'WcDatePicker',
});

export const WcForm = createWrapper({
  tagName: 'wc-form',
  elementClass: wcForm,
  events: { onWcSubmit: 'wc-submit' },
  displayName: 'WcForm',
});

export const WcFormItem = createWrapper({
  tagName: 'wc-form-item',
  elementClass: wcFormItem,
  displayName: 'WcFormItem',
});
