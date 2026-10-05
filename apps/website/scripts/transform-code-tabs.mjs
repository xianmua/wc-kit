/**
 * 把组件页 demo 的「查看代码」details 折叠块转换为三语言 code-group（HTML / Vue / React）。
 * - 幂等：已是 code-group 的 demo 自动跳过；配合 gen-from-stories.mjs 重生成后可重跑
 * - 函数体复用页面 <script setup> 的源码（动态 import 风格，框架无关）
 * - 模板层做机械转换：Vue 指令 → 原生 addEventListener / React props
 *
 * 用法：node transform-code-tabs.mjs [--force]
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../docs/components');

/* ---------------- script setup 解析 ---------------- */

/** 从页面 script setup 中提取函数源码（括号配平） */
function grabFunction(script, fnName) {
  const start = script.indexOf(`function ${fnName}(`);
  if (start === -1) return null;
  const braceAt = script.indexOf('{', start);
  if (braceAt === -1) return null;
  let depth = 0;
  for (let i = braceAt; i < script.length; i++) {
    if (script[i] === '{') depth++;
    else if (script[i] === '}') {
      depth--;
      if (depth === 0) return script.slice(start, i + 1);
    }
  }
  return null;
}

/** 提取 ref 声明行：const xxx = ref() */
function grabRefLine(script, refName) {
  const re = new RegExp(`const ${refName} = ref\\(\\);?`);
  const m = script.match(re);
  return m ? m[0] : `const ${refName} = ref()`;
}

/* ---------------- 表达式转换 ---------------- */

/** msg('info', 'x') → message.info('x')；其余函数引用原样 */
function exprToJs(expr) {
  return expr.replace(/\bmsg\(\s*'(\w+)'\s*,\s*([^)]+)\)/g, (whole, type, rest) => {
    if (['info', 'success', 'warning', 'error'].includes(type)) {
      return `message.${type}(${rest.trim()})`;
    }
    if (type === 'loading') return `message.loading(${rest.trim()})`;
    return whole;
  });
}

/** Vue 表达式 → React JSX 表达式体（ref xxx?. → xxx.current?.） */
function exprToReact(expr) {
  return exprToJs(expr).replace(/([a-zA-Z]\w*)\?\./g, (whole, name) =>
    refNames.has(name) ? `${name}.current?.` : whole,
  );
}

/* ---------------- 模板解析 ---------------- */

let refNames = new Set(); // 当前 demo 模板中出现的 ref 名（React 转换用）
let scriptFns = new Set(); // 当前页面 script setup 中的函数名

/** 拆分 details 代码：模板部分 + 内嵌 <script setup>（table/form 等生成页自带） */
function splitTpl(raw) {
  const m = raw.match(/<script setup>([\s\S]*?)<\/script>/);
  if (!m) return { tpl: raw.trim(), inlineScript: '' };
  return { tpl: raw.replace(m[0], '').trim(), inlineScript: m[1] };
}

