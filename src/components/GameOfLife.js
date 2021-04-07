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

const GameOfLife = () => {

  // Cell Toggle Dead or Alive
  const toggleCell = (rowIndex, colIndex, newGrid) => {
    newGrid[rowIndex][colIndex]
      ? newGrid[rowIndex][colIndex] = 0
      : newGrid[rowIndex][colIndex] = 1;
    setGrid(generateGrid(newGrid));
  }

  // Create A New Grid Based on Input Type
  const selectGridType = (gridType, setGridArray) => {
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

    setGridArray(newGrid);
    return <GameGrid grid={newGrid} toggleCell={toggleCell} />;
  }

  // Set State
  const [gridArray, setGridArray] = useState(() => []);
  const [grid, setGrid] = useState(() => {
    return selectGridType("blank", setGridArray);
  });

  // Grid Generation
  const generateGrid = (grid) => {
    return <GameGrid grid={grid} toggleCell={toggleCell} />
  }

  // Advance Simulation By One Step
  // Uses John Horton Conway's algorithm
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

    setGridArray(gridCopy);
    setGrid(generateGrid(gridCopy));
  }

  return (
    <Grid container justify="center">
      <Grid item>
        {grid}
      </Grid>
      <Buttons
        gridArray={gridArray}
        setGridArray={setGridArray}
        advanceSimulation={advanceSimulation}
        setGrid={setGrid}
        selectGridType={selectGridType}
      />
    </Grid>
  )
}

export default GameOfLife;
