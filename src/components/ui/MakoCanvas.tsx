"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  speed: number;
  drift: number;
  opacity: number;
  baseOpacity: number;
  phase: number; // for pulsing
  phaseSpeed: number;
  depth: number; // 0=far, 1=near → affects size, speed, brightness
}

function createParticles(w: number, h: number): Particle[] {
  const count = Math.min(Math.floor((w * h) / 15000), 80);
  return Array.from({ length: Math.max(count, 30) }, () => {
    const depth = Math.random();
    const baseRadius = 1 + depth * 3.5; // far=small, near=big
    const baseOpacity = 0.15 + depth * 0.4;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      radius: baseRadius,
      baseRadius,
      speed: 0.1 + (1 - depth) * 0.3, // far=slow, near=faster
      drift: (Math.random() - 0.5) * 0.3,
      opacity: baseOpacity,
      baseOpacity,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.3 + Math.random() * 0.7,
      depth,
    };
  });
}

export default function MakoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particlesRef.current = createParticles(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    if (isReduced) {
      // Draw static snapshot
      const particles = particlesRef.current;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(135, 214, 230, ${p.opacity * 0.5})`;
        ctx.fill();
      });
      return;
    }

    const animate = (now: number) => {
      const time = now / 1000;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gentle upward float + horizontal drift
        p.y -= p.speed;
        p.x += p.drift;

        // Wrap around
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        // Pulse opacity and size
        const pulse = Math.sin(time * p.phaseSpeed + p.phase);
        p.opacity = p.baseOpacity + pulse * 0.12;
        p.radius = p.baseRadius + pulse * 0.6;

        // Draw glow (outer soft circle)
        const glowRadius = p.radius * 4;
        const glow = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, glowRadius
        );
        glow.addColorStop(0, `rgba(135, 214, 230, ${p.opacity * 0.3})`);
        glow.addColorStop(0.4, `rgba(169, 236, 244, ${p.opacity * 0.1})`);
        glow.addColorStop(1, "rgba(135, 214, 230, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(
          p.x - glowRadius, p.y - glowRadius,
          glowRadius * 2, glowRadius * 2
        );

        // Draw core (bright center)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 245, 249, ${p.opacity})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
