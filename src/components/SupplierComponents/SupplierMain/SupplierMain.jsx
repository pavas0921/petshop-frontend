import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectSupplierState,
  getSupplierByCompany,
} from '../../../features/supplier/supplierSlice'
import { Box, IconButton, Typography } from '@mui/material'
import { Table } from '../../Table'
import SupplierTable from '../SupplierTable/SupplierTable'
import styles from './styles.module.scss'
import { AddComponent } from '../../AddComponent'
import { ModalComponent } from '../../ModalComponent'
import { SupplierForm } from '../SupplierForm'
import ToastAlert from '../../Alerts/ToastAlert'
import { Loader } from '../../LoaderComponent'
import { verifyTokenExpiration } from '../../../helpers/verifyToken'

const SupplierMain = () => {
  const { status, companyId, rolId, userId, logo } = verifyTokenExpiration()
  const [openModal, setOpenModal] = useState(false)
  const handleClose = () => setOpenModal(false)
  const dispatch = useDispatch()
  const { suppliers, supplierLoading, httpStatus, supplierStatus, message } =
    useSelector(selectSupplierState)

  useEffect(() => {
    dispatch(getSupplierByCompany(companyId))
  }, [dispatch])

  return (
    <Box className={styles.box_main}>
      <SupplierTable rows={suppliers} loading={supplierLoading} />
      <Box className={styles.addButton}>
        <AddComponent setOpenModal={setOpenModal} />
      </Box>

      {openModal && (
        <ModalComponent open={openModal} handleClose={handleClose}>
          <SupplierForm />
        </ModalComponent>
      )}

      {httpStatus === 201 && supplierStatus === 'success' && (
        <ToastAlert status={supplierStatus} message={message} />
      )}

      {supplierLoading && <Loader />}
    </Box>
  )
}

export default SupplierMain
