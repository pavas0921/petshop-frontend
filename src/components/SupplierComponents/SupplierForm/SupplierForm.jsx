import React, { useEffect } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { NavbarComponent } from '../../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { verifyTokenExpiration } from '../../../helpers/verifyToken'
import {
  selectSupplierState,
  createSupplier,
  updateSupplierById,
} from '../../../features/supplier/supplierSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import useGetSuppliers from '../../../customHooks/reduxActions/supplierActions'
import styles from './styles.module.scss'

const SupplierForm = ({ item, openModal }) => {
  const { useRegisterSupplier, useSupplierUpdate } = useGetSuppliers(false)
  const navigate = useNavigate()
  const isValidToken = verifyTokenExpiration()
  const { companyId } = isValidToken
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({})

  useEffect(() => {
    setValue('idCompany', companyId)
    if (item) {
      setValue('nit', item.nit)
      setValue('companyName', item.companyName)
      setValue('commercialAdvisor', item.commercialAdvisor)
      setValue('phone', item.phone)
      setValue('address', item.address)
    }
  }, [item])

  const onSubmit = (body) => {
    if (!item) {
      useRegisterSupplier(body)
    } else {
      useSupplierUpdate(body, item._id)
    }
  }

  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_title}>
        <Typography variant="h5" color="initial">
          Registro de Proveedores
        </Typography>
      </Box>
      <Box className={styles.box_inputs}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('nit', { required: true })}
            name="nit"
            size="small"
            label="NIT"
            className={styles.textField}
            helperText={errors.nit ? 'Este campo es requerido' : ''}
          />

          <TextField
            {...register('companyName', { required: true })}
            name="companyName"
            size="small"
            label="Nombre Empresa"
            className={styles.textField}
            helperText={errors.companyName ? 'Este campo es requerido' : ''}
          />

          <TextField
            {...register('commercialAdvisor', { required: true })}
            name="commercialAdvisor"
            size="small"
            label="Nombre Asesor Comercial"
            className={styles.textField}
            helperText={
              errors.commercialAdvisor ? 'Este campo es requerido' : ''
            }
          />

          <TextField
            {...register('phone', { required: true })}
            name="phone"
            size="small"
            label="Telefono Asesor Comercial"
            className={styles.textField}
            helperText={errors.phone ? 'Este campo es requerido' : ''}
          />

          <TextField
            {...register('address', { required: true })}
            name="address"
            size="small"
            label="Dirección Punto de Venta"
            className={styles.textField}
            helperText={errors.address ? 'Este campo es requerido' : ''}
          />

          <Button type="submit" variant="contained">
            {item ? 'Actualizar' : 'Registrar'}
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default SupplierForm
