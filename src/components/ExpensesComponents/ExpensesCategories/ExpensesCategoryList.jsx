import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import {selectExpensesCategory} from "../../../features/expensesCategory/expensesCategorySlice"
import { Box, Button, TextField, Typography, IconButton } from '@mui/material'
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { Table } from '../../Table'
import expensesCategoryActions from '../../../customHooks/reduxActions/expensesActions'



const ExpensesCategoryList = () => {
    const { useGetExpensesCategories } = expensesCategoryActions()
    const {expensesCategories} = useSelector(selectExpensesCategory)

    useEffect(() => {
        useGetExpensesCategories()
      }, [])


  const columns = [
    { field: 'category_name', headerName: 'Nombre', minWidth: 200 },
    {
        field: 'status',
        headerName: 'Estado',
        minWidth: 150,
        valueGetter: (params) => params.row.status ? 'Activo' : 'Inactivo', // Transformar true/false a Activo/Inactivo
    },
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
    <div>
      <Table
              title={'Categorías de Gastos'}
              columns={columns}
              rows={expensesCategories}
              rowHeigth={56}
              columnHeaderHeight={56}
            />
    </div>
  )
}

export default ExpensesCategoryList
