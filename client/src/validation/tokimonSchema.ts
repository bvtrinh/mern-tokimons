import * as yup from "yup";

const TokiSchema = yup.object().shape({
  name: yup.string().required("Required").max(128, "Max characters is 128"),
  height: yup.number().required("Required").positive("Must be positive"),
  weight: yup.number().required("Required").positive("Must be positive"),
  electric: yup
    .number()
    .required("Required")
    .positive("Must be positive")
    .max(100, "Max level is 100"),
  fly: yup.number().required("Required").positive("Must be positive").max(100, "Max level is 100"),
  fight: yup
    .number()
    .required("Required")
    .positive("Must be positive")
    .max(100, "Max level is 100"),
  fire: yup.number().required("Required").positive("Must be positive").max(100, "Max level is 100"),
  ice: yup.number().required("Required").positive("Must be positive").max(100, "Max level is 100"),
  water: yup
    .number()
    .required("Required")
    .positive("Must be positive")
    .max(100, "Max level is 100"),
  createdOn: yup.date().default(() => new Date()),
});

export default TokiSchema;
