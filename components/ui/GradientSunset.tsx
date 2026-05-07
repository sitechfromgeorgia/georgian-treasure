'use client';

import { useEffect, useRef } from 'react';

export function GradientSunset() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      timeRef.current += 0.002;
      const time = timeRef.current;

      // Create animated gradient
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Sunset colors with subtle animation
      const offset1 = Math.sin(time) * 0.1 + 0.2;
      const offset2 = Math.sin(time * 0.7) * 0.1 + 0.5;
      const offset3 = Math.sin(time * 0.5) * 0.1 + 0.8;

      gradient.addColorStop(0, `rgba(59, 130, 246, ${0.1 + Math.sin(time) * 0.05})`); // Blue
      gradient.addColorStop(offset1, `rgba(99, 102, 241, ${0.15 + Math.sin(time * 1.2) * 0.05})`); // Indigo
      gradient.addColorStop(offset2, `rgba(168, 85, 247, ${0.1 + Math.sin(time * 0.8) * 0.05})`); // Purple
      gradient.addColorStop(offset3, `rgba(236, 72, 153, ${0.08 + Math.sin(time * 0.6) * 0.04})`); // Pink
      gradient.addColorStop(1, 'rgba(249, 115, 22, 0.05)'); // Orange

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle glow spots
      for (let i = 0; i < 3; i++) {
        const x = canvas.width * (0.2 + i * 0.3 + Math.sin(time + i) * 0.1);
        const y = canvas.height * (0.3 + Math.cos(time * 0.5 + i) * 0.2);
        const radius = 100 + Math.sin(time + i) * 50;

        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        glowGradient.addColorStop(0, `rgba(255, 200, 100, ${0.1 + Math.sin(time * 2 + i) * 0.05})`);
        glowGradient.addColorStop(1, 'rgba(255, 200, 100, 0)');

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
