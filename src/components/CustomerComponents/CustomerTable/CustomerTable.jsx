import React, {useEffect} from 'react'
import styles from "./styles.module.scss"
import { Box } from '@mui/material'
import { selectCustomerState, getCustomersByCompany} from '../../../features/customer/customerSlice'
import { useDispatch, useSelector } from 'react-redux'
import { verifyTokenExpiration } from '../../../helpers/verifyToken'
import { useNavigate } from 'react-router-dom'

function CustomerTable() {
  const tokenData = verifyTokenExpiration();
  const { status, companyId, rolId, userId } = tokenData;
  const dispatch = useDispatch();
  const customerResponse = useSelector(selectCustomerState)
  const navigate = useNavigate()

  useEffect(() => {
    if(status){
      dispatch(getCustomersByCompany(companyId))
    }else{
      navigate("/")
    }
    
  }, [])
  
  return (
    <Box className={styles.box_main}>
        

    </Box>
  )
}

export default CustomerTable