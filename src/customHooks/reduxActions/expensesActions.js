import React, { useEffect } from 'react'
import {
  getExpensesCategoriesByCompany,
  createExpensesCategory,
  selectExpensesCategory,
} from '../../features/expensesCategory/expensesCategorySlice'
import {
  createExpense,
  getExpensesByCompany,
} from '../../features/expenses/expenseSlice'
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

  const useRegisterExpense = (body) => {
    const { status } = verifyTokenExpiration()
    if (status) {
      body.idCompany = companyId
      dispatch(createExpense(body))
    }
  }

  const useRegisterCategoryExpenses = (body) => {
    const { status } = verifyTokenExpiration()
    if (status) {
      body.idCompany = companyId
      body.status = true
      dispatch(createExpensesCategory(body))
    }
  }

  const useGetExpensesByCompany = () => {
    const { status } = verifyTokenExpiration()
    if (status) {
      dispatch(getExpensesByCompany(companyId))
    }
  }

  return {
    useGetExpensesCategories,
    useRegisterCategoryExpenses,
    useRegisterExpense,
    useGetExpensesByCompany,
  }
}

export default expensesCategoryActions
