import React, { useContext } from 'react'
import { Context } from "./Context"


const Cell = ({ rowIndex, colIndex, newGrid, key }) => {

  const { toggleCell, grid, i, k } = useContext(Context)

  return (
    <div
      key={key}
      onClick={toggleCell}
      style={{
        width: 20,
        height: 20,
        backgroundColor: newGrid[rowIndex][colIndex] ? "pink" : undefined,
        border: "solid 1px grey"
      }}
    />
  )
}

export default Cell
