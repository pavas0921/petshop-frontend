import React, { useState } from 'react'
import Box from '@mui/material/Box'

import { ModalComponent } from '../ModalComponent'
import { CustomSpeedDial } from '../CustomSpeedDialComponent'
import styles from './styles.module.scss'

const MenuFilter = ({actions, components}) => {
  const [direction, setDirection] = React.useState('up')
  const [hidden, setHidden] = React.useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [activeComponent, setActiveComponent] = useState(null)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  const handleDirectionChange = (event) => {
    setDirection(event.target.value)
  }

  const handleHiddenChange = (event) => {
    setHidden(event.target.checked)
  }

  const handleActionClick = (event, eventName) => {
    setActiveComponent(eventName)
    setOpenModal(true)
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
            {activeComponent && components[activeComponent] }
          </Box>
        </ModalComponent>
      )}
    </Box>
  )
}

export default MenuFilter
