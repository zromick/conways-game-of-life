import React, { useState } from 'react';
import Buttons from './Buttons';
import GameGrid from './GameGrid';
import { Grid } from '@material-ui/core';
import { GosperGun } from './Patterns';

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

const numRows = 40;
const numCols = 40;

// GameOfLife: Creates a grid that allows for simulation Conway's Game of Life.
const GameOfLife = () => {

  // generateGrid: Build a visual layout for the given grid and set the new state.
  const generateGrid = (newGrid) => {
    return <GameGrid grid={newGrid} toggleCell={toggleCell} />;
  }

  // toggleCell: toggles whether a cell is dead or alive
  const toggleCell = (rowIndex, colIndex, newGrid) => {
    newGrid[rowIndex][colIndex]
      ? newGrid[rowIndex][colIndex] = 0
      : newGrid[rowIndex][colIndex] = 1;
    setGrid(generateGrid(newGrid));
  }

  // selectGridType: Creates a new grid based on input type. Default is blank.
  const selectGridType = (gridType, setGridArray, gridArray) => {
    let newGrid = [];
    let newRow = [];
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        newRow.push((gridType === "random" ? (Math.random() > 0.7 ? 1 : 0) : 0));
      }
      newGrid[i] = newRow;
      newRow = [];
    }
    if (gridType === "gosper-gun") {
      let gosperGrid = GosperGun();
      for (let i = 0; i < gosperGrid.length; i++) {
        newGrid[gosperGrid[i][0]][gosperGrid[i][1]] = 1;
      }
    }
    else if (gridType === "advance") {
      newGrid = advanceSimulation(gridArray);
    }

    setGridArray(newGrid);
    return generateGrid(newGrid);
  }

  // setGridArray: Sets the original array model of the grid and manages all future grid changes.
  const [gridArray, setGridArray] = useState(() => []);

  // setGrid: Sets the original visual layout of the grid and manages all future grid changes.
  const [grid, setGrid] = useState(() => {
    return selectGridType("blank", setGridArray, []);
  });

  // advanceSimulation: Advance the simulation by one iteration of Conway's algorithm.
  const advanceSimulation = (grid) => {
    let gridCopy = grid;

    for (let i = 0; i < numRows; i++) {
      for (let k = 0; k < numCols; k++) {
        let neighbors = 0;
        operations.forEach(([x, y]) => {
          const newI = i + x;
          const newK = k + y;
          if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
            neighbors += grid[newI][newK];
          }
        })

        if (neighbors < 2 || neighbors > 3) {
          gridCopy[i][k] = 0;
        } else if (grid[i][k] === 0 && neighbors === 3) {
          gridCopy[i][k] = 1;
        }
      }
    }

    return gridCopy;
  }

  return (
    <Grid container justify="center">
      <Grid item>
        {grid}
      </Grid>
      <Buttons
        gridArray={gridArray}
        setGridArray={setGridArray}
        setGrid={setGrid}
        selectGridType={selectGridType}
      />
    </Grid>
  )
}

export default GameOfLife;
