import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { verifyTokenExpiration } from "../../../helpers/verifyToken";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCustomerState,
  createCustomer,
  updateCustomerById,
  clearAlert,
} from "../../../features/customer/customerSlice";

const CustomerForm = ({ item }) => {
  const isValidToken = verifyTokenExpiration();
  const { status, companyId, rolId, userId } = isValidToken;
  const dispatch = useDispatch();
  const customerResponse = useSelector(selectCustomerState);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({});

  const onSubmit = (body) => {
    if (status) {
      if (item) {
        dispatch(updateCustomerById({ body: body, _id: item._id }));
      } else {
        body.idCompany = companyId;
        dispatch(createCustomer(body));
      }
    }
  };

  useEffect(() => {
    if (item) {
      setValue("cedula", item.cedula);
      setValue("firstName", item.firstName);
      setValue("lastName", item.lastName);
      setValue("phone", item.phone);
      setValue("address", item.address);
      setValue("comments", item.comments);
    }
  }, [item]);

  return (
    <Box className={styles.box_main}>
      <Box>
        <Typography variant="h5" color="initial">
          Registro de Clientes
        </Typography>
      </Box>
      <Box className={styles.box_form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("cedula")}
            name="cedula"
            size="small"
            label="Número de Identificación"
            className={styles.textField}
          />
          <TextField
            {...register("firstName")}
            name="firstName"
            size="small"
            label="Nombres"
            className={styles.textField}
          />
          <TextField
            {...register("lastName")}
            name="lastName"
            size="small"
            label="Apellidos"
            className={styles.textField}
          />
          <TextField
            {...register("phone")}
            name="phone"
            size="small"
            label="Teléfono"
            className={styles.textField}
          />
          <TextField
            {...register("address")}
            name="address"
            size="small"
            label="Dirección"
            className={styles.textField}
          />
          <TextField
            {...register("comments")}
            name="comments"
            size="small"
            label="Commentarios"
            className={styles.textField}
          />
          <Button type="submit" variant="contained">
            {item ? "Actualizar" : "Registrar"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CustomerForm;
