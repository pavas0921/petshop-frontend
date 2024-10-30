import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  getSupplierByCompany,
  createSupplier,
  clearState,
  updateSupplierById,
} from '../../features/supplier/supplierSlice'
import { verifyTokenExpiration } from '../../helpers/verifyToken'
import { useNavigate } from 'react-router-dom'

const supplierActions = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const tokenData = verifyTokenExpiration()
  const { status, companyId, rolId, userId } = tokenData

  const useGetSupplierByCompany = () => {
    if (status) {
      dispatch(getSupplierByCompany(companyId))
    } else {
      sessionStorage.clear()
      localStorage.clear()
      navigate('/')
    }
  }
  // useEffect(() => {
  //   const { status, companyId } = verifyTokenExpiration()
  //   if (status) {
  //     if (getSupplier) {
  //       dispatch(getSupplierByCompany(companyId))
  //     }
  //   } else {
  //     navigate('/')
  //   }
  // }, [dispatch])

  //Clear status
  const useClearSupplierState = () => {
    dispatch(clearState())
  }

  const useRegisterSupplier = (body) => {
    const { status } = verifyTokenExpiration()
    if (status) {
      dispatch(createSupplier(body))
    } else {
      sessionStorage.clear()
      localStorage.clear()
      navigate('/')
    }
  }

  const useSupplierUpdate = (body, _id) => {
    const { status } = verifyTokenExpiration()
    if (status) {
      dispatch(updateSupplierById({ body, _id }))
    } else {
      sessionStorage.clear()
      localStorage.clear()
      navigate('/')
    }
  }

  return {
    useClearSupplierState,
    useRegisterSupplier,
    useSupplierUpdate,
    useGetSupplierByCompany,
  }
}

export default supplierActions
