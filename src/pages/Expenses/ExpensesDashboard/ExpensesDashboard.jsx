import React from 'react'
import { NavbarComponent } from '../../../components/Navbar'
import styles from "../../../styles/global.module.scss"
import { ExpensesList } from '../../../components/ExpensesComponents/ExpensesTable'

const ExpensesDashboard = () => {
  return (
    <div className={styles.box_main}>
      <div className={styles.div_navbar}>
        <NavbarComponent/>
      </div>
      <div>
        <ExpensesList/>
      </div>
    </div>
  )
}

export default ExpensesDashboard
