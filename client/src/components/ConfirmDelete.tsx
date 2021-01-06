import React from "react";
import Button from "react-bootstrap/Button";
import ModalFooter from "react-bootstrap/ModalFooter";

interface Props {
  toggleModal: () => void;
  submit: () => void;
  name: string;
  total: number;
  height: number;
  weight: number;
}

const ConfirmDelete: React.FC<Props> = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Total Level: {props.total}</p>
      <p>
        Height: {props.height} | Weight: {props.weight}
      </p>
      <ModalFooter>
        <Button onClick={props.toggleModal} variant="secondary">
          Cancel
        </Button>
        <Button onClick={props.submit} variant="danger">
          Confirm
        </Button>
      </ModalFooter>
    </div>
  );
};

export default ConfirmDelete;
