'use client';

import { useEffect, useRef } from 'react';

interface Cloud {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  opacity: number;
}

export function FloatingClouds() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cloudsRef = useRef<Cloud[]>([]);
  const animationRef = useRef<number>(0);

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

    // Initialize clouds - smaller, more subtle
    const cloudCount = 3;
    cloudsRef.current = [];

    for (let i = 0; i < cloudCount; i++) {
      cloudsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.4 + 100,
        width: 80 + Math.random() * 120,
        height: 25 + Math.random() * 20,
        speed: 0.1 + Math.random() * 0.15,
        opacity: 0.05 + Math.random() * 0.08,
      });
    }

    const drawCloud = (cloud: Cloud) => {
      ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity})`;
      
      // Draw cloud as multiple overlapping circles
      const circles = [
        { x: cloud.x, y: cloud.y, r: cloud.height * 0.5 },
        { x: cloud.x + cloud.width * 0.25, y: cloud.y - cloud.height * 0.2, r: cloud.height * 0.6 },
        { x: cloud.x + cloud.width * 0.5, y: cloud.y, r: cloud.height * 0.5 },
        { x: cloud.x + cloud.width * 0.75, y: cloud.y - cloud.height * 0.1, r: cloud.height * 0.4 },
        { x: cloud.x + cloud.width, y: cloud.y, r: cloud.height * 0.45 },
      ];

      circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      cloudsRef.current.forEach((cloud) => {
        // Update position
        cloud.x += cloud.speed;

        // Reset when off screen
        if (cloud.x > canvas.width + cloud.width) {
          cloud.x = -cloud.width;
          cloud.y = Math.random() * canvas.height * 0.6 + 50;
        }

        // Draw cloud
        drawCloud(cloud);
      });

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
      style={{ opacity: 0.5 }}
    />
  );
}
