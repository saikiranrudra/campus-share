import * as Yup from "yup";

export default Yup.object({
  title: Yup.string().max(75).required("Title is required"),
  description: Yup.string().max(650).required("description is required"),
  destinationLatitude: Yup.number()
    .max(90)
    .min(-90)
    .required("destination latitude is required"),
  destinationLongitude: Yup.number()
    .max(180)
    .min(-180)
    .required("destination longitude is required"),
  destinationAddress: Yup.string()
    .max(320)
    .required("destination address is required"),
  pickupLatitude: Yup.number()
    .max(90)
    .min(-90)
    .required("pickup latitude is required"),
  pickupLongitude: Yup.number()
    .max(180)
    .min(-180)
    .required("pickup longitude is required"),
  pickupAddress: Yup.string().max(320).required("pickup address is required"),
  reciverId: Yup.string().max(24).required("Reciver is required"),
});

export const initialValues = {
  title: "",
  description: "",
  destinationLatitude: 0.0,
  destinationLongitude: 0.0,
  destinationAddress: "",
  pickupLatitude: 0.0,
  pickupLongitude: 0.0,
  pickupAddress: "",
  reciverId: "",
};