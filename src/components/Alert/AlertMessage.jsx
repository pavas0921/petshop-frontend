import React from "react";
import Alert from 'react-bootstrap/Alert';
import CloseButton from 'react-bootstrap/CloseButton';

const AlertMessage = (props) => {
  const { message, variant } = props;
  if (!message) return null;

  return (
    <div >
      <Alert variant={variant || "info"} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        {message}
        <CloseButton />
      </Alert>
    </div>
  )
}



export default AlertMessage;