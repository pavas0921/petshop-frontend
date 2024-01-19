import React, {useEffect} from 'react'
import styles from "./success.module.scss"
import Logo from "./logo.jpg"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectSurveyState, clearAll } from '../../../features/survey/surveySlice'


const SurveyCode = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const surveyResponse = useSelector(selectSurveyState)
  const {surveys} = surveyResponse
  let path = "";

  useEffect(() => {
    if(surveys && surveys._id){
      path =  `https://wa.me/573002582336?text=Hola Muezza, mi código de descuento es: ${surveys._id}` 
      console.log(path)
    }else{
      dispatch(clearAll());
      navigate("/survey")
    }
  }, [surveys])

  const handleClick = () =>{
    if(surveys && surveys._id){
      window.location.href = path;
    }else{
      navigate("/survey")
    }
}
  
  
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

          <button onClick={handleClick}>¡Quiero mi descuento!</button>
        </div>        
      </div>
      
    </div>
  )
}


export default SurveyCode