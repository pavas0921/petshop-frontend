import * as React from 'react'
import { styled } from '@mui/material/styles'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

const ViewSwitcher = ({ viewType, setViewType }) => {
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff'
          )}" d="M2 2h16v4H2V2zm0 6h7v10H2V8zm9 0h7v10h-7V8z"/></svg>')`,
        },

        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M3 3h4v4H3V3zm0 5h4v4H3V8zm0 5h4v4H3v-4zm5 0h4v4H8v-4zm0-5h4v4H8V8zm0-5h4v4H8V3zm5 0h4v4h-4V3zm0 5h4v4h-4V8zm0 5h4v4h-4v-4z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }))

  const handleChange = (event) => {
    setViewType(event.target.checked)
  }

  return (
    <FormControlLabel
      control={
        <MaterialUISwitch
          sx={{ m: 1, marginTop: '20px' }}
          checked={viewType}
          onChange={handleChange}
          defaultChecked
        />
      }
    />
  )
}

export default ViewSwitcher
