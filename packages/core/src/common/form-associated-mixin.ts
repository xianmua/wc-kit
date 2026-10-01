import type { LitElement } from 'lit';

/* eslint-disable @typescript-eslint/no-explicit-any */
type Constructor<T = Record<string, unknown>> = new (...args: any[]) => T;

/** FormAssociatedMixin 为子类附加的成员（类型层），便于子类与使用者获得完整类型 */
export interface FormAssociatedMembers {
  /** 提交到表单的字段名 */
  name: string;
  /** 禁用状态，reflect 以支持外部 CSS 选择（如 wc-input[disabled]） */
  disabled: boolean;
  /** ElementInternals 实例，子类用于 setFormValue / setValidity */
  internals: ElementInternals;
  /** 表单控件的当前值 */
  value: unknown;
  /** 默认值，子类可覆写 */
  readonly defaultValue: unknown;
  /** 表单重置回调 */
  formResetCallback(): void;
}

/**
 * 表单关联 mixin：让组件通过 ElementInternals 接入原生 <form>。
 * 提供 name/disabled 属性与表单重置回调，符合 RULES.md 第 7 条。
 * 注意：Lit 会沿原型链合并 static properties，子类的 @property 不受影响。
 */
export function FormAssociatedMixin<T extends Constructor<LitElement>>(Base: T) {
  class FormAssociatedElement extends Base {
    static formAssociated = true;

    static properties = {
      name: { type: String },
      disabled: { type: Boolean, reflect: true },
    };

    declare name: string;
    declare disabled: boolean;

    internals!: ElementInternals;

    constructor(...args: any[]) {
      super(...args);
      this.name = '';
      this.disabled = false;
      this.internals = (this as unknown as LitElement).attachInternals();
    }

    /** 表单控件的当前值，表单类组件必须实现 */
    get value(): unknown {
      return undefined;
    }

    set value(_v: unknown) {
      // 由子类覆写
    }

    /** 表单重置时恢复默认值，子类按需覆写 */
    formResetCallback(): void {
      this.value = this.defaultValue;
    }

    /** 默认值，子类可覆写 */
    get defaultValue(): unknown {
      return undefined;
    }
  }

  return FormAssociatedElement as unknown as T & Constructor<FormAssociatedMembers>;
}
