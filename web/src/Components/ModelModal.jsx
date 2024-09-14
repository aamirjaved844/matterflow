import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ModelEditor from "./ModelEditor";

const ModelModal = ({ show, handleClose, modelName, modelId }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      fullscreen
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>{modelName}</Modal.Title>
        <Button variant="outline-danger" onClick={handleClose}>
          X
        </Button>
      </Modal.Header>
      <Modal.Body>
        {/* Insert your form or content here */}
        <div className='w-full'>
        <ModelEditor model_id={modelId}/>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModelModal;
