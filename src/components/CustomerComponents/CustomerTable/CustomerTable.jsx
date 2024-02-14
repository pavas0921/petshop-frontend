import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Box, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  selectCustomerState,
  getCustomersByCompany,
} from "../../../features/customer/customerSlice";
import { useDispatch, useSelector } from "react-redux";
import { verifyTokenExpiration } from "../../../helpers/verifyToken";
import { useNavigate } from "react-router-dom";
import Table from "../../Table/Table";
import { AddComponent } from "../../AddComponent";
import { ModalComponent } from "../../ModalComponent";
import { CustomerForm } from "../CustomerForm";
import ToastAlert from "../../Alerts/ToastAlert";

function CustomerTable() {
  const tokenData = verifyTokenExpiration();
  const { status, companyId, rolId, userId } = tokenData;
  const dispatch = useDispatch();
  const customerResponse = useSelector(selectCustomerState);
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState(null)
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
    setItem(null);
  }
  const {
    customers,
    customerStatus,
    customerHttpStatus,
    customerLoading,
    customerFlag,
    customerMessage,
  } = customerResponse;
  const navigate = useNavigate();
  const columns = [
    { field: "cedula", headerName: "Cédula", width: 120 },
    {
      field: "firstName",
      headerName: "Nombres",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Apellidos",
      width: 150,
    },
    {
      field: "phone",
      headerName: "Teléfono",
      type: "number",
      width: 150,
    },
    {
      field: "address",
      headerName: "Dirección",
      width: 160,
    },
    {
      field: "comments",
      headerName: "Comentarios",
      width: 160,
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 80,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={(event) => handleClick(event, params.row)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleClick = (event, item) => {
    console.log("item", item)
    event.stopPropagation(); // Evita que el clic llegue al contenedor padre
    setOpenModal(true);
    setItem(item);
  };

  useEffect(() => {
    if (status) {
      dispatch(getCustomersByCompany(companyId));
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_table}>
        <Table
          columns={columns}
          rows={customers}
          loading={customerLoading}
          rowHeigth={56}
          columnHeaderHeight={56}
          title={"Listado de Clientes"}
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
          flag={customerFlag}
        >
          <CustomerForm item={item} />
        </ModalComponent>
      )}

      {!customerLoading &&
        customerFlag &&
        (customerHttpStatus === 201 || customerHttpStatus === 200 )&&
        customerStatus === "success" && (
          <ToastAlert message={customerMessage} status={customerStatus} />
        )}
    </Box>
  );
}

export default CustomerTable;
