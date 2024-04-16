import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { UserList } from '../UserList'
import { ModalComponent } from '../../ModalComponent'
import UserRegisterForm from '../UserRegister/UserRegisterForm'
import AddComponent from '../../AddComponent/AddComponent'
import styles from './styles.module.scss'

const UserMain = () => {
  const [openModal, setOpenModal] = useState(false)
  const handleClose = () => {
    setOpenModal(false)
  }
  return (
    <Box className={styles.box_main}>
      <UserList />
      <Box className={styles.addButton}>
        <AddComponent setOpenModal={setOpenModal} />
      </Box>

      {openModal && (
        <ModalComponent open={openModal} handleClose={handleClose}>
          <UserRegisterForm />
        </ModalComponent>
      )}
    </Box>
  )
}

export default UserMain
