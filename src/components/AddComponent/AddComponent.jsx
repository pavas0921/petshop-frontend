import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteIcon from '@mui/icons-material/Favorite'
import NavigationIcon from '@mui/icons-material/Navigation'

const AddComponent = ({ setOpenModal }) => {
  return (
    <Box>
      <Fab color="primary" aria-label="add" onClick={() => setOpenModal(true)}>
        <AddIcon />
      </Fab>
    </Box>
  )
}

export default AddComponent
