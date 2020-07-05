import React, {useContext} from 'react'
import Cell from './Cell'
import {Context} from "./Context"

const CellContainer = () => {

    const {grid, i, k} = useContext(Context)

    const list = grid.map((rows, i) => rows.map((col, k) => {
        return <Cell key={Math.random(Math.floor() * 50)} />
     }))

    return (
        <div>
            {list}
        </div>
    )
}

export default CellContainer
