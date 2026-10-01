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
});
