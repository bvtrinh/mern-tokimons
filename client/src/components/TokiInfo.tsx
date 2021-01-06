import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import classes from "./TokiInfo.module.css";
import { getOneToki, updateToki, deleteToki } from "../api/Tokimon.api";
import { TokimonFormValues, FullTokimon, TokimonInfo } from "../models/Tokimon";
import { ResponseFormat } from "../models/Response";
import { Bar } from "@reactchartjs/react-chart.js";
import { ChartSettings, options } from "../config/ChartSettings";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import TokiModal from "./TokiModal";
import TokiForm from "./Forms/TokiForm";
import ConfirmDelete from "./ConfirmDelete";

interface IReactRouterParams {
  id: string;
}

interface State extends TokimonInfo {
  loaded: boolean;
  submitted: boolean;
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
    _id: "",
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
    submitted: false,
    isUpdateModalOpen: false,
    isDeleteConfirmOpen: false,
    error: false,
    responseMessage: "",
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    const { name, height, weight, elements, type, total } = (await (
      await getOneToki(id)
    ).payload) as TokimonInfo;

    this.setState({
      _id: id,
      name,
      height,
      weight,
      elements,
      type,
      total,
      loaded: !this.state.loaded,
    });
  }

  toggleUpdateModalHandler = () => {
    this.setState({ isUpdateModalOpen: !this.state.isUpdateModalOpen });
  };

  toggleDeleteConfirmHandler = () => {
    this.setState({ isDeleteConfirmOpen: !this.state.isDeleteConfirmOpen });
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
      _id: this.state._id,
      name,
      height,
      weight,
      elements,
    };

    const res = await updateToki(toki);
    this.apiReponse(res);
    this.setState({
      name,
      height,
      weight,
      elements,
      type: (res.payload as TokimonInfo).type,
      total: (res.payload as TokimonInfo).total,
      submitted: true,
    });
    this.toggleUpdateModalHandler();
  };

  deleteSubmitHandler = async () => {
    const res = await deleteToki(this.state._id);
    if (res.statusCode === 200) {
      this.props.history.push("/");
    } else {
      console.log(res);
      this.setState({
        error: true,
        responseMessage: "Server side error",
        submitted: true,
      });
      this.toggleDeleteConfirmHandler();
    }
  };

  render() {
    ChartSettings.datasets[0].data = Object.values(this.state.elements);
    const updatedChartSettings = { ...ChartSettings };

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

    const alert = this.state.submitted ? (
      <Alert
        onClose={() => this.setState({ submitted: false })}
        dismissible
        className="mt-3"
        variant={this.state.error ? "danger" : "success"}
      >
        {this.state.error
          ? `Error: ${this.state.responseMessage}`
          : this.state.responseMessage}
      </Alert>
    ) : null;

    const content = this.state.loaded ? (
      <React.Fragment>
        {alert}
        <TokiModal
          show={this.state.isUpdateModalOpen}
          onHide={this.toggleUpdateModalHandler}
          title="Update your Tokimon!"
        >
          <TokiForm
            submit={this.updateSubmitHandler}
            previousValues={currentFormValues}
            toggleModal={this.toggleUpdateModalHandler}
          />
        </TokiModal>
        <TokiModal
          show={this.state.isDeleteConfirmOpen}
          onHide={this.toggleDeleteConfirmHandler}
          title="Delete Tokimon?"
        >
          <ConfirmDelete
            submit={this.deleteSubmitHandler}
            toggleModal={this.toggleDeleteConfirmHandler}
            name={this.state.name}
            total={this.state.total}
            height={this.state.height}
            weight={this.state.weight}
          />
        </TokiModal>
        <Row>
          <Col className={classes.graphDiv}>
            <h1>{this.state.name}</h1>
            <h4>Total Level: {this.state.total}</h4>
            <h4>
              Height: {this.state.height} | Weight: {this.state.weight}
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
          <Bar type="bar" data={updatedChartSettings} options={options} />
        </div>
      </React.Fragment>
    ) : null;

    return <Container>{content}</Container>;
  }
}

export default TokiInfo;
