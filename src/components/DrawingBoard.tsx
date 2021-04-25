import React, { useRef, useState } from 'react';
import styled from 'styled-components/macro';
import Drawing, { Dot, Line } from '../domain/Drawing';
import ActionButton from './ActionButton';
import DrawingCanvas from './DrawingCanvas';

// TODO: This whole thing is probably very unoptimimed, buggy and uses bad react practices. It works for now but need a lot of rewriting.

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CanvasContainer = styled.div`
  margin-bottom: 1em;
`;

function calculateLocalCoordinates(board: HTMLDivElement, touch: React.Touch, drawingSize: number) {
  const rect = board.getBoundingClientRect();
  const ratio = drawingSize / rect.width;
  const localX = (touch.clientX - rect.x) * ratio;
  const localY = (touch.clientY - rect.y) * ratio;
  return { x: localX, y: localY };
}

interface Props {
  onDone?: (drawing: Drawing) => void;
}

export default function DrawingBoard({ onDone }: Props) {
  const boardRef = useRef<HTMLDivElement>(null);

  const drawingSize = 400;

  const [touches, setTouches] = useState<React.Touch[]>([]);
  const [drawing, setDrawing] = useState<Drawing>({ shapes: [] });

  const handleTouchStart: React.TouchEventHandler = (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches.item(i);
      setTouches((touches) => [...touches, touch]);
    }
  };

  const handleTouchMove: React.TouchEventHandler = (e) => {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches.item(i);
      const prevToushState = touches.find((t) => t.identifier === touch.identifier);
      if (prevToushState) {
        const board = boardRef.current;
        if (board != null) {
          const prevToushLocalCoords = calculateLocalCoordinates(board, prevToushState, drawingSize);
          const currentTouchCoords = calculateLocalCoordinates(board, touch, drawingSize);

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
            const localCoords = calculateLocalCoordinates(board, touch, drawingSize);

            const dot = { type: 'Dot', point: { x: localCoords.x, y: localCoords.y } } as Dot;
            setDrawing((drawing) => ({ ...drawing, shapes: [...drawing.shapes, dot] }));
          } else {
            const prevToushLocalCoords = calculateLocalCoordinates(board, prevToushState, drawingSize);
            const currentTouchCoords = calculateLocalCoordinates(board, touch, drawingSize);
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
    <Container ref={boardRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <CanvasContainer>
        <DrawingCanvas drawing={drawing} size={drawingSize}></DrawingCanvas>
      </CanvasContainer>

      <ActionButton onClick={handleDoneButton}>Done</ActionButton>
    </Container>
  );
}
