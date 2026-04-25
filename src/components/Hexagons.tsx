"use client";
import React, { useRef, useEffect } from 'react';

type CanvasFillStyle = string | CanvasGradient | CanvasPattern;

interface HexagonsProps {
    direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
    speed?: number;
    borderColor?: CanvasFillStyle;
    hexSize?: number;
    hoverFillColor?: CanvasFillStyle;
}

const Hexagons: React.FC<HexagonsProps> = ({
    direction = 'right',
    speed = 1,
    borderColor = '#999',
    hexSize = 25,
    hoverFillColor = '#222'
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number | null>(null);
    const gridOffset = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
    const hoveredHexRef = useRef<{ q: number, r: number } | null>(null);
    const lastFrameTimeRef = useRef<number>(0);
    const isVisibleRef = useRef<boolean>(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const observer = new IntersectionObserver(([entry]) => {
            isVisibleRef.current = entry.isIntersecting;
        }, { threshold: 0 });
        observer.observe(canvas);

        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const drawGrid = () => {
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const hexWidth = Math.sqrt(3) * hexSize;
            const hexHeight = 2 * hexSize;
            const vertSpacing = hexHeight * 0.75;
            
            // For seamless looping, we modulo the offset by the repetition period.
            // Horizontal period is hexWidth. Vertical period is 2 * vertSpacing (because rows stagger).
            const offX = ((gridOffset.current.x % hexWidth) + hexWidth) % hexWidth;
            const offY = ((gridOffset.current.y % (vertSpacing * 2)) + (vertSpacing * 2)) % (vertSpacing * 2);

            const cols = Math.ceil(canvas.width / hexWidth) + 3;
            const rows = Math.ceil(canvas.height / vertSpacing) + 3;

            for (let row = -2; row < rows; row++) {
                for (let col = -3; col < cols; col++) {
                    const isOddRow = Math.abs(row) % 2 === 1;
                    const x = col * hexWidth + (isOddRow ? hexWidth / 2 : 0) + offX;
                    const y = row * vertSpacing + offY;

                    if (
                        hoveredHexRef.current &&
                        hoveredHexRef.current.q === col &&
                        hoveredHexRef.current.r === row
                    ) {
                        ctx.fillStyle = hoverFillColor;
                        ctx.beginPath();
                        for (let i = 0; i < 6; i++) {
                            const angle = (Math.PI / 3) * i - Math.PI / 6;
                            const hx = x + hexSize * Math.cos(angle);
                            const hy = y + hexSize * Math.sin(angle);
                            if (i === 0) ctx.moveTo(hx, hy);
                            else ctx.lineTo(hx, hy);
                        }
                        ctx.closePath();
                        ctx.fill();
                    }

                    // Stroke
                    ctx.strokeStyle = borderColor;
                    ctx.beginPath();
                    for (let i = 0; i < 6; i++) {
                        const angle = (Math.PI / 3) * i - Math.PI / 6;
                        const hx = x + hexSize * Math.cos(angle);
                        const hy = y + hexSize * Math.sin(angle);
                        if (i === 0) ctx.moveTo(hx, hy);
                        else ctx.lineTo(hx, hy);
                    }
                    ctx.closePath();
                    ctx.stroke();
                }
            }

            const gradient = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                0,
                canvas.width / 2,
                canvas.height / 2,
                Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
            );
            gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
            gradient.addColorStop(1, '#060010');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        const updateAnimation = (time: number) => {
            if (!isVisibleRef.current) {
                requestRef.current = requestAnimationFrame(updateAnimation);
                return;
            }

            const delta = time - lastFrameTimeRef.current;
            if (delta < 33) {
                requestRef.current = requestAnimationFrame(updateAnimation);
                return;
            }
            lastFrameTimeRef.current = time;

            const effectiveSpeed = Math.max(speed, 0.1);
            switch (direction) {
                case 'right':
                    gridOffset.current.x = gridOffset.current.x + effectiveSpeed;
                    break;
                case 'left':
                    gridOffset.current.x = gridOffset.current.x - effectiveSpeed;
                    break;
                case 'up':
                    gridOffset.current.y = gridOffset.current.y - effectiveSpeed;
                    break;
                case 'down':
                    gridOffset.current.y = gridOffset.current.y + effectiveSpeed;
                    break;
                case 'diagonal':
                    gridOffset.current.x = gridOffset.current.x + effectiveSpeed;
                    gridOffset.current.y = gridOffset.current.y + effectiveSpeed;
                    break;
                default:
                    break;
            }

            drawGrid();
            requestRef.current = requestAnimationFrame(updateAnimation);
        };

        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const hexWidth = Math.sqrt(3) * hexSize;
            const hexHeight = 2 * hexSize;
            const vertSpacing = hexHeight * 0.75;
            
            const offX = ((gridOffset.current.x % hexWidth) + hexWidth) % hexWidth;
            const offY = ((gridOffset.current.y % (vertSpacing * 2)) + (vertSpacing * 2)) % (vertSpacing * 2);

            let closestDist = Infinity;
            let closestHex: { q: number, r: number } | null = null;

            const cols = Math.ceil(canvas.width / hexWidth) + 3;
            const rows = Math.ceil(canvas.height / vertSpacing) + 3;

            for (let row = -2; row < rows; row++) {
                for (let col = -3; col < cols; col++) {
                    const isOddRow = Math.abs(row) % 2 === 1;
                    const x = col * hexWidth + (isOddRow ? hexWidth / 2 : 0) + offX;
                    const y = row * vertSpacing + offY;

                    const dx = mouseX - x;
                    const dy = mouseY - y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < closestDist) {
                        closestDist = distSq;
                        closestHex = { q: col, r: row };
                    }
                }
            }

            // Only highlight if within roughly hexagon radius
            if (closestDist < hexSize * hexSize) {
                hoveredHexRef.current = closestHex;
            } else {
                hoveredHexRef.current = null;
            }
        };

        const handleMouseLeave = () => {
            hoveredHexRef.current = null;
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        requestRef.current = requestAnimationFrame(updateAnimation);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            observer.disconnect();
        };
    }, [direction, speed, borderColor, hoverFillColor, hexSize]);

    return <canvas ref={canvasRef} className="w-full h-full border-none block"></canvas>;
};

export default Hexagons;
