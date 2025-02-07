import React from 'react'
import { CalendarPicker } from '../components/DateComponents/CalendarPicker'
import { ExpensesForm } from '../components/ExpensesComponents/ExpensesForm'

const salesComponents = {
  searchByDates: (props) => <CalendarPicker {...props} />,
}

const expensesComponents = {
  searchByDates: (props) => <CalendarPicker {...props} />,
  addExpense: (props) => <ExpensesForm {...props} />,
}

const componentsMap = (group, key, props = {}) => {
  const groups = {
    sales: salesComponents,
    expenses: expensesComponents,
  }

  const selectedGroup = groups[group]

  return selectedGroup[key](props)
}
