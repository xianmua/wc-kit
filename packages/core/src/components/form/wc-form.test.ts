import { expect, fixture, html } from '@open-wc/testing';
import './wc-form.js';
import './wc-form-item.js';
import '../input/wc-input.js';
import '../input-number/wc-input-number.js';
import '../button/wc-button.js';
import type { wcForm } from './wc-form.js';
import type { wcFormItem } from './wc-form-item.js';
import type { wcInput } from '../input/wc-input.js';

/* jsdom 的 attachInternals 返回空壳 internals，替换为记录型 mock（同 wc-input 模式） */
Object.defineProperty(HTMLElement.prototype, 'attachInternals', {
  configurable: true,
  writable: true,
  value(this: HTMLElement) {
    return {
      setFormValue() {},
      setValidity() {},
    } as unknown as ElementInternals;
  },
});

async function flush(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe('wc-form-item', () => {
  it('渲染 label 与必填星号', async () => {
    const el = await fixture<wcFormItem>(
      html`<wc-form-item label="用户名" name="username" required>
        <wc-input></wc-input>
      </wc-form-item>`,
    );
    expect(el.shadowRoot!.querySelector('.label')!.textContent).to.contain('用户名');
    expect(el.shadowRoot!.querySelector('.asterisk')).to.exist;

    const noRequired = await fixture<wcFormItem>(
      html`<wc-form-item label="备注"><wc-input></wc-input></wc-form-item>`,
    );
    expect(noRequired.shadowRoot!.querySelector('.asterisk')!.hasAttribute('hidden')).to.be.true;
  });

  it('required 校验失败：返回消息、显示错误、控件置 error', async () => {
    const el = await fixture<wcFormItem>(
      html`<wc-form-item label="用户名" name="username" required>
        <wc-input></wc-input>
      </wc-form-item>`,
    );
    const control = el.querySelector('wc-input')! as wcInput;
    const message = await el.validate();
    await el.updateComplete;
    expect(message).to.equal('用户名不能为空');
    expect(el.error).to.equal(message);
    expect(el.shadowRoot!.querySelector('.error')!.hasAttribute('hidden')).to.be.false;
    expect(control.status).to.equal('error');
  });

  it('校验通过：清除错误并恢复控件状态', async () => {
    const el = await fixture<wcFormItem>(
      html`<wc-form-item label="用户名" name="username" required>
        <wc-input></wc-input>
      </wc-form-item>`,
    );
    await el.validate();
    const control = el.querySelector('wc-input')! as wcInput;
    control.value = 'wc';
    expect(await el.validate()).to.equal('');
    await el.updateComplete;
    expect(el.error).to.equal('');
    expect(control.status).to.equal('default');
  });

  it('min-length / pattern 属性规则', async () => {
    const el = await fixture<wcFormItem>(
      html`<wc-form-item label="用户名" required min-length="3">
        <wc-input></wc-input>
      </wc-form-item>`,
    );
    const control = el.querySelector('wc-input')! as wcInput;
    control.value = 'ab';
    expect(await el.validate()).to.equal('用户名至少3个字符');

    const el2 = await fixture<wcFormItem>(
      html`<wc-form-item label="邮箱" pattern="^[a-z]+@[a-z]+\\.[a-z]+$">
        <wc-input></wc-input>
      </wc-form-item>`,
    );
    const control2 = el2.querySelector('wc-input')! as wcInput;
    control2.value = 'not-an-email';
    expect(await el2.validate()).to.equal('邮箱格式不正确');
    control2.value = 'a@b.c';
    expect(await el2.validate()).to.equal('');
  });

  it('min / max 数值规则', async () => {
    const el = await fixture<wcFormItem>(
      html`<wc-form-item label="年龄" min="18" max="60">
        <wc-input-number></wc-input-number>
      </wc-form-item>`,
    );
    const control = el.querySelector('wc-input-number')!;
    control.value = 10;
    expect(await el.validate()).to.equal('年龄不能小于18');
    control.value = 99;
    expect(await el.validate()).to.equal('年龄不能大于60');
    control.value = 30;
    expect(await el.validate()).to.equal('');
  });

  it('rules 属性：自定义 validator 返回 false / string', async () => {
    const el = await fixture<wcFormItem>(
      html`<wc-form-item label="用户名">
        <wc-input></wc-input>
      </wc-form-item>`,
    );
    const control = el.querySelector('wc-input')! as wcInput;
    el.rules = [{ validator: (v) => v === 'admin' || '用户名已被占用' }];
    control.value = 'admin';
    expect(await el.validate()).to.equal('');
    control.value = 'root';
    expect(await el.validate()).to.equal('用户名已被占用');

    el.rules = [{ validator: () => false }];
    expect(await el.validate()).to.equal('用户名校验不通过');
  });

  it('异步 validator', async () => {
    const el = await fixture<wcFormItem>(
      html`<wc-form-item label="用户名">
        <wc-input></wc-input>
      </wc-form-item>`,
    );
    const control = el.querySelector('wc-input')! as wcInput;
    el.rules = [{ validator: (v) => Promise.resolve(v !== 'bad' || '服务端校验失败') }];
    control.value = 'bad';
    expect(await el.validate()).to.equal('服务端校验失败');
    control.value = 'ok';
    expect(await el.validate()).to.equal('');
  });

  it('message 覆盖默认文案；空值跳过非 required 规则', async () => {
    const el = await fixture<wcFormItem>(
      html`<wc-form-item label="用户名">
        <wc-input></wc-input>
      </wc-form-item>`,
    );
    const control = el.querySelector('wc-input')! as wcInput;
    el.rules = [{ minLength: 5, message: '太短了' }];
    control.value = '';
    // 空值：非 required 规则跳过
    expect(await el.validate()).to.equal('');
    control.value = 'ab';
    expect(await el.validate()).to.equal('太短了');
  });

  it('控件 wc-change 后自动重新校验', async () => {
    const el = await fixture<wcFormItem>(
      html`<wc-form-item label="用户名" required>
        <wc-input></wc-input>
      </wc-form-item>`,
    );
    const control = el.querySelector('wc-input')! as wcInput;
    await el.validate();
    await el.updateComplete;
    expect(el.error).to.not.equal('');
    // 填入合法值并派发 wc-change（自家控件提交时都会派发）
    control.value = 'wc';
    control.dispatchEvent(new CustomEvent('wc-change', { bubbles: true, composed: true }));
    await flush();
    await el.updateComplete;
    expect(el.error).to.equal('');
  });

  it('原生 input 控件同样支持取值校验', async () => {
    const el = await fixture<wcFormItem>(
      html`<wc-form-item label="备注" required>
        <input class="native" />
      </wc-form-item>`,
    );
    const native = el.querySelector<HTMLInputElement>('.native')!;
    expect(await el.validate()).to.equal('备注不能为空');
    native.value = 'hello';
    expect(await el.validate()).to.equal('');
  });

  it('reset() 恢复控件默认值并清除错误', async () => {
    const el = await fixture<wcFormItem>(
      html`<wc-form-item label="用户名" required>
        <wc-input value="初始值"></wc-input>
      </wc-form-item>`,
    );
    const control = el.querySelector('wc-input')! as wcInput;
    control.value = '';
    await el.validate();
    expect(el.error).to.not.equal('');
    el.reset();
    await el.updateComplete;
    expect(control.value).to.equal('初始值');
    expect(el.error).to.equal('');
  });
});

describe('wc-form', () => {
  const formTemplate = html`
    <wc-form>
      <wc-form-item label="用户名" name="username" required>
        <wc-input></wc-input>
      </wc-form-item>
      <wc-form-item label="邮箱" name="email" required>
        <wc-input></wc-input>
      </wc-form-item>
      <wc-button type="submit" theme="primary">提交</wc-button>
      <wc-button type="reset">重置</wc-button>
    </wc-form>
  `;

  it('validate() 聚合错误：valid / errors / firstError', async () => {
    const form = await fixture<wcForm>(formTemplate);
    const result = await form.validate();
    expect(result.valid).to.be.false;
    expect(result.errors.username).to.equal('用户名不能为空');
    expect(result.errors.email).to.equal('邮箱不能为空');
    expect(result.firstError).to.equal('用户名不能为空');
    // 失败时聚焦第一个错误控件（jsdom 中自定义元素可聚焦；
    // 真实浏览器不可聚焦时组件会回退到 shadow 内的原生输入框）
    const firstControl = form.getItem('username')!.control as HTMLElement;
    expect(document.activeElement).to.equal(firstControl);
  });

  it('全部通过时 valid 为 true 且聚焦错误不触发', async () => {
    const form = await fixture<wcForm>(formTemplate);
    (form.getItem('username')!.control as wcInput).value = 'wc';
    (form.getItem('email')!.control as wcInput).value = 'a@b.c';
    const result = await form.validate();
    expect(result.valid).to.be.true;
    expect(result.errors).to.deep.equal({});
    expect(result.firstError).to.equal('');
  });

  it('getItem(name) 按字段名取项', async () => {
    const form = await fixture<wcForm>(formTemplate);
    expect(form.getItem('email')!.label).to.equal('邮箱');
    expect(form.getItem('nope')).to.be.undefined;
  });

  it('submit() 校验并派发 wc-submit（携带结果）', async () => {
    const form = await fixture<wcForm>(formTemplate);
    let detail: unknown;
    let composed = false;
    form.addEventListener('wc-submit', (e) => {
      detail = (e as CustomEvent).detail;
      composed = e.composed;
    });
    await form.submit();
    expect(composed).to.be.true;
    expect((detail as { valid: boolean }).valid).to.be.false;
    expect((detail as { firstError: string }).firstError).to.equal('用户名不能为空');
  });

  it('点击 wc-button[type=submit] 触发提交流程', async () => {
    const form = await fixture<wcForm>(formTemplate);
    let submitted = false;
    form.addEventListener('wc-submit', () => {
      submitted = true;
    });
    const submitBtn = form.querySelector<HTMLElement>('wc-button[type="submit"]')!;
    submitBtn.click();
    await flush();
    expect(submitted).to.be.true;
  });

  it('点击 wc-button[type=reset] 重置全部字段', async () => {
    const form = await fixture<wcForm>(formTemplate);
    const username = form.getItem('username')!.control as wcInput;
    username.value = 'wc';
    // 破坏邮箱后整体校验
    const email = form.getItem('email')!.control as wcInput;
    email.value = 'not-an-email';
    form.getItem('email')!.rules = [{ pattern: '^[a-z]+@[a-z]+\\.[a-z]+$' }];
    const result = await form.validate();
    expect(result.valid).to.be.false;
    expect(form.getItem('email')!.error).to.not.equal('');

    form.querySelector<HTMLElement>('wc-button[type="reset"]')!.click();
    await flush();
    await form.getItem('email')!.updateComplete;
    expect(username.value).to.equal('');
    expect(email.value).to.equal('');
    expect(form.getItem('email')!.error).to.equal('');
  });

  it('reset() 编程调用等价按钮', async () => {
    const form = await fixture<wcForm>(formTemplate);
    const username = form.getItem('username')!.control as wcInput;
    username.value = 'wc';
    form.reset();
    await flush();
    expect(username.value).to.equal('');
  });

  it('暴露 part="form"，表单项暴露 part="base" / "label" / "error"', async () => {
    const form = await fixture<wcForm>(formTemplate);
    expect(form.shadowRoot!.querySelector('[part="form"]')).to.exist;
    const item = form.getItem('username')!;
    expect(item.shadowRoot!.querySelector('[part="base"]')).to.exist;
    expect(item.shadowRoot!.querySelector('[part="label"]')).to.exist;
  });
});
