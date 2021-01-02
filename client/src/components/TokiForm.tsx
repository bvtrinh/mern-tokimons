import React from "react";
import { Formik, Form, Field } from "formik";
import TokiSchema from "../models/Tokimon";
import CustomInput from "./CustomInput";
import Button from "react-bootstrap/Button";
import classes from "./TokiForm.module.css";

interface FormValues {
  name: string;
  height: number;
  weight: number;
  electric: number;
  fly: number;
  fight: number;
  fire: number;
  ice: number;
  water: number;
}

interface Props {
  toggleModal: () => void;
}

const TokiForm: React.FC<Props> = (props) => {
  const submit = (values: FormValues) => {
    props.toggleModal();
    console.log(values);
  };
  const initialValues: FormValues = {
    name: "",
    height: 1,
    weight: 1,
    electric: 1,
    fly: 1,
    fight: 1,
    fire: 1,
    ice: 1,
    water: 1,
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TokiSchema}
      onSubmit={(values) => submit(values)}
    >
      {({ errors, touched }) => (
        <Form>
          <Field
            label="Name"
            name="name"
            placeholder="Enter Name"
            underText="Give your Tokimon a unique name"
            type="text"
            component={CustomInput}
          />
          {errors.name && touched.name ? (
            <div className={classes.errorMsg}>{errors.name}</div>
          ) : null}
          <Field
            label="Weight"
            name="weight"
            placeholder="Enter Weight"
            type="number"
            component={CustomInput}
          />
          {errors.weight && touched.weight ? (
            <div className={classes.errorMsg}>{errors.weight}</div>
          ) : null}
          <div className={classes.btnPlacement}>
            <Button className="mx-2" variant="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TokiForm;
