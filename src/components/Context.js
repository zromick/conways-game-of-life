import React, { useState, useRef, useCallback } from 'react'
import Cell from './Cell'
import produce from 'immer'
import _ from 'lodash'

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

const ContextProvider = ({children}) => {
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
        for (let i = 0; i < numRows; i++) {
            rows.push(
            Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
            )
        }
        console.log(rows)
        setRows(rows)
    }

    //Alive or dead toggle
    const toggleCell = () => {
        const newGrid = produce(grid, gridCopy => {
          gridCopy[i][k] = grid[i][k] ? 0 : 1
        })
        setGrid(newGrid)
    }
    
    //Cell List
    console.log(`rows: ${rows}`)
    
    let newGrid = _.chunk(rows, 20)
    console.log(`New grid: ${newGrid}`)
    let list = newGrid.map(row => row.map(col => <Cell key={Math.random(Math.floor() * 50)} />
    ))
    console.log(`list: ${list}`)

    return (
        <Context.Provider value={{createGrid, shuffle, toggleCell, running, setRunning, runningRef, grid, setGrid, rows, setRows, runSimulation, operations, list, i, k}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}
