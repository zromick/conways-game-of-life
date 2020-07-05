import React, {useContext} from 'react'
import {Context} from "./Context"


const Cell = ({id}) => {

    const {toggleCell, grid, i, k} = useContext(Context)

    return (
        <div
              key={id}
              onClick={toggleCell}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? "pink" : undefined,
                border: "solid 1px grey"
              }}
            />
    )
}

export default Cell
