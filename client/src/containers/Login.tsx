import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import Button from "react-bootstrap/Button";
import FormText from "react-bootstrap/FormText";
import CustomInput from "../components/Forms/CustomInput";
import CardPrompt from "../components/CardPrompt";
import { userLoginSchema } from "../models/userSchema";
import { login } from "../api/User.api";
import { RouteComponentProps } from "react-router-dom";
import classes from "./Login.module.css";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginProps extends RouteComponentProps {
  isAuthenticated: boolean;
  setAuth: () => void;
}

const Login = (props: LoginProps) => {
  const [errorMsg, setErrorMsg] = useState("");

  const loginHandler = async (values: LoginForm) => {
    const { email, password } = values;
    const res = await login(email, password);
    if (res.statusCode === 200) {
      props.setAuth();
      props.history.push("/");
    } else {
      setErrorMsg(res.message);
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

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
