import styles from './App.module.scss'
import { CustomRouterProvider } from './router'

function App() {
  return (
    <div className={styles.div_main}>
      <CustomRouterProvider />
    </div>
  )
}

export default App
