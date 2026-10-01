import { expect, fixture, html } from '@open-wc/testing';
import './wc-select.js';
import './wc-option.js';
import type { wcSelect } from './wc-select.js';

/* jsdom 的 attachInternals 返回空壳 internals，替换为可断言的 mock（同 wc-input 模式） */
interface MockInternals {
  setFormValue: (...args: unknown[]) => void;
  setValidity: () => void;
  calls: unknown[][];
}

const internalsMap = new WeakMap<Element, MockInternals>();

Object.defineProperty(HTMLElement.prototype, 'attachInternals', {
  configurable: true,
  writable: true,
  value(this: HTMLElement) {
    const mock: MockInternals = {
      calls: [],
      setFormValue(...args: unknown[]) {
        mock.calls.push(args);
      },
      setValidity() {},
    };
    internalsMap.set(this, mock);
    return mock as unknown as ElementInternals;
  },
});

function getLastFormValue(el: wcSelect): unknown {
  return internalsMap.get(el)?.calls.at(-1)?.[0];
}

async function openSelect(el: wcSelect): Promise<void> {
  el.shadowRoot!.querySelector<HTMLElement>('.trigger')!.click();
  await el.updateComplete;
}

describe('wc-select', () => {
  it('默认渲染占位文案（zh-CN：请选择）', async () => {
    const el = await fixture<wcSelect>(
      html`<wc-select><wc-option value="1">北京</wc-option></wc-select>`,
    );
    expect(el.shadowRoot!.querySelector('.trigger')!.textContent).to.include('请选择');
    expect(el.placeholder).to.equal('');
  });

  it('点击触发器展开面板，点选项后收起并派发 wc-change', async () => {
    const el = await fixture<wcSelect>(html`
      <wc-select>
        <wc-option value="1">北京</wc-option>
        <wc-option value="2">上海</wc-option>
      </wc-select>
    `);
    let detail: { value?: string; label?: string } = {};
    el.addEventListener('wc-change', (e) => {
      detail = (e as CustomEvent).detail;
    });

    await openSelect(el);
    expect(el.open).to.be.true;
    expect(el.hasAttribute('open')).to.be.true;

    const options = el.querySelectorAll('wc-option');
    options[1]!.shadowRoot!.querySelector<HTMLElement>('.option')!.click();
    await el.updateComplete;

    expect(el.value).to.equal('2');
    expect(detail.value).to.equal('2');
    expect(detail.label).to.equal('上海');
    expect(el.open).to.be.false;
    // 触发器显示选中项文本
    expect(el.shadowRoot!.querySelector('.trigger')!.textContent).to.include('上海');
  });

  it('选中项标记 selected', async () => {
    const el = await fixture<wcSelect>(html`
      <wc-select value="1">
        <wc-option value="1">北京</wc-option>
        <wc-option value="2">上海</wc-option>
      </wc-select>
    `);
    await el.updateComplete;
    const [opt1, opt2] = el.querySelectorAll('wc-option');
    expect(opt1!.hasAttribute('selected')).to.be.true;
    expect(opt2!.hasAttribute('selected')).to.be.false;
  });

  it('键盘导航：ArrowDown 展开，Enter 选中，Escape 关闭', async () => {
    const el = await fixture<wcSelect>(html`
      <wc-select>
        <wc-option value="1">北京</wc-option>
        <wc-option value="2">上海</wc-option>
      </wc-select>
    `);
    const trigger = el.shadowRoot!.querySelector<HTMLElement>('.trigger')!;
    const pressKey = (key: string) =>
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true }));

    pressKey('ArrowDown');
    await el.updateComplete;
    expect(el.open).to.be.true;

    pressKey('ArrowDown'); // 移到第二项
    await el.updateComplete;
    const [opt1, opt2] = el.querySelectorAll('wc-option');
    expect(opt1!.hasAttribute('active')).to.be.false;
    expect(opt2!.hasAttribute('active')).to.be.true;

    pressKey('Enter');
    await el.updateComplete;
    expect(el.value).to.equal('2');
    expect(el.open).to.be.false;

    pressKey('ArrowDown'); // 再次展开
    await el.updateComplete;
    expect(el.open).to.be.true;
    pressKey('Escape');
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('clearable：点击清除清空值并派发事件', async () => {
    const el = await fixture<wcSelect>(html`
      <wc-select value="1" clearable>
        <wc-option value="1">北京</wc-option>
      </wc-select>
    `);
    await el.updateComplete;
    const events: string[] = [];
    el.addEventListener('wc-clear', () => events.push('clear'));
    el.addEventListener('wc-change', (e) => events.push((e as CustomEvent).detail.value));

    const clearBtn = el.shadowRoot!.querySelector<HTMLElement>('[part="clear-button"]')!;
    expect(clearBtn).to.exist;
    clearBtn.click();
    await el.updateComplete;
    expect(el.value).to.equal('');
    expect(events).to.deep.equal(['clear', '']);
  });

  it('未设 clearable 时不渲染清除按钮', async () => {
    const el = await fixture<wcSelect>(html`
      <wc-select value="1"><wc-option value="1">北京</wc-option></wc-select>
    `);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('[part="clear-button"]')).to.not.exist;
  });

  it('disabled 时不展开面板', async () => {
    const el = await fixture<wcSelect>(
      html`<wc-select disabled><wc-option value="1">北京</wc-option></wc-select>`,
    );
    await openSelect(el);
    expect(el.open).to.be.false;
    expect(el.shadowRoot!.querySelector('.trigger')!.getAttribute('tabindex')).to.equal('-1');
  });

  it('点击外部关闭面板', async () => {
    const el = await fixture<wcSelect>(
      html`<wc-select><wc-option value="1">北京</wc-option></wc-select>`,
    );
    await openSelect(el);
    expect(el.open).to.be.true;
    document.body.click();
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('禁用选项不可选中', async () => {
    const el = await fixture<wcSelect>(html`
      <wc-select>
        <wc-option value="1" disabled>北京</wc-option>
        <wc-option value="2">上海</wc-option>
      </wc-select>
    `);
    await openSelect(el);
    const opt1 = el.querySelector('wc-option')!;
    expect(opt1.hasAttribute('disabled')).to.be.true;
    opt1.shadowRoot!.querySelector<HTMLElement>('.option')!.click();
    await el.updateComplete;
    expect(el.value).to.equal('');
  });

  it('无选项时展开显示空状态文案', async () => {
    const el = await fixture<wcSelect>(html`<wc-select></wc-select>`);
    await openSelect(el);
    const empty = el.shadowRoot!.querySelector('.empty')!;
    expect(empty).to.exist;
    expect(empty.textContent).to.include('暂无数据');
  });

  it('表单关联：value 变化时调用 setFormValue', async () => {
    const el = await fixture<wcSelect>(
      html`<wc-select name="city" value="1"><wc-option value="1">北京</wc-option></wc-select>`,
    );
    expect(getLastFormValue(el)).to.equal('1');
    el.value = '';
    await el.updateComplete;
    expect(getLastFormValue(el)).to.equal(null);
  });

  it('暴露 part="trigger" / "panel"', async () => {
    const el = await fixture<wcSelect>(
      html`<wc-select><wc-option value="1">北京</wc-option></wc-select>`,
    );
    expect(el.shadowRoot!.querySelector('[part="trigger"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="panel"]')).to.exist;
  });
});
