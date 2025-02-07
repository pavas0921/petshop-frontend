import React from 'react'
import SaveIcon from '@mui/icons-material/Save'
import PrintIcon from '@mui/icons-material/Print'
import ShareIcon from '@mui/icons-material/Share'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AddIcon from '@mui/icons-material/Add'

const menuActions = () => {
  const salesActions = [
    {
      icon: <CalendarMonthIcon />,
      name: 'Buscar por Fechas',
      event: 'searchByDates',
    },
  ]

  const expensesActions = [
    {
      icon: <CalendarMonthIcon />,
      name: 'Buscar por Fechas',
      event: 'searchByDates',
    },
    { icon: <AddIcon />, name: 'Agregar Gasto' },
  ]

  return { salesActions, expensesActions }
}

export default menuActions
