import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import styles from './styles/expensesCategoryForm.module.scss'
import expensesActions from '../../../customHooks/reduxActions/expensesActions'

const ExpensesCategoryForm = () => {
  const { useRegisterCategoryExpenses } = expensesActions()
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({})

  const onSubmit = (body) => {
    useRegisterCategoryExpenses(body)
  }

  return (
    <Box className={styles.box_main}>
      <Box>
        <Typography variant="h5" color="initial" sx={{ fontFamily: 'Baloo 2' }}>
          Registro de Categorías de Gastos
        </Typography>
      </Box>
      <Box className={styles.box_form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('category_name')}
            name="category_name"
            size="small"
            label="Nombre de la Categoría"
            className={styles.textField}
          />
          <Button type="submit" variant="contained">
            Registrar
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default ExpensesCategoryForm
