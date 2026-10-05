import { expect } from '@open-wc/testing';
import './wc-splitter.js';
import './wc-splitter-panel.js';
import type { wcSplitter } from './wc-splitter.js';
import type { wcSplitterPanel } from './wc-splitter-panel.js';

describe('wc-splitter', () => {
  /** 构造 splitter（innerHTML 拼装便于传面板属性），并 stub 宿主矩形（jsdom 布局全为 0） */
  async function create(panelsHtml: string, attrs = ''): Promise<wcSplitter> {
    const host = document.createElement('div');
    host.innerHTML = `<wc-splitter ${attrs}>${panelsHtml}</wc-splitter>`;
    document.body.appendChild(host);
    const el = host.querySelector('wc-splitter')!;
    await el.updateComplete;
    // slotchange 分配命名 slot 后 Lit 异步重渲染，再等一拍
    await el.updateComplete;
    el.getBoundingClientRect = () =>
      ({
        width: 1000,
        height: 100,
        left: 0,
        top: 0,
        right: 1000,
        bottom: 100,
        x: 0,
        y: 0,
      }) as DOMRect;
    return el;
  }

  const panels = (el: wcSplitter): wcSplitterPanel[] =>
    Array.from(el.querySelectorAll('wc-splitter-panel'));

  const dividers = (el: wcSplitter): HTMLElement[] =>
    Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('.divider'));

  const panes = (el: wcSplitter): HTMLElement[] =>
    Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('.pane'));

  /** 模拟拖拽：pointerdown → move(+dx) → up（起始 clientX = 0）；返回等待渲染完成 */
  async function dragDivider(el: wcSplitter, index: number, dx: number): Promise<void> {
    dividers(el)[index].dispatchEvent(
      new MouseEvent('pointerdown', { bubbles: true, composed: true, button: 0, clientX: 0 }),
    );
    document.dispatchEvent(new MouseEvent('pointermove', { clientX: dx }));
    document.dispatchEvent(new MouseEvent('pointerup', { clientX: dx }));
    await el.updateComplete;
  }

  it('渲染分隔条（n-1）并把面板分配进命名 slot，默认等分', async () => {
    const el = await create(
      '<wc-splitter-panel>左</wc-splitter-panel><wc-splitter-panel>中</wc-splitter-panel><wc-splitter-panel>右</wc-splitter-panel>',
    );
    expect(panels(el).length).to.equal(3);
    expect(dividers(el).length).to.equal(2);
    expect(panels(el).map((p) => p.getAttribute('slot'))).to.deep.equal([
      'panel-0',
      'panel-1',
      'panel-2',
    ]);
    panes(el).forEach((pane) => {
      expect(parseFloat(pane.style.flexBasis)).to.be.closeTo(33.33, 0.1);
    });
  });

  it('size 属性声明初始占比，其余面板平分剩余', async () => {
    const el = await create(
      '<wc-splitter-panel size="50">a</wc-splitter-panel><wc-splitter-panel>b</wc-splitter-panel>',
    );
    expect(parseFloat(panes(el)[0].style.flexBasis)).to.be.closeTo(50, 0.1);
    expect(parseFloat(panes(el)[1].style.flexBasis)).to.be.closeTo(50, 0.1);
  });

  it('拖拽调整相邻两面板占比，占比和恒为 100', async () => {
    const el = await create(
      '<wc-splitter-panel>a</wc-splitter-panel><wc-splitter-panel>b</wc-splitter-panel>',
    );
    dragDivider(el, 0, 300); // 1000px 容器 → +30%
    await el.updateComplete;
    const sum = parseFloat(panes(el)[0].style.flexBasis) + parseFloat(panes(el)[1].style.flexBasis);
    expect(sum).to.be.closeTo(100, 0.1);
    expect(parseFloat(panes(el)[0].style.flexBasis)).to.be.greaterThan(60);
  });

  it('拖拽受 min/max 约束', async () => {
    const el = await create(
      '<wc-splitter-panel min="20">a</wc-splitter-panel><wc-splitter-panel min="10">b</wc-splitter-panel>',
    );
    dragDivider(el, 0, -2000); // 强行拖到最左
    await el.updateComplete;
    expect(parseFloat(panes(el)[0].style.flexBasis)).to.be.gte(20);
    // A min 20、B min 10 → A 最大 90
    expect(parseFloat(panes(el)[0].style.flexBasis)).to.be.lte(90);
  });

  it('拖拽过程派发 wc-resize、结束派发 wc-resize-end（detail.sizes，composed）', async () => {
    const el = await create(
      '<wc-splitter-panel>a</wc-splitter-panel><wc-splitter-panel>b</wc-splitter-panel>',
    );
    let resizeCount = 0;
    let endDetail: CustomEvent | null = null;
    el.addEventListener('wc-resize', () => resizeCount++);
    el.addEventListener('wc-resize-end', (e) => (endDetail = e as CustomEvent));
    dragDivider(el, 0, 100);
    expect(resizeCount).to.be.greaterThan(0);
    expect(endDetail).to.exist;
    expect(endDetail!.detail.sizes).to.have.lengthOf(2);
    expect(endDetail!.composed).to.be.true;
  });

  it('collapsible 面板在相邻分隔条渲染折叠箭头，点击折叠/再点恢复', async () => {
    const el = await create(
      '<wc-splitter-panel collapsible>a</wc-splitter-panel><wc-splitter-panel>b</wc-splitter-panel>',
    );
    expect(dividers(el)[0].querySelectorAll('.col').length).to.equal(1); // 仅 prev 侧

    const prevBtn = dividers(el)[0].querySelector<HTMLButtonElement>('.col[data-dir="prev"]')!;
    prevBtn.click();
    await el.updateComplete;
    expect(parseFloat(panes(el)[0].style.flexBasis)).to.equal(0);
    expect(parseFloat(panes(el)[1].style.flexBasis)).to.be.closeTo(100, 0.1);

    prevBtn.click();
    await el.updateComplete;
    expect(parseFloat(panes(el)[0].style.flexBasis)).to.be.closeTo(50, 0.1);
  });

  it('不可 collapsible 面板的分隔条无箭头', async () => {
    const el = await create(
      '<wc-splitter-panel>a</wc-splitter-panel><wc-splitter-panel>b</wc-splitter-panel>',
    );
    expect(dividers(el)[0].querySelectorAll('.col').length).to.equal(0);
  });

  it('两侧面板均可折叠时分隔条渲染两枚独立箭头（分居线两侧），中央渲染拖拽把手', async () => {
    const el = await create(
      '<wc-splitter-panel collapsible>a</wc-splitter-panel><wc-splitter-panel collapsible>b</wc-splitter-panel>',
    );
    const divider = dividers(el)[0];
    const cols = divider.querySelectorAll('.col');
    expect(cols.length).to.equal(2);
    expect(cols[0].getAttribute('data-dir')).to.equal('prev');
    expect(cols[1].getAttribute('data-dir')).to.equal('next');
    expect(divider.querySelector('.grip')).to.exist;
  });

  it('不可拖拽（两侧 resizable=false）时分隔条不渲染拖拽把手', async () => {
    const el = await create(
      '<wc-splitter-panel>a</wc-splitter-panel><wc-splitter-panel>b</wc-splitter-panel>',
    );
    for (const p of panels(el)) (p as unknown as { resizable: boolean }).resizable = false;
    // 面板属性变化不会触发容器重渲染（同 collapsible 的既有限制），手动触发后断言渲染结果
    el.requestUpdate();
    await el.updateComplete;
    expect(dividers(el)[0].querySelector('.grip')).to.not.exist;
  });

  it('折叠后本侧箭头翻转为展开方向（图标与 aria-label）', async () => {
    const el = await create(
      '<wc-splitter-panel collapsible>a</wc-splitter-panel><wc-splitter-panel>b</wc-splitter-panel>',
    );
    const prevBtn = dividers(el)[0].querySelector<HTMLButtonElement>('.col[data-dir="prev"]')!;
    expect(prevBtn.getAttribute('aria-label')).to.equal('折叠上一面板');
    expect(prevBtn.querySelector('wc-icon')!.getAttribute('name')).to.equal('chevron-left');

    prevBtn.click();
    await el.updateComplete;
    expect(prevBtn.getAttribute('aria-label')).to.equal('展开上一面板');
    expect(prevBtn.querySelector('wc-icon')!.getAttribute('name')).to.equal('chevron-right');

    prevBtn.click();
    await el.updateComplete;
    expect(prevBtn.getAttribute('aria-label')).to.equal('折叠上一面板');
    expect(prevBtn.querySelector('wc-icon')!.getAttribute('name')).to.equal('chevron-left');
  });

  it('折叠首面板后分隔条仍渲染，点击箭头可恢复', async () => {
    const el = await create(
      '<wc-splitter-panel collapsible>a</wc-splitter-panel><wc-splitter-panel>b</wc-splitter-panel><wc-splitter-panel>c</wc-splitter-panel>',
    );
    const prevBtn = dividers(el)[0].querySelector<HTMLButtonElement>('.col[data-dir="prev"]')!;
    prevBtn.click();
    await el.updateComplete;
    expect(parseFloat(panes(el)[0].style.flexBasis)).to.equal(0);
    // 分隔条永不隐藏（antd 同款：重叠在同一边界）
    expect(dividers(el)[0].hasAttribute('hidden')).to.be.false;

    prevBtn.click();
    await el.updateComplete;
    expect(parseFloat(panes(el)[0].style.flexBasis)).to.be.closeTo(33.3, 0.5);
  });

  it('折叠中间面板后，相邻分隔条的箭头也能恢复', async () => {
    const el = await create(
      '<wc-splitter-panel>a</wc-splitter-panel><wc-splitter-panel collapsible>b</wc-splitter-panel><wc-splitter-panel>c</wc-splitter-panel>',
    );
    // 经 divider 0 的 next 箭头折叠 pane 1
    dividers(el)[0].querySelector<HTMLButtonElement>('.col[data-dir="next"]')!.click();
    await el.updateComplete;
    expect(parseFloat(panes(el)[1].style.flexBasis)).to.equal(0);
    // 两条分隔条重叠在同一边界
    expect(dividers(el)[0].style.left).to.equal(dividers(el)[1].style.left);
    // 经 divider 1 的 prev 箭头（指向同一面板）恢复
    dividers(el)[1].querySelector<HTMLButtonElement>('.col[data-dir="prev"]')!.click();
    await el.updateComplete;
    expect(parseFloat(panes(el)[1].style.flexBasis)).to.be.closeTo(33.3, 0.5);
  });

  it('方向键微调 ±1% 并派发 wc-resize', async () => {
    const el = await create(
      '<wc-splitter-panel min="10" size="40">a</wc-splitter-panel><wc-splitter-panel>b</wc-splitter-panel>',
    );
    const events: CustomEvent[] = [];
    el.addEventListener('wc-resize', (e) => events.push(e as CustomEvent));
    const divider = dividers(el)[0];
    divider.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await el.updateComplete;
    expect(parseFloat(panes(el)[0].style.flexBasis)).to.be.closeTo(39, 0.1);
    divider.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await el.updateComplete;
    expect(parseFloat(panes(el)[0].style.flexBasis)).to.be.closeTo(40, 0.1);
    expect(events.length).to.equal(2);
  });

  it('layout=vertical：分隔条为水平方向语义', async () => {
    const el = await create(
      '<wc-splitter-panel>a</wc-splitter-panel><wc-splitter-panel>b</wc-splitter-panel>',
      'layout="vertical"',
    );
    expect(dividers(el)[0].getAttribute('aria-orientation')).to.equal('horizontal');
  });

  it('resizable=false 面板的分隔条不可拖拽', async () => {
    const el = await create(
      '<wc-splitter-panel>a</wc-splitter-panel><wc-splitter-panel>b</wc-splitter-panel>',
    );
    (panels(el)[0] as unknown as { resizable: boolean }).resizable = false;
    let resizeCount = 0;
    el.addEventListener('wc-resize', () => resizeCount++);
    dragDivider(el, 0, 200);
    expect(resizeCount).to.equal(0);
    expect(parseFloat(panes(el)[0].style.flexBasis)).to.be.closeTo(50, 0.1);
  });
});
