import * as yup from "yup";
import { MIN_LEN, MAX_LEN, MIN_PASS_LEN, MAX_PASS_LEN } from "../config/constants";

export const userLoginSchema = yup.object().shape({
  email: yup.string().email("Must be a valid email").required("Required"),
  password: yup.string().required("Required"),
});

export const userSignupSchema = yup.object().shape({
  firstName: yup.string().min(MIN_LEN, "Too short!").max(MAX_LEN, "Too long!").required("Required"),
  lastName: yup.string().min(MIN_LEN, "Too short!").max(MAX_LEN, "Too long!").required("Required"),
  email: yup.string().email("Must be a valid email").required("Required"),
  password: yup
    .string()
    .min(MIN_PASS_LEN, "Too short!")
    .max(MAX_PASS_LEN, "Too long!")
    .required("Required")
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i,
      "Must contain at least 1 uppercase, 1 lowercase and 1 special character"
    ),
  confirmPassword: yup
    .string()
    .min(MIN_PASS_LEN, "Too short!")
    .max(MAX_PASS_LEN, "Too long!")
    .required("Required")
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i,
      "Must contain at least 1 uppercase, 1 lowercase and 1 special character"
    )
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
