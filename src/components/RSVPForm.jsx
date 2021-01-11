import React, { useState } from "react";
import PropTypes from "prop-types";

import { Row, Col, Spinner, Alert, Button, Form, Container } from "react-bootstrap";
import md5 from "md5";

import "./RSVPForm.scss";
import RSVPAdditionalPerson from "./RSVPAdditionalPerson";

const RSVPForm = ({
    frontmatter,
    handleRSVPSuccess
}) => {
    const { rsvpNameLabel,
        rsvpEmailLabel,
        rsvpInviteCodeLabel,
        rsvpConfirmButtonLabel,
        rsvpAddPeopleButtonLabel,
        rsvpAddAdditionalPeopleLabel,
        rsvpOtherPeopleNameLabel,
        removePersonButtonLabel,
        savingDetailsAlert,
        inviteCodeErrorAlert,
        serverIssueAlert
    } = frontmatter;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [inviteCode, setInviteCode] = useState("");
    const [alertVariant, setAlertVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [additionalPeopleLabel, setAdditionalPeopleLabel] = useState(rsvpAddPeopleButtonLabel);
    const [additionalPeople, setAdditionalPeople] = useState([]);
    const [peopleID, setPeopleID] = useState(0);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        setAlertVariant("primary");
        setAlertMessage(savingDetailsAlert);
        setAlertVisible(true);

        if (md5(inviteCode) !== 'd6398f47dd797f497e45e5a6ad02baf5'
            && md5(inviteCode) !== '02575aa942e0799520d51bf3b7e8eadf') {
            setAlertVariant("danger");
            setAlertMessage(inviteCodeErrorAlert);
            setAlertVisible(true);
        } else {
            const formData = new URLSearchParams({
                "leader_name": name,
                "email": email,
                "invite_code": inviteCode,
                "extras": additionalPeople.map((person) => person.name)
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
                    if (data.result === "error") {
                        setAlertVariant("danger");
                        setAlertMessage(data.message);
                        setAlertVisible(true);
                    } else {
                        setAlertVisible(false);
                        handleRSVPSuccess();
                    }
                })
                .catch(() => {
                    setAlertVariant("danger");
                    setAlertMessage(serverIssueAlert);
                    setAlertVisible(true);
                });
        }
    }

    const handleAddPeople = () => {

        if (additionalPeople.length === 0) {
            // Update label
            setAdditionalPeopleLabel(rsvpAddAdditionalPeopleLabel);
        }

        const people = [...additionalPeople];
        people.push({ id: peopleID, name: "" });
        setPeopleID(peopleID + 1);
        setAdditionalPeople(people);
    }

    const handleRemovePerson = (index) => {
        const people = [...additionalPeople];
        people.splice(index, 1);
        setAdditionalPeople(people);

        if (people.length === 0) {
            // Update label
            setAdditionalPeopleLabel(rsvpAddPeopleButtonLabel);
        }

    }

    const handleAdditionalPeopleInputChange = (index, event) => {
        const people = [...additionalPeople];
        people[index].name = event.target.value;

        setAdditionalPeople(people);
    };

    return (
        <>
            <Row className="justify-content-center">
                <Container>
                    <Form id="rsvp-form" className="rsvp-form" method="POST" onSubmit={handleSubmit}>
                        <Form.Row className="text-center">
                            <Col md={4} >
                                <Form.Control className="forminput" type="email" placeholder={rsvpEmailLabel} onChange={e => setEmail(e.target.value)} required />
                            </Col>
                            <Col md={4} >
                                <Form.Control className="forminput" placeholder={rsvpNameLabel} onChange={e => setName(e.target.value)} required />
                            </Col>
                            <Col md={4} >
                                <Form.Control className="forminput" type="number" name="invite_code" onChange={e => setInviteCode(e.target.value)} placeholder={rsvpInviteCodeLabel} required />
                            </Col>
                        </Form.Row>

                        <hr className="divider my-4" />
                        {
                            additionalPeople.map((additional, index) => (
                                <RSVPAdditionalPerson
                                    key={additional.id}
                                    index={index}
                                    handleRemove={handleRemovePerson}
                                    handleUpdate={handleAdditionalPeopleInputChange}
                                    nameValue={additional.name}
                                    nameFormLabel={rsvpOtherPeopleNameLabel}
                                    removePersonButtonLabel={removePersonButtonLabel} />
                            ))
                        }
                        <Form.Row className="justify-content-center">
                            <Col className="col-10 d-flex justify-content-center">
                                <Button size="sm" variant="link" onClick={() => handleAddPeople()} id="addAdditionalPeopleButton">
                                    {additionalPeopleLabel}
                                </Button>
                            </Col>
                        </Form.Row>
                        <Form.Row className="justify-content-center">
                            <Col className="col-4 d-flex justify-content-center">
                                <Button size="lg" variant="primary" type="submit" id="confirmRSVPButton">
                                    {rsvpConfirmButtonLabel}
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
            </Row>
            <Row className="alert" hidden={!alertVisible}>
                <Col className="justify-content-center text-center">
                    <Alert variant={alertVariant} >
                        <Spinner animation="grow" variant="primary" />
                        <p>{alertMessage}</p>
                    </Alert>
                </Col>
            </Row>
        </>
    );
};

RSVPForm.propTypes = {
    frontmatter: PropTypes.object.isRequired,
    handleRSVPSuccess: PropTypes.func.isRequired
};

RSVPForm.defaultProps = {
};

export default RSVPForm;
