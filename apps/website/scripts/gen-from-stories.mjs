/**
 * 从 Storybook story 文件 + 组件 TSDoc 半自动生成 VitePress 组件页。
 *
 * 数据源分工：
 * - story 文件  → 标题/分组、组件描述（含 React/Vue 用法）、示例
 * - 组件源码    → API 表：属性（attribute/类型/默认值）、事件、方法、插槽、CSS Parts、CSS 变量
 *
 * 示例策略：render 模板不含插值（纯属性渲染）→ 直接转为可运行的 live demo；
 * 含 `${}` / `@click` 等插值交互 → 标注 TODO + 折叠展示 story 源码供人工迁移。
 *
 * 用法：node scripts/gen-from-stories.mjs [--force]
 * 默认跳过已手工迁移的页面（HAND_MADE）；--force 覆盖。
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../../..');
const storiesDir = join(root, 'apps/docs/src/stories');
const coreDir = join(root, 'packages/core/src/components');
const outDir = join(root, 'apps/website/docs/components');
const force = process.argv.includes('--force');

/** 已手工迁移、不由脚本覆盖的页面 */
const HAND_MADE = new Set([
  'upload',
  'dialog',
  'drawer',
  'message',
  'row',
  'space',
  'card',
  'avatar',
  'table',
  'image',
  'tag',
  'icon',
  'input-number',
  'slider',
  'progress',
  'date-picker',
  'text',
  'pagination',
  'popconfirm',
  'tooltip',
  'form',
]);

/* ---------------- 通用工具 ---------------- */

