import React, { useContext } from 'react'
import { Context } from "./Context"

const Btns = ({ rowIndex, colIndex, newGrid }) => {

    const { running, setRunning, runningRef, runSimulation, advanceSimulation, setGrid, shuffle, createGrid } = useContext(Context)

    return (
        <>
            <button
                onClick={() => {
                    setRunning(!running)
                    if (!running) {
                        runningRef.current = true;
                        // runSimulation()
                        advanceSimulation(rowIndex, colIndex, newGrid);
                    }
                }}
            >
                {running ? "stop" : "start"}
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
