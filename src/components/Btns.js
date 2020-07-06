import React, { useContext } from 'react'
import { Context } from "./Context"

const Btns = () => {

    // const { running, setRunning, runningRef, runSimulation, advanceSimulation, setGrid, shuffle, createGrid } = useContext(Context)
    const { rowIndex, colIndex, gridArray, setGridArray, advanceSimulation, setGrid, shuffle, createGrid } = useContext(Context)

    return (
        <>
            <button
                onClick={() => {
                    advanceSimulation(rowIndex, colIndex, gridArray);
                }}
            >
                {"advance"}
            </button>

            <button
                onClick={() => {
                    let isBlankGrid = false;
                    setGrid(shuffle(isBlankGrid, setGridArray))
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
