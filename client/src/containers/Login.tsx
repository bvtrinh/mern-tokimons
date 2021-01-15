import React, { useState } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import CustomInput from "../components/Forms/CustomInput";
import CardPrompt from "../components/CardPrompt";
import { userLoginSchema } from "../models/userSchema";
import { login } from "../api/User.api";
import { checkAuth } from "../utils/auth";
import Button from "react-bootstrap/Button";
import FormText from "react-bootstrap/FormText";
import classes from "./Login.module.css";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginProps {
  setStateAuth: () => void;
}

const Login = (props: LoginProps & RouteComponentProps) => {
  const [errorMsg, setErrorMsg] = useState("");

  const loginHandler = async (values: LoginForm) => {
    const { email, password } = values;
    const res = await login(email, password);
    if (res.statusCode === 200) {
      props.setStateAuth();
      props.history.push("/");
    } else {
      setErrorMsg(res.message);
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

  if (checkAuth()) return <Redirect to="/" />;

  return (
    <CardPrompt title="Login">
      <Formik
        initialValues={initialValues}
        validationSchema={userLoginSchema}
        onSubmit={(values) => loginHandler(values)}
      >
        {({ errors, touched, isValid }) => (
          <Form>
            <Field
              label="Email"
              name="email"
              placeholder="johndoe@email.ca"
              type="text"
              errors={errors.email}
              touched={touched.email}
              component={CustomInput}
            ></Field>
            <Field
              label="Password"
              name="password"
              placeholder="Shh..."
              type="password"
              errors={errors.password}
              touched={touched.password}
              component={CustomInput}
            ></Field>
            {!!errorMsg && (
              <FormText className={classes.invalid}>{errorMsg}</FormText>
            )}
            <Button
              disabled={!isValid}
              type="submit"
              variant="info"
              style={{ width: "100%" }}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </CardPrompt>
  );
};

export default Login;
