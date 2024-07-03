import React, { useState } from 'react'
import { Box, TextField, Typography, Button } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import expensesCategoryActions from '../../../customHooks/reduxActions/expensesActions'
import styles from './styles.module.scss'

const ExpensesCategoryForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({})

  const { useRegisterCategoryExpenses } = expensesCategoryActions()

  const onSubmit = (body) => {
    useRegisterCategoryExpenses(body)
  }
  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_title}>
        <Typography variant="h5" color="initial">
          <p> Registro de Categoría de Gastos</p>
        </Typography>
      </Box>
      <Box className={styles.box_form}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            name="category_name"
            {...register('category_name', {
              required: 'Este campo es obligatorio',
            })}
            className={styles.inputs}
            label="Nombre Categoría"
            variant="outlined"
            size="small"
            error={!!errors.category_name}
            helperText={errors.category_name?.message}
          />
          <Button type="submit" className={styles.btn} variant="contained">
            <p>Registrar Categoria</p>
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default ExpensesCategoryForm
