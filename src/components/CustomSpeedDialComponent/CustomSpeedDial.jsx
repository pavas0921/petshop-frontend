import React from 'react'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SearchIcon from '@mui/icons-material/Search'

const CustomSpeedDial = ({ actions, direction, hidden, handleActionClick }) => {
  return (
    <SpeedDial
      ariaLabel="SpeedDial playground example"
      hidden={hidden}
      icon={<SpeedDialIcon />}
      direction={direction}
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
