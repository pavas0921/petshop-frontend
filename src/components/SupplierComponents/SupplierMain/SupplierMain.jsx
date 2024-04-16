import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSupplierState } from '../../../features/supplier/supplierSlice'
import { Box } from '@mui/material'
import SupplierTable from '../SupplierTable/SupplierTable'
import styles from './styles.module.scss'
import { AddComponent } from '../../AddComponent'
import { ModalComponent } from '../../ModalComponent'
import { SupplierForm } from '../SupplierForm'
import ToastAlert from '../../Alerts/ToastAlert'
import { Loader } from '../../LoaderComponent'
import useGetSuppliers from '../../../customHooks/reduxActions/supplierActions'
import { runTimer } from '../../../helpers/runTimer'

const SupplierMain = () => {
  //useGetSuppliers()
  const [openModal, setOpenModal] = useState(false)
  const { useClearSupplierState } = useGetSuppliers(true)
  const [item, setItem] = useState()
  const handleClose = () => {
    setOpenModal(false)
    setItem()
  }
  const dispatch = useDispatch()
  const {
    suppliers,
    supplierLoading,
    httpStatus,
    supplierStatus,
    message,
    supplierFlag,
  } = useSelector(selectSupplierState)

  useEffect(() => {
    if (supplierFlag) {
      runTimer(useClearSupplierState)
      handleClose()
    }
  }, [supplierFlag])

  return (
    <Box className={styles.box_main}>
      <SupplierTable
        rows={suppliers}
        loading={supplierLoading}
        setOpenModal={setOpenModal}
        setItem={setItem}
      />
      <Box className={styles.addButton}>
        <AddComponent setOpenModal={setOpenModal} />
      </Box>

      {openModal && (
        <ModalComponent open={openModal} handleClose={handleClose}>
          <SupplierForm item={item} openModal={openModal} />
        </ModalComponent>
      )}

      {(httpStatus === 201 || httpStatus === 200) &&
        supplierStatus === 'success' && (
          <ToastAlert status={supplierStatus} message={message} />
        )}

      {supplierLoading && <Loader />}
    </Box>
  )
}

export default SupplierMain
