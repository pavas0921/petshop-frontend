import React, { useEffect } from 'react'
import {
  getExpensesCategoriesByCompany,
  createExpensesCategory,
  selectExpensesCategory,
} from '../../features/expensesCategory/expensesCategorySlice'
import { useDispatch, useSelector } from 'react-redux'
import { verifyTokenExpiration } from '../../helpers/verifyToken'
import { useNavigate } from 'react-router-dom'

const expensesCategoryActions = () => {
  const dispatch = useDispatch()
  const { expensesCategories } = useSelector(selectExpensesCategory)
  const tokenData = verifyTokenExpiration()
  const { status, companyId, rolId, userId } = tokenData
  const navigate = useNavigate()

  const useGetExpensesCategories = () => {
    if (status) {
      dispatch(getExpensesCategoriesByCompany(companyId))
    } else {
      sessionStorage.clear()
      localStorage.clear()
      navigate('/')
    }
  }

  const useRegisterCategoryExpenses = (body) => {
    if (status) {
      body.idCompany = companyId
      body.status = true
      dispatch(createExpensesCategory(body))
    }
  }

  return { useGetExpensesCategories, useRegisterCategoryExpenses }
}

export default expensesCategoryActions
