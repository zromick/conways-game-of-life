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

const numRows = 20
const numCols = 20
const i = 0
const k = 0

//Empty Grid
const createGrid = () => {
  const numRows = 20
  const numCols = 20
  const rows = []
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0))
  }
  return rows
}

const ContextProvider = ({ children }) => {
  //State
  const [grid, setGrid] = useState(() => {
    return createGrid()
  })
  const [rows, setRows] = useState([])
  const [running, setRunning] = useState(false)

  //Ref
  const runningRef = useRef(running)
  runningRef.current = running

  //Run Simulation
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return
    }

    setGrid(currGrid => {
      return produce(currGrid, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0
            operations.forEach(([x, y]) => {
              const newI = i + x
              const newK = k + y
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += currGrid[newI][newK]
              }
            })

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0
            } else if (currGrid[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1
            }
          }
        }
      })
    })

    setTimeout(runSimulation, 100)
  }, [])

  //Random grid
  const shuffle = () => {
    let newGrid = [];
    let newRow = [];
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        newRow.push((Math.random() > 0.7 ? 1 : 0));

        console.log(`newGrid: ${newGrid}`);
      }
      newGrid[i] = newRow;
      console.log(`newRow:`, newRow)
      // newGrid.push(newRow);
      newRow = [];
    }

    console.log(`newGrid:`, newGrid)

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

  //Alive or dead toggle
  const toggleCell = () => {
    const newGrid = produce(grid, gridCopy => {
      gridCopy[i][k] = grid[i][k] ? 0 : 1
    })
    setGrid(newGrid)
  }

  let list = shuffle();
  console.log("this is the list", list);

  return (
    <Context.Provider value={{ createGrid, shuffle, toggleCell, running, setRunning, runningRef, grid, setGrid, rows, setRows, runSimulation, operations, list, i, k }}>
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }
