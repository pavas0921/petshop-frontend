import React, { useEffect } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { NavbarComponent } from '../../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { verifyTokenExpiration } from '../../../helpers/verifyToken'
import {
  selectSupplierState,
  createSupplier,
} from '../../../features/supplier/supplierSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'

const SupplierForm = () => {
  const navigate = useNavigate()
  const isValidToken = verifyTokenExpiration()
  const { status, companyId, rolId, userId } = isValidToken
  const dispatch = useDispatch()
  const supplierResponse = useSelector(selectSupplierState)
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({})

  useEffect(() => {
    if (!status) {
      navigate('/')
    }
  }, [status])

  const onSubmit = (body) => {
    const isValidToken = verifyTokenExpiration()
    const { status } = isValidToken
    if (status) {
      body.idCompany = companyId
      console.log(body)
      dispatch(createSupplier(body))
    } else {
      sessionStorage.clear()
      localStorage.clear()
      navigate('/')
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
            helperText={errors.name ? 'Este campo es requerido' : ''}
          />

          <TextField
            {...register('companyName', { required: true })}
            name="companyName"
            size="small"
            label="Nombre Empresa"
            className={styles.textField}
            helperText={errors.name ? 'Este campo es requerido' : ''}
          />

          <TextField
            {...register('commercialAdvisor', { required: true })}
            name="commercialAdvisor"
            size="small"
            label="Nombre Asesor Comercial"
            className={styles.textField}
            helperText={errors.name ? 'Este campo es requerido' : ''}
          />

          <TextField
            {...register('phone', { required: true })}
            name="phone"
            size="small"
            label="Telefono Asesor Comercial"
            className={styles.textField}
            helperText={errors.name ? 'Este campo es requerido' : ''}
          />

          <TextField
            {...register('address', { required: true })}
            name="address"
            size="small"
            label="Dirección Punto de Venta"
            className={styles.textField}
            helperText={errors.name ? 'Este campo es requerido' : ''}
          />

          <Button type="submit" variant="contained">
            Registrar
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default SupplierForm
