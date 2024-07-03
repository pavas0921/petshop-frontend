import React, { useEffect } from 'react'
import { Box, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import expensesCategoryActions from '../../../customHooks/reduxActions/expensesActions'
import { useSelector } from 'react-redux'
import { selectExpensesCategory } from '../../../features/expensesCategory/expensesCategorySlice'
import { Table } from '../../Table'
import styles from './styles.module.scss'

export const ExpensesList = () => {
  const { useGetExpensesCategories } = expensesCategoryActions()
  const { expensesCategories, expensesCategoriesLoading } = useSelector(
    selectExpensesCategory
  )

  const columns = [
    { field: 'category_name', headerName: 'Nombre Categoría', width: 200 },
    {
      field: 'status',
      headerName: 'Estado',
      width: 110,
      renderCell: (params) => (
        <Box>{params.row.status ? 'Activo' : 'Inactivo'}</Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 110,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={(event) => handleClick(event, params.row)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => console.log('hola')}>
            {params.row.status ? <CloseIcon /> : <CheckIcon />}
          </IconButton>
        </Box>
      ),
    },
  ]

  useEffect(() => {
    useGetExpensesCategories()
  }, [])

  return (
    <Box className={styles.box_table}>
      <Table
        columns={columns}
        rows={expensesCategories}
        loading={expensesCategoriesLoading}
        rowHeigth={56}
        columnHeaderHeight={56}
        title={'Categorías de Gastos'}
      />
    </Box>
  )
}
