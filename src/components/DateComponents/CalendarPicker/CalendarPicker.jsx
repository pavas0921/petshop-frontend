import React from "react";
import { Box } from "@mui/material";
import { DateRange } from "react-date-range";
import styles from "./styles.module.scss";

const CalendarPicker = ({ state, setState }) => {
  return (
    <Box className={styles.box_main}>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
    </Box>
  );
};

export default CalendarPicker;
