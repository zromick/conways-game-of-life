import React from 'react';
import { Button } from '@material-ui/core';

const Buttons = ({ gridArray, setGridArray, advanceSimulation, setGrid, shuffle, createGrid }) => {

    return (
        <>
            <Button color="primary" variant="outlined"
                onClick={() => advanceSimulation(gridArray)}
            >
                Advance Simulation
            </Button>

            <Button color="primary" variant="outlined"
                onClick={() => {
                    let isBlankGrid = false;
                    setGrid(shuffle(isBlankGrid, setGridArray));
                }}
            >
                Randomize Live Cells
            </Button>
            <Button color="primary" variant="outlined"
                onClick={() => setGrid(createGrid(setGridArray))}
            >
                Clear Simulation
            </Button>
        </>
    )
}

export default Buttons;
