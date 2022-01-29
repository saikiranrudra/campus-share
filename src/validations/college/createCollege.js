import * as Yup from "yup";

export default Yup.object({
    district: Yup.string().required("District Name is required"),
    instituteType: Yup.string().oneOf(["government", "government-aid", "private-self-financed", "state-government"]),
    name: Yup.string().required("Name of College is required"),
    state: Yup.string().required("State name is required"),
    university: Yup.string().required("University name is required")
});

export const initialValues = {
    district: "",
    instituteType: "government",
    name: "",
    state: "",
    university: ""
}