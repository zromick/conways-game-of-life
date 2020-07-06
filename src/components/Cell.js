import React, { useContext } from 'react'
import { Context } from "./Context"


const Cell = ({ rowIndex, colIndex, newGrid, key }) => {

  const { toggleCell } = useContext(Context)

  return (
    <div
      key={key}
      onClick={() => toggleCell(rowIndex, colIndex, newGrid)}
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
