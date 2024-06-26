import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { store } from './app/store'
import styles from './index.module.scss'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider className={styles.div_root} store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
