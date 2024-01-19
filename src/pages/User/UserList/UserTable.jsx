import React from 'react'
import { Box } from "@mui/material";
import { UserList } from '../../../components/User/UserList'
import { NavbarComponent } from '../../../components/Navbar';
import styles from "./styles.module.scss";

const UserTable = () => {
    return (
        <Box className={styles.box_main}>
          <Box className={styles.box_navbar}>
            <NavbarComponent />
          </Box>
          <Box className={styles.box_content}>
            <UserList/>
          </Box>
        </Box>
      );
}

export default UserTable