import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.css';
import { FormAssociatedMixin } from '../../common/form-associated-mixin';
import { emitNativeEvent } from '../../common/native-events';
import { OutsideClickController } from '../../common/outside-click';
import { LocalizeController } from '../../i18n/localize-controller';
import '../icon/wc-icon.js';
import './wc-option.js';
import { selectStyles } from './wc-select.styles';
import type { wcOption } from './wc-option.js';

export type wcSelectSize = 'small' | 'medium' | 'large';
export type wcSelectStatus = 'default' | 'success' | 'warning' | 'error';

/**
 * 选择器（单选）
 *
 * @slot - 默认插槽，放置 <wc-option>
 * @csspart base - 外层容器
 * @csspart trigger - 触发器
 * @csspart value - 选中文本
 * @csspart panel - 下拉面板
 * @cssprop --wc-select-height - 触发器高度
 * @fires wc-change - 选中值变化时触发，detail.value / detail.label
 * @fires wc-clear - 点击清除按钮后触发
 * @fires input - 原生伴发事件，选中/清除时触发（供框架 v-model 绑定）
 * @fires change - 原生伴发事件，选中/清除时触发
 */
export class wcSelect extends FormAssociatedMixin(LitElement) {
  static styles = [baseStyles, selectStyles];

  private _value = '';

  /** 当前选中值 */
  @property()
  get value(): string {
    return this._value;
  }

  set value(v: string) {
    const old = this._value;
    this._value = v ?? '';
    this.requestUpdate('value', old);
  }

  /** 占位提示，默认取 i18n 文案 */
  @property() placeholder = '';

  /** 尺寸 */
  @property({ reflect: true }) size: wcSelectSize = 'medium';

  /** 校验状态（影响边框色） */
  @property({ reflect: true }) status: wcSelectStatus = 'default';

  /** 可清除 */
  @property({ type: Boolean, reflect: true }) clearable = false;

  /** 下拉面板是否展开（内部状态） */
  @property({ type: Boolean, reflect: true }) open = false;

  /** 键盘导航高亮索引（-1 表示无） */
  private activeIndex = -1;

  private localize = new LocalizeController(this);

  private uid = `wc-select-${Math.random().toString(36).slice(2, 8)}`;

  private assignedOptions: wcOption[] = [];

  constructor() {
    super();
    this.addEventListener('keydown', this.handleKeydown);
  }

  override get defaultValue(): unknown {
    return this.getAttribute('value') ?? '';
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    if (changed.has('value')) {
      this.syncOptions();
      this.internals.setFormValue(this.value || null);
    }
  }

  override formResetCallback(): void {
    super.formResetCallback();
    this.value = String(this.defaultValue ?? '');
    this.internals.setFormValue(this.value || null);
  }

  /** 面板中的选项列表 */
  private get enabledOptions(): wcOption[] {
    return this.assignedOptions.filter((o) => !o.disabled);
  }

  private get selectedLabel(): string {
    return this.assignedOptions.find((o) => o.value === this.value)?.label ?? '';
  }

  private get displayText(): string {
    return this.value
      ? this.selectedLabel
      : this.placeholder || this.localize.term('select.placeholder');
  }

  private onSlotChange(e: Event): void {
    this.assignedOptions = (e.target as HTMLSlotElement)
      .assignedElements()
      .filter((el): el is wcOption => el.tagName === 'WC-OPTION');
    // 为键盘导航分配 id
    this.assignedOptions.forEach((o, i) => o.setAttribute('id', `${this.uid}-opt-${i}`));
    this.syncOptions();
    this.requestUpdate();
  }

  private syncOptions(): void {
    for (const o of this.assignedOptions) {
      o.selected = !o.disabled && o.value === this.value;
    }
  }

  /* ---------- 开合 ---------- */

  private show(): void {
    if (this.disabled || this.open) return;
    this.open = true;
    // 高亮定位到已选中项，否则第一项
    const selectedIdx = this.enabledOptions.findIndex((o) => o.value === this.value);
    this.activeIndex = selectedIdx >= 0 ? selectedIdx : this.enabledOptions.length ? 0 : -1;
    this.scrollToActive();
  }

  private hide(): void {
    if (!this.open) return;
    this.open = false;
    this.activeIndex = -1;
  }

