import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectExpensesCategory } from '../../../features/expensesCategory/expensesCategorySlice'
import { Box, Button, TextField, Typography, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import { Table } from '../../Table'
import expensesCategoryActions from '../../../customHooks/reduxActions/expensesActions'
import { AddComponent } from '../../AddComponent'
import { ModalComponent } from '../../ModalComponent'
import {ExpensesCategoryForm} from '../ExpensesCategories'
import {Loader} from '../../LoaderComponent';
import styles from './styles/expensesCategoryList.module.scss'

const ExpensesCategoryList = () => {
  const { useGetExpensesCategories } = expensesCategoryActions()
  const { expensesCategories, expensesCategoriesLoading, expensesCategoriesFlag, expensesCategoriesStatus, expensesCategoriesMessage } = useSelector(selectExpensesCategory)
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    useGetExpensesCategories()
  }, [])

  const columns = [
    { field: 'category_name', headerName: 'Nombre', minWidth: 200 },
    {
      field: 'status',
      headerName: 'Estado',
      minWidth: 150,
      valueGetter: (params) => (params.row.status ? 'Activo' : 'Inactivo'), // Transformar true/false a Activo/Inactivo
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params) => (
        <Box>
          <IconButton>
            <VisibilityIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ]

  return (
    <Box className={styles.box_main}>
     <Box className={styles.box_table}>
        <Table
          title={'Categorías de Gastos'}
          columns={columns}
          rows={expensesCategories}
          rowHeigth={56}
          columnHeaderHeight={56}
        />
      </Box>
      <Box className={styles.addButton}>
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

      {expensesCategoriesLoading && (
        <Loader/>
      )}

      {expensesCategoriesFlag && expensesCategoriesMessage && expensesCategoriesStatus}


    </Box>
  )
}

export default ExpensesCategoryList
