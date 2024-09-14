import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import InstanceEditor from "./InstanceEditor";

const InstanceModal = ({ show, handleClose, instanceName, instanceId }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      fullscreen
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>{instanceName}</Modal.Title>
        <Button variant="outline-danger" onClick={handleClose}>
          X
        </Button>
      </Modal.Header>
      <Modal.Body>
        {/* Insert your form or content here */}
        <div className='w-full'>
        <InstanceEditor instance_id={instanceId}/>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default InstanceModal;
