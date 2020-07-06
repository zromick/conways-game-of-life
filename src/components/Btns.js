import React, { useContext } from 'react'
import { Context } from "./Context"

const Btns = ({ rowIndex, colIndex, newGrid }) => {

    const { running, setRunning, runningRef, runSimulation, advanceSimulation, setGrid, shuffle, createGrid } = useContext(Context)

    return (
        <>
            <button
                onClick={() => {
                    advanceSimulation(rowIndex, colIndex, newGrid);
                }}
            >
                {"advance"}
            </button>

            <button
                onClick={() => {
                    let isBlankGrid = false;
                    setGrid(shuffle(isBlankGrid))
                }}
            >
                random
            </button>
            <button
                onClick={() => {
                    setGrid(createGrid())
                }}
            >
                clear
            </button>
        </>
    )
}

export default Btns
