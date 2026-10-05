import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { FormAssociatedMixin } from '../../common/form-associated-mixin';
import { emitNativeEvent, stopInnerEvent } from '../../common/native-events';
import { radioStyles } from './wc-radio.styles';

/**
 * 单选框。同名（name）的 wc-radio 在同一表单内自动互斥分组，
 * 分组行为由浏览器的 form-associated 单选机制保证。
 *
 * @slot - 标签文本
 * @csspart base - 外层容器
 * @csspart dot - 圆点指示器
 * @csspart label - 标签文本容器
 * @fires wc-change - 选中时触发，detail.value
 * @fires input - 原生伴发事件，选中时触发
 * @fires change - 原生伴发事件，选中时触发（`type="radio"` + v-model 可直接双向绑定）
 */
export class wcRadio extends FormAssociatedMixin(LitElement) {
  static styles = [baseStyles, radioStyles];

  /** 选中状态 */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** 选中时提交到表单的值 */
  @property() value = '';

  /** 无障碍标签（无默认插槽文本时使用） */
  @property() label = '';

  /** 表单重置基准：构造时的初始选中态 */
  private initialChecked = false;

  constructor() {
    super();
    this.initialChecked = this.hasAttribute('checked');
  }

  override get defaultValue(): unknown {
    return this.initialChecked ? this.value : null;
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    if (changed.has('checked') || changed.has('value')) {
      this.internals.setFormValue(this.checked ? this.value : null);
    }
  }

  override formResetCallback(): void {
    super.formResetCallback();
    this.checked = this.initialChecked;
    this.internals.setFormValue(this.checked ? this.value : null);
  }

  /** 内层原生 radio 的 input 事件是 composed 的，阻断外泄，由宿主统一派发 */
  private handleInnerInput(e: Event): void {
    stopInnerEvent(e);
  }

  private handleChange(e: Event): void {
    stopInnerEvent(e);
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.dispatchEvent(
      new CustomEvent('wc-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
    emitNativeEvent(this, 'input');
    emitNativeEvent(this, 'change');
  }

  render() {
    return html`
      <label class="radio" part="base">
        <input
          type="radio"
          class="native"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          aria-label=${this.label || undefined}
          @input=${this.handleInnerInput}
          @change=${this.handleChange}
        />
        <span class="dot" part="dot" aria-hidden="true"><span class="inner"></span></span>
        <span class="label" part="label"><slot></slot></span>
      </label>
    `;
  }
}

if (!customElements.get('wc-radio')) {
  customElements.define('wc-radio', wcRadio);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-radio': wcRadio;
  }
}
