import React from "react";
import { Tokimon } from "../models/Tokimon";
import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import classes from "./TokiCard.module.css";

const TokiCard: React.FC<Tokimon & { key: string }> = (props) => {
  return (
    <Col lg={3} md={6}>
      <Card className={classes.card}>
        <div className={`${classes.cardBg} ${classes[props.type]}`}>
          <h4 className={classes.cardValText}>{props.total}</h4>
        </div>
        <Card.Body>
          <h5>
            <NavLink to={"/t/" + props._id}>{props.name}</NavLink>
          </h5>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TokiCard;
