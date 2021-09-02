import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
class TestModal extends Component {
    render() {
      return (
        <Modal>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }
  
  export default TestModal;