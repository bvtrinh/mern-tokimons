import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Bar } from "@reactchartjs/react-chart.js";
import TokiModal from "../UI/TokiModal";
import TokiForm from "../forms/TokiForm";
import ConfirmDelete from "../forms/ConfirmDelete";
import { getOneToki, updateToki, deleteToki } from "../../api/tokimon";
import { ChartSettings, options } from "../../config/chartSettings";
import {
  TokimonFormValues,
  FullTokimon,
  TokimonInfo,
} from "../../models/tokimon";
import { ResponseFormat } from "../../models/response";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import classes from "../../css/TokiInfo.module.css";

interface TokiInfoProps extends RouteComponentProps<IReactRouterParams> {
  setAlertHandler: (res: ResponseFormat) => void;
}
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

class TokiInfo extends Component<TokiInfoProps, State> {
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
    const res = await getOneToki(id);
    if (res.statusCode === 401) return this.props.setAlertHandler(res);

    const {
      name,
      height,
      weight,
      elements,
      type,
      total,
    } = res.payload as TokimonInfo;

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

  updateSubmitHandler = async (values: TokimonFormValues) => {
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
    if (res.statusCode === 401) return this.props.setAlertHandler(res);

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
    if (res.statusCode === 401) return this.props.setAlertHandler(res);
    if (res.statusCode === 200) {
      this.props.history.push("/");
    } else {
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

    const content = this.state.loaded ? (
      <React.Fragment>
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
