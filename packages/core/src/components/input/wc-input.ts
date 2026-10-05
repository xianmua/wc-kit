import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { FormAssociatedMixin } from '../../common/form-associated-mixin';
import { emitNativeEvent, stopInnerEvent } from '../../common/native-events';
import { hasAssignedElements } from '../../common/slot';
import { LocalizeController } from '../../i18n/localize-controller';
import '../icon/wc-icon.js';
import { inputStyles } from './wc-input.styles';

export type wcInputSize = 'small' | 'medium' | 'large';
export type wcInputStatus = 'default' | 'success' | 'warning' | 'error';

/**
 * 输入框
 *
 * @slot prefix - 前置内容（图标、文字等）
 * @slot suffix - 后置内容（清除按钮之外的区域）
 * @csspart base - 外层容器
 * @csspart input - 原生输入框
 * @csspart clear-button - 清除按钮
 * @cssprop --wc-input-height - 输入框高度
 * @fires wc-input - 输入时触发，detail.value
 * @fires wc-change - 值变更提交时触发（失焦/回车），detail.value
 * @fires wc-clear - 点击清除按钮后触发
 * @fires input - 原生伴发事件，输入/清除时触发（供框架 v-model 绑定）
 * @fires change - 原生伴发事件，值提交时触发
 */
export class wcInput extends FormAssociatedMixin(LitElement) {
  static styles = [baseStyles, inputStyles];

  private _value = '';

  /** 输入框的值（响应式属性，同时作为表单值提交） */
  @property()
  get value(): string {
    return this._value;
  }

  set value(v: string) {
    const old = this._value;
    this._value = v ?? '';
    this.requestUpdate('value', old);
  }

  /** 输入框类型（text/password/tel/url/search 等原生类型） */
  @property() type = 'text';

  /** 尺寸 */
  @property({ reflect: true }) size: wcInputSize = 'medium';

  /** 占位提示 */
  @property() placeholder = '';

  /** 无障碍标签（等价原生 aria-label） */
  @property() label = '';

  /** 最大输入长度 */
  @property({ type: Number }) maxlength?: number;

  /** 只读 */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** 显示清除按钮（有值且非禁用/只读时） */
  @property({ type: Boolean, reflect: true }) clearable = false;

  /** 校验状态（影响边框色） */
  @property({ reflect: true }) status: wcInputStatus = 'default';

  private localize = new LocalizeController(this);

  override get defaultValue(): unknown {
    return this.getAttribute('value') ?? '';
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    if (changed.has('value')) {
      this.internals.setFormValue(this.value || null);
    }
  }

  override formResetCallback(): void {
    super.formResetCallback();
    this.internals.setFormValue(this.value || null);
  }

  private handleInput(e: Event): void {
    // 阻断内层 composed input 事件外泄，统一由宿主派发
    stopInnerEvent(e);
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('wc-input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
    emitNativeEvent(this, 'input');
  }

  private handleChange(e: Event): void {
    stopInnerEvent(e);
    this.dispatchEvent(
      new CustomEvent('wc-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
    emitNativeEvent(this, 'change');
  }

  private handleClear(e: MouseEvent): void {
    // 阻止 mousedown 导致 input 失焦
    e.preventDefault();
    this.value = '';
    this.dispatchEvent(new CustomEvent('wc-clear', { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent('wc-change', { detail: { value: '' }, bubbles: true, composed: true }),
    );
    emitNativeEvent(this, 'input');
    emitNativeEvent(this, 'change');
    this.requestUpdate();
    // 清除后保持焦点
    this.shadowRoot!.querySelector('input')?.focus();
  }

  render() {
    const showClear = this.clearable && this.value && !this.disabled && !this.readonly;
    return html`
      <div class="input" part="base">
        <span class="affix prefix" part="prefix" ?hidden=${!this._hasPrefix}>
          <slot name="prefix" @slotchange=${this._onPrefixSlotChange}></slot>
        </span>
        <input
          part="input"
          class="inner"
          .value=${this.value}
          type=${this.type}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          placeholder=${this.placeholder}
          maxlength=${this.maxlength ?? -1}
          aria-label=${this.label || undefined}
          @input=${this.handleInput}
          @change=${this.handleChange}
        />
        ${
          showClear
            ? html`
                <button
                  type="button"
                  class="affix clear"
                  part="clear-button"
                  tabindex="-1"
                  aria-label=${this.localize.term('input.clear')}
                  @mousedown=${this.handleClear}
                >
                  <wc-icon name="close"></wc-icon>
                </button>
              `
            : ''
        }
        <span class="affix suffix" part="suffix" ?hidden=${!this._hasSuffix}>
          <slot name="suffix" @slotchange=${this._onSuffixSlotChange}></slot>
        </span>
      </div>
    `;
  }

  private _hasPrefix = false;
  private _hasSuffix = false;

  private _onPrefixSlotChange(e: Event): void {
    this._hasPrefix = hasAssignedElements(e.target as HTMLSlotElement);
    this.requestUpdate();
  }

  private _onSuffixSlotChange(e: Event): void {
    this._hasSuffix = hasAssignedElements(e.target as HTMLSlotElement);
    this.requestUpdate();
  }
}

if (!customElements.get('wc-input')) {
  customElements.define('wc-input', wcInput);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-input': wcInput;
  }
}
