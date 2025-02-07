import React from 'react'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu';

const CustomSpeedDial = ({ actions, direction, hidden, handleActionClick }) => {
  return (
    <SpeedDial
      ariaLabel="SpeedDial playground example"
      hidden={hidden}
      icon={<MenuIcon />}
      direction={direction}
      sx={{
        '& .MuiFab-primary': {
          backgroundColor: 'black', // Fondo negro
          color: 'white', // Ícono blanco (opcional)
          '&:hover': {
            backgroundColor: '#333', // Color al pasar el cursor
          },
        },
      }}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={(event) => handleActionClick(event, action.event)}
        />
      ))}
    </SpeedDial>
  )
}

export default CustomSpeedDial
