import { expect, fixture, html } from '@open-wc/testing';
import './wc-dialog.js';
import type { wcDialog } from './wc-dialog.js';

async function flush(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe('wc-dialog', () => {
  it('默认关闭，open 后展示遮罩并派发 wc-open', async () => {
    const el = await fixture<wcDialog>(html`<wc-dialog header="标题"><p>内容</p></wc-dialog>`);
    expect(el.shadowRoot!.querySelector('.overlay')!.hasAttribute('hidden')).to.be.true;
    let opened = false;
    el.addEventListener('wc-open', () => {
      opened = true;
    });
    el.show();
    await el.updateComplete;
    expect(el.open).to.be.true;
    expect(el.shadowRoot!.querySelector('.overlay')!.hasAttribute('hidden')).to.be.false;
    expect(opened).to.be.true;
  });

  it('header 属性渲染标题，closable 默认显示关闭按钮', async () => {
    const el = await fixture<wcDialog>(html`<wc-dialog header="提示" open><p>内容</p></wc-dialog>`);
    expect(el.shadowRoot!.querySelector('.title')!.textContent).to.contain('提示');
    expect(el.shadowRoot!.querySelector('[part="close-button"]')).to.exist;
    expect(el.getAttribute('role') === null).to.be.true;
    expect(el.shadowRoot!.querySelector('[role="dialog"]')).to.exist;
  });

  it('点击关闭按钮：派发可取消 wc-close 并关闭', async () => {
    const el = await fixture<wcDialog>(html`<wc-dialog header="提示" open>内容</wc-dialog>`);
    const events: string[] = [];
    el.addEventListener('wc-close', (e) => {
      events.push((e as CustomEvent).detail.reason);
    });
    el.shadowRoot!.querySelector<HTMLButtonElement>('[part="close-button"]')!.click();
    await el.updateComplete;
    expect(events).to.deep.equal(['close-btn']);
    expect(el.open).to.be.false;
    // 遮罩隐藏
    expect(el.shadowRoot!.querySelector('.overlay')!.hasAttribute('hidden')).to.be.true;
  });

  it('wc-close preventDefault 可阻止关闭', async () => {
    const el = await fixture<wcDialog>(html`<wc-dialog header="提示" open>内容</wc-dialog>`);
    el.addEventListener('wc-close', (e) => e.preventDefault());
    el.requestClose('api');
    expect(el.open).to.be.true;
  });

  it('Escape 关闭，reason 为 escape', async () => {
    const el = await fixture<wcDialog>(html`<wc-dialog header="提示" open>内容</wc-dialog>`);
    let reason = '';
    el.addEventListener('wc-close', (e) => {
      reason = (e as CustomEvent).detail.reason;
    });
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(reason).to.equal('escape');
    expect(el.open).to.be.false;
  });

  it('遮罩点击默认不关闭，close-on-overlay-click 开启后关闭', async () => {
    const off = await fixture<wcDialog>(
      html`<wc-dialog header="提示" open><p>内容</p></wc-dialog>`,
    );
    off.shadowRoot!.querySelector<HTMLElement>('.overlay')!.click();
    expect(off.open).to.be.true;

    const on = await fixture<wcDialog>(
      html`<wc-dialog header="提示" open close-on-overlay-click><p>内容</p></wc-dialog>`,
    );
    on.shadowRoot!.querySelector<HTMLElement>('.overlay')!.click();
    expect(on.open).to.be.false;
  });

  it('默认页脚：确认/取消按钮派发对应事件并关闭', async () => {
    const el = await fixture<wcDialog>(html`<wc-dialog header="提示" open>内容</wc-dialog>`);
    const events: string[] = [];
    el.addEventListener('wc-confirm', () => events.push('confirm'));
    el.addEventListener('wc-cancel', () => events.push('cancel'));
    el.addEventListener('wc-close', (e) => events.push((e as CustomEvent).detail.reason));

    const buttons = el.shadowRoot!.querySelectorAll('wc-button');
    expect(buttons.length).to.equal(2);
    buttons[1]!.click();
    await el.updateComplete;
    expect(events).to.deep.equal(['confirm', 'confirm']);
    expect(el.open).to.be.false;

    el.open = true;
    await el.updateComplete;
    el.shadowRoot!.querySelectorAll('wc-button')[0]!.click();
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('footer=false 隐藏页脚', async () => {
    const el = await fixture<wcDialog>(
      html`<wc-dialog header="提示" open .footer=${false}>内容</wc-dialog>`,
    );
    expect(el.shadowRoot!.querySelector('[part="footer"]')).to.not.exist;
  });

  it('页脚插槽覆盖默认按钮', async () => {
    const el = await fixture<wcDialog>(
      html`<wc-dialog header="提示" open
        ><button slot="footer" class="custom-ok">自定义</button></wc-dialog
      >`,
    );
    // fallback 默认按钮不渲染（仍存在于 shadow 结构中，以 assignedElements 为准）
    const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="footer"]')!;
    expect(slot.assignedElements()).to.have.lengthOf(1);
    expect(slot.assignedElements()[0]!.classList.contains('custom-ok')).to.be.true;
  });

  it('打开时锁定 body 滚动，关闭后恢复', async () => {
    // 关闭此前测试遗留的打开对话框（fixture 卸载不触发 disconnectedCallback）
    for (const d of document.body.querySelectorAll('wc-dialog')) {
      (d as wcDialog).open = false;
    }
    await flush();
    document.body.style.overflow = '';
    const el = await fixture<wcDialog>(html`<wc-dialog header="提示"><p>内容</p></wc-dialog>`);
    el.show();
    await el.updateComplete;
    expect(document.body.style.overflow).to.equal('hidden');
    el.open = false;
    await el.updateComplete;
    await flush();
    expect(document.body.style.overflow).to.equal('');
  });

  it('closable=false 时不渲染关闭按钮与页头容器', async () => {
    const el = await fixture<wcDialog>(html`<wc-dialog open .closable=${false}>内容</wc-dialog>`);
    expect(el.shadowRoot!.querySelector('[part="close-button"]')).to.not.exist;
    expect(el.shadowRoot!.querySelector('[part="header"]')).to.not.exist;
  });

  it('暴露 part="overlay" / "base" / "header" / "body" / "footer"', async () => {
    const el = await fixture<wcDialog>(html`<wc-dialog header="标题" open>内容</wc-dialog>`);
    const root = el.shadowRoot!;
    expect(root.querySelector('[part="overlay"]')).to.exist;
    expect(root.querySelector('[part="base"]')).to.exist;
    expect(root.querySelector('[part="header"]')).to.exist;
    expect(root.querySelector('[part="body"]')).to.exist;
    expect(root.querySelector('[part="footer"]')).to.exist;
  });
});
