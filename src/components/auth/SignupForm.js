import { TextField, Button, FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import * as Yup from "yup";

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
}));

/**
 * Sign up from for user to create account
 */

const initialFormValues = {
  fullName: "",
  email: "",
  college: "",
  password: "",
  confirmPassword: "",
  collegeId: {},
  adhaarCard: {},
};

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("full name is required")
    .test(
      "word-count",
      "Full Name must have atleast first name and last name",
      (val) => val && val.split(" ").length >= 2
    ),
  email: Yup.string()
    .required("Email is required to create account")
    .email("Invalid Email format"),
  college: Yup.string().required("College name is required to create account"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Password is required to create account"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password and Confirm Password dosnt match")
    .required("Enter confirm password"),
  collegeId: Yup.mixed()
    .test(
      "fileType",
      "Unsupported File format upload in (.png, .jpg, or .jpeg)",
      (value) => ["image/png", "image/jpg", "image/jpeg"].includes[value.type]
    )
    .required("College Id is required to create account"),
  collegeId: Yup.mixed()
    .test(
      "fileType",
      "Unsupported File format upload in (.png, .jpg, or .jpeg)",
      (value) => ["image/png", "image/jpg", "image/jpeg"].includes[value.type]
    )
    .required("Adhaar Id is required to create account"),
});

const SignupForm = () => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={(values) => console.log(values)}
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
            helperText={!!(errors.fullName && touched.fullName) ? errors.fullName : ""}
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
            label="Select College / University"
            variant="outlined"
            type="text"
            name="college"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.college}
            error={!!(errors.college && touched.college)}
            helperText={!!(errors.college && touched.college) ? errors.college : ""}
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
            helperText={!!(errors.password && touched.password) ? errors.password : ""}
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
            helperText={!!(errors.confirmPassword && touched.confirmPassword) ? errors.confirmPassword : ""}
          />
          <Button
            color="primary"
            variant="outlined"
            type="file"
            name="collegeId"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.collegeId}
            // error={!!(errors.collegeId && touched.collegeId)}
            // helperText={errors.collegeId}
          >
            Upload College Id Card
          </Button>
          <Button
            color="primary"
            variant="outlined"
            type="file"
            name="adhaarCard"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.adhaarCard}
            // error={!!(errors.adhaarCard && touched.adhaarCard)}
            // helperText={errors.adhaarCard}
          >
            Upload Adhaar Card
          </Button>
          <div style={{ margin: "2rem 0" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
              style={{ marginRight: ".8rem" }}
            >
              Creact Account
            </Button>
            <Button variant="contained" color="primary" onClick={resetForm}>
              Reset Form
            </Button>
          </div>
        </FormControl>
      )}
    </Formik>
  );
};

export default SignupForm;
