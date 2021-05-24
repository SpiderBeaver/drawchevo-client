import React, { useState } from 'react';
import styled from 'styled-components/macro';

// TODO: Refactor. Split into multiple components.

const OpenToolsButton = styled.div`
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  background-color: ${(props) => props.color};
  border: 1px solid #000000;
`;

const ColorOptionsList = styled.ul`
  list-style: none;
  margin: 0.8em 0 0 0;
  padding: 0;
  display: flex;
`;

const ColorOption = styled.li`
  background-color: ${(props) => props.color};
  border-radius: 50%;
  border: 1px solid #000000;
  width: 1.2em;
  height: 1.2em;
  margin-right: 0.5em;
`;

interface Props {
  onColorSelect?: (color: string) => void;
}

export default function DrawingTools({ onColorSelect }: Props) {
  const colors = ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff'];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [showColorOptions, setshowColorOptions] = useState(false);

  const handleOpenToolsClick = () => {
    setshowColorOptions((show) => !show);
  };

  const handleColorOptionsClick = (event: React.MouseEvent, color: string) => {
    setSelectedColor(color);
    setshowColorOptions(false);
    onColorSelect?.(color);
  };

  return (
    <div>
      <OpenToolsButton color={selectedColor} onClick={handleOpenToolsClick}></OpenToolsButton>
      {showColorOptions ? (
        <ColorOptionsList>
          {colors.map((color) => (
            // Stop propagation on touch start so that selecting colors does not trigger drawing.
            <ColorOption
              color={color}
              onClick={(event) => handleColorOptionsClick(event, color)}
              onTouchStart={(event) => event.stopPropagation()}
            ></ColorOption>
          ))}
        </ColorOptionsList>
      ) : null}
    </div>
  );
}
