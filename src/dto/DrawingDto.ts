import Drawing, { Dot, isDot, isLine, Line, Point, Shape, ShapeType } from '../domain/Drawing';

// NOTE: Not sure if need all this. So far Drawing and DrawingDto are completely identical.

interface PointDto {
  x: number;
  y: number;
}

interface ShapeDto {
  type: ShapeType;
}

export interface DotDto extends ShapeDto {
  type: 'Dot';
  point: PointDto;
}

export interface LineDto {
  type: 'Line';
  start: PointDto;
  end: PointDto;
}

export default interface DrawingDto {
  shapes: ShapeDto[];
}

function pointToDto(point: Point): PointDto {
  return { x: point.x, y: point.y };
}

function dotToDto(dot: Dot): DotDto {
  return { type: dot.type, point: pointToDto(dot.point) };
}

function lineToDto(line: Line): LineDto {
  return { type: line.type, start: pointToDto(line.start), end: pointToDto(line.end) };
}

function shapeToDto(shape: Shape): ShapeDto {
  if (isDot(shape)) {
    return dotToDto(shape);
  } else if (isLine(shape)) {
    return lineToDto(shape);
  } else {
    throw new Error('Shape type not supported');
  }
}

export function drawingToDto(drawing: Drawing): DrawingDto {
  return {
    shapes: drawing.shapes.map((shape) => shapeToDto(shape)),
  };
}
