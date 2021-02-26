import React from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import CardPrompt from "../UI/CardPrompt";
import CustomInput from "../forms/CustomInput";
import { login } from "../../api/user";
import { LOGIN_INITIAL_VALUES } from "../../config/constants";
import { ResponseFormat } from "../../models/response";
import { checkAuth } from "../../utils/auth";
import { userLoginSchema } from "../../validation/userSchema";
import Button from "react-bootstrap/Button";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginProps {
  setStateAuth: () => void;
  setAlertHandler: (res: ResponseFormat) => void;
}

const Login = (props: LoginProps & RouteComponentProps) => {
  const loginHandler = async (values: LoginForm) => {
    const { email, password } = values;
    const res = await login(email, password);
    props.setAlertHandler(res);
    if (res.statusCode === 200) {
      props.setStateAuth();
      props.history.push("/");
    }
  };

  if (checkAuth()) return <Redirect to="/" />;

  return (
    <CardPrompt title="Login">
      <Formik
        initialValues={LOGIN_INITIAL_VALUES}
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
            <Button disabled={!isValid} type="submit" variant="info" style={{ width: "100%" }}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </CardPrompt>
  );
};

export default Login;
