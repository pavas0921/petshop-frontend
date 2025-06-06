import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import Image from '../../assets/background.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Login,
  selectLoginState,
  clearState,
} from '../../features/login/loginSlice'
import { AlertMessage } from '../Alert'
import { Loader } from '../Loader'
import { useForm } from 'react-hook-form'
import styles from './loginForm.module.scss'
import ToastAlert from '../Alerts/ToastAlert'

//Todo: Implementar el formulario de login - https://github.com/pavas0921/favs-frontend/blob/main/src/components/LoginForm/LoginForm.jsx

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loginResponse = useSelector(selectLoginState)
  const { token, loading, message, httpStatus, status, flag } = loginResponse

  useEffect(() => {
    if (httpStatus === 200 && status === 'success' && !flag && token) {
      sessionStorage.setItem('token', token)
      dispatch(clearState)
      navigate('/dashboard')
    }
  }, [httpStatus, status, token])

  const onSubmit = (credentials) => {
    dispatch(clearState())
    dispatch(Login(credentials))
  }

  const messages = {
    req: 'Este campo es obligatorio',
  }

  return (
    <Box className={styles.box_main}>
      {loading && (
        <Box>
          <Loader />
        </Box>
      )}
      <Box className={styles.box_img}>
        <img className={styles.image} src={Image} alt="" />
      </Box>
      <Box className={styles.box_form}>
        <Box className={styles.box_title}>
          <Typography variant="h5">Inicio de Sesión</Typography>
        </Box>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Box className={styles.box_inputs}>
            <TextField
              {...register('id', { required: messages.req })}
              className={styles.inputs_fields}
              type="text"
              label="Cédula"
              variant="outlined"
              name="id"
              helperText={errors.id && errors.id.message}
            />
          </Box>
          <Box className={styles.box_inputs}>
            <TextField
              {...register('password', { required: messages.req })}
              className={styles.inputs_fields}
              type="password"
              label="Contraseña"
              variant="outlined"
              name="password"
              helperText={errors.password && errors.password.message}
            />
          </Box>
          <Box className={styles.box_inputs}>
            <Button className={styles.button} variant="contained" type="submit">
              Iniciar Sesión
            </Button>
          </Box>
          <Box className={styles.box_link}>
            <Button style={{ fontSize: '18px' }}>¿Olvidó su contraseña?</Button>
          </Box>
        </form>

        <Box className={styles.box_footer}></Box>
      </Box>

      {loading && <Loader />}

      {flag && <ToastAlert status={status} message={message} />}
    </Box>
  )
}

export default LoginForm
