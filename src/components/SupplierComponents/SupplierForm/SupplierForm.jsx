import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { NavbarComponent } from '../../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { verifyTokenExpiration } from '../../../helpers/verifyToken'

const SupplierForm = () => {
  const navigate = useNavigate()
  const isValidToken = verifyTokenExpiration()
  const { status, companyId, rolId, userId } = isValidToken

  useEffect(() => {
    if (!status) {
      navigate('/')
    }
  }, [status])
  return <div>SupplierForm</div>
}

export default SupplierForm
