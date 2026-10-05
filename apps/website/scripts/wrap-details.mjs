/**
 * 把组件页中裸的 ::: code-group 容器包进 ::: details 查看代码 折叠容器（默认收起）。
 * 幂等：已包 details 的 code-group 跳过。
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../docs/components');

for (const file of readdirSync(ROOT).filter((f) => f.endsWith('.md'))) {
  const path = join(ROOT, file);
  const src = readFileSync(path, 'utf8');
  if (!src.includes('::: code-group')) continue;

  const lines = src.split('\n');
  const out = [];
  let wrapped = 0;
  let cgDepth = 0; // code-group 嵌套深度
  let pendingWrap = false; // 当前 code-group 是否为本次新包的 details

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 已有 details 包装：原样输出，内部闭合由原有结构保证（不补行）
    if (line === '::: details 查看代码' && lines[i + 1] === '::: code-group') {
      out.push(line);
      continue;
    }

    if (line === '::: code-group') {
      if (out[out.length - 1] === '::: details 查看代码') {
        // 已有 details 包装（手工或上一轮脚本）：原样保留，仅需跟踪闭合补行
        cgDepth = 1;
        pendingWrap = true;
        out.push(line);
        continue;
      }
      cgDepth = 1;
      pendingWrap = true;
      out.push('::: details 查看代码');
      out.push(line);
      continue;
    }

    if (cgDepth > 0 && /^:::$/.test(line.trim())) {
      out.push(line);
      if (cgDepth === 1 && pendingWrap) {
        // 下一行已是 ::: 说明 details 闭合已存在（手工包装过），不补
        if (lines[i + 1] !== ':::') {
          out.push(':::'); // 补 details 闭合
          wrapped++;
        }
        pendingWrap = false;
      }
      cgDepth = 0;
      continue;
    }

    out.push(line);
  }

  writeFileSync(path, out.join('\n'), 'utf8');
  if (wrapped) console.log(`${file}: wrapped ${wrapped}`);
}
console.log('done');
