import { html, LitElement } from 'lit';
import {
  registerBuiltinIcons,
  setTheme,
  getTheme,
  initTheme,
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
