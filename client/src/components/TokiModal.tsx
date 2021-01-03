import React from "react";
import Modal from "react-bootstrap/Modal";
import TokiForm from "./Forms/TokiForm";
interface Props {
  show: boolean;
  onHide: () => void;
  title: string;
}

const TokiModal: React.FC<Props> = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TokiForm toggleModal={props.onHide} />
      </Modal.Body>
    </Modal>
  );
};

export default TokiModal;
