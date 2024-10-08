import React from 'react'
import { NavbarComponent } from '../../../components/Navbar'
import styles from './styles.module.scss'
import { ExpensesCategoryList } from '../../../components/ExpensesComponents/ExpensesCategories'

const ExpensesCategoryDashboard = () => {
  return (
    <div className={styles.div_main}>
      <div className={styles.div_navbar}>
        <NavbarComponent />
      </div>
      <div className={styles.div_table}>
        <div className={styles.div_tableComponent}>
          <ExpensesCategoryList />
        </div>
      </div>
    </div>
  )
}

export default ExpensesCategoryDashboard
