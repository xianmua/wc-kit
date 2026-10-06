import { expect, fixture, html } from '@open-wc/testing';
import './wc-drawer.js';
import type { wcDrawer } from './wc-drawer.js';

async function flush(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe('wc-drawer', () => {
  it('默认关闭，show() 后展示遮罩并派发 wc-open', async () => {
    const el = await fixture<wcDrawer>(html`<wc-drawer header="标题"><p>内容</p></wc-drawer>`);
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

  it('header 渲染 + role=dialog/aria-modal，closable 默认显示关闭按钮', async () => {
    const el = await fixture<wcDrawer>(html`<wc-drawer header="设置" open><p>内容</p></wc-drawer>`);
    expect(el.shadowRoot!.querySelector('.title')!.textContent).to.contain('设置');
    const panel = el.shadowRoot!.querySelector('[role="dialog"]')!;
    expect(panel.getAttribute('aria-modal')).to.equal('true');
    expect(el.shadowRoot!.querySelector('[part="close-button"]')).to.exist;
  });

  it('点击关闭按钮：派发 wc-close(close-btn) 并关闭', async () => {
    const el = await fixture<wcDrawer>(html`<wc-drawer header="设置" open>内容</wc-drawer>`);
    const reasons: string[] = [];
    el.addEventListener('wc-close', (e) => reasons.push((e as CustomEvent).detail.reason));
    el.shadowRoot!.querySelector<HTMLButtonElement>('[part="close-button"]')!.click();
    await el.updateComplete;
    expect(reasons).to.deep.equal(['close-btn']);
    expect(el.open).to.be.false;
  });

  it('wc-close preventDefault 可阻止关闭', async () => {
    const el = await fixture<wcDrawer>(html`<wc-drawer header="设置" open>内容</wc-drawer>`);
    el.addEventListener('wc-close', (e) => e.preventDefault());
    el.requestClose('api');
    expect(el.open).to.be.true;
  });

  it('Escape 关闭，reason 为 escape', async () => {
    const el = await fixture<wcDrawer>(html`<wc-drawer header="设置" open>内容</wc-drawer>`);
    let reason = '';
    el.addEventListener('wc-close', (e) => {
      reason = (e as CustomEvent).detail.reason;
    });
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(reason).to.equal('escape');
    expect(el.open).to.be.false;
  });

  it('遮罩点击默认关闭，mask-closable=false 时不关闭', async () => {
    const on = await fixture<wcDrawer>(html`<wc-drawer header="设置" open><p>内容</p></wc-drawer>`);
    on.shadowRoot!.querySelector<HTMLElement>('.overlay')!.click();
    expect(on.open).to.be.false;

    const off = await fixture<wcDrawer>(
      html`<wc-drawer header="设置" open .maskClosable=${false}><p>内容</p></wc-drawer>`,
    );
    off.shadowRoot!.querySelector<HTMLElement>('.overlay')!.click();
    expect(off.open).to.be.true;
  });

  it('默认页脚：确认/取消派发事件并关闭', async () => {
    const el = await fixture<wcDrawer>(html`<wc-drawer header="设置" open>内容</wc-drawer>`);
    const events: string[] = [];
    el.addEventListener('wc-confirm', () => events.push('confirm'));
    el.addEventListener('wc-close', (e) => events.push((e as CustomEvent).detail.reason));
    const buttons = el.shadowRoot!.querySelectorAll('wc-button');
    expect(buttons.length).to.equal(2);
    buttons[1]!.click();
    await el.updateComplete;
    expect(events).to.deep.equal(['confirm', 'confirm']);
    expect(el.open).to.be.false;
  });

  it('footer=false 隐藏页脚；页脚插槽可覆盖默认按钮', async () => {
    const noFooter = await fixture<wcDrawer>(
      html`<wc-drawer header="设置" open .footer=${false}>内容</wc-drawer>`,
    );
    expect(noFooter.shadowRoot!.querySelector('[part="footer"]')).to.not.exist;

    const custom = await fixture<wcDrawer>(
      html`<wc-drawer header="设置" open
        ><button slot="footer" class="ok">自定义</button></wc-drawer
      >`,
    );
    const slot = custom.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="footer"]')!;
    expect(slot.assignedElements()[0]!.classList.contains('ok')).to.be.true;
  });

  it('placement 反射，size 自定义值写入 CSS 变量', async () => {
    const el = await fixture<wcDrawer>(
      html`<wc-drawer placement="left" size="420" open>内容</wc-drawer>`,
    );
    expect(el.getAttribute('placement')).to.equal('left');
    expect(el.shadowRoot!.querySelector('.placement-left')).to.exist;
    expect(
      el
        .shadowRoot!.querySelector<HTMLElement>('.drawer')!
        .style.getPropertyValue('--wc-drawer-size'),
    ).to.equal('420px');
  });

  it('打开时锁定 body 滚动，关闭后恢复', async () => {
    // 关闭此前测试遗留的打开弹层（fixture 卸载不触发 disconnectedCallback）
    for (const d of document.body.querySelectorAll('wc-dialog, wc-drawer')) {
      (d as unknown as { open: boolean }).open = false;
    }
    await flush();
    document.body.style.overflow = '';
    const el = await fixture<wcDrawer>(html`<wc-drawer header="设置"><p>内容</p></wc-drawer>`);
    el.show();
    await el.updateComplete;
    expect(document.body.style.overflow).to.equal('hidden');
    el.open = false;
    await el.updateComplete;
    await flush();
    expect(document.body.style.overflow).to.equal('');
  });

  it('closable=false 时不渲染关闭按钮', async () => {
    const el = await fixture<wcDrawer>(
      html`<wc-drawer open .closable=${false} .header=${''}>内容</wc-drawer>`,
    );
    expect(el.shadowRoot!.querySelector('[part="close-button"]')).to.not.exist;
  });

  it('暴露 part="overlay" / "base" / "header" / "body" / "footer"', async () => {
    const el = await fixture<wcDrawer>(html`<wc-drawer header="设置" open>内容</wc-drawer>`);
    const root = el.shadowRoot!;
    expect(root.querySelector('[part="overlay"]')).to.exist;
    expect(root.querySelector('[part="base"]')).to.exist;
    expect(root.querySelector('[part="header"]')).to.exist;
    expect(root.querySelector('[part="body"]')).to.exist;
    expect(root.querySelector('[part="footer"]')).to.exist;
  });
});
