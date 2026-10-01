/**
 * 表单校验规则与结果类型。declarative 规则（required/min/max/...）与
 * 自定义 validator 可混合使用；多个规则按顺序校验，命中第一条即停。
 */
export interface FormRule {
  /** 必填（空字符串 / null / undefined 视为空） */
  required?: boolean;
  /** 数值下限（Number(value) 比较） */
  min?: number;
  /** 数值上限 */
  max?: number;
  /** 字符串最小长度 */
  minLength?: number;
  /** 字符串最大长度 */
  maxLength?: number;
  /** 正则校验（字符串按新 RegExp 解析） */
  pattern?: string | RegExp;
  /**
   * 自定义校验器：返回 false 或非空字符串表示失败；
   * 返回字符串时直接作为错误消息。支持异步（Promise）。
   */
  validator?: (value: unknown) => boolean | string | Promise<boolean | string>;
  /** 该规则失败时的自定义消息，缺省取 i18n 文案 */
  message?: string;
}

/** wc-form.validate() 的返回结果 */
export interface FormValidateResult {
  valid: boolean;
  /** name → 错误消息 */
  errors: Record<string, string>;
  /** 第一条错误消息，全通过时为空字符串 */
  firstError: string;
}
