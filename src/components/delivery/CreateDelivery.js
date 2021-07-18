import { useCallback, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  FormControl,
  makeStyles,
  Button,
  Typography,
} from "@material-ui/core";
import AsyncSelect from "react-select/async";
import FileDropZone from "../utils/FileDropZone";
import { Formik } from "formik";
import validationSchema, {
  initialValues,
} from "./../../validations/delivery/createDelivery";
import campusShareAPI from "./../../utils/Apis/campusShareAPI";
import Response from "../utils/Response";
import { uploadFile } from "../utils/uploadFile";
import Logger from "../../utils/Logger";

const useStyles = makeStyles({
  inputEle: {
    margin: ".4rem 0",
  },
});

const CreateDelivery = ({ open, setOpen, user }) => {
  const classes = useStyles();
  const [fromProductSnap, setFromProductSnap] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  const [response, setResponse] = useState({
    type: "success",
    message: "success message",
    isLoading: false,
  });

  const loadUsers = useCallback(async (inputValue = "") => {
    const res = await campusShareAPI.get("/api/user", { email: inputValue });
    const data = res.data.data.map((user) => ({
      label: user.email,
      value: user._id,
    }));
    return data;
  }, []);

  const handleSelect = (currentSelected, handleChange) => {
    if (currentSelected && currentSelected.value) {
      handleChange("reciverId")(currentSelected.value);
      return;
    }
    handleChange("reciverId")("");
  };

  const handleFormSubmit = async (values) => {
    try {
      setResponse({ ...response, isLoading: true });
      if (!fromProductSnap) {
        throw new Error("Please upload product Snap");
      }

      const fromProductSnapLink = await uploadFile(
        fromProductSnap,
        process.env.CLOUDINARY_UPLOAD_PRESET,
        process.env.CLOUDINARY_CLOUD_NAME
      );

      const deliveryObject = {
        title: values.title,
        description: values.description,
        pickupLocation: {
          coordinates: [values.pickupLongitude, values.pickupLatitude],
        },
        pickupAddress: values.pickupAddress,
        dipartureLocation: {
          coordinates: [
            values.destinationLongitude,
            values.destinationLatitude,
          ],
        },
        dipartureAddress: values.destinationAddress,
        reciver: values.reciverId,
        owner: user._id,
        fromProductSnap: fromProductSnapLink.data.secure_url,
      };

      // create delivery api and upload the image
      await campusShareAPI.post("/api/delivery", deliveryObject);

      setResponse({
        type: "success",
        message: "Delivery Created Successfully",
        isLoading: false,
      });
      setShowResponse(true);
    } catch (err) {
      Logger.error(err);
      setResponse({
        type: "error",
        message: err.response ? err.response.message : err.message,
        isLoading: false,
      });
      setShowResponse(true);
    }
  };

  return (
    <>
      <Dialog open={open}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            handleSubmit,
          }) => (
            <>
              <DialogTitle>Create Delivery</DialogTitle>
              <DialogContent>
                <FormControl>
                  <TextField
                    placeholder="Title"
                    type="text"
                    name="title"
                    variant="outlined"
                    values={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!(errors.title && touched.title)}
                    helperText={
                      !!(errors.title && touched.title) ? errors.title : ""
                    }
                    className={classes.inputEle}
                  />
                  <TextField
                    placeholder="Description"
                    type="text"
                    name="description"
                    multiline
                    variant="outlined"
                    values={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!(errors.description && touched.description)}
                    helperText={
                      !!(errors.description && touched.description)
                        ? errors.description
                        : ""
                    }
                    className={classes.inputEle}
                  />
                  <Typography variant="h6">Destination</Typography>
                  <TextField
                    placeholder="Destination latitude"
                    type="number"
                    name="destinationLatitude"
                    variant="outlined"
                    values={values.destinationLatitude}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      !!(
                        errors.destinationLatitude &&
                        touched.destinationLatitude
                      )
                    }
                    helperText={
                      !!(
                        errors.destinationLatitude &&
                        touched.destinationLatitude
                      )
                        ? errors.destinationLatitude
                        : ""
                    }
                    className={classes.inputEle}
                  />
                  <TextField
                    placeholder="Destination longitude"
                    type="number"
                    name="destinationLongitude"
                    variant="outlined"
                    values={values.destinationLongitude}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      !!(
                        errors.destinationLongitude &&
                        touched.destinationLongitude
                      )
                    }
                    helperText={
                      !!(
                        errors.destinationLongitude &&
                        touched.destinationLongitude
                      )
                        ? errors.destinationLongitude
                        : ""
                    }
                    className={classes.inputEle}
                  />
                  <TextField
                    placeholder="Destination Address"
                    type="text"
                    name="destinationAddress"
                    variant="outlined"
                    values={values.destinationAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      !!(
                        errors.destinationAddress && touched.destinationAddress
                      )
                    }
                    helperText={
                      !!(
                        errors.destinationAddress && touched.destinationAddress
                      )
                        ? errors.destinationAddress
                        : ""
                    }
                    className={classes.inputEle}
                  />
                  <Typography variant="h6">Pickup</Typography>
                  <TextField
                    placeholder="pickup latitude"
                    type="number"
                    name="pickupLatitude"
                    variant="outlined"
                    values={values.pickupLatitude}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!(errors.pickupLatitude && touched.pickupLatitude)}
                    helperText={
                      !!(errors.pickupLatitude && touched.pickupLatitude)
                        ? errors.pickupLatitude
                        : ""
                    }
                    className={classes.inputEle}
                  />
                  <TextField
                    placeholder="pickup longitude"
                    type="number"
                    name="pickupLongitude"
                    variant="outlined"
                    values={values.pickupLongitude}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      !!(errors.pickupLongitude && touched.pickupLongitude)
                    }
                    helperText={
                      !!(errors.pickupLongitude && touched.pickupLongitude)
                        ? errors.pickupLongitude
                        : ""
                    }
                    className={classes.inputEle}
                  />
                  <TextField
                    placeholder="pickup Address"
                    type="text"
                    name="pickupAddress"
                    variant="outlined"
                    values={values.pickupAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!(errors.pickupAddress && touched.pickupAddress)}
                    helperText={
                      !!(errors.pickupAddress && touched.pickupAddress)
                        ? errors.pickupAddress
                        : ""
                    }
                    className={classes.inputEle}
                  />
                  <div className={classes.inputEle} style={{ color: "#000" }}>
                    <AsyncSelect
                      cacheOptions
                      instanceId="reciverId"
                      defaultOptions={false}
                      placeholder="Enter Reciver Email"
                      isClearable
                      onChange={(val) => {
                        handleSelect(val, handleChange);
                      }}
                      loadOptions={loadUsers}
                    />
                  </div>

                  {!!(errors.reciverId && touched.reciverId) ? (
                    <Typography style={{ color: "red" }} variant="caption">
                      {errors.reciverId}
                    </Typography>
                  ) : null}

                  <FileDropZone
                    maxFiles={1}
                    acceptedFile={fromProductSnap}
                    setAcceptedFile={setFromProductSnap}
                  >
                    <span>Drop or click to upload your Item Picture</span>
                  </FileDropZone>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button
                  color="primary"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={response.isLoading}
                >
                  {response.isLoading ? "Please Wait.." : "Create Delivery"}
                </Button>
              </DialogActions>
            </>
          )}
        </Formik>
      </Dialog>
      <Response
        open={showResponse}
        setOpen={setShowResponse}
        response={response}
      />
    </>
  );
};

export default CreateDelivery;
