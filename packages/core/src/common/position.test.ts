import { describe, expect, it } from 'vitest';
import { computePosition, POSITION_GAP, splitPlacement, type WcRect } from './position';

const VIEWPORT: WcRect = { x: 0, y: 0, width: 1000, height: 800 };

const anchor = (over: Partial<WcRect> = {}): WcRect => ({
  x: 400,
  y: 300,
  width: 100,
  height: 40,
  ...over,
});

const panel = (over: Partial<WcRect> = {}): WcRect => ({
  x: 0,
  y: 0,
  width: 200,
  height: 60,
  ...over,
});

describe('splitPlacement', () => {
  it('拆分基础方向与对齐后缀', () => {
    expect(splitPlacement('top')).to.deep.equal({ base: 'top' });
    expect(splitPlacement('bottom-start')).to.deep.equal({ base: 'bottom', align: 'start' });
    expect(splitPlacement('left-end')).to.deep.equal({ base: 'left', align: 'end' });
  });
});

describe('computePosition', () => {
  it('默认 top 居中：锚点上方留出间距', () => {
    const r = computePosition(anchor(), panel(), VIEWPORT, 'top');
    expect(r.placement).to.equal('top');
    expect(r.y).to.equal(300 - 60 - POSITION_GAP);
    expect(r.x).to.equal(400 + 50 - 100);
    // 箭头中心对准锚点中心：450 - x(350) = 100
    expect(r.arrowOffset).to.equal(100);
  });

  it('top 空间不足翻转到 bottom', () => {
    // 锚点贴近视口顶部，上方放不下 60px + 间距
    const r = computePosition(anchor({ y: 20 }), panel(), VIEWPORT, 'top');
    expect(r.placement).to.equal('bottom');
    expect(r.y).to.equal(20 + 40 + POSITION_GAP);
  });

  it('left 空间不足翻转到 right', () => {
    const r = computePosition(anchor({ x: 20 }), panel(), VIEWPORT, 'left');
    expect(r.placement).to.equal('right');
    expect(r.x).to.equal(20 + 100 + POSITION_GAP);
  });

  it('start/end 对齐：左对齐锚点起始边 / 右对齐锚点结束边', () => {
    const start = computePosition(anchor(), panel(), VIEWPORT, 'bottom-start');
    expect(start.x).to.equal(400);
    expect(start.placement).to.equal('bottom-start');

    const end = computePosition(anchor(), panel(), VIEWPORT, 'bottom-end');
    expect(end.x).to.equal(400 + 100 - 200);
    expect(end.placement).to.equal('bottom-end');
  });

  it('超出视口右缘时向左夹紧，箭头随之收敛并留白', () => {
    // 锚点在右缘，居中会溢出：clamp 到 1000-200
    const r = computePosition(anchor({ x: 950, y: 300 }), panel(), VIEWPORT, 'bottom');
    expect(r.x).to.equal(800);
    // 箭头中心 = 锚点中心(1000) - x(800) = 200 → clamp 到 200-12=188
    expect(r.arrowOffset).to.equal(188);
  });

  it('两侧都放不下时保持期望方向并夹紧到视口内', () => {
    // 视口很小，上下都放不下：clamp 下限优先，贴近视口顶部
    const small: WcRect = { x: 0, y: 0, width: 1000, height: 50 };
    const r = computePosition(anchor({ y: 10 }), panel({ height: 60 }), small, 'top');
    expect(r.placement).to.equal('top');
    expect(r.y).to.equal(0);
  });

  it('right 居中：垂直居中于锚点', () => {
    const r = computePosition(anchor(), panel(), VIEWPORT, 'right');
    expect(r.placement).to.equal('right');
    expect(r.x).to.equal(400 + 100 + POSITION_GAP);
    expect(r.y).to.equal(300 + 20 - 30);
    // 锚点垂直中心(320) - 面板 y(290) = 30
    expect(r.arrowOffset).to.equal(30);
  });

  it('弹层比视口还大时 clamp 下限不产生负坐标', () => {
    const huge = panel({ width: 2000 });
    const r = computePosition(anchor(), huge, VIEWPORT, 'bottom');
    expect(r.x).to.equal(0);
    expect(r.arrowOffset).to.equal(450);
  });
});
