import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import ImageLogo from "./logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { registerSurvey, selectSurveyState } from "../../../features/survey/surveySlice";
import { Loader } from "../../LoaderComponent";
import { RedirectAfterDelay } from "../../../helpers/redirectAfter";


const SurveyForm = () => {
  const [body, setBody] = useState({
    fullName: "",
    phone: "",
    address: "",
    petsQty: "",
    diases: "",
    food: "",
    nutritionalRequirements: "",
    vaccination: "",
  });

  const dispatch = useDispatch();
  const surveyResponse = useSelector(selectSurveyState);
  const {surveysLoading, httpStatus, message, status, flag } = surveyResponse


  useEffect(() => {
    console.log(surveyResponse)
  }, [surveyResponse])
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBody((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes hacer algo con los datos, como enviarlos a un servidor
    console.log("Datos del formulario:", body);
    dispatch(registerSurvey(body))
  };

  return (
    <div>
        {surveysLoading && (
            <Loader/>
        )}
      <header className={styles.header}>
        <h1>
          Muezza Pets - ¡Registra a tus Mascotas y Obtén un 20% de Descuento!
        </h1>
      </header>

      <div className={styles.content}>
        <div className={styles.div_logo}>
          <img
            src={ImageLogo}
            alt="Logo de Muezza Pets"
            className={styles.logo}
          />
        </div>
        <div className={styles.div_form}>
          <form onSubmit={handleSubmit}>
            <div className={styles.div_columns}>
              <div className={styles.div_inputs}>
                <label htmlFor="fullName">Nombres y Apellidos</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  onChange={handleInputChange}
                />

                <label htmlFor="phone">Teléfono</label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  required
                  onChange={handleInputChange}
                />

                <label htmlFor="address">Dirección de residencia</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  onChange={handleInputChange}
                />

                <label htmlFor="petsQty">
                  ¿Cuántas mascotas viven en su hogar?
                </label>
                <input
                  type="number"
                  id="petsQty"
                  name="petsQty"
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="diases">
                  ¿Tienen o han tenido alguna enfermedad?
                </label>
                <input
                  type="text"
                  id="diases"
                  name="diases"
                  required
                  onChange={handleInputChange}
                />

                <label htmlFor="food">¿Qué alimento consumen?</label>
                <input
                  type="text"
                  id="food"
                  name="food"
                  required
                  onChange={handleInputChange}
                />

                <label htmlFor="nutritionalRequirements">
                  ¿Conoce los requerimientos nutricionales de su mascota?
                </label>
                <input
                  type="text"
                  id="nutritionalRequirements"
                  name="nutritionalRequirements"
                  required
                  onChange={handleInputChange}
                />

                <label htmlFor="vaccination">
                  ¿Tienen vacunación y desparasitación al día?
                </label>
                <select
                  id="vaccination"
                  name="vaccination"
                  required
                  onChange={handleInputChange}
                >
                    <option value="">Selecciona una opción</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <button type="submit">
              Enviar formulario y Obtener un 20% de Descuento
            </button>
          </form>
        </div>
      </div>
      {flag && (
				<div>
					<RedirectAfterDelay path='/survey-success' delay={3} />
				</div>
			)}
    </div>
  );
};

export default SurveyForm;
