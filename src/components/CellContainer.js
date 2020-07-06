import React, { useContext } from 'react';
import { Context } from "./Context";

const CellContainer = () => {

    const { grid } = useContext(Context)

    return (
        <div>
            {grid}
        </div>
    )
}

export default CellContainer
