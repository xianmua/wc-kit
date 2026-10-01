import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getEffectiveTheme,
  getTheme,
  initTheme,
  setTheme,
  THEME_CHANGE_EVENT,
  type WcTheme,
} from './theme.js';

/** jsdom 无 matchMedia，用可控制的 stub 模拟系统偏好 */
function stubMatchMedia(prefersDark: boolean) {
  const listeners = new Set<() => void>();
  const mql = {
    matches: prefersDark,
    addEventListener: (_: string, cb: () => void) => listeners.add(cb),
    removeEventListener: (_: string, cb: () => void) => listeners.delete(cb),
    /** 测试辅助：模拟系统偏好翻转 */
    __flip(prefersDarkNew: boolean) {
      mql.matches = prefersDarkNew;
      for (const cb of listeners) {
        cb();
      }
    },
  };
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation(() => mql),
  );
  return mql;
}

/** 内存版 localStorage stub，返回底层 Map 供断言 */
function stubStorage(): Map<string, string> {
  const map = new Map<string, string>();
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => {
      map.set(key, String(value));
    },
    removeItem: (key: string) => {
      map.delete(key);
    },
    clear: () => map.clear(),
  });
  return map;
}

function getDocTheme(): string | undefined {
  return document.documentElement.dataset.theme;
}

describe('theme', () => {
  let storage: Map<string, string>;

  beforeEach(() => {
    stubMatchMedia(false);
    storage = stubStorage();
    setTheme('light');
  });

  it('setTheme 设置 data-theme 属性', () => {
    setTheme('dark');
    expect(getDocTheme()).to.equal('dark');
    expect(getTheme()).to.equal('dark');
    expect(getEffectiveTheme()).to.equal('dark');

    setTheme('light');
    expect(getDocTheme()).to.equal('light');
  });

  it('无效主题抛错且不改变当前状态', () => {
    expect(() => setTheme('blue' as WcTheme)).to.throw();
    expect(getTheme()).to.equal('light');
  });

  it('切换主题派发 wc-theme-change 事件', () => {
    const events: Array<CustomEvent> = [];
    document.addEventListener(THEME_CHANGE_EVENT, (e) => events.push(e as CustomEvent));
    setTheme('dark');
    expect(events).to.have.lengthOf(1);
    expect(events[0]!.detail).to.deep.equal({ theme: 'dark', effective: 'dark' });
  });

  it('auto 模式跟随系统偏好', () => {
    stubMatchMedia(true);
    setTheme('auto');
    expect(getEffectiveTheme()).to.equal('dark');
    expect(getDocTheme()).to.equal('dark');

    stubMatchMedia(false);
    setTheme('auto');
    expect(getEffectiveTheme()).to.equal('light');
  });

  it('auto 模式下系统偏好翻转实时生效', () => {
    const mql = stubMatchMedia(false);
    setTheme('auto');
    expect(getEffectiveTheme()).to.equal('light');
    mql.__flip(true);
    expect(getEffectiveTheme()).to.equal('dark');
    expect(getDocTheme()).to.equal('dark');
  });

  it('persist 写入 localStorage，非 persist 移除', () => {
    setTheme('dark', { persist: true });
    expect(storage.get('wc-theme')).to.equal('dark');

    setTheme('light');
    expect(storage.has('wc-theme')).to.be.false;
  });

  it('initTheme 恢复持久化主题', () => {
    storage.set('wc-theme', 'dark');
    initTheme();
    expect(getTheme()).to.equal('dark');

    storage.set('wc-theme', 'auto');
    initTheme();
    expect(getTheme()).to.equal('auto');
  });

  it('initTheme 无记录时默认 auto（跟随系统）', () => {
    stubMatchMedia(true);
    initTheme();
    expect(getTheme()).to.equal('auto');
    expect(getEffectiveTheme()).to.equal('dark');
  });

  it('initTheme 忽略非法的存储值', () => {
    storage.set('wc-theme', 'hacker');
    initTheme();
    expect(['light', 'dark', 'auto']).to.include(getTheme());
  });
});
