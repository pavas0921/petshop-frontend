import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import expensesActions from '../../../customHooks/reduxActions/expensesActions'
import supplierActions from '../../../customHooks/reduxActions/supplierActions'
import { useSelector } from 'react-redux'
import { selectExpensesCategory } from '../../../features/expensesCategory/expensesCategorySlice'
import { selectSupplierState } from '../../../features/supplier/supplierSlice'
import { selectExpenseState } from '../../../features/expenses/expenseSlice'
import ToastAlert from '../../Alerts/'
import { Loader } from '../../Loader'

const ExpensesForm = ({item}) => {
  const { useGetExpensesCategories, useRegisterExpense } = expensesActions()
  const { useGetSupplierByCompany } = supplierActions()
  const { expensesCategories } = useSelector(selectExpensesCategory)
  const { expensesLoading, expensesFlag } = useSelector(selectExpenseState)
  const { suppliers } = useSelector(selectSupplierState)
  const [key, setKey] = useState(Date.now())
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    console.log('flag', expensesFlag)
  }, [expensesFlag])

  const paymentMethods = [
    { label: 'Efectivo', code: 'Efectivo' },
    { label: 'Bancolombia', code: 'Bancolombia' },
    { label: 'Nequi', code: 'Nequi' },
    { label: 'Datafono', code: 'Datafono' },
  ]

  useEffect(() => {
    useGetExpensesCategories()
    useGetSupplierByCompany()
  }, [])

  useEffect(() => {
    console.log(expensesLoading)
  }, [expensesLoading])

  const onSubmit = (body) => {
    console.log('body', body)
    useRegisterExpense(body)
  }

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: today,
    },
  })

  useEffect(() => {
    console.log(item)
    if(item){
      setValue('date', item.date)
      setValue('category', item.category._id)
      setValue('supplier', item.supplier)
      setValue('paymentMethod', item.paymentMethod)
      setValue('cost', item.cost)
      setValue('description', item.description)
    }
  }, [item])

  return (
    <Box className={styles.box_main}>
      <Box>
        <Typography variant="h5" color="initial" sx={{ fontFamily: 'Baloo 2' }}>
          Registro de Gastos
        </Typography>
      </Box>
      <Box className={styles.box_form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            InputLabelProps={{ shrink: true }}
            name="date"
            defaultValue={today}
            {...register('date', {
              required: 'Debe seleccionar una fecha para continuar',
            })}
            label="Seleccionar Fecha"
            size="small"
            type="date"
            className={styles.select}
          />

          <Select
            name="category"
            {...register('category', { required: 'Debe seleccionar una categoria para continuar' })}
            className={styles.select}
            classNamePrefix="select"
            placeholder="Categoría"
            key={key}
            defaultValue={
              item ? { value: item.category._id, label: item.category?.category_name } : null
            }
            onChange={(selectedOption) =>
              setValue('category', selectedOption ? selectedOption.value : null)
            }
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
            name="description"
            {...register('description', {
              required: 'El campo descripción es requerido',
            })}
            size="small"
            label="Descripción de la Compra"
            className={styles.textField}
            helperText={errors.description && errors.description.message}
          />

          <TextField
            name="cost"
            {...register('cost', {
              required: 'El campo costo es requerido',
            })}
            size="small"
            label="Valor Compra"
            className={styles.textField}
            helperText={errors.cost && errors.cost.message}
          />

          <Select
            name="paymentMethod"
            {...register('paymentMethod', {
              required: 'Debe seleccionar un metodo de pago',
            })}
            className={styles.select}
            classNamePrefix="select"
            placeholder="Metodo de pago"
            key={key}
            defaultValue={
              item ? { value: item.paymentMethod, label: item.paymentMethod } : null
            }
            onChange={(selectedOption) =>
              setValue('paymentMethod', selectedOption.value)
            }
            options={paymentMethods.map((item) => ({
              value: item.code,
              label: item.label,
            }))}
            menuPlacement="bottom"
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />

          <Select
            name="supplier"
            className={styles.select}
            classNamePrefix="select"
            placeholder="Proveedor"
            key={key}
            onChange={(selectedOption) =>
              setValue(
                'idSupplier',
                selectedOption ? selectedOption.value : null
              )
            }
            options={suppliers.map((supplier) => ({
              value: supplier._id,
              label: supplier.companyName,
            }))}
            defaultValue={
              item ? { value: item.idSupplier._id, label: item.idSupplier.companyName } : null
            }
            menuPlacement="top"
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />

          <Box className={styles.box_buttons}>
            <Button
              className={styles.btn}
              type="submit"
              variant="contained"
              sx={{ backgroundColor: 'black' }}
            >
              <Typography variant="p" sx={{ fontSize: 17 }}>
                REGISTRAR GASTO
              </Typography>
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default ExpensesForm
