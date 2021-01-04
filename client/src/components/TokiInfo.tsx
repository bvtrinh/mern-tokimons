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
import { RouteComponentProps } from "react-router-dom";
import { getOneToki } from "../api/Tokimon.api";

interface IReactRouterParams {
  id: string;
}

interface Element {
  [key: string]: number;
}
interface State {
  name: string;
  height: number;
  weight: number;
  elements: Element;
  type: string;
  total: number;
  loaded: boolean;
}

class TokiInfo extends Component<
  RouteComponentProps<IReactRouterParams>,
  State
> {
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
    type: "water",
    total: 300,
    loaded: false,
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    const { data } = await getOneToki(id);

    this.setState(data);
    this.setState({ loaded: !this.state.loaded });
  }

  // Need this to access the object via [] and strings
  getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) =>
    obj[key];

  render() {
    ChartSettings.datasets[0].data = Object.values(this.state.elements);

    const content = this.state.loaded ? (
      <React.Fragment>
        <Row>
          <Col className={classes.graphDiv}>
            <h1>{this.state.name}</h1>
            <h4>Total Level: {this.state.total}</h4>
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
      </React.Fragment>
    ) : null;

    return <Container>{content}</Container>;
  }
}

export default TokiInfo;
