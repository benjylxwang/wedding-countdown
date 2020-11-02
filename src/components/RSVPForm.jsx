import React, { useState } from "react";
import PropTypes from "prop-types";

import { Row, Col, Modal, Alert, Button, Form } from "react-bootstrap";
import md5 from "md5";

import "./RSVPForm.scss";

const RSVPForm = ({
    frontmatter
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    setAlertVariant("primary");
    setAlertMessage("Just a sec! We are saving your details.");
    setAlertVisible(true);

    if (md5(inviteCode) !== 'b0e53b10c1f55ede516b240036b88f40'
        && md5(inviteCode) !== '2ac7f43695eb0479d5846bb38eec59cc') {
        setAlertVariant("danger");
        setAlertMessage("Sorry! Your invite code is incorrect.");
        setAlertVisible(true);
    } else {
        const formData = new URLSearchParams({
          "name": name, 
          "email": email,
          "invite_code": inviteCode
        });
        fetch('https://script.google.com/macros/s/AKfycbwX1k4Pu9ACp2_7JkD5ACKRvPX_vNCs1olpNd7aly3w8fxVMAI/exec', {
          method: 'POST',
          redirect: 'follow',
          body: formData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
            .then((data) => {
                console.log(data);
                if (data.result === "error") {
                    setAlertVariant("danger");
                    setAlertMessage(data.message);
                    setAlertVisible(true);
                } else {
                    setAlertVisible(false);
                    setModalVisible(true);
                }
            })
            .catch((data) => {
                console.log("Hello");
                console.log(data);
                setAlertVariant("danger");
                setAlertMessage("Sorry! There is some issue with the server.");
                setAlertVisible(true);
            });
    }
  }

  const { rsvpNameLabel, rsvpEmailLabel, rsvpInviteCodeLabel, rsvpConfirmButtonLabel } = frontmatter;

  return (
    <>
        <Row className="justify-content-center">
            <Form id="rsvp-form" className="rsvp-form" method="POST" onSubmit={handleSubmit}>
                <Row className="">
                    <Col>
                        <Form.Control type="email" placeholder={rsvpEmailLabel} onChange={e => setEmail(e.target.value)} required />
                    </Col>
                    <Col>
                        <Form.Control placeholder={rsvpNameLabel} onChange={e => setName(e.target.value)} required/>
                    </Col>
                    <Col>
                        <Form.Control type="number" name="invite_code" onChange={e => setInviteCode(e.target.value)} placeholder={rsvpInviteCodeLabel} required />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="col-4 d-flex justify-content-center"> 
                        <Button size="lg" variant="primary" type="submit" id="confirmRSVPButton">
                        {rsvpConfirmButtonLabel}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Row>
        <Row className="alert" hidden={!alertVisible}>
            <Alert variant={alertVariant}>{alertMessage}</Alert>
        </Row>
        <Modal
        show={modalVisible}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h4>Centered Modal</h4>
            <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
            </p>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={() => setModalVisible(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
  );
};

RSVPForm.propTypes = {
    frontmatter: PropTypes.object.isRequired
};

RSVPForm.defaultProps = {
};

export default RSVPForm;
