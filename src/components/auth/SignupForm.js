import { useCallback, useState } from "react";
import { TextField, Button, FormControl, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import AsyncSelect from "react-select/async";
import axios from "axios";
import validationSchema, {
  initialValues,
} from "./../../validations/auth/signup";

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


/**
 * Sign up from for user to create account
 */

const SignupForm = ({ setShowNotification, btnState, setBtnState }) => {
  const classes = useStyles();
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

  const handleFormSubmit = (values) => {
    setBtnState({ ...btnState, isLoading: true });
    axios
      .post("/api/user", values)
      .then(() => {
        setBtnState({
          isLoading: false,
          message: "Account Created Successfully Please Sign In",
          type: "success",
        });
        setShowNotification(true);
      })
      .catch((err) => {
        if (err.response) {
          setBtnState({
            isLoading: false,
            message: err.response.data.message,
            type: "error",
          });
        } else {
          setBtnState({
            isLoading: false,
            message: err.message,
            type: "error",
          });
        }
        setShowNotification(true);
      });
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
              style={{ whiteSpace: "pre-line" }}
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
            <TextField
              label="Enter UPI Id"
              variant="outlined"
              type="text"
              name="upi"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.upi}
              error={
                !!(
                  errors.upi &&
                  touched.upi
                )
              }
              helperText={
                !!(
                  errors.upi &&
                  touched.upi
                )
                  ? errors.upi
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
                {btnState.isLoading ? "Please Wait..." : "Create Account"}
              </Button>
              <Button variant="contained" color="primary" onClick={resetForm}>
                Reset Form
              </Button>
            </div>
          </FormControl>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;