const unescape = (s) =>
  s
    .replace(/\\(['"`])/g, '$1')
    .replace(/\\\$/g, '$')
    .replace(/\\\\/g, '\\');

/** 提取 meta 里的 component 描述：支持纯字符串 / 数组 join / 模板字面量。
 * 注意 component: '<tag>' 也是同形态的字符串，需排除。 */
function extractDescription(src, tag) {
  let m = src.match(/component:\s*\[([\s\S]*?)\]\s*\.join\(/);
  if (m) {
    // 数组元素可能是单引号或双引号字符串（含单引号的行会用双引号），两种都要匹配
    const lines = [...m[1].matchAll(/'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/g)].map((x) =>
      unescape(x[1] ?? x[2]),
    );
    return lines.join('\n');
  }
  m = src.match(/component:\s*`((?:\\.|[^`\\])*)`/);
  if (m) return unescape(m[1]);
  const strs = [...src.matchAll(/component:\s*'((?:[^'\\]|\\.)*)'/g)].map((x) => unescape(x[1]));
  return strs.find((v) => v !== tag) ?? '';
}

/** 紧邻 lines[i] 上方的 /** *\/ 注释（单行或多行） */
function docAbove(lines, i) {
  let j = i - 1;
  if (j < 0) return '';
  if (!lines[j].includes('*/') && !lines[j].includes('/**')) return '';
  let start = j;
  while (start >= 0 && !lines[start].includes('/**')) start--;
  if (start < 0) return '';
  const parts = [];
  for (let k = start; k <= j; k++) {
    parts.push(
      lines[k]
        .replace(/^\s*\/\*\*/, '')
        .replace(/\*\/\s*$/, '')
        .replace(/^\s*\*\s?/, ''),
    );
  }
  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

/* ---------------- story 文件解析 ---------------- */

function parseStoryFile(file) {
  const src = readFileSync(file, 'utf8');
  // Meta title 形如 '分组/名称'；文件里可能有列定义等同形 key（如 table 的 title: '姓名'），以含 '/' 者为准
  const titles = [...src.matchAll(/title:\s*'([^']+)'/g)].map((m) => m[1]);
  const title = titles.find((t) => t.includes('/')) ?? titles[0];
  const tag = src.match(/component:\s*'([\w-]+)'/)?.[1];
  if (!title || !tag) return null;

  const [group, ...rest] = title.split('/');
  const name = rest.join('/').trim();

  // 切分具名 story 块
  const stories = [];
  const starts = [...src.matchAll(/export const ([\w\u4e00-\u9fa5]+): Story = \{/g)].map((m) => ({
    key: m[1],
    at: m.index,
  }));
  for (let i = 0; i < starts.length; i++) {
    const end = i + 1 < starts.length ? starts[i + 1].at : src.length;
    const block = src.slice(starts[i].at, end);
    const storyName = block.match(/name:\s*'([^']+)'/)?.[1] ?? starts[i].key;
    stories.push({
      key: starts[i].key,
      name: storyName,
      block: block.trim(),
      template: extractRenderTemplate(block),
    });
  }

  return {
    tag,
    group: group.trim(),
    name,
    title,
    description: extractDescription(src, tag),
    stories,
  };
}

/** 提取具名 story 中 render 的首个 html`...` 模板；无则 null */
function extractRenderTemplate(block) {
  const m = block.match(/html`((?:\\.|[^`\\])*)`/);
  return m ? unescape(m[1]) : null;
}

/** 判断模板是否可直接落地为静态 HTML（无插值/事件绑定/属性绑定） */
function isStaticTemplate(tpl) {
  return !/\$\{|@[\w-]+=|\.[\w]+=/.test(tpl);
}

/** Lit 模板 → HTML：布尔属性 ?x 移除问号（静态模板已无插值） */
function tplToHtml(tpl) {
  return tpl
    .replace(/\s+\?([\w-]+)(?=[\s>])/g, ' $1')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/* ---------------- 组件源码 TSDoc 解析 ---------------- */

/** tag → 源码文件：扫描各组件目录里 customElements.define 的注册处 */
function buildTagFileMap() {
  const map = {};
  for (const dir of readdirSync(coreDir)) {
    const dirPath = join(coreDir, dir);
    let files;
    try {
      files = readdirSync(dirPath).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'));
    } catch {
      continue;
    }
    for (const f of files) {
      const src = readFileSync(join(dirPath, f), 'utf8');
      for (const m of src.matchAll(/customElements\.define\('([\w-]+)'/g)) {
        map[m[1]] = join(dirPath, f);
      }
    }
  }
  return map;
}

/** 类头 TSDoc（export class 上方注释块，允许中间隔装饰器行） */
function extractClassDoc(lines, classIdx) {
  let i = classIdx - 1;
  while (i >= 0 && /^\s*@/.test(lines[i])) i--; // 跳过 @customElement 等装饰器
  let end = i;
  if (end < 0 || (!lines[end].includes('*/') && !lines[end].includes('/**'))) return '';
  while (end >= 0 && !lines[end].includes('/**')) end--;
  if (end < 0) return '';
  return lines.slice(end, i + 1).join('\n');
}

/** 解析 @property 声明（跨行），返回属性元信息列表 */
function parseProperties(lines) {
  const props = [];
  for (let i = 0; i < lines.length; i++) {
    if (!/@property/.test(lines[i])) continue;
    let end = i;
    let chunk = lines[i];
    while (!chunk.trimEnd().endsWith(';') && end + 1 < lines.length) {
      end += 1;
      chunk += '\n' + lines[end];
    }
    const doc = docAbove(lines, i);

    // 按括号配平拆出 options 与声明体
    const open = chunk.indexOf('(');
    const after = chunk.slice(open + 1);
    let depth = 0;
    let splitAt = -1;
    for (let c = 0; c < after.length; c++) {
      if (after[c] === '(') depth++;
      else if (after[c] === ')') {
        if (depth === 0) {
          splitAt = c;
          break;
        }
        depth--;
      }
    }
    if (splitAt < 0) {
      i = end;
      continue;
    }
    const options = after.slice(0, splitAt);
    const decl = after.slice(splitAt + 1).trim();
    const dm = decl.match(/([A-Za-z_$][\w$]*)\s*(?::\s*([^=;\n]+?))?\s*=\s*([\s\S]+?);\s*$/);
    if (!dm) {
      i = end;
      continue;
    }

    const attrOpt = options.match(/attribute:\s*'([\w-]+)'/)?.[1];
    const noAttr = /attribute:\s*false/.test(options);
    const isBoolean = /type:\s*Boolean/.test(options);
    const init = dm[3].trim().replace(/;$/, '').trim();
    const type =
      dm[2]?.trim() ??
      (isBoolean ? 'boolean' : /^['"]/.test(init) ? 'string' : /^\d/.test(init) ? 'number' : '—');

    props.push({
      name: dm[1],
      type,
      init,
      attribute: noAttr ? null : (attrOpt ?? dm[1].toLowerCase()),
      doc,
    });
    i = end;
  }
  return props;
}

/** 单行联合类型别名表：export type wcImageFit = 'a' | 'b'; → 内联进属性类型 */
function loadTypeAliases(src) {
  const aliases = {};
  for (const m of src.matchAll(/export type ([\w$]+) = ([^;\n]+);/g)) {
    aliases[m[1]] = m[2].trim();
  }
  return aliases;
}

function parseApi(srcFile) {
  const src = readFileSync(srcFile, 'utf8');
  const lines = src.split('\n');
  const aliases = loadTypeAliases(src);

  const classIdx = lines.findIndex((l) => /export class /.test(l));
  const classDoc = extractClassDoc(lines, classIdx);
  // 注意保留前导空格：`@slot - xxx` 依赖 " - " 分隔名称与描述
  const grab = (tag) =>
    [...classDoc.matchAll(new RegExp(`@${tag}([^\\n@]*)`, 'g'))].map((m) => m[1]);

  // 公开方法（带 JSDoc，排除生命周期/渲染）
  const EXCLUDE = new Set([
    'render',
    'constructor',
    'connectedCallback',
    'disconnectedCallback',
    'adoptedCallback',
    'attributeChangedCallback',
    'willUpdate',
    'updated',
    'firstUpdated',
    'formResetCallback',
    'formStateRestoreCallback',
  ]);
  const methods = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(
      /^\s{2}(?:async )?([a-zA-Z_$][\w$]*)\s*\(.*\)\s*(?::\s*[\w<>[\]| '"']+)?\s*\{\s*$/,
    );
    if (!m || EXCLUDE.has(m[1]) || /private|protected|static|override/.test(lines[i])) continue;
    const doc = docAbove(lines, i);
    if (doc)
      methods.push({
        name: m[1],
        doc,
        sig: lines[i]
          .trim()
          .replace(/\{\s*$/, '')
          .trim(),
      });
  }

  return {
    slots: grab('slot'),
    parts: grab('csspart'),
    cssProps: grab('cssprop'),
    fires: grab('fires'),
    props: parseProperties(lines),
    methods,
    aliases,
  };
}

/* ---------------- markdown 生成 ---------------- */

const mdEscape = (s) => s.replace(/\|/g, '\\|');

/** VitePress 把 markdown 当 Vue 模板编译：散文里的裸 <Tag>（如泛型 Promise<X>）会报
 * 「missing end tag」。把围栏/行内代码之外的裸 <xxx> 包进反引号（代码块内容不动）。 */
function escapeProse(md) {
  return md
    .split(/(```[\s\S]*?```|`[^`\n]*`)/g)
    .map((seg, i) => (i % 2 === 1 ? seg : seg.replace(/<([\w][^<>`\n]{0,60}?)>/g, '`<$1>`')))
    .join('');
}

function typeLabel(t, aliases) {
  const label = aliases[t] ?? t ?? '—';
  return mdEscape(label.length > 80 ? `${label.slice(0, 77)}…` : label);
}

function renderApiSection(api) {
  const out = ['## API', ''];

  if (api.props.length) {
    out.push(
      '### 属性',
      '',
      '| 属性 | attribute | 类型 | 默认值 | 说明 |',
      '| --- | --- | --- | --- | --- |',
    );
    for (const p of api.props) {
      const attr = p.attribute === null ? '仅属性' : `\`${p.attribute}\``;
      out.push(
        `| \`${p.name}\` | ${attr} | \`${typeLabel(p.type, api.aliases)}\` | \`${mdEscape(p.init || '—')}\` | ${escapeProse(p.doc || '—')} |`,
      );
    }
    out.push('');
  }

  if (api.fires.length) {
    out.push('### 事件', '', '| 事件 | 说明 |', '| --- | --- |');
    for (const f of api.fires) {
      const [n, ...rest] = f.split(/\s+-\s+/);
      out.push(`| \`${n.trim()}\` | ${escapeProse(rest.join(' - ').trim() || '—')} |`);
    }
    out.push('');
  }

  if (api.methods.length) {
    out.push('### 方法', '', '| 方法 | 说明 |', '| --- | --- |');
    for (const m of api.methods) out.push(`| \`${mdEscape(m.sig)}\` | ${escapeProse(m.doc)} |`);
    out.push('');
  }

  if (api.slots.length) {
    out.push('### 插槽', '', '| 名称 | 说明 |', '| --- | --- |');
    for (const s of api.slots) {
      const [n, ...rest] = s.split(/\s+-\s+/);
      const name = n.trim();
      out.push(
        `| ${name ? `\`${name}\`` : '（默认）'} | ${escapeProse(rest.join(' - ').trim() || '—')} |`,
      );
    }
    out.push('');
  }

  if (api.cssProps.length) {
    out.push('### CSS 变量', '', '| 变量 | 说明 |', '| --- | --- |');
    for (const c of api.cssProps) {
      const [n, ...rest] = c.split(/\s+-\s+/);
      out.push(`| \`${n.trim()}\` | ${escapeProse(rest.join(' - ').trim() || '—')} |`);
    }
    out.push('');
  }

  if (api.parts.length) {
    out.push(
      '### CSS Parts',
      '',
      api.parts.map((p) => `\`${p.split(/\s+-\s+/)[0].trim()}\``).join(' / '),
      '',
    );
  }

  return out.join('\n');
}

function renderDemos(info) {
  const demos = [];
  for (const s of info.stories) {
    if (!s.template) continue;
    if (isStaticTemplate(s.template)) {
      demos.push({ name: s.name, html: tplToHtml(s.template), source: null });
    } else {
      demos.push({ name: s.name, html: null, source: s.block, sbKey: s.key });
    }
  }
  if (demos.length === 0) return '';

  const out = ['## 示例', ''];
  const hasInteractive = demos.some((d) => !d.html);
  if (hasInteractive) {
    out.push(
      '> 标注「待迁移」的示例含 JS 交互逻辑，请参照 [upload.md](/components/upload) 的 `<script setup>` 模式手工迁移。',
      '',
    );
  }
  for (const d of demos) {
    out.push(`### ${d.name}`, '');
    if (d.html) {
      out.push(
        '<div class="demo-block">',
        '',
        d.html,
        '',
        '</div>',
        '',
        '<details><summary>查看代码</summary>',
        '',
        '```html',
        d.html,
        '```',
        '',
        '</details>',
        '',
      );
    } else {
      out.push('**待迁移**：含交互逻辑，暂以 Storybook 源码展示。', '');
      out.push(
        '<details><summary>Storybook 源码（迁移参考）</summary>',
        '',
        '```ts',
        d.source,
        '```',
        '',
        '</details>',
        '',
      );
    }
  }
  return out.join('\n');
}

function renderPage(info, api) {
  const out = [`# ${info.name}`, ''];
  if (info.description) out.push(escapeProse(info.description), '');
  const demos = renderDemos(info);
  if (demos) out.push(demos, '');
  out.push(renderApiSection(api));
  return out.join('\n');
}

/* ---------------- sidebar 数据生成 ---------------- */

const GROUP_ORDER = ['基础组件', '表单组件', '反馈组件', '导航组件', '数据展示'];

function renderSidebar(entries) {
  const groups = new Map();
  for (const e of entries) {
    if (!groups.has(e.group)) groups.set(e.group, []);
    groups.get(e.group).push(e);
  }
  const ordered = [
    ...GROUP_ORDER.filter((g) => groups.has(g)),
    ...[...groups.keys()].filter((g) => !GROUP_ORDER.includes(g)),
  ];
  const lines = [
    '// 由 scripts/gen-from-stories.mjs 自动生成，勿手工编辑（每次运行脚本会覆盖）。',
    'export interface SidebarEntry { text: string; link: string }',
    'export interface SidebarGroup { text: string; collapsed: boolean; items: SidebarEntry[] }',
    '',
    'export const componentSidebar: SidebarGroup[] = [',
  ];
  for (const g of ordered) {
    const items = groups.get(g).sort((a, b) => a.link.localeCompare(b.link));
    lines.push('  {', `    text: '${g}',`, '    collapsed: false,', '    items: [');
    for (const it of items) lines.push(`      { text: '${it.text}', link: '${it.link}' },`);
    lines.push('    ],', '  },');
  }
  lines.push('];', '');
  return lines.join('\n');
}

/* ---------------- 主流程 ---------------- */

const tagFileMap = buildTagFileMap();
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const storyFiles = readdirSync(storiesDir)
  .filter((f) => f.endsWith('.stories.ts'))
  .sort();
const entries = [];
let generated = 0;
let liveDemos = 0;
const skipped = [];

for (const f of storyFiles) {
  const info = parseStoryFile(join(storiesDir, f));
  if (!info || !info.tag.startsWith('wc-')) continue;
  const slug = info.tag.slice(3);
  entries.push({ group: info.group, text: info.name, link: `/components/${slug}` });

  if (HAND_MADE.has(slug) && !force) {
    skipped.push(`${info.name}（手工维护）`);
    continue;
  }
  const srcFile = tagFileMap[info.tag];
  if (!srcFile) {
    console.warn(`[warn] 找不到 ${info.tag} 的组件源码，跳过 API 表`);
    skipped.push(`${info.name}（无源码）`);
    continue;
  }
  const info2 = { ...info, stories: info.stories };
  const page = renderPage(info2, parseApi(srcFile));
  writeFileSync(join(outDir, `${slug}.md`), page, 'utf8');
  liveDemos += (page.match(/class="demo-block"/g) ?? []).length;
  generated++;
}

// 手工页也要出现在 sidebar
if (!entries.some((e) => e.link === '/components/upload')) {
  entries.push({ group: '表单组件', text: 'Upload 上传', link: '/components/upload' });
}
writeFileSync(
  join(root, 'apps/website/docs/.vitepress/sidebar.data.ts'),
  renderSidebar(entries),
  'utf8',
);

console.log(
  `生成组件页 ${generated} 个，落地 live demo ${liveDemos} 个；跳过 ${skipped.length} 个：${skipped.join('、')}`,
);
console.log(`sidebar.data.ts 已更新（共 ${entries.length} 个条目）`);
