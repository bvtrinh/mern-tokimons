import React from "react";
import { Formik, Form, Field } from "formik";
import TokiSchema from "../../models/TokimonSchema";
import CustomInput from "./CustomInput";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./TokiForm.module.css";
import { createToki, updateToki } from "../../api/Tokimon.api";
import { Element, FullTokimon } from "../../models/Tokimon";
import { OPS } from "../../models/CRUD.enum";
import { AxiosResponse } from "axios";

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
  type: OPS;
  apiResponse: (res: AxiosResponse) => void;
}

const getHighestType = (elements: Element) => {
  let bestType: string = "";
  let bestVal: number = -1;
  let total: number = 0;

  for (let [key, val] of Object.entries(elements)) {
    if (val > bestVal) {
      bestVal = val;
      bestType = key;
    }
    total += val;
  }

  return { type: bestType, total: total };
};

const TokiForm: React.FC<Props> = (props) => {
  const submit = async (values: FormValues) => {
    const {
      name,
      height,
      weight,
      electric,
      fly,
      fight,
      fire,
      ice,
      water,
    } = values;
    const elements = { electric, fly, fight, fire, ice, water };
    const { type, total } = getHighestType(elements);
    const toki: FullTokimon = {
      name,
      height,
      weight,
      elements,
      type,
      total,
    };
    if (props.type === OPS.CREATE) {
      props.apiResponse(await createToki(toki));
    } else if (props.type === OPS.UPDATE) {
      props.apiResponse(await updateToki(toki));
    }
    props.toggleModal();
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
            type="text"
            errors={errors.name}
            touched={touched.name}
            component={CustomInput}
          />
          <Row>
            <Col>
              <Field
                label="Height"
                name="height"
                placeholder="Enter Height"
                type="number"
                errors={errors.height}
                touched={touched.height}
                component={CustomInput}
              />
            </Col>

            <Col>
              <Field
                label="Weight"
                name="weight"
                placeholder="Enter Weight"
                type="number"
                errors={errors.weight}
                touched={touched.weight}
                component={CustomInput}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Field
                label="Electric"
                name="electric"
                placeholder="Enter Electric Level"
                type="number"
                errors={errors.electric}
                touched={touched.electric}
                component={CustomInput}
              />
            </Col>

            <Col>
              <Field
                label="Fly"
                name="fly"
                placeholder="Enter Fly Level"
                type="number"
                errors={errors.fly}
                touched={touched.fly}
                component={CustomInput}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Field
                label="Fight"
                name="fight"
                placeholder="Enter Fight Level"
                type="number"
                errors={errors.fight}
                touched={touched.fight}
                component={CustomInput}
              />
            </Col>

            <Col>
              <Field
                label="Fire"
                name="fire"
                placeholder="Enter Fire Level"
                type="number"
                errors={errors.fire}
                touched={touched.fire}
                component={CustomInput}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Field
                label="Ice"
                name="ice"
                placeholder="Enter Ice Level"
                type="number"
                errors={errors.ice}
                touched={touched.ice}
                component={CustomInput}
              />
            </Col>
            <Col>
              <Field
                label="Water"
                name="water"
                placeholder="Enter Water Level"
                type="number"
                errors={errors.water}
                touched={touched.water}
                component={CustomInput}
              />
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
