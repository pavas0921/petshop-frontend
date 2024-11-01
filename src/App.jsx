import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import styles from './App.module.scss'
import { CustomRouterProvider } from './router'

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Baloo 2, Arial, sans-serif', // Establece Baloo 2 como la fuente principal
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.div_main}>
        <CustomRouterProvider />
      </div>
    </ThemeProvider>
  )
}

export default App
