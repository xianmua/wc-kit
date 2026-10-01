import { describe, expect, it } from 'vitest';
import resetCss from '../styles/reset.css?inline';

/**
 * reset.css 冒烟测试：保证关键规则存在、焦点环策略不被误删。
 */
describe('reset.css', () => {
  const css = resetCss;

  it('包含盒模型与文本基线重置', () => {
    expect(css).to.include('box-sizing: border-box');
    expect(css).to.match(/body\s*\{[^}]*font-family:\s*var\(--wc-font-family\)/s);
    expect(css).to.match(/body\s*\{[^}]*line-height:\s*var\(--wc-line-height-base\)/s);
  });

  it('标题排版走令牌', () => {
    for (const token of ['h1', 'h2', 'h3']) {
      expect(css).to.match(new RegExp(`${token}\\s*\\{[^}]*--wc-font-size-${token}`, 's'));
    }
    expect(css).to.match(/h1,\s*h2,\s*h3,\s*h4,\s*h5,\s*h6\s*\{[^}]*--wc-font-weight-semibold/s);
  });

  it('表单元素继承字体', () => {
    expect(css).to.match(/button,\s*input,\s*select,\s*textarea\s*\{[^}]*font:\s*inherit/s);
  });

  it('focus-visible 键盘可见 + 鼠标隐藏，且使用 focus-ring 令牌', () => {
    expect(css).to.match(
      /:focus-visible\s*\{[^}]*outline:\s*2px solid var\(--wc-color-focus-ring\)/s,
    );
    expect(css).to.match(/:focus:not\(:focus-visible\)\s*\{[^}]*outline:\s*none/s);
  });

  it('颜色一律引用令牌，不允许硬编码色值', () => {
    // 排除注释后检查 hex / rgb 裸值
    const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
    expect(withoutComments).to.not.match(/#[0-9a-fA-F]{3,8}\b/);
    expect(withoutComments).to.not.match(/rgba?\(\s*\d/);
  });
});
