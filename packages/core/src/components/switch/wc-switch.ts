import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { FormAssociatedMixin } from '../../common/form-associated-mixin';
import { switchStyles } from './wc-switch.styles';

/**
 * 开关
 *
 * @slot - 标签文本
 * @csspart base - 外层容器
 * @csspart track - 轨道
 * @csspart thumb - 滑块
 * @csspart label - 标签文本容器
 * @fires wc-change - 切换时触发，detail.checked
 */
export class wcSwitch extends FormAssociatedMixin(LitElement) {
  static styles = [baseStyles, switchStyles];

  /** 开启状态 */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** 开启时提交到表单的值 */
  @property() checkedValue = 'on';

  /** 关闭时提交到表单的值（为空则不提交） */
  @property() uncheckedValue = '';

  /** 无障碍标签（无默认插槽文本时使用） */
  @property() label = '';

  /** 表单重置基准：构造时的初始状态 */
  private initialChecked = false;

  constructor() {
    super();
    this.initialChecked = this.hasAttribute('checked');
  }

  override get defaultValue(): unknown {
    return this.initialChecked ? this.checkedValue : this.uncheckedValue || null;
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    if (changed.has('checked') || changed.has('checkedValue') || changed.has('uncheckedValue')) {
      this.internals.setFormValue(this.checked ? this.checkedValue : this.uncheckedValue || null);
    }
  }

  override formResetCallback(): void {
    super.formResetCallback();
    this.checked = this.initialChecked;
    this.internals.setFormValue(this.checked ? this.checkedValue : this.uncheckedValue || null);
  }

  private handleChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.dispatchEvent(
      new CustomEvent('wc-change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <label class="switch" part="base">
        <input
          type="checkbox"
          role="switch"
          class="native"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          aria-label=${this.label || undefined}
          @change=${this.handleChange}
        />
        <span class="track" part="track" aria-hidden="true">
          <span class="thumb" part="thumb"></span>
        </span>
        <span class="label" part="label"><slot></slot></span>
      </label>
    `;
  }
}

if (!customElements.get('wc-switch')) {
  customElements.define('wc-switch', wcSwitch);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-switch': wcSwitch;
  }
}
