import React, { useContext } from 'react'
import Cell from './Cell'
import { Context } from "./Context"

const CellContainer = () => {

    const { grid } = useContext(Context)

    return (
        <div>
            {grid}
        </div>
    )
}

export default CellContainer
