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
import { getOneToki, updateToki } from "../api/Tokimon.api";
import TokiModal from "./TokiModal";
import TokiForm from "./Forms/TokiForm";
import { TokimonFormValues, FullTokimon } from "../models/Tokimon";
import { ResponseFormat } from "../models/Response";

interface IReactRouterParams {
  id: string;
}

interface State extends FullTokimon {
  loaded: boolean;
  isUpdateModalOpen: boolean;
  isDeleteConfirmOpen: boolean;
  error: boolean;
  responseMessage: string;
}

class TokiInfo extends Component<
  RouteComponentProps<IReactRouterParams>,
  State
> {
  state = {
    name: "",
    height: 1,
    weight: 1,
    elements: {
      electric: 1,
      fly: 1,
      fight: 1,
      fire: 1,
      ice: 1,
      water: 1,
    },
    type: "",
    total: 1,
    loaded: false,
    isUpdateModalOpen: false,
    isDeleteConfirmOpen: false,
    error: false,
    responseMessage: "",
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    const { data } = await getOneToki(id);

    this.setState(data);
    this.setState({ loaded: !this.state.loaded });
  }

  toggleUpdateModalHandler = () => {
    this.setState({ isUpdateModalOpen: !this.state.isUpdateModalOpen });
  };

  toggleDeleteConfirmHandler = () => {
    this.setState({ isDeleteConfirmOpen: !this.state.isDeleteConfirmOpen });
  };

  responseHandler = () => {
    console.log("response status gooood");
  };

  apiReponse = (res: ResponseFormat) => {
    if (res.statusCode === 200) {
      this.setState({ error: false, responseMessage: res.message });
    } else {
      this.setState({
        error: true,
        responseMessage: res.message,
      });
    }
  };

  updateSubmitHandler = async (values: TokimonFormValues) => {
    // Format data for API call
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
    const toki: FullTokimon = {
      name,
      height,
      weight,
      elements,
    };
    const res = await updateToki(toki);
    this.apiReponse(res);
    this.toggleUpdateModalHandler();
  };

  render() {
    ChartSettings.datasets[0].data = Object.values(this.state.elements);
    const { name, height, weight } = this.state;
    const { electric, fly, fight, fire, ice, water } = this.state.elements;
    const currentFormValues = {
      name,
      height,
      weight,
      electric,
      fly,
      fight,
      fire,
      ice,
      water,
    };

    const content = this.state.loaded ? (
      <React.Fragment>
        <TokiModal
          show={this.state.isUpdateModalOpen}
          onHide={this.toggleUpdateModalHandler}
          title="Update your Tokimon!"
        >
          <TokiForm
            previousValues={currentFormValues}
            apiResponse={this.responseHandler}
            toggleModal={this.toggleUpdateModalHandler}
          />
        </TokiModal>
        <Row>
          <Col className={classes.graphDiv}>
            <h1>{this.state.name}</h1>
            <h4>Total Level: {this.state.total}</h4>
            <h4>
              Weight: {this.state.weight} | Height: {this.state.height}
            </h4>
          </Col>
          <Col className={classes.btnRight}>
            <Button
              onClick={this.toggleUpdateModalHandler}
              className={classes.editBtn}
              variant="info"
            >
              <FaEdit />
            </Button>
            <Button onClick={this.toggleDeleteConfirmHandler} variant="danger">
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
