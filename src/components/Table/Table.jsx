import { Box, IconButton, Typography  } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import styles from "./table.module.scss";
import {Loader} from "../Loader/"

const Table = (props) => {
    const {columns, rows, loading, rowHeigth, columnHeaderHeight} = props

    return (
        <Box className={styles.box_main}>
            {loading && (
                <Loader/>
            )}

            
            <Box className={styles.box_table}>                   
                    <DataGrid
                        sx={{ backgroundColor: "white",  '& .super-app-theme--header': {
                            backgroundColor: 'rgba(255, 7, 0, 0.55)',
                            whiteSpace: 'normal', // Esto permite que el texto se desplace hacia abajo si es necesario
                            lineHeight: 'normal', // Esto también puede ayudar con el desplazamiento del texto
                          },}}
                        rows={rows}
                        columns={columns}
                        getRowId={(users) => users._id}
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
        </Box>
    )
}

export default Table
