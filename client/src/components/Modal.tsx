import React from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";

interface ModalPageProps {
  modal: boolean;
  toggle: () => void;
}

const ModalPage: React.FC<ModalPageProps> = (props) => {
  return (
    <MDBContainer>
      <MDBModal
        isOpen={props.modal}
        toggle={props.toggle}
        inline={false}
        overflowScroll
        noClickableBodyWithoutBackdrop={true}
      >
        <MDBModalHeader toggle={props.toggle}>MDBModal title</MDBModalHeader>
        <MDBModalBody>(...)</MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={props.toggle}>
            Close
          </MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};

export default ModalPage;
