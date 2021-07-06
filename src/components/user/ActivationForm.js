import { useCallback, useState } from "react";
import { Paper, makeStyles, Typography, Button } from "@material-ui/core";
import { useDropzone } from "react-dropzone";

const useStyles = makeStyles((theme) => ({
  container: {
    // position: "absolute",
    // left: "50%",
    // top: "50%",
    // transform: "translate(calc(-50% + 38px), -50%)",
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
      }
    }
  },
  acceptedList: {
    color: theme.palette.grey[600]
  }
}));

const ActivationForm = () => {
  const classes = useStyles();
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setAcceptedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 3, accept: 'image/jpeg, image/png' });

  return (
    <Paper className={classes.container}>
      <Typography variant="h4" className={classes.heading}>
        Activation Request Form
      </Typography>
      <Typography varaint="caption" className={classes.subHeading}>
        Please upload the files to request account activation
      </Typography>
      <div className={`${classes.textColor} ${classes.dropContainer}`} {...getRootProps()}>
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
      <Typography variant="h6" className={classes.heading}>Selected Files</Typography>
      <ul className={classes.acceptedList}>
          {acceptedFiles.length === 0 && <li>No Files selected</li>}
          {acceptedFiles.map(file => <li key={file.name}>{file.name}</li>)}
      </ul>

      <Button variant="contained" color="primary" style={{ width: "100%" }}>Send Activation Request</Button>
    </Paper>
  );
};

export default ActivationForm;
