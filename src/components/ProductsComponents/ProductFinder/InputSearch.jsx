import { Box, TextField } from '@mui/material'
import React from 'react'

const InputSearch = ({searchTerm, handleSearchChange }) => {
  return (
    <Box sx={{width: "30%"}}>
        <TextField
            label="Buscar por Nombre o Código"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{width: "100%"}}
          />
    </Box>
  )
}

export default InputSearch