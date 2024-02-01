import { Box, TextField } from '@mui/material'
import React from 'react'
import styles from "./styles/inputStyles.module.scss"

const InputSearch = ({searchTerm, handleSearchChange }) => {
  return (
    <Box className={styles.box_main}>
        <TextField
            className={styles.textField}
            label="Buscar por Nombre o Código"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
          />
    </Box>
  )
}

export default InputSearch