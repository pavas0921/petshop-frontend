import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVentas,
  selectVentasState,
} from "../../../features/venta/ventaSlice";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const VentaList = () => {
  const dispatch = useDispatch();
  const ventasResponse = useSelector(selectVentasState);
  const { ventas } = ventasResponse;
  const { detalleVenta } = ventas;

  useEffect(() => {
    dispatch(getVentas());
  }, []);

  useEffect(() => {
    console.log("ventasResponse: ", detalleVenta);
  }, [detalleVenta]);

  const columns = [
    {
      field: "idVenta",
      headerName: "# Venta",
      width: 300,
      editable: false,
    },
    {
      field: "cliente",
      headerName: "Cliente",
      width: 300,
      editable: false,
    },

    {
      field: "totalVenta",
      headerName: "Total Venta",
      width: 100,
      editable: false,
    },

    {
      renderCell: (params) => (
        <Box>
          <IconButton>
            <VisibilityIcon />
          </IconButton>
        </Box>
      ),
    },
  ];
  return (
    <Box>
      {detalleVenta && detalleVenta.length > 0 && (
        <DataGrid
          rows={detalleVenta}
          columns={columns}
          getRowId={(detalleVenta) => detalleVenta.idVenta}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
};

export default VentaList;
