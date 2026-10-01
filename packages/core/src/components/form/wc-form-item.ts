import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { LocalizeController } from '../../i18n/localize-controller';
import { formStyles } from './wc-form.styles';
import type { FormRule } from './types.js';

/**
 * 表单项：label + 控件插槽 + 错误消息。
 * 控件取插槽第一个元素；自家组件（wc-input 等）与原生 input/select/textarea 均可。
 *
 * @slot - 放置单个表单控件
 * @csspart base - 外层容器
 * @csspart label - 标签
 * @csspart error - 错误消息
 * @cssprop --wc-form-label-width - 标签列宽
 */
export class wcFormItem extends LitElement {
  static styles = [baseStyles, formStyles];

  /** 字段名（提交与校验结果映射的键） */
  @property() name = '';

  /** 标签文本 */
  @property() label = '';

  /** 必填（等价 rules=[{required:true}]，同时渲染红色星号） */
  @property({ type: Boolean, reflect: true }) required = false;

  /** 数值下限 */
  @property({ type: Number }) min?: number;

  /** 数值上限 */
  @property({ type: Number }) max?: number;

  /** 字符串最小长度 */
  @property({ type: Number, attribute: 'min-length' }) minLength?: number;

  /** 字符串最大长度 */
  @property({ type: Number, attribute: 'max-length' }) maxLength?: number;

  /** 正则校验 */
  @property() pattern = '';

  /** 完整规则列表（attribute:false，含自定义 validator 时用 JS 设置） */
  @property({ attribute: false }) rules: FormRule[] = [];

  /** 当前错误消息（空表示通过） */
  private _error = '';

  get error(): string {
    return this._error;
  }

  private localize = new LocalizeController(this);

  constructor() {
    super();
    // 控件交互后重新校验：wc-change 冒泡组合事件；blur 不冒泡但 composed，需捕获
    this.addEventListener('wc-change', this.onControlInteract);
    this.addEventListener('blur', this.onControlInteract, true);
  }

  /** 插槽第一个元素，即表单控件 */
  get control(): Element | null {
    return this.shadowRoot!.querySelector('slot')?.assignedElements()[0] ?? null;
  }

  /** 读取控件值：兼容自家组件与原生表单元素 */
  get controlValue(): unknown {
    const c = this.control as { value?: unknown } | null;
    return c?.value ?? '';
  }

  /** 声明式属性 + rules 合并后的生效规则 */
  private get effectiveRules(): FormRule[] {
    const rules: FormRule[] = [];
    if (this.required) rules.push({ required: true });
    if (this.min !== undefined) rules.push({ min: this.min });
    if (this.max !== undefined) rules.push({ max: this.max });
    if (this.minLength !== undefined) rules.push({ minLength: this.minLength });
    if (this.maxLength !== undefined) rules.push({ maxLength: this.maxLength });
    if (this.pattern) rules.push({ pattern: this.pattern });
    return [...rules, ...this.rules];
  }

  private onControlInteract = (): void => {
    void this.validate();
  };

  /** 校验当前值：返回错误消息（空字符串表示通过），同时更新错误显示与控件状态 */
  async validate(): Promise<string> {
    const value = this.controlValue;
    for (const rule of this.effectiveRules) {
      const failed = await this.checkRule(rule, value);
      if (failed) {
        this.setError(failed);
        return failed;
      }
    }
    this.clearError();
    return '';
  }

  private async checkRule(rule: FormRule, value: unknown): Promise<string> {
    const name = this.label || this.name || '';
    const fail = (key: string, vars?: Record<string, string | number>) =>
      rule.message ?? this.localize.term(key, { name, ...vars });
    const empty = value === '' || value == null || (Array.isArray(value) && value.length === 0);

    if (rule.required && empty) return fail('form.required');
    if (empty) return '';
    if (rule.min !== undefined && Number(value) < rule.min)
      return fail('form.min', { min: rule.min });
    if (rule.max !== undefined && Number(value) > rule.max)
      return fail('form.max', { max: rule.max });
    if (rule.minLength !== undefined && String(value).length < rule.minLength)
      return fail('form.minLength', { minLength: rule.minLength });
    if (rule.maxLength !== undefined && String(value).length > rule.maxLength)
      return fail('form.maxLength', { maxLength: rule.maxLength });
    if (rule.pattern) {
      const re = typeof rule.pattern === 'string' ? new RegExp(rule.pattern) : rule.pattern;
      if (!re.test(String(value))) return fail('form.pattern');
    }
    if (rule.validator) {
      const result = await rule.validator(value);
      if (result === false) return fail('form.invalid');
      if (typeof result === 'string' && result) return result;
    }
    return '';
  }

  private setError(message: string): void {
    this._error = message;
    this.applyControlStatus();
    this.requestUpdate();
  }

  /** 清除错误显示，并恢复控件校验状态 */
  clearError(): void {
    if (!this._error) return;
    this._error = '';
    this.applyControlStatus();
    this.requestUpdate();
  }

  /** 把校验状态同步到控件（自家组件有 status 属性，原生控件跳过） */
  private applyControlStatus(): void {
    const c = this.control as { status?: string } | null;
    if (c && 'status' in c) c.status = this._error ? 'error' : 'default';
  }

  /** 重置控件值并清除错误（自家组件走 formResetCallback，原生控件清空 value） */
  reset(): void {
    const c = this.control as {
      formResetCallback?: () => void;
      value?: unknown;
    } | null;
    if (!c) return;
    if (typeof c.formResetCallback === 'function') {
      c.formResetCallback();
    } else if ('value' in c) {
      c.value = '';
    }
    this.clearError();
  }

  render() {
    return html`
      <div class="item" part="base">
        <label class="label" part="label">
          <span class="asterisk" ?hidden=${!this.required}>*</span>${this.label}
        </label>
        <div class="control" part="control">
          <slot></slot>
          <div class="error" part="error" role="alert" ?hidden=${!this._error}>${this._error}</div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('wc-form-item')) {
  customElements.define('wc-form-item', wcFormItem);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-form-item': wcFormItem;
  }
}
