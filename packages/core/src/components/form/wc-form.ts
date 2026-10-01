import { html, LitElement } from 'lit';
import { baseStyles } from '../../styles/base.css';
import { formStyles } from './wc-form.styles';
import type { FormValidateResult } from './types.js';
import type { wcFormItem } from './wc-form-item.js';

/**
 * 表单容器：拦截提交做整体校验，聚合校验结果。
 *
 * 用法：
 * ```html
 * <wc-form>
 *   <wc-form-item label="用户名" name="username" required>
 *     <wc-input></wc-input>
 *   </wc-form-item>
 *   <wc-button theme="primary" type="submit">提交</wc-button>
 * </wc-form>
 * ```
 * 点击 `wc-button[type=submit]` / `wc-button[type=reset]` 会触发提交流程 /
 * 重置（事件委托，按钮可以是任意层级后代）。
 *
 * @slot - 放置 wc-form-item 与按钮
 * @csspart form - 原生 form 容器
 * @fires wc-submit - 提交时触发（无论校验是否通过），detail 为 FormValidateResult
 */
export class wcForm extends LitElement {
  static styles = [baseStyles, formStyles];

  constructor() {
    super();
    this.addEventListener('click', this.onHostClick);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    // form 元素在 shadow 内，submit 会冒泡（composed）到宿主
    this.addEventListener('submit', this.onSubmit);
  }

  /** 全部表单项 */
  getItems(): wcFormItem[] {
    const slot = this.shadowRoot!.querySelector('slot');
    return (slot?.assignedElements() ?? []).filter(
      (el): el is wcFormItem => el.tagName === 'WC-FORM-ITEM',
    );
  }

  /** 按字段名取表单项 */
  getItem(name: string): wcFormItem | undefined {
    return this.getItems().find((item) => item.name === name);
  }

  /** 整体校验：逐项执行并聚合结果，失败时聚焦第一个错误控件 */
  async validate(): Promise<FormValidateResult> {
    const errors: Record<string, string> = {};
    for (const item of this.getItems()) {
      const message = await item.validate();
      if (message) errors[item.name || `field-${Object.keys(errors).length}`] = message;
    }
    const firstError = Object.values(errors)[0] ?? '';
    if (firstError) this.focusFirstError();
    return { valid: Object.keys(errors).length === 0, errors, firstError };
  }

  /** 重置全部表单项（恢复控件默认值并清除错误） */
  reset(): void {
    for (const item of this.getItems()) {
      item.reset();
    }
  }

  /** 触发提交流程（等同点击 submit 按钮） */
  async submit(): Promise<void> {
    const result = await this.validate();
    this.dispatchEvent(
      new CustomEvent('wc-submit', { detail: result, bubbles: true, composed: true }),
    );
  }

  private onSubmit = (e: Event): void => {
    e.preventDefault();
    void this.submit();
  };

  /** 委托处理 wc-button[type=submit|reset]（控件在各自 shadow 内，需用 composedPath） */
  private onHostClick = (e: MouseEvent): void => {
    const button = (e.composedPath() as Element[]).find(
      (el) => el instanceof Element && el.tagName === 'WC-BUTTON',
    );
    if (!button) return;
    const type = button.getAttribute('type');
    if (type === 'submit') {
      e.preventDefault();
      void this.submit();
    } else if (type === 'reset') {
      e.preventDefault();
      this.reset();
    }
  };

  private focusFirstError(): void {
    const control = this.getItems().find((i) => i.error)?.control as HTMLElement | undefined;
    if (!control || typeof control.focus !== 'function') return;
    control.focus();
    if (document.activeElement !== control) {
      // 自定义元素根不可聚焦时，退而聚焦其 shadow 内的原生控件
      const inner = control.shadowRoot?.querySelector<HTMLElement>(
        'input, textarea, button, [tabindex]',
      );
      inner?.focus();
    }
  }

  render() {
    return html`
      <form class="form" part="form" novalidate>
        <slot></slot>
      </form>
    `;
  }
}

if (!customElements.get('wc-form')) {
  customElements.define('wc-form', wcForm);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-form': wcForm;
  }
}
