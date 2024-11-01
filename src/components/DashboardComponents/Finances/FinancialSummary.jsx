import React, { useEffect, useState } from 'react'
import { 
  Grid, 
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectVentasState,
  getDailySalesCount,
} from '../../../features/venta/ventaSlice'
import {selectExpenseState} from "../../../features/expenses/expenseSlice"
import { verifyTokenExpiration } from '../../../helpers/verifyToken'
import { CardFinancialHealth } from '../CardFinancialHealth'
import { 
  TrendingUp as TrendingUpIcon, 
  TrendingDown as TrendingDownIcon, 
  AccountBalance as AccountBalanceIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';
import expensesCategoryActions from "../../../customHooks/reduxActions/expensesActions";

const getLocalDate = () => {
  
  const date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toISOString().split('T')[0]
}

const FinancialSummary = () => {
  const { useGetDailyExpensesCount } = expensesCategoryActions();
  const {expensesDetail} = useSelector(selectExpenseState)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [salesChanePercentage, setSalesChanePercentage] = useState();
  const [expensesChangePercentage, setExpensesChangePercentage] = useState();
  const { totalDailySales } = useSelector(selectVentasState)
  const today = getLocalDate()

  useEffect(() => {
    const isValidToken = verifyTokenExpiration()
    const { status, companyId, rolId, userId } = isValidToken
    dispatch(
      getDailySalesCount({
        idCompany: companyId,
        date: today,
      })
    )
    useGetDailyExpensesCount();
  }, [])

  useEffect(() => {
    if(totalDailySales){
      setSalesChanePercentage(calculateSalesChangePercentage(totalDailySales?.totalToday, totalDailySales?.totalYesterday));
      setExpensesChangePercentage(calculateSalesChangePercentage(expensesDetail?.totalToday, expensesDetail?.totalYesterday));  
    }
  }, [totalDailySales, expensesDetail])

  function calculateSalesChangePercentage(todayTransactions, yesterdayTransactions) {
    const epsilon = 1e-10;
    const difference = todayTransactions - yesterdayTransactions;
    const denominator = yesterdayTransactions === 0 ? epsilon : yesterdayTransactions;
    const changePercentage = (difference / denominator) * 100;
    return parseFloat(changePercentage.toFixed(3));
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3} sx={{mb: 4}}>
        <Grid item xs={12} md={4}>
          <CardFinancialHealth 
          title={"Ventas del Día"} 
          value={totalDailySales?.totalToday > 0 ? totalDailySales.totalToday : 0}  
          icon={
          salesChanePercentage < 0 ? 
          <TrendingDownIcon color="error" /> :
          <TrendingUpIcon color="success" />} 
          change={`${salesChanePercentage}% del día anterior`}
          />
        </Grid> 

        <Grid item xs={12} md={4}>
          <CardFinancialHealth
          title={"Gastos del Día"}
          value={expensesDetail?.totalToday > 0 ? expensesDetail.totalToday : 0}  
          icon={<TrendingUpIcon color="success" />} 
          change={`${expensesChangePercentage}% del día anterior`}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <CardFinancialHealth
          title={"Balance del Día"}
          value={totalDailySales?.totalToday - expensesDetail?.totalToday }
          icon={<AccountBalanceIcon color="success" />}
          change={"+20.1% del día anterior"} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <CardFinancialHealth
          title={"Ventas de Ayer"}
          value={totalDailySales?.totalYesterday > 0 ? totalDailySales.totalYesterday : 0}  
          icon={<ArrowUpwardIcon color="success" />}
           />
        </Grid> 

        <Grid item xs={12} md={4}>
          <CardFinancialHealth
          title={"Gastos del Día"}
          value={expensesDetail?.totalYesterday > 0 ? expensesDetail.totalYesterday : 0}  
          icon={<ArrowDownwardIcon color="error" />} 
           />
        </Grid>

        <Grid item xs={12} md={4}>
          <CardFinancialHealth
          title={"Balance de Ayer"}
          value={totalDailySales?.totalYesterday - expensesDetail?.totalYesterday } 
          icon={<AccountBalanceIcon color="success" />}
           />
        </Grid>
      </Grid>

      
    </Container>
      
   
  )
}

export default FinancialSummary
