import React, { useEffect } from 'react'
import { NavbarComponent } from '../../components/Navbar'
import styles from './dashboard.module.scss'
import { useNavigate } from 'react-router-dom'
import { verifyTokenExpiration } from '../../helpers/verifyToken'
import FinancialSummary from '../../components/DashboardComponents/Finances/FinancialSummary'

const Dashboard = () => {
  const navigate = useNavigate()
  const isValidToken = verifyTokenExpiration()
  const { status, companyId, rolId, userId } = isValidToken

  useEffect(() => {
    if (!status) {
      navigate('/')
    }
  }, [])

  return (
    <div className={styles.div_main}>
      <div className={styles.div_navbar}>
        <NavbarComponent />
      </div>
      <div>
        <FinancialSummary />
      </div>
    </div>
  )
}

export default Dashboard
