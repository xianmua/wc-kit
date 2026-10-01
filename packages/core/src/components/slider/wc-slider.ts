import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { FormAssociatedMixin } from '../../common/form-associated-mixin';
import { sliderStyles } from './wc-slider.styles';

/**
 * 滑块（单值）。键盘导航与 a11y 由隐藏的原生 input[type=range] 提供
 * （方向键 ±step、PageUp/Down 翻页、Home/End 边界）。
 *
 * @csspart base - 外层容器
 * @csspart track - 轨道
 * @csspart fill - 已滑过部分
 * @csspart thumb - 滑块按钮
 * @fires wc-input - 拖动过程中持续触发，detail.value
 * @fires wc-change - 松手提交时触发，detail.value
 */
export class wcSlider extends FormAssociatedMixin(LitElement) {
  static styles = [baseStyles, sliderStyles];

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
  @property({ type: Number }) min = 0;

  /** 最大值 */
  @property({ type: Number }) max = 100;

  /** 步长 */
  @property({ type: Number }) step = 1;

  /** 无障碍标签 */
  @property() label = '';

  /** 按 step 取整并夹在 [min, max] 区间 */
  private clamp(v: number): number {
    if (Number.isNaN(v)) return this._value;
    const stepped = Math.round((v - this.min) / this.step) * this.step + this.min;
    const fixed = Number(stepped.toFixed(10));
    return Math.min(this.max, Math.max(this.min, fixed));
  }

  private get percent(): number {
    if (this.max === this.min) return 0;
    return ((this.value - this.min) / (this.max - this.min)) * 100;
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

  private handleInput(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.value = Number(input.value);
    this.dispatchEvent(
      new CustomEvent('wc-input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleChange(): void {
    this.dispatchEvent(
      new CustomEvent('wc-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="slider" part="base">
        <div class="track" part="track">
          <div class="fill" part="fill" style="width: ${this.percent}%"></div>
        </div>
        <div class="thumb" part="thumb" style="left: ${this.percent}%"></div>
        <input
          type="range"
          class="native"
          min=${this.min}
          max=${this.max}
          step=${this.step}
          .value=${String(this.value)}
          ?disabled=${this.disabled}
          aria-label=${this.label || undefined}
          @input=${this.handleInput}
          @change=${this.handleChange}
        />
      </div>
    `;
  }
}

if (!customElements.get('wc-slider')) {
  customElements.define('wc-slider', wcSlider);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-slider': wcSlider;
  }
}
