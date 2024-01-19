import React from 'react'
import styles from "./success.module.scss"
import Logo from "./logo.jpg"

const SurveyCode = () => {
  return (
    <div className={styles.content}>
      <div className={styles.div_container}>
        <div className={styles.div_logo}>
          <img src={Logo} alt="" className={styles.logo} />
        </div>
        <div className={styles.div_title}>
          <h1>¡Gracias por ser parte de la familia Muezza Pets!</h1>
          <h5>Tu opinión es invaluable y nos ayuda a mejorar para ofrecerte la mejor experiencia posible para ti y tus adorables mascotas.</h5>
          <h5>Codigo de descuento: 65aa89b2b86cbf4cb528be42 </h5>

          <button>¡Quiero mi descuento!</button>
        </div>        
      </div>
      
    </div>
  )
}


export default SurveyCode