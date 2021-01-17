import React from "react";
import Button from "react-bootstrap/Button";
import CardPrompt from "../components/CardPrompt";
import { Formik, Form, Field } from "formik";
import CustomInput from "../components/Forms/CustomInput";
import { userSignupSchema } from "../models/userSchema";
import { signup } from "../api/User.api";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { checkAuth } from "../utils/auth";
import { ResponseFormat } from "../models/Response";

interface signupForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupProps extends RouteComponentProps {
  setStateAuth: () => void;
  setAlertHandler: (res: ResponseFormat) => void;
}

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = (props: SignupProps) => {
  const signupHandler = async (values: signupForm) => {
    const { firstName, lastName, email, password, confirmPassword } = values;
    const res = await signup(
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    );
    props.setAlertHandler(res);
    if (res.statusCode === 200) {
      props.setStateAuth();
      props.history.push("/");
    }
  };

  if (checkAuth()) return <Redirect to="/" />;

  return (
    <CardPrompt title="Sign Up">
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={userSignupSchema}
        onSubmit={(values) => signupHandler(values)}
      >
        {({ errors, touched, isValid }) => (
          <Form>
            <Field
              label="First name"
              name="firstName"
              placeholder="John"
              type="text"
              errors={errors.firstName}
              touched={touched.firstName}
              component={CustomInput}
            ></Field>
            <Field
              label="Last name"
              name="lastName"
              placeholder="Doe"
              type="text"
              errors={errors.lastName}
              touched={touched.lastName}
              component={CustomInput}
            ></Field>
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
            <Field
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Shhh...."
              type="password"
              errors={errors.confirmPassword}
              touched={touched.confirmPassword}
              component={CustomInput}
            ></Field>
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

export default SignUp;
