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

const FileDropZone = ({
  setAcceptedFile,
  children,
  acceptedFile,
  maxFiles = 1,
  maxSize = 15000000,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const onDrop = useCallback((acceptedFile) => {
    if (maxFiles === 1) {
      setAcceptedFile(acceptedFile[0]);
      return;
    }
    setAcceptedFile(acceptedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    accept: "image/png",
    maxSize,
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
