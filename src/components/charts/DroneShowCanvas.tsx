import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { COPY } from '../../content/copy';
import type { DroneFormation } from '../../engine/types';
import { AfaStripeDivider, GoldStarsRow, PlannerIcon } from '../Icons';

interface DroneShowCanvasProps {
  formations: DroneFormation[];
}

interface Point2D {
  x: number;
  y: number;
  color: string;
}

interface DroneParticle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  color: string;
  phase: number;
}

const DRONE_COUNT = 210;

function sampleShapePoints(
  formation: DroneFormation,
  width: number,
  height: number
): Point2D[] {
  const cx = width / 2;
  const cy = height * 0.45;
  const scale = Math.min(width, height) * 0.32;
  const pts: Point2D[] = [];

  if (formation.id === 'estrella') {
    const outerR = scale * 1.02;
    const innerR = outerR * 0.4;
    const vertices: Array<{ x: number; y: number }> = [];
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const angle = -Math.PI / 2 + (i * Math.PI) / 5;
      vertices.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
      });
    }
    // Distribute drones along star perimeter + inner core rays
    const perimeterDrones = Math.floor(DRONE_COUNT * 0.72);
    for (let i = 0; i < perimeterDrones; i++) {
      const progress = (i / perimeterDrones) * 10;
      const idx = Math.floor(progress) % 10;
      const t = progress - Math.floor(progress);
      const a = vertices[idx];
      const b = vertices[(idx + 1) % 10];
      pts.push({
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        color: '#FFD55A',
      });
    }
    const remaining = DRONE_COUNT - pts.length;
    for (let i = 0; i < remaining; i++) {
      const angle = (i / remaining) * Math.PI * 2;
      const r = (i % 3 === 0 ? 0.16 : 0.32) * outerR;
      pts.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        color: i % 2 === 0 ? '#75AADB' : '#FFFFFF',
      });
    }
    return pts;
  }

  if (formation.id === 'corazon') {
    for (let i = 0; i < DRONE_COUNT; i++) {
      const isInner = i > DRONE_COUNT * 0.72;
      const t = (i / (isInner ? DRONE_COUNT * 0.28 : DRONE_COUNT * 0.72)) * Math.PI * 2;
      const factor = isInner ? 0.58 : 1;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)
      );
      pts.push({
        x: cx + hx * (scale * 0.056) * factor,
        y: cy + hy * (scale * 0.056) * factor - 4,
        color: isInner ? '#75AADB' : i % 4 === 0 ? '#FFFFFF' : '#FFD55A',
      });
    }
    return pts;
  }

  if (formation.id === 'copa') {
    // Draw trophy on offscreen canvas and sample bright pixels
    const off = document.createElement('canvas');
    off.width = 240;
    off.height = 180;
    const octx = off.getContext('2d');
    if (octx) {
      octx.strokeStyle = '#FFFFFF';
      octx.lineWidth = 5;
      octx.lineCap = 'round';
      octx.lineJoin = 'round';

      // Cup bowl
      octx.beginPath();
      octx.moveTo(85, 32);
      octx.lineTo(155, 32);
      octx.bezierCurveTo(155, 88, 138, 104, 120, 106);
      octx.bezierCurveTo(102, 104, 85, 88, 85, 32);
      octx.stroke();

      // Handles
      octx.beginPath();
      octx.arc(83, 56, 17, Math.PI * 0.55, Math.PI * 1.45, false);
      octx.stroke();
      octx.beginPath();
      octx.arc(157, 56, 17, -Math.PI * 0.45, Math.PI * 0.45, false);
      octx.stroke();

      // Stem & Pedestal
      octx.beginPath();
      octx.moveTo(120, 106);
      octx.lineTo(120, 134);
      octx.moveTo(96, 135);
      octx.lineTo(144, 135);
      octx.moveTo(84, 148);
      octx.lineTo(156, 148);
      octx.stroke();

      // Center crown dot
      octx.fillStyle = '#FFFFFF';
      octx.beginPath();
      octx.arc(120, 66, 8, 0, Math.PI * 2);
      octx.fill();

      return extractPixelsToDrones(off, width, height, '#FFD55A', '#75AADB');
    }
  }

  // Text formations: 'sancor', 'sde' or 'anfitriones'
  const textToRender = formation.textValue || (formation.id === 'sde' ? 'SDE' : 'VIP');
  const off = document.createElement('canvas');
  off.width = 280;
  off.height = 160;
  const octx = off.getContext('2d');
  if (octx) {
    octx.fillStyle = '#FFFFFF';
    octx.textAlign = 'center';
    octx.textBaseline = 'middle';
    if (formation.id === 'sancor' || textToRender.includes(' ')) {
      const words = textToRender.split(' ');
      octx.font = '800 36px Oswald, Montserrat, sans-serif';
      octx.fillText(words[0], 140, 50);
      octx.font = '800 32px Oswald, Montserrat, sans-serif';
      octx.fillText(words.slice(1).join(' '), 140, 96);
    } else {
      const fontSize = textToRender.length > 5 ? 42 : textToRender.length > 3 ? 52 : 66;
      octx.font = `700 ${fontSize}px Oswald, Montserrat, sans-serif`;
      octx.fillText(textToRender, 140, 74);
    }
    return extractPixelsToDrones(
      off,
      width,
      height,
      formation.id === 'sancor' ? '#75AADB' : formation.id === 'sde' ? '#75AADB' : '#FFFFFF',
      '#FFD55A'
    );
  }

  // Fallback circle
  for (let i = 0; i < DRONE_COUNT; i++) {
    const a = (i / DRONE_COUNT) * Math.PI * 2;
    pts.push({
      x: cx + Math.cos(a) * scale,
      y: cy + Math.sin(a) * scale,
      color: '#75AADB',
    });
  }
  return pts;
}

