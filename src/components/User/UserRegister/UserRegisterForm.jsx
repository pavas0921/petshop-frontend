import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, selectUserState } from '../../../features/user/userSlice'
import { getAllRoles, selectRolesState } from '../../../features/rol/rolSlice'
import {
  getAllCompanies,
  selectCompnayState,
} from '../../../features/company/companySlice'
import Form from 'react-bootstrap/Form'
import styles from './userRegister.module.scss'
import { validatePassword } from '../../../helpers/validatePassword'
import ToastAlert from '../../Alerts'
import { Box, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { ComboBox } from '../../AutoCompleteComponent'
import Autocomplete from '@mui/material/Autocomplete'
import { Loader } from '../../LoaderComponent'
import userActions from '../../../customHooks/reduxActions/userActions'
import Select from 'react-select'

const UserRegisterForm = ({ item }) => {
  const useUserRegister = userActions()
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()

  const userResponse = useSelector(selectUserState)
  const { users, userLoading, httpStatus, message, status } = userResponse

  const rolesResponse = useSelector(selectRolesState)
  const { roles, rolLoading } = rolesResponse

  const companyResponse = useSelector(selectCompnayState)
  const { companies, companyLoading } = companyResponse

  const [showPassError, setShowPassError] = useState(false)

  const onSubmit = (body) => {
    body.status = true
    useUserRegister(body)
  }

  const messages = {
    req: 'Este campo es obligatorio',
  }

  useEffect(() => {
    dispatch(getAllRoles())
    dispatch(getAllCompanies())
  }, [])

  useEffect(() => {
    if (item) {
      setValue('name', item.name)
      setValue('lastname', item.lastname)
      setValue('id', item.id)
      setValue('rolId', item.rolId._id)
      setValue('companyId', item.companyId._id)
    }
  }, [item])

  return (
    <Box className={styles.div_main}>
      <Box className={styles.div_title}>
        <Typography variant="h5" color="initial">
          Registro de Usuarios
        </Typography>
      </Box>
      <Box className={styles.div_form}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('name', { required: messages.req })}
            size="small"
            type="text"
            name="name"
            label="Nombres"
            className={styles.input}
            helperText={errors.name && errors.name.message}
          />

          <TextField
            {...register('lastname', { required: messages.req })}
            size="small"
            type="text"
            name="lastname"
            label="Apellidos"
            className={styles.input}
            helperText={errors.lastname && errors.lastname.message}
          />

          <TextField
            {...register('id', { required: messages.req })}
            size="small"
            type="text"
            name="id"
            label="Cédula"
            className={styles.input}
            helperText={errors.id && errors.id.message}
          />

          <TextField
            {...register('password', { required: messages.req })}
            size="small"
            type="password"
            name="password"
            label="Contraseña"
            className={styles.input}
            helperText={errors.password && errors.password.message}
          />

          <Select
            {...register('rolId', { required: messages.req })}
            className={styles.input}
            classNamePrefix="select"
            placeholder="Selecciona un Rol"
            name="rolId"
            isLoading={rolLoading}
            defaultValue={
              item ? { value: item.rolId._id, label: item.rolId.name } : null
            }
            onChange={(selectedOption) =>
              setValue('rolId', selectedOption ? selectedOption.value : null)
            }
            options={roles.map((role) => ({
              value: role._id,
              label: role.name,
            }))}
          />

          {errors.rolId && <p>{errors.rolId.message}</p>}

          <Select
            {...register('companyId', { required: messages.req })}
            className={styles.input}
            classNamePrefix="select"
            placeholder="Selecciona una Compañía"
            name="companyId"
            isLoading={companyLoading}
            defaultValue={
              item
                ? { value: item.companyId._id, label: item.companyId.company }
                : null
            }
            onChange={(selectedOption) =>
              setValue(
                'companyId',
                selectedOption ? selectedOption.value : null
              )
            }
            options={companies.map((company) => ({
              value: company._id,
              label: company.company,
            }))}
          />

          {/* {companies && companies.length > 0 && (
            <Autocomplete
              {...register('companyId', { required: messages.req })}
              size="small"
              name="companyId"
              options={companies}
              className={styles.input}
              getOptionLabel={(option) => option.company}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              onChange={(event, value) => setValue('companyId', value._id)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Compañías"
                  helperText={errors.companyId && errors.companyId.message}
                />
              )}
            />
          )} */}

          {showPassError && (
            <Form.Text className="text-muted">
              La contraseña no cumple con los requisitos de complejidad.
            </Form.Text>
          )}

          <Box className={styles.div_btn}>
            <Button variant="contained" type="submit">
              {item ? 'Actualizar' : 'Registrar'}
            </Button>
          </Box>
        </form>
      </Box>

      {(companyLoading || rolLoading || userLoading) && <Loader />}
    </Box>
  )
}

export default UserRegisterForm
