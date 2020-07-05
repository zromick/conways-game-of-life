import React from 'react'
import {ContextProvider} from "./components/Context"
import Grid from './components/Grid'
import Btns from './components/Btns'

const App = () => {
  return (
    <ContextProvider>
      <Grid />
      <Btns />
    </ContextProvider>
  )
}

export default App
