import React from "react";
import { Formik, Form, Field } from "formik";
import TokiSchema from "../../models/Tokimon";
import CustomInput from "./CustomInput";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
    // Should add to the state of the home page and make api call
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

          <Row>
            <Col>
              <Field
                label="Height"
                name="height"
                placeholder="Enter Height"
                type="number"
                component={CustomInput}
              />
              {errors.height && touched.height ? (
                <div className={classes.errorMsg}>{errors.height}</div>
              ) : null}
            </Col>

            <Col>
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
            </Col>
          </Row>

          <Row>
            <Col>
              <Field
                label="Electric"
                name="electric"
                placeholder="Enter Electric Level"
                type="number"
                component={CustomInput}
              />
              {errors.electric && touched.electric ? (
                <div className={classes.errorMsg}>{errors.electric}</div>
              ) : null}
            </Col>

            <Col>
              <Field
                label="Fly"
                name="fly"
                placeholder="Enter Fly Level"
                type="number"
                component={CustomInput}
              />
              {errors.fly && touched.fly ? (
                <div className={classes.errorMsg}>{errors.fly}</div>
              ) : null}
            </Col>
          </Row>

          <Row>
            <Col>
              <Field
                label="Fight"
                name="fight"
                placeholder="Enter Fight Level"
                type="number"
                component={CustomInput}
              />
              {errors.fight && touched.fight ? (
                <div className={classes.errorMsg}>{errors.fight}</div>
              ) : null}
            </Col>

            <Col>
              <Field
                label="Fire"
                name="fire"
                placeholder="Enter Fire Level"
                type="number"
                component={CustomInput}
              />
              {errors.fire && touched.fire ? (
                <div className={classes.errorMsg}>{errors.fire}</div>
              ) : null}
            </Col>
          </Row>

          <Row>
            <Col>
              <Field
                label="Ice"
                name="ice"
                placeholder="Enter Ice Level"
                type="number"
                component={CustomInput}
              />
              {errors.ice && touched.ice ? (
                <div className={classes.errorMsg}>{errors.ice}</div>
              ) : null}
            </Col>
            <Col>
              <Field
                label="Water"
                name="water"
                placeholder="Enter Water Level"
                type="number"
                component={CustomInput}
              />
              {errors.water && touched.water ? (
                <div className={classes.errorMsg}>{errors.water}</div>
              ) : null}
            </Col>
          </Row>

          <div className={classes.btnPlacement}>
            <Button
              onClick={props.toggleModal}
              className="mx-2"
              variant="secondary"
            >
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
