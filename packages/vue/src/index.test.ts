import { describe, expect, it } from 'vitest';
import { wcButton } from './index.js';
describe('@wc-kit/vue', () => {
  it('入口副作用导入注册全部自定义元素', () => {
    expect(customElements.get('wc-button')).to.equal(wcButton);
    for (const tag of [
      'wc-input',
      'wc-dialog',
      'wc-tabs',
      'wc-table',
      'wc-pagination',
      'wc-icon',
    ]) {
      expect(customElements.get(tag), tag).to.exist;
    }
  });

  it('元素在文档中使用时可正常升级', async () => {
    const el = document.createElement('wc-button') as wcButton;
    document.body.append(el);
    await el.updateComplete;
    expect(el.shadowRoot).to.exist;
    el.remove();
  });
});
