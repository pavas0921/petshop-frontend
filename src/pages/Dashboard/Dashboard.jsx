import React, { useEffect } from 'react'
import { NavbarComponent } from '../../components/Navbar'
import styles from './dashboard.module.scss'
import { useNavigate } from 'react-router-dom'
import { verifyTokenExpiration } from '../../helpers/verifyToken'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardSales from '../../components/DashboardComponents/CardSales/CardSales'

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
        <CardSales />
      </div>
    </div>
  )
}

export default Dashboard
