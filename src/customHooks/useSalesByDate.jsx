import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectVentasState,
  getVentasByDateRange,
} from "../features/venta/ventaSlice";

const useSalesByDate = () => {
  const dispatch = useDispatch();
  const ventasResponse = useSelector(selectVentasState);

  useEffect(() => {
    dispatch(
      getVentasByDateRange({
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        idCompany: "65f5ee60ce0ee41a81558837",
      })
    );
  }, [dispatch]);

  return ventasResponse;
};

export default useSalesByDate;
