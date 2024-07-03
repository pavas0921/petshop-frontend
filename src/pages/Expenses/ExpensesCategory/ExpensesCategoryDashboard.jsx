import React from 'react'
import { NavbarComponent } from '../../../components/Navbar'
import styles from './styles.module.scss'
import { ExpensesCategoryMain } from '../../../components/ExpensesComponents/ExpensesCategoryDashboard'

const ExpensesCategoryDashboard = () => {
  return (
    <div className={styles.div_main}>
      <div className={styles.div_navbar}>
        <NavbarComponent />
      </div>
      <div className={styles.div_table}>
        <div className={styles.div_tableComponent}>
          <ExpensesCategoryMain />
        </div>
      </div>
    </div>
  )
}

export default ExpensesCategoryDashboard
