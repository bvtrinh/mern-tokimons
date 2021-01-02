import React, { Component } from "react";
import { FormikHelpers } from "formik";
// import TokiSchema from "../models/Tokimon";

interface TokiModalProps {
  modal: boolean;
  toggle: () => void;
  title: string;
}
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

interface TokiModalState {
  // name: string;
  // height: number;
  // weight: number;
  // electric: number;
  // fly: number;
  // fight: number;
  // fire: number;
  // ice: number;
  // water: number;
}

class TokiModal extends Component<TokiModalProps, TokiModalState> {
  state = {
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

  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  onSubmitHandler = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    // TokiSchema.isValid(values);
  };

  render() {
    // const initialValues: FormValues = {
    //   name: "",
    //   height: 1,
    //   weight: 1,
    //   electric: 1,
    //   fly: 1,
    //   fight: 1,
    //   fire: 1,
    //   ice: 1,
    //   water: 1,
    // };
    return <div>Modal</div>;
  }
}

export default TokiModal;
