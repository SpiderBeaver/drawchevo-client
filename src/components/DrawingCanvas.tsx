import React, { useCallback } from 'react';
import Drawing, { isDot, isLine } from '../domain/Drawing';

interface Props {
  drawing: Drawing;
}

// TODO: I don't like that this gets rerendered\redrawn on every drawing addition. Should think about doing smt about it.
export default function DrawingCanvas({ drawing }: Props) {
  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (!canvas) {
        return;
      }

      const context = canvas.getContext('2d');
      if (!context) {
        return;
      }

      drawing.shapes.forEach((shape) => {
        if (isDot(shape)) {
          context.fillRect(shape.point.x - 1, shape.point.y - 1, 2, 2);
        } else if (isLine(shape)) {
          context.beginPath();
          context.moveTo(shape.start.x, shape.start.y);
          context.lineTo(shape.end.x, shape.end.y);
          context.stroke();
        }
      });
    },
    [drawing]
  );

  return <canvas ref={canvasRef} width={200} height={200} style={{ border: '1px solid black' }}></canvas>;
}
