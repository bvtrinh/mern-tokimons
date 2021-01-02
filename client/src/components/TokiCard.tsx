import React from "react";
import { Tokimon } from "../models/Tokimon";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import classes from "./TokiCard.module.css";

const TokiCard: React.FC<Tokimon & { key: string }> = (props) => {
  return (
    <Col lg={3} md={6}>
      <Card className={classes.card}>
        <div className={classes.cardBg}>
          <h4 className={classes.cardValText}>{props.value}</h4>
        </div>
        <Card.Body>
          <h5>{props.name}</h5>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TokiCard;
