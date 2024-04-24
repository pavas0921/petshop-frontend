import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { UserList } from '../UserList'
import { ModalComponent } from '../../ModalComponent'
import { selectUserState } from '../../../features/user/userSlice'
import { useSelector } from 'react-redux'
import UserRegisterForm from '../UserRegister/UserRegisterForm'
import userActions from '../../../customHooks/reduxActions/userActions'
import AddComponent from '../../AddComponent/AddComponent'
import styles from './styles.module.scss'
import { Loader } from '../../LoaderComponent'
import ToastAlert from '../../Alerts'

const UserMain = () => {
  userActions()
  const [openModal, setOpenModal] = useState(false)
  const [item, setItem] = useState(false)
  const handleClose = () => {
    setOpenModal(false)
    setItem()
  }
  const { users, userLoading, httpStatus, status, message } =
    useSelector(selectUserState)

  return (
    <Box className={styles.box_main}>
      <UserList
        rows={users}
        loading={userLoading}
        setOpenModal={setOpenModal}
        setItem={setItem}
      />
      <Box className={styles.addButton}>
        <AddComponent setOpenModal={setOpenModal} />
      </Box>

      {openModal && (
        <ModalComponent open={openModal} handleClose={handleClose}>
          <UserRegisterForm item={item} />
        </ModalComponent>
      )}

      {userLoading && <Loader />}

      {httpStatus === 201 && status === 'success' && (
        <ToastAlert status={status} message={message} />
      )}
    </Box>
  )
}

export default UserMain
