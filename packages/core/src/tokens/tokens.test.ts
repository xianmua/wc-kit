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
      '--wc-color-overlay-hover',
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

  it('正文小号字号不重复(xsmall < small)', () => {
    const xsmall = rootBlock.match(/--wc-font-size-xsmall:\s*(\d+)px/)?.[1];
    const small = rootBlock.match(/--wc-font-size-small:\s*(\d+)px/)?.[1];
    expect(Number(xsmall)).to.be.lessThan(Number(small));
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
    for (const z of ['dropdown', 'fab', 'sticky', 'modal', 'message', 'tooltip']) {
      expect(names.has(`--wc-z-index-${z}`)).to.be.true;
    }
  });
});

describe('组件样式令牌引用完整性', () => {
  // 扫描全部组件样式源码（?raw 文本），收集「定义」与「引用」两类令牌名。
  // 背景：segmented/collapse 曾引用不存在的 --wc-duration-normal，
  // transition 声明在计算值阶段整体失效、动画无声挂掉——此类笔误由本测试拦截。
  const styleSources: Record<string, string> = {
    ...import.meta.glob('../components/**/*.styles.ts', {
      query: '?raw',
      import: 'default',
      eager: true,
    }),
    ...import.meta.glob('../styles/*.css.ts', {
      query: '?raw',
      import: 'default',
      eager: true,
    }),
  };

  // 定义池 = tokens.css + 各组件样式内的令牌声明（--wc-x:）
  const defined = extractVarNames(tokensCss);
  for (const source of Object.values(styleSources)) {
    for (const m of source.matchAll(/--wc-[\w-]+(?=\s*:)/g)) defined.add(m[0]);
  }

  // 引用检查只针对「裸引用」：var(--wc-x) 不带 fallback 时令牌必须已定义，
  // 否则该声明在计算值阶段整体失效（--wc-duration-normal 事故正是这种）。
  // 带 fallback 的引用（var(--wc-x, y)）自洽，属于可选覆盖模式，不在拦截范围。
  const bareUsed = new Set<string>();
  for (const source of Object.values(styleSources)) {
    for (const m of source.matchAll(/var\(\s*(--wc-[\w-]+)\s*([,)])/g)) {
      if (m[2] === ')') bareUsed.add(m[1]!);
    }
  }

  it('裸引用（无 fallback）的每个 --wc-* 令牌都有定义', () => {
    const missing = [...bareUsed].filter((t) => !defined.has(t));
    expect(missing, `以下令牌被裸引用但从未定义: ${missing.join(', ')}`).to.eql([]);
  });
});
