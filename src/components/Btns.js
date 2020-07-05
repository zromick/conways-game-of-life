import React, {useContext} from 'react'
import {Context} from "./Context"

const Btns = () => {

    const {running, setRunning, runningRef, runSimulation, setGrid, shuffle, emptyGrid} = useContext(Context)

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
                setGrid(emptyGrid())
                }}
            >
                clear
            </button>
        </>
    )
}

export default Btns
