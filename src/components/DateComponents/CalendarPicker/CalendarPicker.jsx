import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { verifyTokenExpiration } from '../../../helpers/verifyToken'
import { DateRange } from 'react-date-range'
import { formatDateIsoToString } from '../../../helpers/dateUtils/convertDates'
import useSalesActions from '../../../customHooks/reduxActions/salesActions'
import styles from './styles.module.scss'

const CalendarPicker = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])
  const isValidToken = verifyTokenExpiration()
  const { status, companyId, rolId, userId } = isValidToken
  const { searchByDate } = useSalesActions()

  const handleSearch = () => {
      const formatedStartDate = formatDateIsoToString(state[0].startDate)
      const formatedEndDate = formatDateIsoToString(state[0].endDate)
      searchByDate(formatedStartDate, formatedEndDate, companyId)
    }

  return (
    <Box className={styles.box_main}>
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
          <Button
            className={styles.btn}
            type="submit"
            variant="contained"
            onClick={handleSearch}
            sx={{ backgroundColor: 'black' }}
          >
            <Typography variant="p" sx={{ fontSize: 17 }}>
              Buscar
            </Typography>
          </Button>
    </Box>
  )
}

export default CalendarPicker
