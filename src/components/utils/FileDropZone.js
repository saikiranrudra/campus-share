import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
      backgroundColor: theme.palette.grey.A100,
    },
  },
}));

const FileDropZone = ({ setAcceptedFile, children, acceptedFile }) => {
  const classes = useStyles();
  const theme = useTheme();
  const onDrop = useCallback((acceptedFile) => {
    setAcceptedFile(acceptedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: "image/png",
    maxSize: 16000000,
  });

  return (
    <>
      <div
        className={`${classes.textColor} ${classes.dropContainer}`}
        {...getRootProps()}
        style={{
          backgroundColor: acceptedFile ? theme.palette.primary.main : null,
          color: acceptedFile ? "#fff" : null,
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className={classes.textColor}>Drop file here</p>
        ) : (
          <>
            <span>{acceptedFile ? "✔ " : "⭕ "}</span>
            {children}
          </>
        )}
      </div>
    </>
  );
};

export default FileDropZone;
