import React from "react";
import TokiCard from "./TokiCard";
import { Tokimon } from "../../models/tokimon";
import Row from "react-bootstrap/Row";
import classes from "../../css/TokiList.module.css";

interface Props {
  tokimons: Tokimon[];
}

const TokiList: React.FC<Props> = (props) => {
  return (
    <Row className={classes.cardGrid}>
      {props.tokimons.map((t) => {
        return <TokiCard {...t} key={t.name} />;
      })}
    </Row>
  );
};

export default TokiList;
