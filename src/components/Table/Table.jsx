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
