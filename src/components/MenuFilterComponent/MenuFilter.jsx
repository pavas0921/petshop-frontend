import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SaveIcon from '@mui/icons-material/Save'
import PrintIcon from '@mui/icons-material/Print'
import ShareIcon from '@mui/icons-material/Share'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { ModalComponent } from '../ModalComponent'
import { CalendarPicker } from '../DateComponents/CalendarPicker'
import { useDispatch, useSelector } from 'react-redux'
import { getVentasByDateRange } from '../../features/venta/ventaSlice'
import { formatDateIsoToString } from '../../helpers/dateUtils/convertDates'
import { CustomSpeedDial } from '../CustomSpeedDialComponent'
import { verifyTokenExpiration } from '../../helpers/verifyToken'
import styles from './styles.module.scss'
import useSalesActions from '../../customHooks/reduxActions/salesActions'

const MenuFilter = () => {
  const isValidToken = verifyTokenExpiration()
  const { status, companyId, rolId, userId } = isValidToken
  const [direction, setDirection] = React.useState('up')
  const [hidden, setHidden] = React.useState(false)
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)
  const dispatch = useDispatch()
  const { searchByDate } = useSalesActions()
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])

  const actions = [
    {
      icon: <CalendarMonthIcon />,
      name: 'Buscar por Fechas',
      event: 'searchByDates',
    },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
  ]

  const handleDirectionChange = (event) => {
    setDirection(event.target.value)
  }

  const handleHiddenChange = (event) => {
    setHidden(event.target.checked)
  }

  const handleActionClick = (event, eventName) => {
    if (eventName === 'searchByDates') {
      setOpenModal(true)
    }
  }

  const handleSearch = () => {
    const formatedStartDate = formatDateIsoToString(state[0].startDate)
    const formatedEndDate = formatDateIsoToString(state[0].endDate)
    searchByDate(formatedStartDate, formatedEndDate, companyId)
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.box_customSpeedDial}>
        <CustomSpeedDial
          actions={actions}
          direction={direction}
          hidden={hidden}
          handleActionClick={handleActionClick}
        />
      </Box>
      {openModal && (
        <ModalComponent
          open={openModal}
          handleOpen={handleOpen}
          handleClose={handleClose}
        >
          <Box className={styles.box_calendarPicker}>
            <CalendarPicker state={state} setState={setState} />
            <Button
              className={styles.button}
              variant="contained"
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </Box>
        </ModalComponent>
      )}
    </Box>
  )
}

export default MenuFilter