  private toggle(): void {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  private outsideClick = new OutsideClickController(this, () => this.hide());

  private onTriggerClick(): void {
    this.toggle();
  }

  private onPanelClick(e: MouseEvent): void {
    const opt = (e.target as Element).closest('wc-option') as wcOption | null;
    if (opt && !opt.disabled) {
      this.selectOption(opt);
    }
  }

  private selectOption(opt: wcOption): void {
    this.value = opt.value;
    this.hide();
    this.dispatchEvent(
      new CustomEvent('wc-change', {
        detail: { value: this.value, label: opt.label },
        bubbles: true,
        composed: true,
      }),
    );
    emitNativeEvent(this, 'input');
    emitNativeEvent(this, 'change');
  }

  private handleClear(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.value = '';
    this.hide();
    this.dispatchEvent(new CustomEvent('wc-clear', { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent('wc-change', {
        detail: { value: '', label: '' },
        bubbles: true,
        composed: true,
      }),
    );
    emitNativeEvent(this, 'input');
    emitNativeEvent(this, 'change');
  }

  /* ---------- 键盘导航 ---------- */

  private handleKeydown = (e: KeyboardEvent): void => {
    if (this.disabled) return;
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (this.open && this.activeIndex >= 0) {
          const opt = this.enabledOptions[this.activeIndex];
          if (opt) this.selectOption(opt);
        } else {
          this.show();
        }
        break;
      case 'Escape':
        e.preventDefault();
        this.hide();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!this.open) {
          this.show();
        } else if (this.enabledOptions.length) {
          this.activeIndex = (this.activeIndex + 1) % this.enabledOptions.length;
          this.scrollToActive();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!this.open) {
          this.show();
        } else if (this.enabledOptions.length) {
          const n = this.enabledOptions.length;
          this.activeIndex = (this.activeIndex - 1 + n) % n;
          this.scrollToActive();
        }
        break;
      case 'Home':
        if (this.open && this.enabledOptions.length) {
          e.preventDefault();
          this.activeIndex = 0;
          this.scrollToActive();
        }
        break;
      case 'End':
        if (this.open && this.enabledOptions.length) {
          e.preventDefault();
          this.activeIndex = this.enabledOptions.length - 1;
          this.scrollToActive();
        }
        break;
      case 'Tab':
        this.hide();
        break;
    }
  };

  private scrollToActive(): void {
    // 同步高亮态到选项元素
    for (const o of this.assignedOptions) {
      o.active = false;
    }
    const active = this.enabledOptions[this.activeIndex];
    if (active) active.active = true;
    this.updateComplete.then(() => {
      // jsdom 未实现 scrollIntoView
      if (active && typeof active.scrollIntoView === 'function') {
        active.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  render() {
    const activeOption = this.activeIndex >= 0 ? this.enabledOptions[this.activeIndex] : undefined;
    const activeId = activeOption
      ? `${this.uid}-opt-${this.assignedOptions.indexOf(activeOption)}`
      : '';
    const showClear = this.clearable && this.value && !this.disabled;
    return html`
      <div class="select" part="base">
        <div
          class="trigger"
          part="trigger"
          role="combobox"
          tabindex=${this.disabled ? -1 : 0}
          aria-haspopup="listbox"
          aria-expanded=${this.open}
          aria-disabled=${this.disabled}
          aria-controls=${this.open ? `${this.uid}-panel` : undefined}
          aria-activedescendant=${this.open && activeId ? activeId : undefined}
          @click=${this.onTriggerClick}
        >
          <span class="value ${this.value ? '' : 'placeholder'}" part="value"
            >${this.displayText}</span
          >
          ${
            showClear
              ? html`
                  <span
                    class="clear"
                    part="clear-button"
                    role="button"
                    aria-label=${this.localize.term('input.clear')}
                    @mousedown=${(e: MouseEvent) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    @click=${this.handleClear}
                  >
                    <wc-icon name="close"></wc-icon>
                  </span>
                `
              : ''
          }
          <wc-icon name="chevron-down" class="arrow"></wc-icon>
        </div>
        <div
          class="panel"
          part="panel"
          id="${this.uid}-panel"
          role="listbox"
          ?hidden=${!this.open}
          @click=${this.onPanelClick}
        >
          <slot @slotchange=${this.onSlotChange}></slot>
          ${
            this.assignedOptions.length === 0
              ? html`<div class="empty">${this.localize.term('select.empty')}</div>`
              : ''
          }
        </div>
      </div>
    `;
  }
}

if (!customElements.get('wc-select')) {
  customElements.define('wc-select', wcSelect);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-select': wcSelect;
  }
}
