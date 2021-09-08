import { useCallback } from "react";
import { useRouter } from "next/router";
import { TextField, FormControl, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import campusShareAPI from "../../utils/Apis/campusShareAPI";

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
  },
  btnGroup: {
    margin: "2rem 0",
  },
}));

const initialFormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Enter Valid Email").required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

/**
 * For Logging user in
 */

const SigninForm = ({ setShowNotification, btnState, setBtnState }) => {
  const classes = useStyles();
  const router = useRouter();
  const URL_ON_SUCCESS = '/user/profile';

  // Sign in function
  const handleSignIn = useCallback(
    async (values) => {
      const { email, password } = values;
      setBtnState({ ...btnState, isLoading: true});
      await campusShareAPI
        .post("/api/auth/signin", { email, password })
        .then(() => {
          setBtnState({
            isLoading: false,
            message: "Authenticated. readirecting please wait",
            type: "success"
          });
          setShowNotification(true);
          router.push(URL_ON_SUCCESS);
        })
        .catch((err) => {
          if (err.response) {
            setBtnState({
              // isLoading: false,
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
    },
    [campusShareAPI]
  );

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSignIn}
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
          <div className={classes.btnGroup}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
              style={{ marginRight: ".8rem" }}
              disabled={btnState.isLoading}
            >
              {btnState.isLoading ? "Please Wait..." : "Sign In"}
            </Button>
            <Button 
              variant="contained" color="primary" onClick={resetForm}>
              Reset Form
            </Button>
          </div>
        </FormControl>
      )}
    </Formik>
  );
};

export default SigninForm;
