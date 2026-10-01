/**
 * 文案条目使用扁平的点分 key（如 'select.placeholder'），
 * 按组件名分组命名，新增文案时同步补充所有内置语言包（RULES.md 第 11 条）。
 */
export type WcTranslations = Record<string, string>;

/** 内置语言包默认结构类型，自定义语言包只需提供差异部分 */
export type WcPartialTranslations = Partial<WcTranslations>;
