import { describe, expect, it } from 'vitest';
import tokensCss from './tokens.css?inline';

/**
 * 令牌冒烟测试：保证关键令牌存在且分层结构不被误删。
 * 新增关键语义令牌时同步在这里补断言。
 */
function extractVarNames(css: string): Set<string> {
  return new Set([...css.matchAll(/--wc-[\w-]+(?=\s*:)/g)].map((m) => m[0]));
}

describe('tokens.css', () => {
  const css = tokensCss;
  const rootBlock = css.slice(0, css.indexOf('[data-theme'));
  const darkBlock = css.slice(css.indexOf('[data-theme'));

  it('语义层关键令牌在 :root 中声明', () => {
    const required = [
      '--wc-color-primary',
      '--wc-color-primary-hover',
      '--wc-color-primary-active',
      '--wc-color-text',
      '--wc-color-text-secondary',
      '--wc-color-text-disabled',
      '--wc-color-border',
      '--wc-color-bg',
      '--wc-color-bg-container',
      '--wc-color-bg-disabled',
      '--wc-color-focus-ring',
      '--wc-font-family',
      '--wc-duration-fast',
    ];
    for (const token of required) {
      expect(extractVarNames(rootBlock).has(token), `${token} 缺失`).to.be.true;
    }
  });

  it('品牌色阶完整（50-800）', () => {
    for (const step of ['50', '100', '200', '300', '400', '500', '600', '700', '800']) {
      expect(extractVarNames(rootBlock).has(`--wc-color-brand-${step}`)).to.be.true;
    }
  });

  it('灰阶完整（50-900）', () => {
    for (const step of ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']) {
      expect(extractVarNames(rootBlock).has(`--wc-color-gray-${step}`)).to.be.true;
    }
  });

  it('功能色均有 light/base/dark 三档', () => {
    const names = extractVarNames(rootBlock);
    for (const fn of ['success', 'warning', 'error', 'info']) {
      for (const suffix of ['light', '', 'dark']) {
        expect(names.has(`--wc-color-${fn}${suffix ? `-${suffix}` : ''}`)).to.be.true;
      }
    }
  });

  it('间距令牌为 4px 基准', () => {
    const space1 = rootBlock.match(/--wc-space-1:\s*(\d+)px/);
    expect(space1?.[1]).to.equal('4');
    for (const n of [2, 3, 4, 5, 6, 8, 10, 12]) {
      expect(extractVarNames(rootBlock).has(`--wc-space-${n}`)).to.be.true;
    }
  });

  it('阴影分 3 层且暗色主题覆盖', () => {
    const names = extractVarNames(css);
    for (const n of ['1', '2', '3']) {
      expect(names.has(`--wc-shadow-${n}`)).to.be.true;
    }
    // 暗色块中覆盖阴影
    expect(extractVarNames(darkBlock).has('--wc-shadow-1')).to.be.true;
  });

  it('暗色主题覆盖 semantic 层且不引入新 primitive', () => {
    const darkVars = extractVarNames(darkBlock);
    for (const token of darkVars) {
      expect(extractVarNames(rootBlock).has(token), `暗色主题声明了 :root 不存在的令牌 ${token}`).to
        .be.true;
    }
  });

  it('z-index 分层令牌存在', () => {
    const names = extractVarNames(rootBlock);
    for (const z of ['dropdown', 'sticky', 'modal', 'message', 'tooltip']) {
      expect(names.has(`--wc-z-index-${z}`)).to.be.true;
    }
  });
});
