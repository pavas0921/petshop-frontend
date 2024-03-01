import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {selectCompnayState, getAllCompanies} from "../../../features/company/companySlice"
import styles from "./styles.module.scss";
import { Table } from "../../Table";
import { AddComponent } from "../../AddComponent";
import { ModalComponent } from "../../ModalComponent";
import { CustomerForm } from "../../CustomerComponents/CustomerForm";
import { CompanyForm } from "../CompanyForm";

function CompanyTable() {
  const dispatch = useDispatch();
  const companyResponse = useSelector(selectCompnayState);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => {
    setOpenModal(true);
  }
  const handleClose = () => {
    setOpenModal(false);
  }
  const {companies, companyLoading} = companyResponse;

  const columns = [
    { field: "company", headerName: "Nombre Empresa", width: 150 },
    {
      field: "nit",
      headerName: "Nit",
      width: 100,
    },
    {
      field: "city",
      headerName: "Ciudad",
      width: 100,
    },
    {
      field: "responsibleName",
      headerName: "Nombre del Responsable",
      width: 200,
    },
    {
      field: "responsibleId",
      headerName: "Cédula",
      type: "number",
      width: 120,
    },
    {
      field: "responsiblePhone",
      headerName: "Teléfono",
      width: 120,
    },
    {
      field: "responsibleEmail",
      headerName: "Email",
      width: 200,
    },
    {
      field: "address",
      headerName: "Dirección",
      width: 180,
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 80,
      renderCell: (params) => (
        <Box>
          <IconButton>
            <VisibilityIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

 

  
  useEffect(() => {
    dispatch(getAllCompanies());
  }, [])

  useEffect(() => {
   console.log(companyResponse);
  }, [companyResponse])
  
  
  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_table}>
        <Table
          columns={columns}
          rows={companies}
          loading={companyLoading}
          rowHeigth={56}
          columnHeaderHeight={56}
          title={"Listado de Compañías"}
        />
      </Box>

      <Box className={styles.addButton}>
         <AddComponent openModal={openModal} setOpenModal={setOpenModal}/>
      </Box>

      {openModal && (
        <ModalComponent
        open={openModal}
        handleOpen={handleOpen}
        handleClose={handleClose}
        >
          <CompanyForm/>
        </ModalComponent>
      )}
    </Box>
  );
}

export default CompanyTable