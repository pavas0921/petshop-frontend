import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategoryState,
  getAllCategoryById,
} from "../../../features/categoria/categoriaSlice";
import { verifyTokenExpiration } from "../../../helpers/verifyToken";
import { useNavigate } from "react-router-dom";
import { Table } from "../../Table";
import { AddComponent } from "../../AddComponent";
import { ModalComponent } from "../../ModalComponent";
import ToastAlert from "../../Alerts";
import styles from "./styles.module.scss";
import CategoryForm from "../CategoriesForm/CategoryForm";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoriesResponse = useSelector(selectCategoryState);
  const { categories, categoryLoading, httpStatus, message, categoryFlag } =
    categoriesResponse;
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    const tokenData = verifyTokenExpiration();
    const { status, companyId, rolId, userId } = tokenData;

    if (status) {
      if (categories.length === 0) {
        dispatch(getAllCategoryById(companyId));
      }
    } else {
      navigate("/");
    }
  }, []);

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

  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_table}>
        <Table
          columns={columns}
          rows={categories}
          loading={categoryLoading}
          rowHeigth={56}
          columnHeaderHeight={56}
          title={"Listado de Categorías"}
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
          <CategoryForm handleClose={handleClose} />
        </ModalComponent>
      )}

{httpStatus === 201 && message &&  (
        <ToastAlert message={message} status={"success"}/>
      )}
    </Box>
  );
};

export default CategoriesTable;
