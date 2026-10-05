import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { FormAssociatedMixin } from '../../common/form-associated-mixin';
import { emitNativeEvent, stopInnerEvent } from '../../common/native-events';
import { LocalizeController } from '../../i18n/localize-controller';
import '../icon/wc-icon.js';
import { inputNumberStyles } from './wc-input-number.styles';

export type wcInputNumberTheme = 'row' | 'column' | 'normal';
export type wcInputNumberSize = 'small' | 'medium' | 'large';
export type wcInputNumberStatus = 'default' | 'success' | 'warning' | 'error';

/**
 * 数字输入框。取整逻辑复用 Slider 的 clamp（按 step 取整 + 浮点修正），
 * 骨架复用 Input 的 affix 布局；步进按钮与键盘（↑/↓）共用 stepBy。
 *
 * @slot - 无
 * @csspart base - 外层容器
 * @csspart input - 原生输入框
 * @csspart increment-button - 增加按钮
 * @csspart decrement-button - 减少按钮
 * @cssprop --wc-input-number-height - 高度
 * @fires wc-input - 手动输入时持续触发，detail.value 为解析结果（非法时为 NaN）
 * @fires wc-change - 值提交时触发（失焦/回车/步进），detail.value
 * @fires input - 原生伴发事件，值提交/步进时触发（供框架 v-model 绑定；编辑中不触发，等价 .lazy 语义）
 * @fires change - 原生伴发事件，值提交/步进时触发
 */
export class wcInputNumber extends FormAssociatedMixin(LitElement) {
  static styles = [baseStyles, inputNumberStyles];

  private _value = 0;

  /** 当前值 */
  @property({ type: Number })
  get value(): number {
    return this._value;
  }

  set value(v: number) {
    const old = this._value;
    this._value = this.clamp(v);
    this.requestUpdate('value', old);
  }

  /** 最小值 */
  @property({ type: Number }) min = -Infinity;

  /** 最大值 */
  @property({ type: Number }) max = Infinity;

  /** 步长 */
  @property({ type: Number }) step = 1;

  /** 步进按钮布局：row 左右 / column 右侧纵排 / normal 不显示 */
  @property({ reflect: true }) theme: wcInputNumberTheme = 'row';

  /** 尺寸 */
  @property({ reflect: true }) size: wcInputNumberSize = 'medium';

  /** 占位提示 */
  @property() placeholder = '';

  /** 无障碍标签（等价原生 aria-label） */
  @property() label = '';

  /** 只读 */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** 校验状态（影响边框色） */
  @property({ reflect: true }) status: wcInputNumberStatus = 'default';

  private localize = new LocalizeController(this);

  /** 编辑态标记：true 时输入框显示 _text，不受 value 同步干扰 */
  private _editing = false;

  /** 编辑中的原始文本 */
  private _text = '';

  /** 按 step 取整并夹在 [min, max] 区间（与 Slider 同一套算法，额外处理 ±Infinity 边界） */
  private clamp(v: number): number {
    if (Number.isNaN(v)) return this._value;
    // min 为 -Infinity 时 (v - min) 溢出为 Infinity，改以 0 为对齐基准
    const stepped = Number.isFinite(this.min)
      ? Math.round((v - this.min) / this.step) * this.step + this.min
      : Math.round(v / this.step) * this.step;
    const fixed = Number(stepped.toFixed(10));
    return Math.min(this.max, Math.max(this.min, fixed));
  }

  private formatValue(): string {
    return String(this._value);
  }

  override get defaultValue(): unknown {
    const attr = this.getAttribute('value');
    return attr ? Number(attr) : 0;
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    if (changed.has('value')) {
      this.internals.setFormValue(String(this.value));
    }
  }

  override formResetCallback(): void {
    super.formResetCallback();
    this.value = Number(this.defaultValue ?? 0);
    this.internals.setFormValue(String(this.value));
  }

  /** 步进：按钮点击与 ↑/↓ 键盘共用；值未变化时不派发事件 */
  private stepBy(direction: 1 | -1): void {
    if (this.disabled || this.readonly) return;
    const next = this.clamp(this.value + direction * this.step);
    if (next === this.value) return;
    this.value = next;
    this.internals.setFormValue(String(this.value));
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

  /** 提交编辑中的文本：空/非法回退当前值，合法则取整夹紧后提交 */
  private commit(): void {
    if (!this._editing) return;
    this._editing = false;
    this._text = '';
    const raw = this.shadowRoot!.querySelector<HTMLInputElement>('.inner')!.value.trim();
    const parsed = Number(raw);
    const next = raw === '' || Number.isNaN(parsed) ? this._value : this.clamp(parsed);
    this.requestUpdate();
    if (next === this._value) return;
    this.value = next;
    this.internals.setFormValue(String(this.value));
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

  private handleFocus(): void {
    this._editing = true;
    this._text = this.formatValue();
    this.requestUpdate();
  }

  private handleBlur(): void {
    this.commit();
  }

  private handleInput(e: Event): void {
    // 阻断内层 composed input 事件外泄：编辑中 host.value 尚未提交，
    // 泄漏出去会让框架 v-model 读到过期值，提交时由宿主统一派发
    stopInnerEvent(e);
    const input = e.target as HTMLInputElement;
    this._text = input.value;
    this.dispatchEvent(
      new CustomEvent('wc-input', {
        detail: { value: Number(input.value), text: input.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.stepBy(1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.stepBy(-1);
    } else if (e.key === 'Enter') {
      this.commit();
    }
  }

  private get canDecrement(): boolean {
    return !this.disabled && !this.readonly && this.value > this.min;
  }

  private get canIncrement(): boolean {
    return !this.disabled && !this.readonly && this.value < this.max;
  }

  render() {
    const stepBtn = (dir: 1 | -1) => {
      const increment = dir === 1;
      return html`
        <button
          type="button"
          class="step ${increment ? 'plus' : 'minus'}"
          part=${increment ? 'increment-button' : 'decrement-button'}
          tabindex="-1"
          ?disabled=${increment ? !this.canIncrement : !this.canDecrement}
          aria-label=${this.localize.term(increment ? 'inputNumber.increment' : 'inputNumber.decrement')}
          @click=${() => this.stepBy(dir)}
        >
          <wc-icon name=${increment ? 'plus' : 'minus'}></wc-icon>
        </button>
      `;
    };

    const inner = html`
      <input
        part="input"
        class="inner"
        type="text"
        inputmode="decimal"
        .value=${this._editing ? this._text : this.formatValue()}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        placeholder=${this.placeholder}
        aria-label=${this.label || undefined}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        @input=${this.handleInput}
        @keydown=${this.handleKeydown}
      />
    `;

    if (this.theme === 'normal') {
      return html`<div class="number" part="base">${inner}</div>`;
    }
    if (this.theme === 'column') {
      return html`
        <div class="number" part="base">
          ${inner}
          <span class="stepper" part="stepper"> ${stepBtn(1)}${stepBtn(-1)} </span>
        </div>
      `;
    }
    return html` <div class="number" part="base">${stepBtn(-1)}${inner}${stepBtn(1)}</div> `;
  }
}

if (!customElements.get('wc-input-number')) {
  customElements.define('wc-input-number', wcInputNumber);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-input-number': wcInputNumber;
  }
}
