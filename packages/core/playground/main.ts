import { html, LitElement } from 'lit';
import {
  registerBuiltinIcons,
  setTheme,
  getTheme,
  initTheme,
  message,
  THEME_CHANGE_EVENT,
  tokensCss,
  type WcTheme,
} from '../src/index.js';
import type { WcButton } from '../src/index.js';
import './main.css';

// 注册内置图标 + 恢复持久化主题
registerBuiltinIcons();
initTheme();

// 全局注入设计令牌
const style = document.createElement('style');
style.textContent = tokensCss;
document.head.append(style);

const THEMES: Array<{ value: WcTheme; label: string }> = [
  { value: 'light', label: '浅色' },
  { value: 'dark', label: '暗色' },
  { value: 'auto', label: '跟随系统' },
];

class PlaygroundApp extends LitElement {
  static properties = {
    theme: { state: true },
  };

  declare theme: WcTheme;

  constructor() {
    super();
    this.theme = getTheme();
    document.addEventListener(THEME_CHANGE_EVENT, (e) => {
      this.theme = (e as CustomEvent).detail.theme;
    });
  }

  private switchTheme(e: Event) {
    const theme = (e.target as WcButton).getAttribute('data-theme') as WcTheme;
    setTheme(theme, { persist: true });
  }

  private openDemoDialog() {
    (this.renderRoot.querySelector('#demo-dialog') as { show(): void }).show();
  }

  private openDemoDrawer() {
    (this.renderRoot.querySelector('#demo-drawer') as { show(): void }).show();
  }

  private demoLoadingMessage() {
    const loading = message.loading('正在上传…');
    setTimeout(() => {
      loading.close();
      message.success('上传完成');
    }, 2000);
  }

  private renderSwatches() {
    const tokens = [
      '--wc-color-primary',
      '--wc-color-success',
      '--wc-color-warning',
      '--wc-color-error',
      '--wc-color-text',
      '--wc-color-text-secondary',
      '--wc-color-text-placeholder',
      '--wc-color-border',
      '--wc-color-bg',
      '--wc-color-bg-container',
      '--wc-color-bg-hover',
      '--wc-color-primary-light',
    ];
    return tokens.map(
      (token) => html`
        <div class="swatch">
          <span class="swatch-color" style="background: var(${token})"></span>
          <code>${token}</code>
        </div>
      `,
    );
  }

