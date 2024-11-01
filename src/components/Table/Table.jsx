import { Box, IconButton, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect } from 'react'
import styles from './table.module.scss'
import { Loader } from '../LoaderComponent'

const Table = ({
  columns,
  rows,
  loading,
  rowHeigth,
  columnHeaderHeight,
  title,
  rowsPerPage,
}) => {
  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_title}>
        <Typography variant="h4" color="initial">
          <p>{title}</p>
        </Typography>
      </Box>
      {rows && rows.length > 0 ? (
        <Box className={styles.box_table}>
          <DataGrid
            sx={{
              width: '100%',
              backgroundColor: 'white',
              '& .super-app-theme--header': {
                backgroundColor: 'rgba(255, 7, 0, 0.55)',
                whiteSpace: 'normal', // Esto permite que el texto se desplace hacia abajo si es necesario
                lineHeight: 'normal', // Esto también puede ayudar con el desplazamiento del texto
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#000000', // Cambia el color a lo que prefieras
                color: 'white',
                fontSize: "1rem",           // Tamaño de fuente 
                fontWeight: "bold",           // Peso de la fuente
              },
              '& .MuiDataGrid-row:nth-of-type(odd)': {
                backgroundColor: '#f5f5f5', // Color para las filas impares
              },
              
            }}
            rows={rows}
            columns={columns}
            getRowId={(row) => row._id}
            rowHeight={rowHeigth}
            columnHeaderHeight={columnHeaderHeight}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 15]}
          />
        </Box>
      ) : (
        <Box>
          <Typography variant="h6" color="initial">
            No se encontraron datos
          </Typography>
        </Box>
      )}
      {loading && <Loader />}
    </Box>
  )
}

export default Table
