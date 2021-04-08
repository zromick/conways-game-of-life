import React from 'react';
import { Button, Grid, Tooltip } from '@material-ui/core';
import styles from '../styles.module.scss';

// Buttons: Defines the visual button elements at the bottom of the screen.
const Buttons = ({ gridArray, setGridArray, setGrid, selectGridType }) => {

    return (
        <Grid container item xs={12}>
            <Grid container item justify="center" xs={3} className={styles.buttonMargin}>
                <Tooltip title="Advance the simulation by a single step." arrow>
                    <Button color="primary" variant="outlined"
                        onClick={() => setGrid(selectGridType("advanceSimulation", setGridArray, gridArray))}
                    >
                        Advance Simulation
                    </Button>
                </Tooltip>
            </Grid>
            <Grid container item justify="center" xs={3}>
                <Tooltip title="Create a new board with randomized alive and dead cells." arrow>
                    <Button color="primary" variant="outlined"
                        onClick={() => setGrid(selectGridType("random", setGridArray, []))}
                    >
                        Randomize
                    </Button>
                </Tooltip>
            </Grid>
            <Grid container item justify="center" xs={3}>
                <Tooltip title="Create a Gosper Glider Gun model that creates gliders indefinitely!" arrow>
                    <Button color="primary" variant="outlined"
                        onClick={() => setGrid(selectGridType("gosper-gun", setGridArray, []))}
                    >
                        Create Gosper Glider Gun
                    </Button>
                </Tooltip>
            </Grid>
            <Grid container item justify="center" xs={3}>
                <Tooltip title="Kill all live cells." arrow>
                    <Button color="primary" variant="outlined"
                        onClick={() => setGrid(selectGridType("blank", setGridArray, []))}
                    >
                        Clear Simulation
                    </Button>
                </Tooltip>
            </Grid>
        </Grid>
    )
}

export default Buttons;
