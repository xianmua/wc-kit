import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { FormAssociatedMixin } from '../../common/form-associated-mixin';
import { emitNativeEvent, stopInnerEvent } from '../../common/native-events';
import '../icon/wc-icon.js';
import { textareaStyles } from './wc-textarea.styles';

export type wcTextareaStatus = 'default' | 'success' | 'warning' | 'error';

/**
 * 多行文本框
 *
 * @csspart base - 外层容器
 * @csspart textarea - 原生多行输入框
 * @csspart count - 字数统计
 * @cssprop --wc-textarea-min-height - 最小高度
 * @fires wc-input - 输入时触发，detail.value
 * @fires wc-change - 值变更提交时触发（失焦），detail.value
 * @fires input - 原生伴发事件，输入时触发（供框架 v-model 绑定）
 * @fires change - 原生伴发事件，值提交时触发
 */
export class wcTextarea extends FormAssociatedMixin(LitElement) {
  static styles = [baseStyles, textareaStyles];

  private _value = '';

  /** 文本框的值（响应式属性，同时作为表单值提交） */
  @property()
  get value(): string {
    return this._value;
  }

  set value(v: string) {
    const old = this._value;
    this._value = v ?? '';
    this.requestUpdate('value', old);
  }

  /** 占位提示 */
  @property() placeholder = '';

  /** 无障碍标签（等价原生 aria-label） */
  @property() label = '';

  /** 最大输入长度，设置后显示字数统计 */
  @property({ type: Number }) maxlength?: number;

  /** 默认行数（autosize 关闭时生效） */
  @property({ type: Number }) rows = 3;

  /** 自动按内容调整高度 */
  @property({ type: Boolean, reflect: true }) autosize = false;

  /** 只读 */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** 校验状态（影响边框色） */
  @property({ reflect: true }) status: wcTextareaStatus = 'default';

  override get defaultValue(): unknown {
    return this.getAttribute('value') ?? '';
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    if (changed.has('value')) {
      this.internals.setFormValue(this.value || null);
    }
    if (changed.has('value') && this.autosize) {
      this.autoResize();
    }
  }

  override formResetCallback(): void {
    super.formResetCallback();
    this.internals.setFormValue(this.value || null);
  }

  private handleInput(e: Event): void {
    // 阻断内层 composed input 事件外泄，统一由宿主派发
    stopInnerEvent(e);
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('wc-input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
    emitNativeEvent(this, 'input');
    if (this.autosize) {
      this.autoResize();
    }
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

  /** 按内容自适应高度：先回到 auto 再取 scrollHeight */
  private autoResize(): void {
    const ta = this.shadowRoot!.querySelector('textarea');
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${ta.scrollHeight}px`;
  }

  render() {
    return html`
      <div class="textarea" part="base">
        <textarea
          part="textarea"
          class="inner"
          .value=${this.value}
          rows=${this.rows}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          placeholder=${this.placeholder}
          maxlength=${this.maxlength ?? -1}
          aria-label=${this.label || undefined}
          @input=${this.handleInput}
          @change=${this.handleChange}
        ></textarea>
        ${
          this.maxlength
            ? html`<span class="count" part="count">${this.value.length}/${this.maxlength}</span>`
            : ''
        }
      </div>
    `;
  }
}

if (!customElements.get('wc-textarea')) {
  customElements.define('wc-textarea', wcTextarea);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-textarea': wcTextarea;
  }
}
