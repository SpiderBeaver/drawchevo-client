import React, { useEffect, useRef } from 'react';

// TODO: This whole thing is probably very unoptimimed, buggy and uses bad react practices. It works for now but need a lot of rewriting.

function calculateLocalCoordinates(canvas: HTMLCanvasElement, touch: React.Touch) {
  const rect = canvas.getBoundingClientRect();
  const localX = touch.clientX - rect.x;
  const localY = touch.clientY - rect.y;
  return { x: localX, y: localY };
}

export default function DrawingBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const touches: React.Touch[] = [];

  const handleTouchStart: React.TouchEventHandler<HTMLCanvasElement> = (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches.item(i);
      touches.push(touch);
    }
  };

  const handleTouchMove: React.TouchEventHandler<HTMLCanvasElement> = (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches.item(i);
      const prevToushState = touches.find((t) => t.identifier === touch.identifier);
      if (prevToushState) {
        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext('2d');
          if (context) {
            context.beginPath();
            const prevToushLocalCoords = calculateLocalCoordinates(canvas, prevToushState);
            const currentTouchCoords = calculateLocalCoordinates(canvas, touch);
            context.moveTo(prevToushLocalCoords.x, prevToushLocalCoords.y);
            context.lineTo(currentTouchCoords.x, currentTouchCoords.y);
            context.stroke();
          }
        }

        const touchIndex = touches.indexOf(prevToushState);
        touches[touchIndex] = touch;
      }
    }
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLCanvasElement> = (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches.item(i);
      const prevToushState = touches.find((t) => t.identifier === touch.identifier);
      if (prevToushState) {
        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext('2d');
          if (context) {
            if (touch.clientX === prevToushState.clientX && touch.clientY === prevToushState.clientY) {
              // Tap
              const localCoords = calculateLocalCoordinates(canvas, touch);
              context.fillRect(localCoords.x - 1, localCoords.y - 1, 2, 2);
            } else {
              context.beginPath();
              const prevToushLocalCoords = calculateLocalCoordinates(canvas, prevToushState);
              const currentTouchCoords = calculateLocalCoordinates(canvas, touch);
              context.moveTo(prevToushLocalCoords.x, prevToushLocalCoords.y);
              context.lineTo(currentTouchCoords.x, currentTouchCoords.y);
              context.stroke();
            }
          }
        }

        const touchIndex = touches.indexOf(prevToushState);
        touches.splice(touchIndex, 1);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={200}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ border: '1px solid black' }}
    ></canvas>
  );
}
