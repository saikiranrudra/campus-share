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

const useStyles = makeStyles({
  inputEle: {
    margin: ".4rem 0",
  },
});

const CreateDelivery = ({ open, setOpen }) => {
  const classes = useStyles();
  const [fromProductSnap, setFromProductSnap] = useState(null);

  const loadUsers = useCallback(async (inputValue = "") => {
    const res = await campusShareAPI.get("/api/user", { email: inputValue });
    const data = res.data.data.map((user) => ({
      label: user.email,
      value: user._id,
    }));
    return data;
  }, []);

  const handleSelect = (currentSelected, handleChange) => {
    handleChange("reciverId")(currentSelected.value);
  };

  return (
    <Dialog open={open}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
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
                      errors.destinationLatitude && touched.destinationLatitude
                    )
                  }
                  helperText={
                    !!(
                      errors.destinationLatitude && touched.destinationLatitude
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
                    !!(errors.destinationAddress && touched.destinationAddress)
                  }
                  helperText={
                    !!(errors.destinationAddress && touched.destinationAddress)
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
                  error={!!(errors.pickupLongitude && touched.pickupLongitude)}
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
                    onBlur={(val) => {
                      handleBlur("reciverId")(val);
                    }}
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
              >
                Create Delivery
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

export default CreateDelivery;
