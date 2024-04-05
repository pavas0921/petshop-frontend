import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AddComponent } from "../../AddComponent";
import { ModalComponent } from "../../ModalComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEspecieState,
  getEspeciesByCompany,
} from "../../../features/especie/especieSlice";
import { verifyTokenExpiration } from "../../../helpers/verifyToken";
import { Table } from "../../Table";
import styles from "./styles.module.scss";
import SpeciesForm from "../SpeciesForm/SpeciesForm";

const SpeciesTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const speciesResponse = useSelector(selectEspecieState);
  const { especies, especiesLoading } = speciesResponse;
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const columns = [
    { field: "name", headerName: "Nombre Categoría", width: 300 },

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
    const tokenData = verifyTokenExpiration();
    const { status, companyId } = tokenData;
    if (status) {
      if (especies.length === 0) {
        dispatch(getEspeciesByCompany(companyId));
      }
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_table}>
        <Table
          columns={columns}
          rows={especies}
          loading={especiesLoading}
          rowHeigth={56}
          columnHeaderHeight={56}
          title={"Listado de Especies"}
        />
      </Box>

      <Box className={styles.addButton}>
        <AddComponent openModal={openModal} setOpenModal={setOpenModal} />
      </Box>

      {openModal && (
        <ModalComponent
          open={openModal}
          handleOpen={handleOpen}
          handleClose={handleClose}
        >
          <SpeciesForm/>
        </ModalComponent>
      )}

    </Box>
  );
};

export default SpeciesTable;
