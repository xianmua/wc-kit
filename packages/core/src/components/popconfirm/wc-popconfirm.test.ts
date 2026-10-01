import { expect, fixture, html } from '@open-wc/testing';
import './wc-popconfirm.js';
import type { wcPopconfirm } from './wc-popconfirm.js';

describe('wc-popconfirm', () => {
  it('默认关闭，属性默认值正确', async () => {
    const el = await fixture<wcPopconfirm>(
      html`<wc-popconfirm content="确认删除？"><button>删除</button></wc-popconfirm>`,
    );
    expect(el.open).to.be.false;
    expect(el.placement).to.equal('top');
    expect(el.theme).to.equal('primary');
    expect(el.icon).to.equal('warning');
    expect(el.shadowRoot!.querySelector('.panel')!.hasAttribute('data-open')).to.be.false;
  });

  it('点击触发打开，再点关闭；open 反射', async () => {
    const el = await fixture<wcPopconfirm>(
      html`<wc-popconfirm content="确认删除？"><button>删除</button></wc-popconfirm>`,
    );
    const trigger = el.shadowRoot!.querySelector('.trigger')!;
    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.open).to.be.true;
    expect(el.hasAttribute('open')).to.be.true;
    expect(trigger.getAttribute('aria-describedby')).to.match(/^wc-popconfirm-panel-/);

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('确认按钮派发 wc-confirm 并关闭', async () => {
    const el = await fixture<wcPopconfirm>(
      html`<wc-popconfirm content="确认删除？" open><button>删除</button></wc-popconfirm>`,
    );
    const events: string[] = [];
    el.addEventListener('wc-confirm', () => events.push('confirm'));
    el.shadowRoot!.querySelector<HTMLElement>('[part="confirm-button"]')!.click();
    expect(events).to.deep.equal(['confirm']);
    expect(el.open).to.be.false;
  });

  it('取消按钮派发 wc-cancel 并关闭', async () => {
    const el = await fixture<wcPopconfirm>(
      html`<wc-popconfirm content="确认删除？" open><button>删除</button></wc-popconfirm>`,
    );
    const events: string[][] = [];
    el.addEventListener('wc-cancel', (e) => events.push([(e as CustomEvent).detail.reason]));
    el.shadowRoot!.querySelectorAll<HTMLElement>('.actions wc-button')[0]!.click();
    expect(events).to.deep.equal([['button']]);
    expect(el.open).to.be.false;
  });

  it('默认文案来自 i18n，confirm-text/cancel-text 可覆盖', async () => {
    const el = await fixture<wcPopconfirm>(
      html`<wc-popconfirm content="确认删除？" open><button>删除</button></wc-popconfirm>`,
    );
    const buttons = el.shadowRoot!.querySelectorAll('wc-button');
    expect(buttons[0]!.textContent).to.contain('取消');
    expect(buttons[1]!.textContent).to.contain('确认');

    const custom = await fixture<wcPopconfirm>(
      html`<wc-popconfirm content="确认删除？" open confirm-text="删掉" cancel-text="再想想"
        ><button>删除</button></wc-popconfirm
      >`,
    );
    const customButtons = custom.shadowRoot!.querySelectorAll('wc-button');
    expect(customButtons[0]!.textContent).to.contain('再想想');
    expect(customButtons[1]!.textContent).to.contain('删掉');
  });

  it('document 外部点击取消（reason=outside）', async () => {
    const el = await fixture<wcPopconfirm>(
      html`<wc-popconfirm content="确认删除？" open><button>删除</button></wc-popconfirm>`,
    );
    const reasons: string[] = [];
    el.addEventListener('wc-cancel', (e) => reasons.push((e as CustomEvent).detail.reason));
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    expect(reasons).to.deep.equal(['outside']);
    expect(el.open).to.be.false;
  });

  it('Escape 取消（reason=escape）', async () => {
    const el = await fixture<wcPopconfirm>(
      html`<wc-popconfirm content="确认删除？" open><button>删除</button></wc-popconfirm>`,
    );
    const reasons: string[] = [];
    el.addEventListener('wc-cancel', (e) => reasons.push((e as CustomEvent).detail.reason));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(reasons).to.deep.equal(['escape']);
    expect(el.open).to.be.false;
  });

  it('icon 可换名称，空字符串隐藏图标', async () => {
    const el = await fixture<wcPopconfirm>(
      html`<wc-popconfirm content="提示" icon="info" open><button>删除</button></wc-popconfirm>`,
    );
    expect(el.shadowRoot!.querySelector('wc-icon')!.getAttribute('name')).to.equal('info');

    const none = await fixture<wcPopconfirm>(
      html`<wc-popconfirm content="提示" icon="" open><button>删除</button></wc-popconfirm>`,
    );
    expect(none.shadowRoot!.querySelector('[part="icon"]')).to.not.exist;
  });

  it('theme 透传确认按钮，placement 反映 side 类', async () => {
    const el = await fixture<wcPopconfirm>(
      html`<wc-popconfirm content="提示" theme="danger" placement="bottom" open
        ><button>删除</button></wc-popconfirm
      >`,
    );
    const confirmBtn = el.shadowRoot!.querySelector('[part="confirm-button"]')!;
    expect(confirmBtn.getAttribute('theme')).to.equal('danger');
    expect(el.shadowRoot!.querySelector('.panel')!.classList.contains('side-bottom')).to.be.true;
  });

  it('暴露 part="trigger" / "base" / "icon" / "actions"', async () => {
    const el = await fixture<wcPopconfirm>(
      html`<wc-popconfirm content="提示" open><button>删除</button></wc-popconfirm>`,
    );
    const root = el.shadowRoot!;
    expect(root.querySelector('[part="trigger"]')).to.exist;
    expect(root.querySelector('[part="base"]')).to.exist;
    expect(root.querySelector('[part="icon"]')).to.exist;
    expect(root.querySelector('[part="actions"]')).to.exist;
  });
});
