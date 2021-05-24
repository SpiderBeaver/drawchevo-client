import React, { useCallback } from 'react';
import styled from 'styled-components/macro';
import Drawing, { isDot, isLine } from '../domain/Drawing';

const Canvas = styled.canvas`
  width: 100%;
  touch-action: none;
  background-color: #fff;
  border: 2px solid #191d21;
`;

interface Props {
  drawing: Drawing;
  /** Drawing should be a square with a side of this size. */
  size: number;
}

// TODO: I don't like that this gets rerendered\redrawn on every drawing addition (does it?). Should think about doing smt about it.
export default function DrawingCanvas({ drawing, size }: Props) {
  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (!canvas) {
        return;
      }

      const context = canvas.getContext('2d');
      if (!context) {
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);

      drawing.shapes.forEach((shape) => {
        context.strokeStyle = shape.color;
        context.fillStyle = shape.color;
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

  return <Canvas ref={canvasRef} width={size} height={size}></Canvas>;
}
