import React, { useEffect } from "react";
import { NavbarComponent } from "../../components/Navbar";
import styles from "./dashboard.module.scss";
import { useNavigate } from "react-router-dom";
import { verifyTokenExpiration } from "../../helpers/verifyToken";

const Dashboard = () => {
  const navigate = useNavigate();
  const isValidToken = verifyTokenExpiration();
  const { status, companyId, rolId, userId } = isValidToken;

  useEffect(() => {
    if (!status) {
      navigate("/");
    }
  }, []);

  return (
    <div className={styles.div_main}>
      <div className={styles.div_navbar}>
        <NavbarComponent />
      </div>
      <div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
          eius inventore quia sit eaque totam odit dolorum, veritatis placeat
          explicabo quasi ipsum nemo eveniet consequuntur adipisci atque debitis
          alias laborum?
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
