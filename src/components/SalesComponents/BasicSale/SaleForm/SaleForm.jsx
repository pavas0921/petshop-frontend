import React, { useEffect, useState } from 'react'
import { Button, FormControl, Autocomplete, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import { Box, Typography } from '@mui/material'
import productsActions from '../../../../customHooks/reduxActions/productsActions'
import { useSelector } from 'react-redux'
import { selectVentasState } from '../../../../features/venta/ventaSlice'
import Select from 'react-select'
import { width } from '@fortawesome/free-solid-svg-icons/fa0'

const SaleForm = ({
  products,
  customers,
  paymentMethods,
  saleTypes,
  addProduct,
  qty,
  setQty,
  selectedProduct,
  setSelectedProduct,
  productKey,
  setProductKey,
  productDetails,
  setProductDetails,
  totalSaleValue,
  setTotalSaleValue,
  companyId,
}) => {
  const [key, setKey] = useState(Date.now())
  const today = new Date().toISOString().split('T')[0]
  const ventaResponse = useSelector(selectVentasState)
  const {
    salesMessage,
    salesHttpStatus,
    loading,
    salesFlag,
    saleDetail,
    salesStatus,
  } = ventaResponse

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
    if (
      salesMessage === 'Venta registrada con éxito e inventario actualizado.' &&
      salesHttpStatus === 200 &&
      !loading &&
      salesFlag &&
      saleDetail.length === 0 &&
      salesStatus === 'success'
    ) {
      reset()
      setKey(Date.now())
    }
  }, [ventaResponse])

  const { registerSale } = productsActions()

  const onSubmit = (body) => {
    console.log('body', body)
    registerSale(body, totalSaleValue)
  }

  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_title}>
        <Typography
          className={styles.typography}
          sx={{ fontSize: 33 }}
          variant="h4"
        >
          <p>Formulario de Venta</p>
        </Typography>
      </Box>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.box_form}>
          <Box className={styles.textField}>
            <Select
              name="idCliente"
              {...register('idCliente', { required: true })}
              className={styles.select}
              classNamePrefix="select"
              placeholder="Clientes"
              key={key}
              onChange={(selectedOption) =>
                setValue(
                  'idCliente',
                  selectedOption ? selectedOption.value : null
                )
              }
              options={customers.map((customer) => ({
                value: customer._id,
                label: `${customer.firstName} ${customer.lastName} ${customer.cedula}`,
              }))}
              menuPlacement="bottom"
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
            />
          </Box>

          <Box className={`${styles.textField} ${styles.balooFont}`}>
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
              //helperText={errors.date && errors.date.message}
            />
          </Box>

          <Box className={styles.textField}>
            <Select
              name="payMethod"
              {...register('payMethod', {
                required: 'Debe seleccionar un metodo de pago',
              })}
              className={styles.select}
              classNamePrefix="select"
              placeholder="Metodo de pago"
              key={key}
              //defaultValue={getValues('payMethod')}
              onChange={(selectedOption) =>
                setValue('payMethod', selectedOption.value)
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
          </Box>

          <Box className={styles.textField}>
            <Select
              name="saleType"
              {...register('saleType', {
                required: 'Debe seleccionar un tipo de venta',
              })}
              className={styles.select}
              classNamePrefix="select"
              placeholder="Estado del pago"
              key={key}
              onChange={(selectedOption) =>
                setValue('saleType', selectedOption.value)
              }
              options={saleTypes.map((item) => ({
                value: item.code,
                label: item.label,
              }))}
              menuPlacement="bottom"
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
            />
          </Box>

          <Box className={styles.textField}>
            <Select
              className={styles.select}
              classNamePrefix="select"
              placeholder="Productos"
              name="product"
              key={productKey}
              onChange={(selectedOption) =>
                setSelectedProduct(selectedOption.value)
              }
              options={products.map((product) => ({
                value: product,
                label: product.productName,
              }))}
              menuPlacement="top"
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
            />
          </Box>

          <Box className={styles.textField}>
            <TextField
              InputLabelProps={{ shrink: true }}
              name="qty"
              value={qty}
              label="Cantidad"
              size="small"
              type="number"
              className={styles.select}
              onChange={(event) => {
                setQty(event.target.value)
              }}
            />
          </Box>
        </Box>

        <Box className={styles.box_buttons}>
          <Button
            className={styles.btn}
            variant="contained"
            onClick={addProduct}
            sx={{ backgroundColor: 'black' }}
          >
            <Typography variant="p" sx={{ fontSize: 17 }}>
              Agregar
            </Typography>
          </Button>
          <Button
            className={styles.btn}
            type="submit"
            variant="contained"
            sx={{ backgroundColor: 'black' }}
          >
            <Typography variant="p" sx={{ fontSize: 17 }}>
              Finalizar
            </Typography>
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default SaleForm
