import React from "react";
import { FieldProps } from "formik";
import Form from "react-bootstrap/Form";
import classes from "../../css/CustomInput.module.css";

interface Props extends FieldProps {
  label: string;
  placeholder: string;
  type: string;
  errors: string;
  touched: boolean;
}

const CustomInput: React.FC<Props> = (props) => {
  return (
    <Form.Group>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        {...props.field}
        type={props.type}
        placeholder={props.placeholder}
      />
      {props.errors && props.touched ? (
        <div className={classes.errorMsg}>{props.errors}</div>
      ) : null}
    </Form.Group>
  );
};

export default CustomInput;
