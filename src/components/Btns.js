import React, {useContext} from 'react'
import {Context} from "./Context"

const Btns = () => {

    const {running, setRunning, runningRef, runSimulation, setGrid, shuffle, createGrid} = useContext(Context)

    return (
        <>
            <button
                onClick={() => {
                    setRunning(!running)
                    if (!running) {
                        runningRef.current = true;
                        runSimulation()
                    }
                    }}
            >
                        {running ? "stop" : "start"}
            </button>

            <button
                onClick={() => {
                    setGrid(shuffle())
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
