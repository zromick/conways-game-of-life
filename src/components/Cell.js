import React from 'react';

const Cell = ({ rowIndex, colIndex, newGrid, toggleCell }) => {

  return (
    <div
      onClick={() => toggleCell(rowIndex, colIndex, newGrid)}
      style={{
        width: 10,
        height: 10,
        backgroundColor: newGrid[rowIndex][colIndex] ? "pink" : undefined,
        border: "solid 1px grey"
      }}
    />
  )
}

export default Cell;
