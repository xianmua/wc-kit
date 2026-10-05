import { expect, fixture, html } from '@open-wc/testing';
import './wc-table.js';
import type { wcTable, wcTableColumn, wcTableRow } from './wc-table.js';

const columns: wcTableColumn[] = [
  { key: 'name', title: '姓名', sortable: true },
  { key: 'age', title: '年龄', align: 'right', width: 100, sortable: true },
  { key: 'city', title: '城市', ellipsis: true },
];

const data: wcTableRow[] = [
  { name: '张三', age: 28, city: '上海' },
  { name: '李四', age: 22, city: '北京' },
  { name: '王五', age: 25, city: '深圳' },
];

describe('wc-table', () => {
  it('columns 渲染表头，data 渲染行与单元格', async () => {
    const el = await fixture<wcTable>(
      html`<wc-table .columns=${columns} .data=${data}></wc-table>`,
    );
    expect(el.shadowRoot!.querySelectorAll('th').length).to.equal(3);
    expect(el.shadowRoot!.querySelectorAll('tbody tr').length).to.equal(3);
    const firstRow = el.shadowRoot!.querySelectorAll('tbody tr')[0]!;
    expect(firstRow.querySelectorAll('td')[0]!.textContent).to.contain('张三');
    expect(firstRow.querySelectorAll('td')[1]!.textContent).to.contain('28');
  });

  it('render 函数自定义单元格', async () => {
    const withRender: wcTableColumn[] = [
      {
        key: 'age',
        title: '年龄段',
        render: (row) => (Number(row.age) >= 25 ? '年长' : '年轻'),
      },
    ];
    const el = await fixture<wcTable>(
      html`<wc-table .columns=${withRender} .data=${data}></wc-table>`,
    );
    const cells = el.shadowRoot!.querySelectorAll('tbody td');
    expect(cells[0]!.textContent).to.contain('年长');
    expect(cells[1]!.textContent).to.contain('年轻');
  });

  it('width / align / ellipsis 应用到单元格', async () => {
    const el = await fixture<wcTable>(
      html`<wc-table .columns=${columns} .data=${data}></wc-table>`,
    );
    const ageTh = el.shadowRoot!.querySelectorAll('th')[1]!;
    expect(ageTh.style.width).to.equal('100px');
    expect(ageTh.classList.contains('align-right')).to.be.true;
    const cityTd = el.shadowRoot!.querySelectorAll('tbody tr td')[2]!;
    expect(cityTd.hasAttribute('ellipsis')).to.be.true;
  });

  it('点击可排序列头循环 asc → desc → 取消，aria-sort 同步，派发 wc-sort', async () => {
    const el = await fixture<wcTable>(
      html`<wc-table .columns=${columns} .data=${data}></wc-table>`,
    );
    const sorts: Array<{ key: string; order: string | null }> = [];
    el.addEventListener('wc-sort', (e) => sorts.push((e as CustomEvent).detail));
    const nameTh = el.shadowRoot!.querySelectorAll('th')[0] as HTMLElement;

    nameTh.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('th')!.getAttribute('aria-sort')).to.equal('ascending');
    expect(sorts.at(-1)).to.deep.equal({ key: 'name', order: 'asc' });

    nameTh.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('th')!.getAttribute('aria-sort')).to.equal('descending');

    nameTh.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('th')!.hasAttribute('aria-sort')).to.be.false;
    expect(sorts.at(-1)).to.deep.equal({ key: '', order: null });

    expect(sorts.length).to.equal(3);
  });

  it('排序实际生效（数字升序，另一列切换）', async () => {
    const el = await fixture<wcTable>(
      html`<wc-table .columns=${columns} .data=${data}></wc-table>`,
    );
    const ageTh = el.shadowRoot!.querySelectorAll('th')[1] as HTMLElement;
    ageTh.click(); // asc
    await el.updateComplete;
    const ages = Array.from(el.shadowRoot!.querySelectorAll('tbody tr td:nth-child(2)')).map((td) =>
      td.textContent!.trim(),
    );
    expect(ages).to.deep.equal(['22', '25', '28']);

    ageTh.click(); // desc
    await el.updateComplete;
    const descAges = Array.from(el.shadowRoot!.querySelectorAll('tbody tr td:nth-child(2)')).map(
      (td) => td.textContent!.trim(),
    );
    expect(descAges).to.deep.equal(['28', '25', '22']);
  });

  it('不可排序列点击无反应', async () => {
    const el = await fixture<wcTable>(
      html`<wc-table .columns=${columns} .data=${data}></wc-table>`,
    );
    const sorts: unknown[] = [];
    el.addEventListener('wc-sort', (e) => sorts.push(e));
    (el.shadowRoot!.querySelectorAll('th')[2] as HTMLElement).click();
    expect(sorts).to.deep.equal([]);
  });

  it('null/undefined 单元格渲染为空', async () => {
    const cols: wcTableColumn[] = [{ key: 'missing', title: '缺失' }];
    const el = await fixture<wcTable>(
      html`<wc-table .columns=${cols} .data=${[{ a: 1 }]}></wc-table>`,
    );
    expect(el.shadowRoot!.querySelector('td')!.textContent!.trim()).to.equal('');
  });

  it('空数据回退 wc-empty，empty 插槽可覆盖', async () => {
    const el = await fixture<wcTable>(html`<wc-table .columns=${columns}></wc-table>`);
    expect(el.shadowRoot!.querySelector('tbody')!.hasAttribute('hidden')).to.be.true;
    expect(el.shadowRoot!.querySelector('.empty wc-empty')).to.exist;

    const custom = await fixture<wcTable>(html`
      <wc-table .columns=${columns}><span slot="empty">没有记录</span></wc-table>
    `);
    const assigned = (custom.shadowRoot!.querySelector('slot[name="empty"]') as HTMLSlotElement)
      .assignedNodes()
      .map((n) => n.textContent)
      .join('')
      .trim();
    expect(assigned).to.equal('没有记录');
  });

  it('loading 属性显示加载遮罩', async () => {
    const el = await fixture<wcTable>(
      html`<wc-table .columns=${columns} .data=${data} loading></wc-table>`,
    );
    expect(el.hasAttribute('loading')).to.be.true;
    const loading = el.shadowRoot!.querySelector('.loading')!;
    expect(loading.querySelector('wc-icon[name="loader"]')).to.exist;
  });

  it('行点击派发 wc-row-click（detail: row/index）', async () => {
    const el = await fixture<wcTable>(
      html`<wc-table .columns=${columns} .data=${data}></wc-table>`,
    );
    const clicks: Array<{ row: wcTableRow; index: number }> = [];
    el.addEventListener('wc-row-click', (e) => clicks.push((e as CustomEvent).detail));
    (el.shadowRoot!.querySelectorAll('tbody tr')[1] as HTMLElement).click();
    expect(clicks).to.deep.equal([{ row: data[1], index: 1 }]);
  });

  it('striped / bordered / size 反射为属性', async () => {
    const el = await fixture<wcTable>(
      html`<wc-table .columns=${columns} .data=${data} striped bordered size="small"></wc-table>`,
    );
    expect(el.hasAttribute('striped')).to.be.true;
    expect(el.hasAttribute('bordered')).to.be.true;
    expect(el.getAttribute('size')).to.equal('small');
  });

  it('part 选择器：wrapper/table/head/body/row/td/empty', async () => {
    const el = await fixture<wcTable>(
      html`<wc-table .columns=${columns} .data=${data}></wc-table>`,
    );
    for (const part of ['wrapper', 'table', 'head', 'body', 'row', 'td']) {
      expect(el.shadowRoot!.querySelector(`[part="${part}"]`)).to.exist;
    }
    const empty = await fixture<wcTable>(html`<wc-table .columns=${columns}></wc-table>`);
    expect(empty.shadowRoot!.querySelector('[part="empty"]')).to.exist;
  });

  it('data 空数组 + loading 时不渲染遮罩以外的空态冲突', async () => {
    const el = await fixture<wcTable>(
      html`<wc-table .columns=${columns} .data=${[]} loading></wc-table>`,
    );
    expect(el.shadowRoot!.querySelector('.loading')).to.exist;
    expect(el.shadowRoot!.querySelector('.empty')!.hasAttribute('hidden')).to.be.false;
  });

  it('设置 expandedRowRender 后出现展开列，点击展开/收起', async () => {
    const el = await fixture<wcTable>(html`
      <wc-table
        .columns=${columns}
        .data=${data}
        .expandedRowRender=${(row: wcTableRow) => html`<wc-table
          .columns=${columns}
          .data=${[{ name: `${row.name}的子项`, age: 1, city: '子' }]}
        ></wc-table>`}
      ></wc-table>
    `);
    expect(el.shadowRoot!.querySelectorAll('th').length).to.equal(4);
    expect(el.shadowRoot!.querySelector('.expanded-row')).to.not.exist;

    const btn = el.shadowRoot!.querySelector('.expand-btn') as HTMLButtonElement;
    expect(btn.getAttribute('aria-expanded')).to.equal('false');
    btn.click();
    await el.updateComplete;
    expect(btn.getAttribute('aria-expanded')).to.equal('true');
    const expandedRow = el.shadowRoot!.querySelector('.expanded-row')!;
    expect(expandedRow).to.exist;
    // 展开区渲染嵌套子表格（colspan 覆盖全部列）
    expect(expandedRow.querySelector('td')!.getAttribute('colspan')).to.equal('4');
    expect(expandedRow.querySelector('wc-table')).to.exist;

    btn.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.expanded-row')).to.not.exist;
  });

  it('展开点击派发 wc-expand 且不触发 wc-row-click', async () => {
    const el = await fixture<wcTable>(
      html`<wc-table .columns=${columns} .data=${data} .expandedRowRender=${() => 'x'}></wc-table>`,
    );
    const expands: Array<{ index: number; expanded: boolean }> = [];
    const rowClicks: unknown[] = [];
    el.addEventListener('wc-expand', (e) => expands.push((e as CustomEvent).detail));
    el.addEventListener('wc-row-click', (e) => rowClicks.push(e));
    (el.shadowRoot!.querySelector('.expand-btn') as HTMLElement).click();
    expect(expands).to.deep.equal([{ row: data[0], index: 0, expanded: true }]);
    expect(rowClicks).to.deep.equal([]);
  });

  it('rowExpandable 返回 false 的行无展开按钮但保留占位单元格', async () => {
    const el = await fixture<wcTable>(html`
      <wc-table
        .columns=${columns}
        .data=${data}
        .expandedRowRender=${() => 'x'}
        .rowExpandable=${(row: wcTableRow) => row.name !== '张三'}
      ></wc-table>
    `);
    const btns = el.shadowRoot!.querySelectorAll('.expand-btn');
    expect(btns.length).to.equal(2); // 张三不可展开
    const cells = el.shadowRoot!.querySelectorAll('tbody tr');
    expect(cells[0]!.querySelectorAll('td').length).to.equal(4); // 占位空单元格仍在
  });

  it('rowKey 用字段值跟踪展开状态，排序后展开保持', async () => {
    const el = await fixture<wcTable>(html`
      <wc-table
        .columns=${columns}
        .data=${data}
        row-key="name"
        .expandedRowRender=${(row: wcTableRow) => String(row.name)}
      ></wc-table>
    `);
    (el.shadowRoot!.querySelector('.expand-btn') as HTMLElement).click(); // 展开张三
    await el.updateComplete;
    // 点击年龄列排序，张三（28）排到最后，展开状态应跟随行
    const ageTh = el.shadowRoot!.querySelectorAll('th')[1] as HTMLElement;
    ageTh.click();
    await el.updateComplete;
    const rows = el.shadowRoot!.querySelectorAll('tbody tr[part="row"]');
    const lastRow = rows[rows.length - 1]!;
    const lastRowName = lastRow.querySelector('td:nth-child(2)')!.textContent!.trim();
    expect(lastRowName).to.equal('张三');
    expect(lastRow.nextElementSibling!.classList.contains('expanded-row')).to.be.true;
  });

  it('expandRowByClick 点击行切换展开，且 wc-row-click 仍派发', async () => {
    const el = await fixture<wcTable>(html`
      <wc-table
        .columns=${columns}
        .data=${data}
        .expandedRowRender=${() => 'x'}
        expand-row-by-click
      ></wc-table>
    `);
    const rowClicks: unknown[] = [];
    el.addEventListener('wc-row-click', (e) => rowClicks.push((e as CustomEvent).detail));
    expect(el.shadowRoot!.querySelector('.expanded-row')).to.not.exist;
    (el.shadowRoot!.querySelector('tbody tr[part="row"]') as HTMLElement).click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.expanded-row')).to.exist;
    expect(rowClicks.length).to.equal(1);
  });

  it('defaultExpandedRowKeys 初始展开（rowKey 键）', async () => {
    const el = await fixture<wcTable>(html`
      <wc-table
        .columns=${columns}
        .data=${data}
        row-key="name"
        .defaultExpandedRowKeys=${['李四']}
        .expandedRowRender=${(row: wcTableRow) => String(row.name)}
      ></wc-table>
    `);
    const rows = el.shadowRoot!.querySelectorAll('tbody tr[part="row"]');
    expect(rows[1]!.nextElementSibling!.classList.contains('expanded-row')).to.be.true;
  });

  it('受控 expandedRowKeys：内部不自行变更，wc-expanded-rows-change 回写后生效', async () => {
    const el = await fixture<wcTable>(html`
      <wc-table
        .columns=${columns}
        .data=${data}
        row-key="name"
        .expandedRowKeys=${[]}
        .expandedRowRender=${() => 'x'}
      ></wc-table>
    `);
    const changes: unknown[][] = [];
    el.addEventListener('wc-expanded-rows-change', (e) =>
      changes.push((e as CustomEvent).detail),
    );
    // 点击展开箭头：受控模式下内部状态不变
    (el.shadowRoot!.querySelector('.expand-btn') as HTMLElement).click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.expanded-row')).to.not.exist;

    // 外部回写 expandedRowKeys 后生效
    el.expandedRowKeys = ['张三'];
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.expanded-row')).to.exist;
    expect(changes.length).to.equal(1); // 之前那次点击派发过
    expect(changes[0]).to.deep.equal(['张三']);
  });

  it('columnWidth 设置展开列宽', async () => {
    const el = await fixture<wcTable>(
      html`<wc-table .columns=${columns} .data=${data} .expandedRowRender=${() => 'x'} .columnWidth=${64}></wc-table>`,
    );
    const th = el.shadowRoot!.querySelector('th.expand-col') as HTMLElement;
    expect(th.getAttribute('style')).to.contain('64px');
  });
});
