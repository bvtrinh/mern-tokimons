import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./TokiInfo.module.css";
import { Bar } from "@reactchartjs/react-chart.js";
import { ChartSettings, options } from "../config/ChartSettings";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const elements = ["electric", "fly", "fight", "fire", "ice", "water"];

interface Props {
  id: string;
}

interface Element {
  [key: string]: number;
}
interface Tokimon {
  name: string;
  height: number;
  weight: number;
  elements: Element;
}

class TokiInfo extends Component<Props, Tokimon> {
  state = {
    name: "Lapras",
    height: 20,
    weight: 500,
    elements: {
      electric: 0,
      fly: 0,
      fight: 70,
      fire: 0,
      ice: 99,
      water: 95,
    },
  };

  // Need this to access the object via [] and strings
  getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) =>
    obj[key];

  render() {
    const totalLvl = elements.reduce((sum, val) => {
      return (
        sum + this.getKeyValue<keyof Element, Element>(val)(this.state.elements)
      );
    }, 0);

    ChartSettings.datasets[0].data = Object.values(this.state.elements);

    return (
      <Container>
        <Row>
          <Col className={classes.graphDiv}>
            <h1>{this.state.name}</h1>
            <h4>Total Level: {totalLvl}</h4>
            <h4>
              Weight: {this.state.weight} | Height: {this.state.height}
            </h4>
          </Col>
          <Col className={classes.btnRight}>
            <Button className={classes.editBtn} variant="info">
              <FaEdit />
            </Button>
            <Button variant="danger">
              <FaTrash />
            </Button>
          </Col>
        </Row>
        <div className="mt-5">
          <Bar type="bar" data={ChartSettings} options={options} />
        </div>
      </Container>
    );
  }
}

export default TokiInfo;
