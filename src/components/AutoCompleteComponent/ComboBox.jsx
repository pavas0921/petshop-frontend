import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect } from "react";

const ComboBox = (props) => {
  const { options, register, name, errors, messages, label, optionLabel } = props;

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <Autocomplete
      {...register(`${name}`, { required: messages?.req })}
      size="small"
      disablePortal
      name={name}
      options={options}
      sx={{ width: "100%" }}
      getOptionLabel={(option) => option[optionLabel]}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      onChange={(event, newValue) => {
        sessionStorage.setItem("rolIdSelected", newValue._id);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={`${label}`}
          helperText={errors[name] && errors[name]?.message}
        />
      )}
    />
  );
};

export default ComboBox;
