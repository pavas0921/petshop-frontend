import React, {useEffect} from "react";
import styles from "./styles.module.scss";
import { Table } from "../../Table";
import { Box, Typography, IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, selectUserState } from "../../../features/user/userSlice";
import Loader from "../../LoaderComponent/Loader";

const UserList = () => {
  const dispatch = useDispatch();
  const userResponse = useSelector(selectUserState);
  const { users, userLoading } = userResponse;

  useEffect(() => {
   dispatch(getAllUsers());
  }, [])
  

  const columns = [
    {
      field: "id",
      headerName: "# Identificación",
      width: 120,
      headerClassName: styles.boldHeader,
    },
    {
      field: "fullName",
      headerName: "Nombre Completo",
      width: 250,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <Box >
          {`${params.row.name} ${params.row.lastname}`}
        </Box>
      ),
    },
    {
      field: "rol",
      headerName: "Rol",
      width: 300,
      renderCell: (params) => (
        <Box>{params.row.rolId.name}</Box>
      ),
    },

    {
      field: "company",
      headerName: "Compañía",
      width: 170,
      renderCell: (params) => (
        <Box >
          ${params.row.companyId.company}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() =>
              handleViewPatient(`/pacient-profile/${params.row._id}`)
            }
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleDeletePatient(params.row)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box className={styles.box_main}>
      <Box>
        <Typography variant="h5" color="initial">
          Listado de Usuarios
        </Typography>
      </Box>
      <Box className={styles.box_table}>
        <Table
          rows={users}
          columns={columns}
          columnHeaderHeight={56}
        />
      </Box>
      {userLoading && (
        <Loader/>
      )}
    </Box>
  );
};

export default UserList;
