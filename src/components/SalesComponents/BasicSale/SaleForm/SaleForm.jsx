import React, { useEffect, useState } from 'react'
import { Button, FormControl, Autocomplete, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import { Box } from '@mui/material'
import useSalesActions from '../../../../customHooks/reduxActions/salesActions'

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
  productDetails,
  setProductDetails,
  totalSaleValue,
  companyId,
  salesFlag,
}) => {
  //   const [selectedProduct, setSelectedProduct] = useState({})
  //   const [qty, setQty] = useState(0)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const { registerSale } = useSalesActions()

  const onSubmit = (body) => {
    body.detalleVenta = productDetails
    body.totalVenta = totalSaleValue
    body.companyId = companyId
    //console.log(body)
    registerSale(body)
  }

  const handleAddProduct = () => {
    addProduct()
  }



  return (
    <Box className={styles.box_main}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.box_form}>
          <FormControl className={styles.textField}>
            <Autocomplete
              name="idCliente"
              {...register('idCliente', {
                required: 'Debe seleccionar un metodo de pago',
              })}
              disablePortal
              options={customers}
              className={styles.select}
              size="small"
              onChange={(event, newValue) => {
                setValue('idCliente', newValue?._id)
              }}
              getOptionLabel={(option) =>
                `${option.firstName} ${option.lastName} ${option.cedula}`
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Clientes"
                  id="idCliente"
                  InputLabelProps={{
                    htmlFor: 'idCliente',
                  }}
                  // helperText={errors.IdCliente && errors.IdCliente.message}
                />
              )}
              isOptionEqualToValue={(option, value) => option._id === value._id} // Aseguramos la comparación correcta de valores // Aseguramos la comparación correcta de valores
            />
          </FormControl>

          <Box className={styles.textField}>
            <TextField
              InputLabelProps={{ shrink: true }}
              name="date"
              {...register('date', {
                required: 'Debe seleccionar una fecha para continuar',
              })}
              label="Seleccione una Fecha"
              size="small"
              type="date"
              className={styles.select}
              //helperText={errors.date && errors.date.message}
            />
          </Box>

          <FormControl className={styles.textField}>
            <Autocomplete
              name="payMethod"
              //   {...register('payMethod', {
              //     required: 'Debe seleccionar un metodo de pago',
              //   })}
              disablePortal
              options={paymentMethods}
              className={styles.select}
              size="small"
              onChange={(event, newValue) => {
                setValue('payMethod', newValue?.code || '') // Establecer el valor del campo con setValue
              }}
              isOptionEqualToValue={(option, value) =>
                option?.code === value?.code
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Método de pago"
                  variant="outlined"
                  //helperText={errors.payMethod ? errors.payMethod.message : ''}
                />
              )}
            />
          </FormControl>

          <FormControl className={styles.textField}>
            <Autocomplete
              name="saleType"
              //   {...register('saleType', {
              //     required: 'Debe seleccionar un tipo de venta',
              //   })}
              disablePortal
              options={saleTypes}
              size="small"
              onChange={(event, newValue) => {
                setValue('saleType', newValue?.code || '') // Establecer el valor del campo con setValue
              }}
              isOptionEqualToValue={(option, value) =>
                option?.code === value?.code
              }
              renderInput={(params) => (
                <TextField
                  className={styles.select}
                  {...params}
                  label="Tipo de Venta"
                  variant="outlined"
                  // helperText={errors.saleType ? errors.saleType.message : ''}
                />
              )}
            />
          </FormControl>

          <FormControl className={styles.textField}>
            <Autocomplete
              disablePortal
              name="product"
              value={selectedProduct}
              options={products}
              size="small"
              getOptionLabel={(option) => option.productName}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              renderInput={(params) => (
                <TextField
                  className={styles.select}
                  {...params}
                  label="Productos"
                />
              )}
              onChange={(event, value) => {
                setSelectedProduct(value)
              }}
            />
          </FormControl>

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

          <Box className={styles.box_buttons}>
            <Button variant="contained" onClick={handleAddProduct}>
              Agregar
            </Button>
            <Button type="submit" variant="contained">
              Finalizar
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default SaleForm
