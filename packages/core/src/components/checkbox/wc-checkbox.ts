import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { FormAssociatedMixin } from '../../common/form-associated-mixin';
import { checkboxStyles } from './wc-checkbox.styles';

/**
 * 复选框
 *
 * @slot - 标签文本
 * @csspart base - 外层容器
 * @csspart box - 方框指示器
 * @csspart label - 标签文本容器
 * @fires wc-change - 选中状态变化时触发，detail.checked / detail.value
 */
export class wcCheckbox extends FormAssociatedMixin(LitElement) {
  static styles = [baseStyles, checkboxStyles];

  /** 选中状态 */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** 半选状态（样式上的不确定态，不改变 checked） */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  /** 选中时提交到表单的值 */
  @property() value = 'on';

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

  private handleChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    // 用户交互后解除半选态
    this.indeterminate = false;
    this.checked = input.checked;
    this.dispatchEvent(
      new CustomEvent('wc-change', {
        detail: { checked: this.checked, value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <label class="checkbox" part="base">
        <input
          type="checkbox"
          class="native"
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled}
          aria-label=${this.label || undefined}
          @change=${this.handleChange}
        />
        <span class="box" part="box" aria-hidden="true">
          <svg class="check" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8.5L6.5 12L13 4.5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="dash"></span>
        </span>
        <span class="label" part="label"><slot></slot></span>
      </label>
    `;
  }
}

if (!customElements.get('wc-checkbox')) {
  customElements.define('wc-checkbox', wcCheckbox);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-checkbox': wcCheckbox;
  }
}
