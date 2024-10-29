import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AddComponent } from '../../AddComponent'
import { ModalComponent } from '../../ModalComponent'
import { ExpensesForm } from '../ExpensesForm'
import { Table } from '../../Table'
import expensesCategoryActions from '../../../customHooks/reduxActions/expensesActions'
import { selectExpenseState } from '../../../features/expenses/expenseSlice'
import styles from './styles.module.scss'

const ExpensesList = () => {
  const { useGetExpensesByCompany } = expensesCategoryActions()
  const [openModal, setOpenModal] = useState(false)
  const { expenses } = useSelector(selectExpenseState)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    useGetExpensesByCompany()
  }, [])

  useEffect(() => {
    console.log(expenses)
  }, [selectExpenseState])
  const columns = [
    { field: 'date', headerName: 'Fecha', width: 150 },
    { field: 'description', headerName: 'Descripción', width: 300 },
    { field: 'cost', headerName: 'Valor', width: 100 },
    { field: 'category.category_name', headerName: 'Categoría', width: 100 },
    { field: 'idSupplier.companyName', headerName: 'Proveedor', width: 100 },
    { field: 'paymentMethod', headerName: 'Metodo de Pago', width: 120 },

    // {
    //   field: "actions",
    //   headerName: "Acciones",
    //   width: 80,
    //   renderCell: (params) => (
    //     <Box>
    //       <IconButton>
    //         <VisibilityIcon />
    //       </IconButton>
    //       <IconButton>
    //         <DeleteIcon />
    //       </IconButton>
    //     </Box>
    //   ),
    // },
  ]

  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_table}>
        <Table
          columns={columns}
          rows={expenses}
          //loading={especiesLoading}
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
    </Box>
  )
}

export default ExpensesList
