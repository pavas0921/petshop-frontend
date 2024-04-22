import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { Table } from '../../Table'
import { Box, Typography, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ClearIcon from '@mui/icons-material/Clear'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, selectUserState } from '../../../features/user/userSlice'
import CheckIcon from '@mui/icons-material/Check'
import userActions from '../../../customHooks/reduxActions/userActions'
import Loader from '../../LoaderComponent/Loader'

const UserList = ({ rows, loading, setOpenModal, setItem }) => {
  const { useUpdateUserStatus } = userActions()
  const dispatch = useDispatch()

  const columns = [
    {
      field: 'id',
      headerName: '# Identificación',
      width: 150,
      headerClassName: styles.boldHeader,
    },
    {
      field: 'fullName',
      headerName: 'Nombre Completo',
      width: 250,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <Box>{`${params.row.name} ${params.row.lastname}`}</Box>
      ),
    },
    {
      field: 'rol',
      headerName: 'Rol',
      width: 150,
      renderCell: (params) => <Box>{params.row.rolId.name}</Box>,
    },

    {
      field: 'company',
      headerName: 'Compañía',
      width: 170,
      renderCell: (params) => <Box>{params.row.companyId.company}</Box>,
    },
    {
      field: 'status',
      headerName: 'Estado',
      width: 100,
      renderCell: (params) => (
        <Box>{params.row.status ? 'Activo' : 'Inactivo'}</Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={(event) => handleClick(event, params.row)}>
            <VisibilityIcon />
          </IconButton>
          {params.row.status ? (
            <IconButton onClick={() => handleDisableUser(params.row)}>
              <ClearIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => handleDisableUser(params.row)}>
              <CheckIcon />
            </IconButton>
          )}
        </Box>
      ),
    },
  ]

  const handleClick = (event, item) => {
    event.stopPropagation() // Evita que el clic llegue al contenedor padre
    setOpenModal(true)
    setItem(item)
  }

  const handleDisableUser = (item) => {
    const { _id, status } = item
    useUpdateUserStatus({ _id, currentStatus: status })
  }

  return (
    <Box className={styles.box_table}>
      <Table
        rows={rows}
        columns={columns}
        loading={loading}
        rowHeigth={56}
        columnHeaderHeight={56}
        title={'Listado de Usuarios'}
      />
    </Box>
  )
}

export default UserList
