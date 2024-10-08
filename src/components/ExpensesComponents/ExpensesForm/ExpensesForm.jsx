import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import expensesActions from '../../../customHooks/reduxActions/expensesActions'
import { useSelector } from 'react-redux'
import { selectExpensesCategory } from '../../../features/expensesCategory/expensesCategorySlice'

const ExpensesForm = () => {
  const { useGetExpensesCategories } = expensesActions()
  const {expensesCategories} = useSelector(selectExpensesCategory)

  useEffect(() => {
    console.log(expensesCategories);
  }, []);

  return (
    <Box className={styles.box_main}>
      <Box>
        <Typography variant="h5" color="initial" sx={{ fontFamily: 'Baloo 2' }}>
          Registro de Gastos
        </Typography>
      </Box>
      <Box className={styles.box_form}>
        <form>
          <TextField
            name="date"
            type="date"
            size="small"
            className={styles.textField}
          />

          <Select
            name="category"
            // className={styles.select}
            classNamePrefix="select"
            placeholder="Categoría"
            // key={key}
            // onChange={(selectedOption) =>
            //   setValue(
            //     'idCliente',
            //     selectedOption ? selectedOption.value : null
            //   )
            // }
            options={expensesCategories.map((categories) => ({
              value: categories._id,
              label: categories.category_name,
            }))}
            menuPlacement="bottom"
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />

          <TextField
            name="cost"
            size="small"
            label="Valor Compra"
            className={styles.textField}
          />

          <TextField
            name="description"
            size="small"
            label="Descripción de la Compra"
            className={styles.textField}
          />

          <TextField
            name="paymentMethod"
            size="small"
            label="Metodo de Pago"
            className={styles.textField}
          />

          <TextField
            name="idSupplier"
            size="small"
            label="Proveedor"
            className={styles.textField}
          />
        </form>
      </Box>
    </Box>
  )
}

export default ExpensesForm
