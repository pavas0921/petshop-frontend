import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCategoryState,
  getAllCategoryById,
} from '../../../features/categoria/categoriaSlice'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { verifyTokenExpiration } from '../../../helpers/verifyToken'
import styles from './styles/selectStyle.module.scss'

const SelectCategories = ({ selectedCategory, setSelectedCategory }) => {
  const isValidToken = verifyTokenExpiration()
  const { status, companyId, rolId, userId } = isValidToken
  const categoryResponse = useSelector(selectCategoryState)
  const dispatch = useDispatch()
  const { categories } = categoryResponse

  useEffect(() => {
    if (status) {
      dispatch(getAllCategoryById(companyId))
    }
  }, [])

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  return (
    <FormControl className={styles.box_main}>
      <InputLabel id="idCategoria" sx={{ marginTop: '-7px' }}>
        Filtrar por Categoría
      </InputLabel>
      {categories && categories.length > 0 && (
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          size="small"
          label="Buscar por Categoría"
          sx={{ width: '100%', height: 'auto' }}
          id="idCategoria"
        >
          <MenuItem value="">Todas las Categorías</MenuItem>
          {categories.map((item, index) => (
            <MenuItem key={index} value={item._id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  )
}

export default SelectCategories
