import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

/**
 * Response Component
 * @param {open, setOpen, response = { type, message } } props
 * @returns 
 */
const Response = ({ open, setOpen, response }) => {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={response.type}>
        {response.message}
      </Alert>
    </Snackbar>
  );
};

export default Response
