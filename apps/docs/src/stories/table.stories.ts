import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcTable, wcTableColumn, wcTableRow } from '@wc-kit/core';

// 基础演示用的列配置与行数据
const baseColumns: wcTableColumn[] = [
  { key: 'name', title: '姓名', sortable: true },
  { key: 'age', title: '年龄', width: 100, align: 'right' },
  { key: 'address', title: '住址' },
];

const baseData: wcTableRow[] = [
  { name: '张三', age: 32, address: '北京市朝阳区' },
  { name: '李四', age: 26, address: '上海市浦东新区' },
  { name: '王五', age: 41, address: '广州市天河区' },
];

const meta: Meta<wcTable> = {
  title: '数据展示/Table 表格',
  component: 'wc-table',
  tags: ['autodocs'],
  argTypes: {
    striped: { control: 'boolean', description: '斑马纹' },
    bordered: { control: 'boolean', description: '全边框' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '密度',
    },
    loading: { control: 'boolean', description: '加载中（叠加遮罩）' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          '表格组件：columns + data 驱动的纯展示表格。可排序列点击循环 升序 → 降序 → 取消，并派发 wc-sort 事件',
          '（detail: { key, order }，取消时 order 为 null）；行点击派发 wc-row-click 事件（detail: { row, index }）。',
          '',
          '**主要 API**',
          '',
          '| 属性 | 类型 | 默认值 | 说明 |',
          '| --- | --- | --- | --- |',
          '| columns | wcTableColumn[] | [] | 列配置（key / title / width / align / sortable / ellipsis / render） |',
          '| data | wcTableRow[] | [] | 行数据（Record<string, unknown>） |',
          '| striped | boolean | false | 斑马纹 |',
          '| bordered | boolean | false | 全边框 |',
          "| size | 'small' \\| 'medium' \\| 'large' | 'medium' | 密度 |",
          '| loading | boolean | false | 加载中（叠加遮罩） |',
          '',
          '**插槽**：empty（空状态，默认渲染内置 wc-empty）。',
          '',
          '**React 用法**（@wc-kit/react 包装组件，事件 props 为 onWcSort / onWcRowClick）',
          '',
          '```jsx',
          "import { WcTable } from '@wc-kit/react';",
          '',
          'const columns = [',
          "  { key: 'name', title: '姓名', sortable: true },",
          "  { key: 'age', title: '年龄', align: 'right', width: 100 },",
          '];',
          "const data = [{ name: '张三', age: 18 }];",
          '',
          '<WcTable',
          '  columns={columns}',
          '  data={data}',
          '  striped',
          '  onWcSort={(e) => console.log(e.detail)}',
          '  onWcRowClick={(e) => console.log(e.detail)}',
          '></WcTable>',
          '```',
          '',
          '**Vue 用法**（原生标签，@wc-kit/vue 为纯类型增强，监听 @wc-sort / @wc-row-click）',
          '',
          '```vue',
          '<template>',
          '  <wc-table',
          '    :columns="columns"',
          '    :data="data"',
          '    striped',
          '    @wc-sort="onSort"',
          '    @wc-row-click="onRowClick"',
          '  ></wc-table>',
          '</template>',
          '```',
        ].join('\n'),
      },
    },
  },
  render: (args) => html`<wc-table
    .columns=${args.columns}
    .data=${args.data}
    ?striped=${args.striped}
    ?bordered=${args.bordered}
    size=${args.size}
    ?loading=${args.loading}
  ></wc-table>`,
};

export default meta;
type Story = StoryObj<wcTable & { columns: wcTableColumn[]; data: wcTableRow[] }>;

export const 基础用法: Story = {
  args: {
    columns: baseColumns,
    data: baseData,
    striped: false,
    bordered: false,
    size: 'medium',
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          '「姓名」列可排序：点击表头循环 升序 → 降序 → 取消 并派发 wc-sort；点击任意行派发 wc-row-click（detail: { row, index }）。',
      },
    },
  },
};

// 列对齐与列宽演示（含 ellipsis 超宽省略）
const alignColumns: wcTableColumn[] = [
  { key: 'name', title: '姓名', width: 120 },
  { key: 'age', title: '年龄', width: 80, align: 'right' },
  { key: 'status', title: '状态', width: 100, align: 'center' },
  { key: 'address', title: '住址', ellipsis: true },
];

const alignData: wcTableRow[] = [
  {
    name: '张三',
    age: 32,
    status: '在职',
    address: '广东省深圳市南山区科技园南区高新南一道 006 号',
  },
  { name: '李四', age: 26, status: '离职', address: '上海市浦东新区世纪大道 100 号环球金融中心' },
];

export const 列对齐与列宽: Story = {
  render: () => html`<wc-table .columns=${alignColumns} .data=${alignData} bordered></wc-table>`,
  parameters: {
    docs: {
      description: {
        story:
          '列的 align 控制单元格对齐，width 控制列宽（数值 px 或任意 CSS 宽度），ellipsis 超宽省略（title 提示完整内容）。',
      },
    },
  },
};

export const 斑马纹与边框: Story = {
  render: () =>
    html`<wc-table .columns=${baseColumns} .data=${baseData} striped bordered></wc-table>`,
};

export const 尺寸: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;">
      <wc-table .columns=${baseColumns} .data=${baseData} size="small"></wc-table>
      <wc-table .columns=${baseColumns} .data=${baseData} size="large"></wc-table>
    </div>
  `,
  parameters: {
    docs: {
      description: { story: '依次为 small / large 密度（medium 为默认，见基础用法）。' },
    },
  },
};

// render 自定义单元格：返回 lit 模板或文本
const renderColumns: wcTableColumn[] = [
  { key: 'name', title: '姓名' },
  { key: 'level', title: '等级', render: (row) => `P${row.level as number}` },
  {
    key: 'status',
    title: '状态',
    render: (row) =>
      row.status === '在职'
        ? html`<wc-tag theme="success">在职</wc-tag>`
        : html`<wc-tag>离职</wc-tag>`,
  },
];

const renderData: wcTableRow[] = [
  { name: '张三', level: 8, status: '在职' },
  { name: '李四', level: 6, status: '离职' },
];

export const 自定义单元格: Story = {
  render: () => html`<wc-table .columns=${renderColumns} .data=${renderData}></wc-table>`,
  parameters: {
    docs: {
      description: {
        story: '列配置的 render(row, index) 可返回 lit 模板或文本，覆盖默认单元格内容。',
      },
    },
  },
};

export const 加载与空状态: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;">
      <wc-table .columns=${baseColumns} .data=${baseData} loading></wc-table>
      <wc-table .columns=${baseColumns} .data=${[]} bordered></wc-table>
      <wc-table .columns=${baseColumns} .data=${[]}>
        <wc-button slot="empty">自定义空状态</wc-button>
      </wc-table>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'loading 叠加加载遮罩；data 为空时回退渲染内置 wc-empty，可用 empty 插槽覆盖。',
      },
    },
  },
};
