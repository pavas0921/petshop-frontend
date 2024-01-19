import React, { useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSurveyState,
  getAllSurvey,
} from "../../../features/survey/surveySlice";
import styles from "./styles.module.scss";
import { Table } from "../../Table";

const SurveyList = () => {
  const dispatch = useDispatch();
  const surveyResponse = useSelector(selectSurveyState);
  const { surveys } = surveyResponse;

  useEffect(() => {
    dispatch(getAllSurvey());
  }, []);

  const columns = [
    { field: "_id", headerName: "Código de Descuento", width: 210 },
    {
      field: "fullName",
      headerName: "Nombre Completo",
      width: 170,
      renderCell: (params) => (
        <Box style={{ whiteSpace: "pre-line" }}>{`${params.row.fullName}`}</Box>
      ),
    },
    {
      field: "phone",
      headerName: "Teléfono",
      width: 100,
      editable: true,
    },
    {
      field: "petsQty",
      headerName: "# de Mascotas",
      width: 100,
      editable: true,
    },
    {
      field: "diases",
      headerName: "Enfermedades",
      width: 160,
      editable: true,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <Box style={{ whiteSpace: "pre-line" }}>{`${params.row.diases}`}</Box>
      ),
    },
    {
      field: "food",
      headerName: "Alimento que consume",
      width: 160,
      renderCell: (params) => (
        <Box style={{ whiteSpace: "pre-line" }}>{`${params.row.food}`}</Box>
      ),
    },
    {
      field: "nutritionalRequirements",
      headerName: "Req. Nutricionales",
      width: 160,
      renderCell: (params) => (
        <Box
          style={{ whiteSpace: "pre-line" }}
        >{`${params.row.nutritionalRequirements}`}</Box>
      ),
    },
    {
      field: "redeemedDiscount",
      headerName: "Descuento Redimido",
      width: 90,
      renderCell: (params) => (
        <Box style={{ whiteSpace: "pre-line" }}>
          {params.row.nutritionalRequirements ? "Sí" : "No"}
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
              handleAdminDeSalud(`/admin-de-salud/${params.row._id}`)
            }
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];
  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_title}>
        <Typography className={styles.title} variant="h4" color="initial">
          Listado de Encuestas
        </Typography>
      </Box>
      <Box className={styles.box_table}>
        <Table
          columns={columns}
          rows={surveys}
          //loading={loading}
          //rowHeigth=''
          columnHeaderHeight={56}
        />
      </Box>
    </Box>
  );
};

export default SurveyList;