/** 括号配平：从 text 中 pos 处的开括号起，返回闭合位置的下一段文本 */
function balanced(text, pos) {
  const open = text[pos];
  const close = open === '(' ? ')' : open === '{' ? '}' : ']';
  let depth = 0;
  for (let i = pos; i < text.length; i++) {
    if (text[i] === open) depth++;
    else if (text[i] === close) {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/** 提取 onMounted(() => {...}) 调用信息：返回 {start, end, arrowText, body}，找不到返回 null */
function extractOnMounted(s) {
  const idx = s.indexOf('onMounted(');
  if (idx === -1) return null;
  const callParen = idx + 'onMounted'.length; // 调用括号 "(" 的下标
  const callEnd = balanced(s, callParen);
  if (callEnd === -1) return null;
  const arrow = s.indexOf('=>', callParen);
  const braceStart = s.indexOf('{', arrow);
  if (arrow === -1 || braceStart === -1) return null;
  const bodyEnd = balanced(s, braceStart);
  if (bodyEnd === -1) return null;
  return {
    start: idx,
    end: callEnd + 1,
    arrowText: s.slice(callParen + 1, bodyEnd + 1), // "() => {...}"
    body: s.slice(braceStart + 1, bodyEnd), // 花括号内语句
  };
}

/** Vue 风格 script body → 原生 JS（onMounted 脱壳、ref → getElementById、去 vue import） */
function inlineScriptToNative(body, refIds) {
  let s = body;
  s = s.replace(/^[^\n]*from 'vue'[^\n]*\n?/gm, '');
  s = s.replace(/^\s*const (\w+) = ref\([^)]*\)\s*;?\s*$/gm, ''); // ref 声明由 id 获取替代
  const om = extractOnMounted(s);
  if (om) s = s.slice(0, om.start) + om.body.trim() + s.slice(om.end);
  s = s.replace(/(\w+)\.value\b/g, '$1');
  const decls = [...refIds].map((r) => `const ${r} = document.getElementById('${r}');`);
  return [...decls, s.trim()].filter(Boolean).join('\n\n');
}

/** Vue 风格 script body → React（ref → useRef、onMounted → useEffect、.value → .current） */
function inlineScriptToReact(body) {
  let s = body;
  s = s.replace(/^[^\n]*from 'vue'[^\n]*\n?/gm, '');
  s = s.replace(/const (\w+) = ref\(([^)]*)\)\s*;?/g, 'const $1 = useRef(null);');
  const om = extractOnMounted(s);
  if (om) s = s.slice(0, om.start) + `useEffect(${om.arrowText}, [])` + s.slice(om.end);
  s = s.replace(/(\w+)\.value\b/g, '$1.current');
  return s.trim();
}

/** 事件表达式整理：纯函数引用加 ()；msg(...) 已在 exprToJs 转换 */
function normalizeEventExpr(expr) {
  const trimmed = expr.trim();
  if (/^[a-zA-Z]\w*$/.test(trimmed) && scriptFns.has(trimmed)) return `${trimmed}()`;
  return exprToJs(trimmed);
}

/** 解析模板的顶层标签序列（支持嵌套），返回 [{tag, attrs, raw}] */
function parseElements(tpl) {
  const els = [];
  const re = /<(\/?)(wc-[\w-]+)((?:[^>"]|"[^"]*")*?)(\/)?>/g;
  let m;
  while ((m = re.exec(tpl))) {
    els.push({
      closing: m[1] === '/',
      tag: m[2],
      attrs: m[3] ?? '',
      selfClose: m[4] === '/',
      start: m.index,
    });
  }
  return els;
}

function parseAttrs(attrs) {
  const out = [];
  const re = /([@.:]?[\w-]+)(?:=(?:"([^"]*)"|'([^']*)'))?/g;
  let m;
  while ((m = re.exec(attrs))) {
    out.push({ name: m[1], value: m[2] ?? m[3] ?? null });
  }
  return out;
}

const camel = (s) => s.replace(/-./g, (c) => c[1].toUpperCase());
const pascal = (s) => camel(s[0].toUpperCase() + s.slice(1));

/** 收集模板中 ref="x" 名与用到的函数名 */
function collectIdents(tpl) {
  const refs = new Set();
  const fns = new Set();
  for (const el of parseElements(tpl)) {
    for (const a of parseAttrs(el.attrs)) {
      if (a.name === 'ref' && a.value) refs.add(a.value);
      if (a.name.startsWith('@') && a.value) {
        // 表达式里出现的标识符中，能对上 function 声明的算函数引用
        for (const id of a.value.match(/\b[a-zA-Z]\w*\b/g) || []) {
          if (scriptFns.has(id)) fns.add(id);
        }
      }
    }
  }
  return { refs, fns };
}

/* ---------------- 三语言视图生成 ---------------- */

/** HTML（原生 Web Component）视图 */
function buildHtml(rawTpl, demoId, pageScript) {
  const { tpl, inlineScript } = splitTpl(rawTpl);
  const lines = [];
  const bindLines = [];
  const declared = new Set();
  let idSeq = 0;

  // 逐标签转换：ref → id；@事件 → 移除并记录绑定
  const elements = parseElements(tpl);
  const assignments = [];
  for (const el of elements) {
    if (el.closing) continue;
    const attrs = parseAttrs(el.attrs);
    const hasEvent = attrs.some((a) => a.name.startsWith('@'));
    const refAttr = attrs.find((a) => a.name === 'ref');
    const plain = el.attrs
      .replace(/\s@[\w.:-]+="[^"]*"/g, '')
      .replace(/\sref="[^"]*"/g, '')
      .replace(/\n\s*\n/g, '\n')
      .replace(/^\s+|\s+$/g, (m) => (m.includes('\n') ? '\n' : ' '));
    let replaceAttrs = plain;
    let elVar = null;
    if (refAttr || hasEvent) {
      elVar = refAttr?.value || `${demoId}-btn${idSeq++}`;
      replaceAttrs += ` id="${elVar}"`;
    }
    assignments.push({ el, replaceAttrs, elVar, attrs });
  }
  // 统一倒序替换（含闭标签不变，仅改开标签）
  let result = tpl;
  for (const a of [...assignments].reverse()) {
    const { el } = a;
    const openLen = el.tag.length + 1 + el.attrs.length + (el.selfClose ? 2 : 1);
    result =
      result.slice(0, el.start) +
      `<${el.tag}${a.replaceAttrs}${el.selfClose ? ' />' : '>'}` +
      result.slice(el.start + openLen);
  }

  // 绑定语句 + ref 变量声明
  const refVars = new Set();
  for (const a of assignments) {
    if (a.elVar) {
      const varName = a.elVar.replace(/-(\w)/g, (c) => c[1].toUpperCase());
      const hasAttrs = a.attrs.some((attr) => attr.name.startsWith('@') && attr.value);
      // 有内嵌 script 时 ref 声明交给 inlineScriptToNative，避免重复
      if ((hasAttrs || !inlineScript) && !declared.has(varName)) {
        bindLines.push(`const ${varName} = document.getElementById('${a.elVar}');`);
        declared.add(varName);
      }
      if (/^[a-zA-Z]\w*$/.test(a.elVar)) refVars.add(a.elVar);
      for (const attr of a.attrs) {
        if (!attr.name.startsWith('@') || !attr.value) continue;
        const evName = attr.name.slice(1).replace(/\.\w+$/, '');
        const body = normalizeEventExpr(attr.value);
        bindLines.push(`${varName}.addEventListener('${evName}', () => { ${body} });`);
      }
    }
  }

  lines.push(result);
  const { fns: usedFns } = collectIdents(tpl);
  if (inlineScript || bindLines.length || usedFns.size) {
    const scriptParts = [];
    const allText = bindLines.join('\n') + inlineScript;
    if (/\bmessage\./.test(allText)) {
      scriptParts.push("const { message } = await import('@wc-kit/core');");
    }
    if (inlineScript) scriptParts.push(inlineScriptToNative(inlineScript, refVars));
    if (bindLines.length) scriptParts.push(bindLines.join('\n'));
    for (const f of usedFns)
      scriptParts.push(grabFunction(pageScript, f) || `// ${f} 定义见页面 script setup`);
    if (scriptParts.length)
      lines.push(
        '',
        '<script type="module">',
        scriptParts.filter(Boolean).join('\n\n'),
        '</script>',
      );
  }
  return lines.join('\n');
}

/** Vue SFC 视图 */
function buildVue(rawTpl, pageRefs, pageFns) {
  const { tpl, inlineScript } = splitTpl(rawTpl);
  const { refs, fns } = collectIdents(tpl);
  const body = tpl
    .trim()
    .split('\n')
    .map((l) => (l.trim() ? '  ' + l : l))
    .join('\n');
  const parts = ['<template>', body, '</template>'];
  if (inlineScript) {
    // 内嵌 script 原样保留（table/form 等生成页自带完整逻辑）
    parts.push('', `<script setup lang="ts">${inlineScript.trim()}</script>`);
    return parts.join('\n');
  }
  if (refs.size || fns.size) {
    const scriptLines = ['<script setup lang="ts">'];
    if (refs.size) {
      scriptLines.push("import { ref } from 'vue';", '');
      for (const r of refs) scriptLines.push(grabRefLine(pageRefs, r));
      scriptLines.push('');
    }
    for (const f of fns) {
      scriptLines.push(grabFunction(pageFns, f) || `// ${f} 定义见页面 script setup`, '');
    }
    scriptLines.push('</script>');
    parts.push('', scriptLines.join('\n'));
  }
  return parts.join('\n').trim();
}

/** React JSX 视图 */
function buildReact(rawTpl, pageRefs, pageFns, _component) {
  const { tpl, inlineScript } = splitTpl(rawTpl);
  const { refs, fns } = collectIdents(tpl);
  refNames = refs;
  const comps = new Set();
  const edits = []; // {start, len, text} 统一倒序替换，避免索引漂移

  for (const el of parseElements(tpl)) {
    if (el.closing) continue;
    const attrs = parseAttrs(el.attrs);
    let out = '';
    for (const a of attrs) {
      if (a.name === 'ref' && a.value) {
        out += ` ref={${a.value}}`;
        continue;
      }
      if (a.name.startsWith('@')) {
        const ev = camel(a.name.slice(1).replace(/\.\w+$/, ''));
        const reactEv = ev === 'click' ? 'onClick' : 'on' + ev[0].toUpperCase() + ev.slice(1);
        out += ` ${reactEv}={() => { ${exprToReact(a.value)} }}`;
        continue;
      }
      if (a.name === 'class') {
        out += ` className="${a.value}"`;
        continue;
      }
      if (a.value === null) {
        out += ` ${camel(a.name)}`; // boolean shorthand
        continue;
      }
      if (a.value === 'true' || a.value === 'false') {
        out += ` ${camel(a.name)}={${a.value}}`;
        continue;
      }
      if (/^\d+$/.test(a.value)) {
        out += ` ${camel(a.name)}={${a.value}}`;
        continue;
      }
      out += /^[\w-]+$/.test(a.name) ? ` ${camel(a.name)}="${a.value}"` : ` ${a.name}="${a.value}"`;
    }
    comps.add(pascal(el.tag));
    const openLen = el.tag.length + 1 + el.attrs.length + (el.selfClose ? 2 : 1);
    edits.push({
      start: el.start,
      len: openLen,
      text: `<${pascal(el.tag)}${out}${el.selfClose ? ' />' : '>'}`,
    });
  }

  // 闭合标签
  const closeRe = /<\/(wc-[\w-]+)>/g;
  let m;
  while ((m = closeRe.exec(tpl))) {
    edits.push({ start: m.index, len: m[0].length, text: `</${pascal(m[1])}>` });
  }

  let result = tpl;
  for (const e of [...edits].sort((a, b) => b.start - a.start)) {
    result = result.slice(0, e.start) + e.text + result.slice(e.start + e.len);
  }

  // import 行
  const importLines = [`import { ${[...comps].sort().join(', ')} } from '@wc-kit/react';`];
  const fnBodies = [...fns].map(
    (f) => grabFunction(pageFns, f) || `// ${f} 定义见页面 script setup`,
  );
  const bodyText = fnBodies.join('\n');
  if (/\bmessage\./.test(exprToJs(result) + bodyText + inlineScript))
    importLines.push(`import { message } from '@wc-kit/core';`);

  const lines = [...importLines];
  const reactImports = [];
  if (refs.size || inlineScript.includes('ref(')) reactImports.push('useRef');
  if (inlineScript.includes('onMounted(')) reactImports.push('useEffect');
  if (reactImports.length)
    importLines.splice(1, 0, `import { ${reactImports.join(', ')} } from 'react';`);

  lines.push('', result.trim());
  if (refs.size && !inlineScript) {
    lines.push(
      '',
      '// 组件实例引用',
      ...[...refs].map((r) => `const ${r} = useRef<HTMLElement | null>(null);`),
    );
  }
  if (inlineScript) {
    lines.push('', inlineScriptToReact(inlineScript));
  }
  for (const f of fns) {
    lines.push('', grabFunction(pageFns, f) || `// ${f} 定义见页面 script setup`);
  }
  return lines.join('\n');
}

/* ---------------- 主流程 ---------------- */

const files = readdirSync(ROOT).filter((f) => f.endsWith('.md'));
let totalDemos = 0;
let totalSkipped = 0;

for (const file of files) {
  const path = join(ROOT, file);
  const src = readFileSync(path, 'utf8');
  const component = basename(file, '.md');

  const scriptMatch = src.match(/<script setup>([\s\S]*?)<\/script>/);
  const script = scriptMatch ? scriptMatch[1] : '';
  scriptFns = new Set([...script.matchAll(/function (\w+)\(/g)].map((m) => m[1]));

  if (!/<details><summary>查看代码<\/summary>/.test(src)) {
    continue;
  }

  // 找出每个 details 查看代码块，替换为 code-group
  const detailsRe =
    /<details><summary>查看代码<\/summary>\s*\n\s*```html\n([\s\S]*?)\n```\s*\n\s*<\/details>/g;
  let demoSeq = 0;
  const out = src.replace(detailsRe, (whole, tpl) => {
    demoSeq++;
    const demoId = `${component}-${demoSeq}`;
    const html = buildHtml(tpl, demoId, script);
    const vue = buildVue(tpl, script, script);
    const react = buildReact(tpl, script, script, component);
    const group = [
      '::: code-group',
      '```html [HTML]',
      html,
      '```',
      '',
      '```vue [Vue]',
      vue,
      '```',
      '',
      '```tsx [React]',
      react,
      '```',
      ':::',
    ].join('\n');
    return group;
  });

  if (demoSeq > 0) {
    writeFileSync(path, out, 'utf8');
    totalDemos += demoSeq;
    console.log(`${file}: ${demoSeq} demos converted`);
  } else {
    totalSkipped++;
    console.log(`${file}: details found but no match converted (check format)`);
  }
}

console.log(`\ndone: ${totalDemos} demos converted, ${totalSkipped} pages skipped`);
