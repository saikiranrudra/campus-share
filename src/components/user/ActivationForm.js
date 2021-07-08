import { useState, useEffect } from "react";
import { Paper, makeStyles, Typography, Button } from "@material-ui/core";

import Response from "./../utils/Response";
import campusShareAPI from "../../utils/Apis/campusShareAPI";
import FileDropZone from "../utils/FileDropZone";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "1rem 1.2rem",
  },
  heading: {
    fontWeight: "bold"
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
  const [adhaarCard, setAdhaarCard] = useState(null);
  const [collegeIdCard, setCollegeIdCard] = useState(null);
  const [
    userPhotoWithCollegeAndAdhaarCard,
    setUserPhotoWithCollegeAndAdhaarCard,
  ] = useState(null);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
    isLoading: false,
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(adhaarCard);
  }, [adhaarCard]);

  const handleRequestSubmition = () => {
    setNotification({
      ...notification,
      isLoading: true,
    });

    if (!adhaarCard || !collegeIdCard || !userPhotoWithCollegeAndAdhaarCard) {
      setNotification({
        type: "error",
        message: "3 documents are required",
        isLoading: false,
      });
      setOpen(true);
      return;
    }

    let formData = new FormData();

    formData.append("Image1", adhaarCard);
    formData.append("Image2", collegeIdCard);
    formData.append("Image3", userPhotoWithCollegeAndAdhaarCard);

    console.log(formData);

    campusShareAPI
      .post("/api/user/activationRequest", formData)
      .then((res) => {
        setNotification({
          type: "success",
          message: "Request Placed Successfully",
          isLoading: false,
        });
      })
      .catch((err) => {
        setNotification({
          type: "error",
          message: err?.response?.message
            ? err?.response?.message
            : err.message,
          isLoading: false,
        });
      })
      .finally(() => {
        setOpen(true);
      });
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

        <FileDropZone setAcceptedFile={setAdhaarCard} acceptedFile={adhaarCard}>
          <span>Drop or click to upload your Adhaar Card</span>
        </FileDropZone>
        <FileDropZone
          setAcceptedFile={setCollegeIdCard}
          acceptedFile={collegeIdCard}
        >
          <span>Drop or click to upload your College Id Card</span>
        </FileDropZone>
        <FileDropZone
          setAcceptedFile={setUserPhotoWithCollegeAndAdhaarCard}
          acceptedFile={userPhotoWithCollegeAndAdhaarCard}
        >
          <span>
            Drop or click to upload your Your Photo holding Adhaar Card and
            College Id
          </span>
        </FileDropZone>
        <br />

        <Button
          variant="contained"
          color="primary"
          style={{ width: "100%" }}
          onClick={handleRequestSubmition}
          disabled={notification.isLoading}
          style={{ zIndex: "1" }}
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
