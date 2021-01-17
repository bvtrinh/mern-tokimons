import React from "react";
import Modal from "react-bootstrap/Modal";
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
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
};

export default TokiModal;
