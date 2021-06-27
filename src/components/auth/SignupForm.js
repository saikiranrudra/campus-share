import { useCallback, useState } from "react";
import { TextField, Button, FormControl, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import AsyncSelect from "react-select/async";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import validationSchema, {
  initialValues,
} from "./../../validations/auth/signup";
import Logger from "./../../utils/Logger";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    "& > div": {
      margin: ".3rem 0",
    },
    "& > div:first-child": {
      marginTop: "2rem",
    },
    "& > button": {
      margin: ".3rem 0",
      textAlign: "left",
    },
    "& > .css-2b097c-container": {
      color: "black",
      zIndex: "2",
    },
  },
}));

// Alert error Component
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * Sign up from for user to create account
 */

const SignupForm = () => {
  const classes = useStyles();
  const [btnState, setBtnState] = useState({
    isLoading: false,
    error: "",
  });
  const [showError, setShowError] = useState(false);

  const loadColleges = useCallback(async (inputValue = "") => {
    const res = await axios.get("/api/college", { name: inputValue });
    const data = res.data.data.map((college) => ({
      label: college.name,
      value: college._id,
    }));
    return data;
  }, []);

  const handleSelect = (currentSelected, handleChange) => {
    handleChange("college")(currentSelected.value);
  };

  const handleFormSubmit = async (values) => {
    try {
      setBtnState({ isLoading: true, error: "" });
      const res = await axios.post("/api/user", values);
    } catch (err) {
      console.log("Error: ", err.message);
      setBtnState({ isLoading: false, error: err.message });
      setShowError(true);
    }
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowError(false);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm,
        }) => (
          <FormControl className={classes.form}>
            <TextField
              label="Full Name (same as in adhaar card)"
              variant="outlined"
              type="text"
              name="fullName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fullName}
              error={!!(errors.fullName && touched.fullName)}
              helperText={
                !!(errors.fullName && touched.fullName) ? errors.fullName : ""
              }
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={!!(errors.email && touched.email)}
              helperText={!!(errors.email && touched.email) ? errors.email : ""}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={!!(errors.password && touched.password)}
              helperText={
                !!(errors.password && touched.password) ? errors.password : ""
              }
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              error={!!(errors.confirmPassword && touched.confirmPassword)}
              helperText={
                !!(errors.confirmPassword && touched.confirmPassword)
                  ? errors.confirmPassword
                  : ""
              }
            />
            <TextField
              label="adhaar Number"
              variant="outlined"
              type="text"
              name="adhaarNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.adhaarNumber}
              error={!!(errors.adhaarNumber && touched.adhaarNumber)}
              helperText={
                !!(errors.adhaarNumber && touched.adhaarNumber)
                  ? errors.adhaarNumber
                  : ""
              }
            />
            <TextField
              label="College Enrollment Number"
              variant="outlined"
              type="text"
              name="collegeEnrollmentNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.collegeEnrollmentNumber}
              error={
                !!(
                  errors.collegeEnrollmentNumber &&
                  touched.collegeEnrollmentNumber
                )
              }
              helperText={
                !!(
                  errors.collegeEnrollmentNumber &&
                  touched.collegeEnrollmentNumber
                )
                  ? errors.collegeEnrollmentNumber
                  : ""
              }
            />
            <AsyncSelect
              cacheOptions
              instanceId="collegeName"
              defaultOptions={false}
              isClearable
              placeholder="Enter your College Name"
              onChange={(val) => {
                handleSelect(val, handleChange);
              }}
              loadOptions={loadColleges}
            />
            {!!(errors.college && touched.college) ? (
              <Typography style={{ color: "red" }} variant="caption">
                {errors.college}
              </Typography>
            ) : null}
            <div style={{ margin: "2rem 0" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
                style={{ marginRight: ".8rem" }}
                disabled={btnState.isLoading}
              >
                {btnState.isLoading ? "loading..." : "Create Account"}
              </Button>
              <Button variant="contained" color="primary" onClick={resetForm}>
                Reset Form
              </Button>
            </div>
          </FormControl>
        )}
      </Formik>
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          {btnState.error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignupForm;
