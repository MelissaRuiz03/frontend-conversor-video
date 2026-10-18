import { useEffect, useRef } from 'react';

const StarfieldBackground = ({
  density = 0.00012,
  speed = 12,
  color = '255, 255, 255',
  backgroundColor = '#05070d',
  mouseRepulsion = true,
  repelRadius = 110,
  repelStrength = 60,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return undefined;

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const pointer = { x: -9999, y: -9999, active: false };
    let stars = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let last = 0;
    let visible = true;

    const makeStars = () => {
      const count = Math.round(width * height * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.3 + 0.3,
        depth: Math.random() * 0.7 + 0.3,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 1.5 + 0.5,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeStars();
    };

    const drawStatic = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
      for (const star of stars) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color}, ${0.5 + star.depth * 0.5})`;
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (now) => {
      raf = 0;
      if (!visible) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      for (const star of stars) {
        star.y += speed * star.depth * dt;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }

        if (mouseRepulsion && pointer.active) {
          const dx = star.x - pointer.x;
          const dy = star.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < repelRadius) {
            const force = (1 - dist / repelRadius) * repelStrength * dt;
            star.x += (dx / dist) * force;
            star.y += (dy / dist) * force;
          }
        }

        const twinkle = 0.55 + 0.45 * Math.sin(now * 0.001 * star.twinkleSpeed + star.phase);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color}, ${twinkle * (0.4 + star.depth * 0.6)})`;
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (reducedMotion) {
        drawStatic();
        return;
      }
      if (!raf && visible) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };

    const onPointerMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) wake();
    };

    resize();
    wake();

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [density, speed, color, backgroundColor, mouseRepulsion, repelRadius, repelStrength]);

  return <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />;
};

export default StarfieldBackground;
