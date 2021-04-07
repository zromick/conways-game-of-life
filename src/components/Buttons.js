import React from 'react';
import { Button, Grid } from '@material-ui/core';

const Buttons = ({ gridArray, setGridArray, advanceSimulation, setGrid, selectGridType, createGrid }) => {

    return (
        <Grid container item xs={12} justify="space-around">
            <Grid item xs={3}>
                <Button color="primary" variant="outlined"
                    onClick={() => advanceSimulation(gridArray)}
                >
                    Advance Simulation
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button color="primary" variant="outlined"
                    onClick={() => setGrid(selectGridType("random", setGridArray))}
                >
                    Randomize Live Cells
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button color="primary" variant="outlined"
                    onClick={() => setGrid(selectGridType("gosper-gun", setGridArray))}
                >
                    Create Gosper Gun
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button color="primary" variant="outlined"
                    onClick={() => setGrid(selectGridType("blank", setGridArray))}
                >
                    Clear Simulation
                </Button>
            </Grid>
        </Grid>
    )
}

export default Buttons;
