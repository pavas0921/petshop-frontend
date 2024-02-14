import React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";

const AddComponent = (props) => {
  const { openModal, setOpenModal } = props;
  return (
    <Box sx={{ "& > :not(style)": { m: 1 }, backgroundColor: "red"}}>
      <Fab color="primary" aria-label="add">
        <AddIcon onClick={() => setOpenModal(true)} />
      </Fab>
    </Box>
  );
};

export default AddComponent;
