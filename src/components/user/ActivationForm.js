import { useCallback, useState } from "react";
import { Paper, makeStyles, Typography, Button } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import Response from "./../utils/Response";
import campusShareAPI from "../../utils/Apis/campusShareAPI";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "1rem 1.2rem",
  },
  heading: {
    color: "#000",
  },
  subHeading: {
    color: theme.palette.grey.A200,
  },
  textColor: {
    color: theme.palette.grey[500],
    // fontWeight: "bold"
  },
  dropContainer: {
    backgroundColor: theme.palette.grey[200],
    padding: ".6rem .8rem",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "1rem",
    transition: "background-color .2s",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      "& > p, ul": {
        color: "#fff",
      },
    },
  },
  acceptedList: {
    color: theme.palette.grey[600],
  },
}));

const ActivationForm = () => {
  const classes = useStyles();
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
    isLoading: false,
  });
  const [open, setOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setAcceptedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 3,
    accept: "image/png",
    maxSize: 16000000,
  });

  const handleRequestSubmition = () => {
    setNotification({
      ...notification,
      isLoading: true,
    });

    if(acceptedFiles.length !== 3) {
      setNotification({
        type: "error",
        message: "3 documents are required",
        isLoading: false,
      })
      setOpen(true);
      return;
    }

    let formData = new FormData();

    acceptedFiles.forEach((file, index) => {
      formData.append(index + "", file);
    })

    campusShareAPI.post("/api/user/activationRequest", formData)
      .then(res => {
        setNotification({
          type: "success",
          message: "Request Placed Successfully",
          isLoading: false
        })
      }).catch((err) => {
        setNotification({
          type: "error",
          message: err?.response?.message ? err?.response?.message : err.message,
          isLoading: false  
        })
      }).finally(() => {
        setOpen(true);
      })
    
  };

  return (
    <>
      <Paper className={classes.container}>
        <Typography variant="h4" className={classes.heading}>
          Activation Request Form
        </Typography>
        <Typography varaint="caption" className={classes.subHeading}>
          Please upload the files to request account activation
        </Typography>
        <div
          className={`${classes.textColor} ${classes.dropContainer}`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className={classes.textColor}>Drop file here</p>
          ) : (
            <>
              <p className={classes.textColor}>
                Drag 'n' drop files here, or click to select files below files
                required
              </p>
              <ul className={classes.textColor}>
                <li>Adhaar Card</li>
                <li>College Id Card</li>
                <li>Your Photo holding both</li>
              </ul>
            </>
          )}
        </div>

        <br />
        <Typography variant="h6" className={classes.heading}>
          Selected Files
        </Typography>
        <ul className={classes.acceptedList}>
          {acceptedFiles.length === 0 && <li>No Files selected</li>}
          {acceptedFiles.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>

        <Button
          variant="contained"
          color="primary"
          style={{ width: "100%" }}
          onClick={handleRequestSubmition}
          disabled={notification.isLoading}
        >
          {notification.isLoading
            ? "Please wait..."
            : "Send Activation Request"}
        </Button>
      </Paper>
      <Response open={open} setOpen={setOpen} response={notification} />
    </>
  );
};

export default ActivationForm;
