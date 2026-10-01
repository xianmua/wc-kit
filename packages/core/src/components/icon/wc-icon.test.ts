import { expect, fixture, html } from '@open-wc/testing';
import { registerIcon, registerIconLibrary } from '../../icons/library.js';
import { registerBuiltinIcons } from '../../icons/index.js';
import './wc-icon.js';
import type { WcIcon } from './wc-icon.js';

const CHECK_SVG = '<svg viewBox="0 0 24 24"><path d="M1 1"/></svg>';

describe('wc-icon', () => {
  beforeAll(() => {
    registerBuiltinIcons();
    registerIcon('test-custom', CHECK_SVG);
  });

  it('渲染注册表中的图标', async () => {
    const el = await fixture<WcIcon>(html`<wc-icon name="test-custom"></wc-icon>`);
    await el.updateComplete;
    const svg = el.shadowRoot!.querySelector('svg');
    expect(svg).to.exist;
    expect(svg!.getAttribute('viewBox')).to.equal('0 0 24 24');
  });

  it('渲染内置图标（registerBuiltinIcons 生效）', async () => {
    const el = await fixture<WcIcon>(html`<wc-icon name="close"></wc-icon>`);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('svg')).to.exist;
  });

  it('未注册的图标渲染为空', async () => {
    const el = await fixture<WcIcon>(html`<wc-icon name="no-such-icon"></wc-icon>`);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('svg')).to.not.exist;
  });

  it('label 提供时 role=img + aria-label，否则对读屏隐藏', async () => {
    const labeled = await fixture<WcIcon>(html`<wc-icon name="check" label="完成"></wc-icon>`);
    await labeled.updateComplete;
    const base = labeled.shadowRoot!.querySelector('[part="base"]')!;
    expect(base.getAttribute('role')).to.equal('img');
    expect(base.getAttribute('aria-label')).to.equal('完成');

    const plain = await fixture<WcIcon>(html`<wc-icon name="check"></wc-icon>`);
    await plain.updateComplete;
    const plainBase = plain.shadowRoot!.querySelector('[part="base"]')!;
    expect(plainBase.getAttribute('aria-hidden')).to.equal('true');
  });

  it('自定义图标库 resolver 生效', async () => {
    registerIconLibrary('emoji', {
      resolver: (name) => `<svg viewBox="0 0 24 24"><text>${name}</text></svg>`,
    });
    const el = await fixture<WcIcon>(html`<wc-icon library="emoji" name="smile"></wc-icon>`);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('svg text')?.textContent).to.equal('smile');
  });

  it('mutator 在注入前统一调整 SVG', async () => {
    registerIconLibrary('mutant', {
      resolver: () => CHECK_SVG,
      mutator: (svg) => svg.setAttribute('data-mutated', 'yes'),
    });
    const el = await fixture<WcIcon>(html`<wc-icon library="mutant" name="any"></wc-icon>`);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('svg')?.getAttribute('data-mutated')).to.equal('yes');
  });

  it('resolver 结果按库名+图标名缓存', async () => {
    let calls = 0;
    registerIconLibrary('cached', {
      resolver: () => {
        calls++;
        return CHECK_SVG;
      },
    });
    const el1 = await fixture<WcIcon>(html`<wc-icon library="cached" name="a"></wc-icon>`);
    await el1.updateComplete;
    const el2 = await fixture<WcIcon>(html`<wc-icon library="cached" name="a"></wc-icon>`);
    await el2.updateComplete;
    expect(calls).to.equal(1);
  });

  it('spin 属性 reflect 且可通过 CSS 选择', async () => {
    const el = await fixture<WcIcon>(html`<wc-icon name="loader" spin></wc-icon>`);
    expect(el.hasAttribute('spin')).to.be.true;
    expect(el.shadowRoot!.querySelector('svg')).to.exist;
  });

  it('src 模式通过 fetch 拉取 SVG', async () => {
    const fetchStub = async () => new Response(CHECK_SVG, { status: 200 }) as Response;
    const original = globalThis.fetch;
    globalThis.fetch = fetchStub as typeof fetch;
    try {
      const el = await fixture<WcIcon>(html`<wc-icon src="/icons/check.svg"></wc-icon>`);
      await vi.waitFor(() => {
        expect(el.shadowRoot!.querySelector('svg')).to.exist;
      });
    } finally {
      globalThis.fetch = original;
    }
  });
});
