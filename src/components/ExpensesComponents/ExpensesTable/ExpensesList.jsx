import { Box, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AddComponent } from '../../AddComponent'
import { ModalComponent } from '../../ModalComponent'
import { ExpensesForm } from '../ExpensesForm'
import { Table } from '../../Table'
import expensesCategoryActions from '../../../customHooks/reduxActions/expensesActions'
import { selectExpenseState } from '../../../features/expenses/expenseSlice'
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete'
import styles from './styles.module.scss'
import ToastAlert from '../../Alerts'

const ExpensesList = () => {
  const { useGetExpensesByCompany } = expensesCategoryActions()
  const [openModal, setOpenModal] = useState(false)
  const [formattedExpenses, setFormattedExpenses] = useState([])
  const { expenses, expensesLoading, expensesFlag, expensesHttpStatus, expensesMessage, expensesStatus } = useSelector(selectExpenseState)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    useGetExpensesByCompany()
  }, [])

  useEffect(() => {
    if(!expensesLoading){
      const formatDateExpenses = expenses.map(expense => ({
        ...expense,
        category_name: expense.category?.category_name || '',
        companyName: expense.idSupplier?.companyName || '',
    }));
      setFormattedExpenses(formatDateExpenses);
    }
  }, [expenses])
  

  const columns = [
    { field: 'date', headerName: 'Fecha', width: 150 },
    { field: 'description', headerName: 'Descripción', width: 300 },
    { field: 'cost', headerName: 'Valor', width: 100 },
    { field: 'category_name', headerName: 'Categoría', width: 150 },
    { field: 'companyName', headerName: 'Proveedor', width: 250 },
    { field: 'paymentMethod', headerName: 'Metodo de Pago', width: 120 },

    {
      field: "actions",
      headerName: "Acciones",
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
          columns={columns}
          rows={formattedExpenses}
          loading={expensesLoading}
          rowHeigth={56}
          columnHeaderHeight={56}
          title={'Listado de Gastos'}
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
          <ExpensesForm />
        </ModalComponent>
      )}

      {expensesFlag && (
        <ToastAlert
          message={expensesMessage}
          status={expensesStatus}
        />
      )}

      
    </Box>
  )
}

export default ExpensesList
