import React, { useRef, useState } from 'react';
import Drawing, { Dot, Line } from '../domain/Drawing';
import DrawingCanvas from './DrawingCanvas';

// TODO: This whole thing is probably very unoptimimed, buggy and uses bad react practices. It works for now but need a lot of rewriting.

//type Shape = Dot | Line;

function calculateLocalCoordinates(board: HTMLDivElement, touch: React.Touch) {
  const rect = board.getBoundingClientRect();
  const localX = touch.clientX - rect.x;
  const localY = touch.clientY - rect.y;
  return { x: localX, y: localY };
}

interface Props {
  onDone?: (drawing: Drawing) => void;
}

export default function DrawingBoard({ onDone }: Props) {
  const boardRef = useRef<HTMLDivElement>(null);

  const [touches, setTouches] = useState<React.Touch[]>([]);
  const [drawing, setDrawing] = useState<Drawing>({ shapes: [] });

  const handleTouchStart: React.TouchEventHandler = (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches.item(i);
      setTouches((touches) => [...touches, touch]);
    }
  };

  const handleTouchMove: React.TouchEventHandler = (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches.item(i);
      const prevToushState = touches.find((t) => t.identifier === touch.identifier);
      if (prevToushState) {
        const board = boardRef.current;
        if (board != null) {
          const prevToushLocalCoords = calculateLocalCoordinates(board, prevToushState);
          const currentTouchCoords = calculateLocalCoordinates(board, touch);

          const line = {
            type: 'Line',
            start: { x: prevToushLocalCoords.x, y: prevToushLocalCoords.y },
            end: { x: currentTouchCoords.x, y: currentTouchCoords.y },
          } as Line;
          setDrawing((drawing) => ({ ...drawing, shapes: [...drawing.shapes, line] }));

          drawing.shapes.push();

          setTouches((touches) => {
            const nextTouches = [...touches];
            const touchIndex = nextTouches.indexOf(prevToushState);
            nextTouches[touchIndex] = touch;
            return nextTouches;
          });
        }
      }
    }
  };

  const handleTouchEnd: React.TouchEventHandler = (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches.item(i);
      const prevToushState = touches.find((t) => t.identifier === touch.identifier);
      if (prevToushState) {
        const board = boardRef.current;
        if (board != null) {
          if (touch.clientX === prevToushState.clientX && touch.clientY === prevToushState.clientY) {
            // Tap
            const localCoords = calculateLocalCoordinates(board, touch);

            const dot = { type: 'Dot', point: { x: localCoords.x, y: localCoords.y } } as Dot;
            setDrawing((drawing) => ({ ...drawing, shapes: [...drawing.shapes, dot] }));
          } else {
            const prevToushLocalCoords = calculateLocalCoordinates(board, prevToushState);
            const currentTouchCoords = calculateLocalCoordinates(board, touch);
            drawing.shapes.push({
              type: 'Line',
              start: { x: prevToushLocalCoords.x, y: prevToushLocalCoords.y },
              end: { x: currentTouchCoords.x, y: currentTouchCoords.y },
            } as Line);
          }

          const touchIndex = touches.indexOf(prevToushState);
          touches.splice(touchIndex, 1);
        }
      }
    }
  };

  const handleDoneButton = () => {
    onDone?.(drawing);
  };

  return (
    <div
      ref={boardRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ margin: 'auto', display: 'flex' }}
    >
      <DrawingCanvas drawing={drawing}></DrawingCanvas>
      <button onClick={handleDoneButton}>Done</button>
    </div>
  );
}
