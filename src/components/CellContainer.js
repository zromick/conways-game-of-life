import React, {useContext} from 'react'
import Cell from './Cell'
import {Context} from "./Context"

const CellContainer = () => {

    const {grid, list, rows, i, k} = useContext(Context)

    console.log(`Grid: ${grid}`)
    console.log(`Rows: ${rows}`)
    // const list = grid.map((rows, i) => rows.map((col, k) => {
    //     return <Cell key={Math.random(Math.floor() * 50)} />
    //  }))

    return (
        <div>
            {list}
        </div>
    )
}

export default CellContainer