function extractPixelsToDrones(
  off: HTMLCanvasElement,
  targetW: number,
  targetH: number,
  primaryColor: string,
  secondaryColor: string
): Point2D[] {
  const octx = off.getContext('2d');
  if (!octx) return [];
  const img = octx.getImageData(0, 0, off.width, off.height).data;
  const candidates: Array<{ x: number; y: number }> = [];

  for (let y = 0; y < off.height; y += 2) {
    for (let x = 0; x < off.width; x += 2) {
      const alpha = img[(y * off.width + x) * 4 + 3];
      if (alpha > 110) {
        candidates.push({
          x: (x / off.width) * (targetW * 0.84) + targetW * 0.08,
          y: (y / off.height) * (targetH * 0.72) + targetH * 0.08,
        });
      }
    }
  }

  if (candidates.length === 0) return [];

  const result: Point2D[] = [];
  for (let i = 0; i < DRONE_COUNT; i++) {
    const idx = Math.floor((i / DRONE_COUNT) * candidates.length) % candidates.length;
    const pt = candidates[idx];
    result.push({
      x: pt.x,
      y: pt.y,
      color: i % 5 === 0 ? secondaryColor : primaryColor,
    });
  }
  return result;
}

export const DroneShowCanvas: React.FC<DroneShowCanvasProps> = ({
  formations,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const dronesRef = useRef<DroneParticle[]>([]);
  const prefersReduced = useReducedMotion();

  const currentFormation = formations[activeIdx] ?? formations[0];

  // Auto-cycle formations every 3.8 seconds
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % formations.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, [formations.length]);

  // Ambient drone hum when section is visible in viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          soundEngine.startDroneHum();
        } else {
          soundEngine.stopDroneHum();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      soundEngine.stopDroneHum();
    };
  }, []);

  // Recompute target positions whenever active formation changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = 360;
    const height = 240;

    const targets = sampleShapePoints(currentFormation, width, height);
    if (dronesRef.current.length === 0) {
      dronesRef.current = targets.map((t, idx) => ({
        x: width / 2 + (Math.random() - 0.5) * 180,
        y: height - 20,
        tx: t.x,
        ty: t.y,
        color: t.color,
        phase: idx * 0.37,
      }));
    } else {
      dronesRef.current.forEach((d, idx) => {
        const t = targets[idx % targets.length];
        if (t) {
          d.tx = t.x;
          d.ty = t.y;
          d.color = t.color;
          if (prefersReduced) {
            d.x = t.x;
            d.y = t.y;
          }
        }
      });
    }
  }, [currentFormation, prefersReduced]);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let tick = 0;

    const render = () => {
      tick += 0.04;
      const w = canvas.width;
      const h = canvas.height;

      // Deep night sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, '#090F1A');
      skyGrad.addColorStop(0.75, '#121E31');
      skyGrad.addColorStop(1, '#1B2B44');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Subtle background stars
      ctx.fillStyle = 'rgba(255,255,255,0.22)';
      for (let s = 0; s < 28; s++) {
        const sx = ((s * 97) % (w - 20)) + 10;
        const sy = ((s * 53) % (h * 0.65)) + 8;
        ctx.fillRect(sx, sy, 1.2, 1.2);
      }

      // Update & draw drones
      for (const d of dronesRef.current) {
        if (!prefersReduced) {
          d.x += (d.tx - d.x) * 0.075;
          d.y += (d.ty - d.y) * 0.075;
        }
        const twinkle = 0.72 + 0.28 * Math.sin(tick + d.phase);
        const hoverY = prefersReduced ? 0 : Math.sin(tick * 0.8 + d.phase) * 0.65;

        // Soft outer halo
        ctx.beginPath();
        ctx.fillStyle =
          d.color === '#FFD55A'
            ? `rgba(255, 213, 90, ${0.22 * twinkle})`
            : d.color === '#75AADB'
            ? `rgba(117, 170, 219, ${0.25 * twinkle})`
            : `rgba(255, 255, 255, ${0.2 * twinkle})`;
        ctx.arc(d.x, d.y + hoverY, 4.4, 0, Math.PI * 2);
        ctx.fill();

        // Bright core LED
        ctx.beginPath();
        ctx.fillStyle = d.color;
        ctx.globalAlpha = twinkle;
        ctx.arc(d.x, d.y + hoverY, 1.75, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Madre de Ciudades circular stadium silhouette at bottom horizon
      ctx.fillStyle = '#070B12';
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, h - 14);
      ctx.lineTo(w * 0.24, h - 14);
      ctx.quadraticCurveTo(w * 0.5, h - 34, w * 0.76, h - 14);
      ctx.lineTo(w, h - 14);
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();

      // Stadium rim lights
      ctx.strokeStyle = 'rgba(117, 170, 219, 0.45)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w * 0.26, h - 14);
      ctx.quadraticCurveTo(w * 0.5, h - 32, w * 0.74, h - 14);
      ctx.stroke();

      rafId = window.requestAnimationFrame(render);
    };

    rafId = window.requestAnimationFrame(render);
    return () => window.cancelAnimationFrame(rafId);
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      className="planner-sheet is-drone-sheet"
      aria-labelledby="sec-drones-title"
    >
      <div className="sheet-header">
        <GoldStarsRow count={3} size={13} />
        <span className="sheet-kicker">{COPY.charts.drones.kicker}</span>
        <h2 id="sec-drones-title" className="sheet-script-title">
          {COPY.charts.drones.title}
        </h2>
        <AfaStripeDivider />
      </div>

      <div className="drone-canvas-frame">
        <canvas
          ref={canvasRef}
          width={360}
          height={240}
          className="drone-night-canvas"
          aria-label={`Simulación de Show de Drones formando: ${currentFormation.label}`}
        />
        <div className="drone-caption-bar">
          <PlannerIcon name="dron" size={18} strokeColor="#75AADB" />
          <span>{currentFormation.caption}</span>
        </div>
      </div>

      <div className="drone-selector-pills" role="tablist" aria-label="Figuras del show de drones">
        {formations.map((f, idx) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={idx === activeIdx}
            className={`drone-pill-btn ${idx === activeIdx ? 'is-active' : ''}`}
            onClick={() => {
              soundEngine.unlockFromGesture();
              setActiveIdx(idx);
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
    </section>
  );
};
