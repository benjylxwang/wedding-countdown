import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Form, Button } from "react-bootstrap";

import "./PartyLeaderForm.scss";

const PartyLeaderForm = ({callback}) => {

    const [leader, setLeader] = useState("");
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");

    const handleChange = (e) => {
        setLeader(e.target.value);
    }

    const submit = (e) => {
        e.preventDefault();
        const data = {
            "leader" : leader,
            "code" : code,
            "email" : email,
            "guest-count" : 5
        };

        // Call callback function with data response
        callback(data);
    }
 
  return (
      <Form className="party_leader_form" onSubmit={submit}>
        <Form.Group controlId="formPartyLeader">
            <Form.Label>Enter your party leader&apos;s name:</Form.Label>
            <Form.Control type="input" placeholder="Party leader name" required onChange={handleChange} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Enter your invite code:</Form.Label>
            <Form.Control type="input" placeholder="Invite code" required onChange={(e) => setCode(e.target.value)} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Enter your email address (optional):</Form.Label>
            <Form.Control type="email" placeholder="Your email" onChange={(e) => setEmail(e.target.value)} />
            <Form.Text>Please enter your email if you would like an email confirmation!</Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">Next</Button>
      </Form>
  );
};

PartyLeaderForm.propTypes = {
    callback: PropTypes.func,
};

PartyLeaderForm.defaultProps = {
    callback: null,
};

export default PartyLeaderForm;