  render() {
    return html`
      <div class="page">
        <header>
          <h2>主题验证 Playground</h2>
          <p class="hint">当前主题：<strong>${this.theme}</strong>（切换后刷新页面可验证持久化）</p>
          <div class="toolbar">
            ${THEMES.map(
              (t) => html`
                <wc-button
                  data-theme=${t.value}
                  variant=${this.theme === t.value ? 'base' : 'outline'}
                  theme="primary"
                  size="small"
                  @click=${this.switchTheme}
                  >${t.label}</wc-button
                >
              `,
            )}
          </div>
        </header>

        <section>
          <h3>Button 全形态</h3>
          <div class="row">
            <wc-button>默认</wc-button>
            <wc-button theme="primary">主要</wc-button>
            <wc-button theme="success" variant="outline">成功</wc-button>
            <wc-button theme="warning" variant="dashed">警告</wc-button>
            <wc-button theme="danger" variant="text">危险</wc-button>
            <wc-button disabled>禁用</wc-button>
            <wc-button loading theme="primary">加载中</wc-button>
          </div>
          <div class="row">
            <wc-button size="small" theme="primary">小</wc-button>
            <wc-button size="medium" theme="primary">中</wc-button>
            <wc-button size="large" theme="primary">大</wc-button>
          </div>
        </section>

        <section>
          <h3>Input 输入框</h3>
          <div class="col">
            <wc-input placeholder="请输入内容" clearable></wc-input>
            <wc-input placeholder="带前缀" clearable>
              <wc-icon name="search" slot="prefix"></wc-icon>
            </wc-input>
            <wc-input placeholder="禁用" disabled></wc-input>
            <wc-input placeholder="只读" readonly value="只读内容"></wc-input>
            <wc-input value="校验错误" status="error" clearable></wc-input>
            <wc-input placeholder="小尺寸" size="small"></wc-input>
            <wc-input placeholder="大尺寸" size="large"></wc-input>
          </div>
        </section>

        <section>
          <h3>Textarea 多行输入</h3>
          <div class="col">
            <wc-textarea placeholder="请输入描述" maxlength="100"></wc-textarea>
            <wc-textarea placeholder="自动增高（autosize）" autosize></wc-textarea>
            <wc-textarea placeholder="禁用" disabled></wc-textarea>
            <wc-textarea value="校验错误" status="error"></wc-textarea>
          </div>
        </section>

        <section>
          <h3>Select 选择器</h3>
          <div class="col">
            <wc-select placeholder="请选择城市">
              <wc-option value="bj">北京</wc-option>
              <wc-option value="sh">上海</wc-option>
              <wc-option value="gz">广州</wc-option>
              <wc-option value="sz" disabled>深圳（禁用）</wc-option>
            </wc-select>
            <wc-select value="sh" clearable>
              <wc-option value="bj">北京</wc-option>
              <wc-option value="sh">上海</wc-option>
              <wc-option value="gz">广州</wc-option>
            </wc-select>
            <wc-select status="error" placeholder="校验错误">
              <wc-option value="1">选项一</wc-option>
              <wc-option value="2">选项二</wc-option>
            </wc-select>
            <wc-select disabled placeholder="禁用">
              <wc-option value="1">选项一</wc-option>
            </wc-select>
          </div>
        </section>

        <section>
          <h3>Slider 滑块</h3>
          <div class="col">
            <wc-slider></wc-slider>
            <wc-slider value="40" min="0" max="200" step="10"></wc-slider>
            <wc-slider value="70" disabled></wc-slider>
          </div>
        </section>

        <section>
          <h3>InputNumber 数字输入</h3>
          <div class="row">
            <wc-input-number value="5"></wc-input-number>
            <wc-input-number value="1" min="0" max="1" step="0.1"></wc-input-number>
            <wc-input-number
              value="50"
              theme="column"
              min="0"
              max="100"
              step="10"
            ></wc-input-number>
            <wc-input-number value="20" theme="normal"></wc-input-number>
            <wc-input-number value="9" disabled></wc-input-number>
          </div>
        </section>

        <section>
          <h3>DatePicker 日期选择</h3>
          <div class="col">
            <wc-date-picker></wc-date-picker>
            <wc-date-picker value="2026-10-15" clearable></wc-date-picker>
            <wc-date-picker placeholder="周一起始" first-day-of-week="1"></wc-date-picker>
            <wc-date-picker placeholder="禁用" disabled></wc-date-picker>
          </div>
        </section>

        <section>
          <h3>Checkbox / Radio / Switch</h3>
          <div class="col">
            <div class="row">
              <wc-checkbox>默认</wc-checkbox>
              <wc-checkbox checked>选中</wc-checkbox>
              <wc-checkbox indeterminate>半选</wc-checkbox>
              <wc-checkbox disabled>禁用</wc-checkbox>
            </div>
            <div class="row">
              <wc-radio name="city" value="1" checked>北京</wc-radio>
              <wc-radio name="city" value="2">上海</wc-radio>
              <wc-radio name="city" value="3">广州</wc-radio>
              <wc-radio disabled>禁用</wc-radio>
            </div>
            <div class="row">
              <wc-switch>开关</wc-switch>
              <wc-switch checked>默认开</wc-switch>
              <wc-switch disabled>禁用</wc-switch>
            </div>
          </div>
        </section>

        <section>
          <h3>Form 表单校验</h3>
          <wc-form>
            <wc-form-item label="用户名" name="username" required min-length="3">
              <wc-input placeholder="请输入用户名"></wc-input>
            </wc-form-item>
            <wc-form-item label="邮箱" name="email" required pattern="^[a-z]+@[a-z]+\\.[a-z]+$">
              <wc-input placeholder="请输入邮箱"></wc-input>
            </wc-form-item>
            <wc-form-item label="年龄" name="age" required>
              <wc-input-number min="0" max="120"></wc-input-number>
            </wc-form-item>
            <div class="row" style="--wc-form-label-width: 80px">
              <wc-button theme="primary" type="submit">提交</wc-button>
              <wc-button type="reset">重置</wc-button>
            </div>
          </wc-form>
        </section>

        <section>
          <h3>Divider 分隔线</h3>
          <p>上方文本</p>
          <wc-divider></wc-divider>
          <p>下方文本</p>
          <wc-divider dashed align="left">虚线左对齐</wc-divider>
          <div>
            <span>左侧</span>
            <wc-divider vertical></wc-divider>
            <span>右侧</span>
          </div>
        </section>

        <section>
          <h3>Tag 标签</h3>
          <div class="row">
            <wc-tag>默认</wc-tag>
            <wc-tag theme="primary">主要</wc-tag>
            <wc-tag theme="success">成功</wc-tag>
            <wc-tag theme="warning">警告</wc-tag>
            <wc-tag theme="danger">危险</wc-tag>
            <wc-tag theme="primary" variant="dark">实底</wc-tag>
            <wc-tag theme="primary" variant="outline">描边</wc-tag>
            <wc-tag theme="primary" size="small">小号</wc-tag>
            <wc-tag theme="primary" size="large">大号</wc-tag>
            <wc-tag theme="primary" closable>可关闭</wc-tag>
            <wc-tag theme="default" disabled>禁用</wc-tag>
          </div>
        </section>

        <section>
          <h3>Avatar 头像</h3>
          <div class="row">
            <wc-avatar size="small">S</wc-avatar>
            <wc-avatar>中</wc-avatar>
            <wc-avatar size="large">L</wc-avatar>
            <wc-avatar size="56">大尺寸</wc-avatar>
            <wc-avatar shape="round">圆角</wc-avatar>
            <wc-avatar shape="square">方</wc-avatar>
          </div>
        </section>

        <section>
          <h3>Space 间距 / Layout 栅格 / Typography 排版</h3>
          <wc-space size="medium">
            <wc-button theme="default">按钮一</wc-button>
            <wc-button theme="default">按钮二</wc-button>
            <wc-button theme="default">按钮三</wc-button>
          </wc-space>
          <wc-row gutter="8" style="margin-top: 12px">
            <wc-col span="12"><div class="grid-demo">span=12</div></wc-col>
            <wc-col span="6" offset="6"><div class="grid-demo">span=6 offset=6</div></wc-col>
          </wc-row>
          <div style="margin-top: 12px">
            <wc-text variant="heading" level="2">H2 标题</wc-text>
            <wc-text type="secondary">次级说明文本</wc-text>
            <wc-text type="danger">危险色文本</wc-text>
          </div>
        </section>

        <section>
          <h3>Dialog 对话框</h3>
          <div class="row">
            <wc-button theme="primary" id="open-dialog-btn" @click=${() => this.openDemoDialog()}
              >打开对话框</wc-button
            >
          </div>
          <wc-dialog id="demo-dialog" header="操作确认" close-on-overlay-click>
            <p>确认删除这条记录吗？此操作不可撤销。</p>
          </wc-dialog>
        </section>

        <section>
          <h3>Drawer 抽屉</h3>
          <div class="row">
            <wc-button theme="primary" id="open-drawer-btn" @click=${() => this.openDemoDrawer()}
              >打开抽屉</wc-button
            >
          </div>
          <wc-drawer id="demo-drawer" header="详情面板" size="medium" placement="right">
            <p>这里是从右侧滑出的抽屉内容。</p>
            <p>支持四个方向：left / right / top / bottom。</p>
          </wc-drawer>
        </section>

        <section>
          <h3>Message 全局提示</h3>
          <div class="row">
            <wc-button
              theme="default"
              id="msg-info-btn"
              @click=${() => message.info('这是一条普通提示')}
              >普通</wc-button
            >
            <wc-button
              theme="success"
              id="msg-success-btn"
              @click=${() => message.success('保存成功')}
              >成功</wc-button
            >
            <wc-button
              theme="warning"
              id="msg-warning-btn"
              @click=${() => message.warning('磁盘空间不足')}
              >警告</wc-button
            >
            <wc-button
              theme="danger"
              id="msg-error-btn"
              @click=${() => message.error('操作失败，请重试')}
              >错误</wc-button
            >
            <wc-button
              theme="primary"
              id="msg-loading-btn"
              @click=${() => this.demoLoadingMessage()}
              >加载</wc-button
            >
          </div>
        </section>

        <section>
          <h3>Tooltip 文字提示</h3>
          <div class="row" style="gap: 24px">
            <wc-tooltip content="上方提示（默认 top）"
              ><wc-button theme="default">top</wc-button></wc-tooltip
            >
            <wc-tooltip placement="bottom" content="下方提示，空间不足会自动翻转"
              ><wc-button theme="default">bottom</wc-button></wc-tooltip
            >
            <wc-tooltip placement="left" content="左侧提示"
              ><wc-button theme="default">left</wc-button></wc-tooltip
            >
            <wc-tooltip placement="right" content="右侧提示"
              ><wc-button theme="default">right</wc-button></wc-tooltip
            >
            <wc-tooltip trigger="click" placement="bottom" content="点击触发，点外部或 Esc 关闭"
              ><wc-button theme="primary">点击触发</wc-button></wc-tooltip
            >
          </div>
        </section>

        <section>
          <h3>Popconfirm 气泡确认</h3>
          <div class="row" style="gap: 24px">
            <wc-popconfirm
              content="确认删除这条记录吗？"
              @wc-confirm=${() => message.success('已删除')}
              @wc-cancel=${() => message.info('已取消')}
            >
              <wc-button theme="danger">删除</wc-button>
            </wc-popconfirm>
            <wc-popconfirm
              content="自定义文案与按钮"
              confirm-text="好的"
              cancel-text="算了"
              icon=""
              placement="bottom"
            >
              <wc-button theme="default">自定义</wc-button>
            </wc-popconfirm>
          </div>
        </section>

        <section>
          <h3>Tabs 标签页</h3>
          <wc-tabs
            id="demo-tabs"
            @wc-change=${(e: CustomEvent) => message.info(`切换到 ${e.detail.value}`)}
          >
            <wc-tab label="账户"><p>账户信息面板。</p></wc-tab>
            <wc-tab label="安全" value="security"><p>安全设置面板。</p></wc-tab>
            <wc-tab label="通知" value="notify"><p>通知偏好面板。</p></wc-tab>
            <wc-tab label="高级" value="pro" disabled><p>高级选项（禁用）。</p></wc-tab>
          </wc-tabs>
        </section>

        <section>
          <h3>Breadcrumb 面包屑</h3>
          <wc-breadcrumb @wc-select=${(e: CustomEvent) => message.info(`导航到 ${e.detail.label}`)}>
            <wc-breadcrumb-item href="#/">首页</wc-breadcrumb-item>
            <wc-breadcrumb-item href="#/list">组件列表</wc-breadcrumb-item>
            <wc-breadcrumb-item>面包屑</wc-breadcrumb-item>
          </wc-breadcrumb>
          <div class="row" style="margin-top: 12px">
            <wc-breadcrumb separator=">">
              <wc-breadcrumb-item href="#/">首页</wc-breadcrumb-item>
              <wc-breadcrumb-item disabled>禁用层</wc-breadcrumb-item>
              <wc-breadcrumb-item>详情</wc-breadcrumb-item>
            </wc-breadcrumb>
          </div>
        </section>

        <section>
          <h3>Pagination 分页</h3>
          <wc-pagination
            id="demo-pagination"
            total="200"
            show-total
            show-jumper
            @wc-change=${(e: CustomEvent) => message.info(`跳到第 ${e.detail.current} 页`)}
          ></wc-pagination>
          <div class="row" style="margin-top: 12px">
            <wc-pagination total="50" current="2"></wc-pagination>
          </div>
        </section>

        <section>
          <h3>Badge 徽标</h3>
          <div class="row">
            <wc-badge count="5"><wc-icon name="search" label="搜索"></wc-icon></wc-badge>
            <wc-badge count="120"><wc-icon name="calendar" label="日历"></wc-icon></wc-badge>
            <wc-badge count="0"><wc-icon name="close" label="关闭"></wc-icon></wc-badge>
            <wc-badge dot theme="primary"><wc-icon name="check" label="完成"></wc-icon></wc-badge>
            <wc-badge count="8" theme="success">独立徽标</wc-badge>
          </div>
        </section>

        <section>
          <h3>Empty 空状态</h3>
          <wc-empty style="border: 1px dashed var(--wc-color-border); border-radius: 6px">
            <wc-button slot="action" theme="primary" variant="outline">重新加载</wc-button>
          </wc-empty>
        </section>

        <section>
          <h3>Progress 进度条</h3>
          <div class="col" style="display: grid; gap: 12px; max-width: 420px">
            <wc-progress value="60"></wc-progress>
            <wc-progress value="80" status="success"></wc-progress>
            <wc-progress value="30" status="error" label="上传失败"></wc-progress>
            <wc-progress theme="circle" value="75"></wc-progress>
          </div>
        </section>

        <section>
          <h3>Card 卡片</h3>
          <div class="row" style="align-items: stretch">
            <wc-card title="卡片标题" subtitle="副标题" hoverable style="flex: 1">
              <p>这是一张带悬浮阴影的卡片。</p>
              <wc-button slot="footer" variant="outline" size="small">更多</wc-button>
            </wc-card>
            <wc-card style="flex: 1">
              <span slot="header">纯插槽头部</span>
              <p>使用 header 插槽自定义头部。</p>
              <wc-button slot="actions" variant="text" size="small">
                <wc-icon name="close"></wc-icon>
              </wc-button>
            </wc-card>
          </div>
        </section>

        <section>
          <h3>List 列表</h3>
          <div class="row" style="align-items: stretch">
            <wc-list
              striped
              hoverable
              style="flex: 1; border: 1px solid var(--wc-color-border); border-radius: 6px"
            >
              <wc-list-item>消息通知：您有一条新的系统消息</wc-list-item>
              <wc-list-item>安全提醒：登录地点发生变更</wc-list-item>
              <wc-list-item>版本更新：v2.0 已发布</wc-list-item>
            </wc-list>
            <wc-list
              style="flex: 1; border: 1px dashed var(--wc-color-border); border-radius: 6px"
            ></wc-list>
          </div>
        </section>

        <section>
          <h3>Table 表格</h3>
          <wc-table
            id="demo-table"
            striped
            hoverable
            style="max-width: 560px"
            @wc-sort=${(e: CustomEvent) => message.info(`排序：${e.detail.key} ${e.detail.order ?? '取消'}`)}
            @wc-row-click=${(e: CustomEvent) => message.info(`点击行：${e.detail.row.name}`)}
          ></wc-table>
        </section>

        <section>
          <h3>图标（1em / currentColor）</h3>
          <div class="row icons">
            <wc-icon name="check" label="完成"></wc-icon>
            <wc-icon name="close" label="关闭"></wc-icon>
            <wc-icon name="search" label="搜索"></wc-icon>
            <wc-icon name="calendar" label="日历"></wc-icon>
            <wc-icon name="plus" label="新增"></wc-icon>
            <wc-icon name="chevron-down" label="展开"></wc-icon>
            <wc-icon name="loader" spin label="加载"></wc-icon>
          </div>
        </section>

        <section>
          <h3>语义色令牌（切主题观察变化）</h3>
          <div class="swatches">${this.renderSwatches()}</div>
        </section>
      </div>
    `;
  }
}

customElements.define('playground-app', PlaygroundApp);
document.querySelector('#app')!.append(document.createElement('playground-app'));

// Table 演示数据（columns/data 为复杂属性，需 JS 赋值）
const demoTable = document.querySelector('#demo-table') as {
  columns: unknown[];
  data: unknown[];
};
demoTable.columns = [
  { key: 'name', title: '姓名', sortable: true },
  { key: 'age', title: '年龄', align: 'right', width: 100 },
  { key: 'city', title: '城市', ellipsis: true },
  {
    key: 'tags',
    title: '标签',
    render: (row: { tags: string[] }) => row.tags.join(' / '),
  },
];
demoTable.data = [
  { name: '张三', age: 28, city: '上海', tags: ['前端', '渲染'] },
  { name: '李四', age: 22, city: '北京', tags: ['测试'] },
  { name: '王五', age: 25, city: '广州', tags: ['后端', '网关', '存储'] },
];
