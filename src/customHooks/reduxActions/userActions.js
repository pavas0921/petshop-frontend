import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  selectUserState,
  createUser,
  getUsersByCompany,
} from '../../features/user/userSlice'
import { verifyTokenExpiration } from '../../helpers/verifyToken'
import { useNavigate } from 'react-router-dom'

const userActions = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const { status, companyId } = verifyTokenExpiration()
    if (status) {
      dispatch(getUsersByCompany(companyId))
    } else {
      navigate('/')
    }
  }, [dispatch])

  //   //Clear status
  //   const useClearSupplierState = () => {
  //     dispatch(clearState())
  //   }

  const useUserRegister = (body) => {
    const { status } = verifyTokenExpiration()
    if (status) {
      dispatch(createUser(body))
    } else {
      sessionStorage.clear()
      localStorage.clear()
      navigate('/')
    }
  }

  //   const useSupplierUpdate = (body, _id) => {
  //     const { status } = verifyTokenExpiration()
  //     if (status) {
  //       dispatch(updateSupplierById({ body, _id }))
  //     } else {
  //       sessionStorage.clear()
  //       localStorage.clear()
  //       navigate('/')
  //     }
  //   }

  return useUserRegister
}

export default userActions
