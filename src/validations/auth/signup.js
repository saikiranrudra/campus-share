import * as Yup from "yup";

export default Yup.object({
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
      "Must Contain 8 Characters\n One Uppercase\n One Lowercase\n One Number and one special case Character"
    )
    .required("Password is required to create account"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password and Confirm Password dosnt match")
    .required("Enter confirm password"),
  adhaarNumber: Yup.string()
    .test("len", "Adhaar Number Must be 12 character long", (val) =>
      val ? val.length === 12 : false
    )
    .required("Adhaar number is required"),
  collegeEnrollmentNumber: Yup.string().required(
    "College Enrollment Number is required"
  ),
  upi: Yup.string()
    .required("UPI Id is required")
    .matches(/\w+(@)\w+/, "Invalid UPI type"),
});

export const initialValues = {
  fullName: "",
  email: "",
  college: "",
  password: "",
  confirmPassword: "",
  adhaarNumber: "",
  collegeEnrollmentNumber: "",
  upi: "",
};
