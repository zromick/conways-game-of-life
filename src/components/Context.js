import React, { useState, useRef, useCallback } from 'react';
import Cell from './Cell';
import produce from 'immer';
import _ from 'lodash';
import { Grid } from '@material-ui/core';

const Context = React.createContext()

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
]

let list;

const numRows = 20
const numCols = 20
const i = 0
const k = 0

//Empty Grid
const createGrid = (setGridArray) => {
  let isBlankGrid = true;
  return shuffle(isBlankGrid, setGridArray);
  // const numRows = 20
  // const numCols = 20
  // const rows = []
  // for (let i = 0; i < numRows; i++) {
  //   rows.push(Array.from(Array(numCols), () => 0))
  // }
  // return rows
}

//Random grid
const shuffle = (isBlankGrid, setGridArray) => {
  let newGrid = [];
  let newRow = [];
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      newRow.push((isBlankGrid ? 0 : (Math.random() > 0.7 ? 1 : 0)));
    }
    newGrid[i] = newRow;
    // newGrid.push(newRow);
    newRow = [];
  }
  console.log(`newGrid:`, newGrid)

  setGridArray(newGrid);

  let newRows = newGrid.map((row, rowIndex) => {
    let items = row.map((col, colIndex) => {
      return <Cell
        rowIndex={rowIndex}
        colIndex={colIndex}
        newGrid={newGrid}
        key={Math.random(Math.floor() * 50)}
      />
    })

    let newRow =
      <Grid container item>
        {items}
      </Grid>
    return newRow;
  })

  let newList =
    <Grid container direction='column'>
      {newRows}
    </Grid>

  //console.log(`list`, list);
  console.log(`newlist`, newList);
  // useCallback(() => { setGrid(newGrid) }, []);
  return newList;
  // setRows(rows)
}

const ContextProvider = ({ children }) => {
  //State
  const [gridArray, setGridArray] = useState(() => []);
  const [grid, setGrid] = useState(() => {
    return createGrid(setGridArray);
  })
  const [rowIndex, changeRowIndex] = useState(() => 0);
  const [colIndex, changeColIndex] = useState(() => 0);
  const [rows, setRows] = useState([]);
  const [isBlankGrid, blankGrid] = useState(true);
  const [running, setRunning] = useState(false);

  //Ref
  const runningRef = useRef(running)
  runningRef.current = running

  //Alive or dead toggle

  const generateGrid = (grid) => {
    let newRows = grid.map((row, rowIndex) => {
      let items = row.map((col, colIndex) => {
        changeRowIndex(rowIndex);
        changeColIndex(colIndex);
        return <Cell
          rowIndex={rowIndex}
          colIndex={colIndex}
          newGrid={grid}
          key={Math.random(Math.floor() * 50)}
        />
      })

      let newRow =
        <Grid container item>
          {items}
        </Grid>
      return newRow;
    })

    let newGrid =
      <Grid container direction='column'>
        {newRows}
      </Grid>

    console.log("generateGrid -> newGrid", newGrid);
    return newGrid;
  }

  const toggleCell = (rowIndex, colIndex, newGrid) => {
    console.log(`oldGrid: `, newGrid);
    newGrid[rowIndex][colIndex]
      ? newGrid[rowIndex][colIndex] = 0
      : newGrid[rowIndex][colIndex] = 1;
    console.log(`newGrid: `, newGrid);
    setGrid(generateGrid(newGrid));
  }

  const advanceSimulation = (rowIndex, colIndex, grid) => {
    blankGrid(false);

    let gridCopy = grid;

    for (let i = 0; i < numRows; i++) {
      for (let k = 0; k < numCols; k++) {
        let neighbors = 0;
        operations.forEach(([x, y]) => {
          const newI = i + x
          const newK = k + y
          if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
            neighbors += grid[newI][newK]
          }
        })

        if (neighbors < 2 || neighbors > 3) {
          gridCopy[rowIndex][colIndex] = 0
        } else if (grid[rowIndex][colIndex] === 0 && neighbors === 3) {
          gridCopy[rowIndex][colIndex] = 1
        }
      }
    }

    console.log("our grids", grid, gridCopy);
    // newGrid = produce(newGrid, gridCopy => {
    //   gridCopy[rowIndex][colIndex] = grid[rowIndex][colIndex] ? 0 : 1
    // })
    setGrid(generateGrid(gridCopy));
  }



  return (
    <Context.Provider value={{
      rowIndex,
      colIndex,
      gridArray,
      setGridArray,
      createGrid,
      shuffle,
      toggleCell,
      advanceSimulation,
      running,
      setRunning,
      runningRef,
      grid,
      setGrid,
      rows,
      setRows,
      // runSimulation,
      operations,
      list,
      i,
      k,
    }}>
      {children}
    </Context.Provider>
  )
}

export {
  ContextProvider, Context
}
