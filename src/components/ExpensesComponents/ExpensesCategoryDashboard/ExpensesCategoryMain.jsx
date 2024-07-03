import React, { useState } from 'react'
import { Box } from '@mui/material'
import { ExpensesList } from '../ExpensesList'
import { AddComponent } from '../../AddComponent'
import styles from './styles.module.scss'
import { ModalComponent } from '../../ModalComponent'
import { ExpensesCategoryForm } from '../ExpensesCategoryForm'

const ExpensesCategoryMain = () => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_table}>
        <ExpensesList />
      </Box>
      <Box className={styles.boxAdd}>
        <AddComponent openModal={openModal} setOpenModal={setOpenModal} />
      </Box>

      {openModal && (
        <ModalComponent
          open={openModal}
          handleOpen={handleOpen}
          handleClose={handleClose}
        >
          <ExpensesCategoryForm />
        </ModalComponent>
      )}
    </Box>
  )
}

export default ExpensesCategoryMain
