import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  getSupplierByCompany,
  clearState,
} from '../../features/supplier/supplierSlice'
import { verifyTokenExpiration } from '../../helpers/verifyToken'
import { useNavigate } from 'react-router-dom'

const useGetSuppliers = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const { status, companyId } = verifyTokenExpiration()
    if (status) {
      dispatch(getSupplierByCompany(companyId))
    } else {
      navigate('/')
    }
  }, [dispatch])

  const useClearSupplierState = () => {
    dispatch(clearState())
  }

  return useClearSupplierState
}

export default useGetSuppliers
