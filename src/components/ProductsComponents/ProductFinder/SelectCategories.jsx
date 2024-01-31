import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategoryState,
  getCategory,
} from "../../../features/categoria/categoriaSlice";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectCategories = ({ selectedCategory, setSelectedCategory }) => {
  const categoryResponse = useSelector(selectCategoryState);
  const dispatch = useDispatch();
  const { categories } = categoryResponse;

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <FormControl
      sx={{
        width: "30%",
        display: "flex",
        marginLeft: "10px"
      }}
    >
      <InputLabel id="idCategoria">Filtrar por Categoría</InputLabel>
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        size="small"
        label="Buscar por Categoría"
        sx={{ width: "100%", height: "auto" }}
        id="idCategoria"
      >
        {categories.map((item, index) => (
          <MenuItem key={index} value={item._id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectCategories;
