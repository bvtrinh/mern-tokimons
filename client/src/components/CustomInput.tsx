import React from "react";
import { FieldProps } from "formik";
import Form from "react-bootstrap/Form";

interface Props extends FieldProps {
  label: string;
  placeholder: string;
  underText: string;
  type: string;
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
      <Form.Text className="text-muted">{props.underText}</Form.Text>
    </Form.Group>
  );
};

export default CustomInput;
