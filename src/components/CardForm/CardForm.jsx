import React from 'react'
import styles from "./styles.module.scss"
import { Box } from '@mui/material'

const CardForm = ({children}) => {
  return (
    <Box className={styles.box_main}>
        <Box className={styles.box_card}>
            {children}
        </Box>

    </Box>
  )
}

export default CardForm