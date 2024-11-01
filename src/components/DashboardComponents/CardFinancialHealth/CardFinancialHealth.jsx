import React from 'react'
import { 
    Box, 
    Card, 
    CardContent, 
    Typography, 
  } from '@mui/material';

const CardFinancialHealth = ({title, icon, value, change}) => {
  return (
    <Card>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          {icon}
        </Box>
        <Typography variant="h4" component="div">
          $ {value}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {change}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardFinancialHealth
