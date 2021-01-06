import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import classes from "./Card.module.css";

interface Props {
  title: string;
}

const SignUp: React.FC<Props> = (props) => {
  return (
    <Container>
      <Card className={classes.cardBlk}>
        <Card.Body className={classes.cardBody}>
          <Card.Title className={classes.cardTitle}>
            <h1>{props.title}</h1>
          </Card.Title>
          {props.children}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignUp;
