import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AddComponent } from '../../AddComponent'
import { ModalComponent } from '../../ModalComponent'
import { ExpensesForm } from '../ExpensesForm'

const ExpensesList = () => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => {
    setOpenModal(false)
  }
  return (
    <Box>
      <AddComponent openModal={openModal} setOpenModal={setOpenModal} />

      {openModal && (
        <ModalComponent
          open={openModal}
          handleOpen={handleOpen}
          handleClose={handleClose}
        >
            <ExpensesForm/>
        </ModalComponent>
      )}
    </Box>
  )
}

export default ExpensesList
