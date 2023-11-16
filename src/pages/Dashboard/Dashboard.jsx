import React from "react";
import { Sidebar } from "../../components/Sidebar";
import styles from "./dashboard.module.scss";

const Dashboard = () => {
  return (
    <div className={styles.div_main}>
      <div className={styles.div_navbar}>
        <Sidebar />
      </div>
      <div>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate eius inventore quia sit eaque totam odit dolorum, veritatis placeat explicabo quasi ipsum nemo eveniet consequuntur adipisci atque debitis alias laborum?</p>
      </div>
    </div>
  )
};

export default Dashboard;
