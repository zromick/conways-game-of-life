import React from 'react';
import Cell from './Cell';
import { Grid } from '@material-ui/core';

// GameGrid: Defines the visual layout of rows and cells based on the given grid array.
const GameGrid = ({ grid, toggleCell }) => {
  let newRows = grid.map((row, rowIndex) => {
    let items = row.map((col, colIndex) => {
      return (
        <Cell
          rowIndex={rowIndex}
          colIndex={colIndex}
          newGrid={grid}
          key={`key-${rowIndex}row${colIndex}col`}
          toggleCell={toggleCell}
        />
      );
    })

    let newRow =
      <Grid container item key={`key-${rowIndex}row$`}>
        {items}
      </Grid>
    return newRow;
  })

  let newGrid =
    <Grid container direction='column'>
      {newRows}
    </Grid>

  return newGrid;
}

export default GameGrid;
