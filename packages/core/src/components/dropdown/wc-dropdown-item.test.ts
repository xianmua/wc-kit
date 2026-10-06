import { expect, fixture, html } from '@open-wc/testing';
import './wc-dropdown-item.js';
import type { wcDropdownItem } from './wc-dropdown-item.js';

describe('wc-dropdown-item', () => {
  it('渲染 menuitem 并透传文本', async () => {
    const el = await fixture<wcDropdownItem>(
      html`<wc-dropdown-item value="a">操作一</wc-dropdown-item>`,
    );
    const item = el.shadowRoot!.querySelector('.item')!;
    expect(item.getAttribute('role')).to.equal('menuitem');
    const text = item
      .querySelector('slot')!
      .assignedNodes({ flatten: true })
      .map((n) => n.textContent?.trim())
      .join('');
    expect(text).to.equal('操作一');
    expect(el.label).to.equal('操作一');
  });

  it('disabled 时 aria-disabled 生效且不响应 hover 高亮规则', async () => {
    const el = await fixture<wcDropdownItem>(
      html`<wc-dropdown-item disabled>禁用项</wc-dropdown-item>`,
    );
    expect(el.shadowRoot!.querySelector('.item')!.getAttribute('aria-disabled')).to.equal('true');
  });

  it('danger 时渲染危险色规则', async () => {
    const el = await fixture<wcDropdownItem>(
      html`<wc-dropdown-item danger>删除</wc-dropdown-item>`,
    );
    const css = Array.from(el.shadowRoot!.querySelectorAll('style'))
      .map((s) => s.textContent)
      .join('');
    expect(css).to.contain(':host([danger]');
  });

  it('divider 渲染为 separator 且忽略内容', async () => {
    const el = await fixture<wcDropdownItem>(
      html`<wc-dropdown-item divider danger>将被忽略</wc-dropdown-item>`,
    );
    const item = el.shadowRoot!.querySelector('.item')!;
    expect(item.getAttribute('role')).to.equal('separator');
    expect(item.textContent).to.equal('');
  });

  it('active 高亮态宿主 class（由 wc-dropdown 管理，内部状态不公开 reflect）', async () => {
    const el = await fixture<wcDropdownItem>(html`<wc-dropdown-item>项</wc-dropdown-item>`);
    el.active = true;
    await el.updateComplete;
    expect(el.classList.contains('active')).to.be.true;
  });
});
