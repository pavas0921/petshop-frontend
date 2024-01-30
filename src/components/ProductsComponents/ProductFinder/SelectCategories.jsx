import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCategoryState, getCategory } from '../../../features/categoria/categoriaSlice';

const SelectCategories = ({selectedCategory, setSelectedCategory}) => {
    const categoryResponse = useSelector(selectCategoryState)
    const dispatch = useDispatch()
    const {categories} = categoryResponse

    useEffect(() => {
      dispatch(getCategory())
    }, [])

    useEffect(() => {
      console.log(categoryResponse)
    }, [categoryResponse])
    
    

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
      };

  return (
    <div style={{width: "100%"}}>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Todas las categorías</option>
          {categories.map((item, key)=> (
            <option key={key} value={item._id}>{item.name}</option>
          ))}
          {/* Agrega más opciones según tus categorías */}
        </select>
    </div>
  )
}

export default SelectCategories