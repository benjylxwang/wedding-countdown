import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Form, Button, Spinner } from "react-bootstrap";

import "./PartyLeaderForm.scss";

const PartyLeaderForm = ({ callback }) => {
  const [leader, setLeader] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");

  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLeader(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    const data = {
      leader,
      code,
      email,
    };

    const formData = new URLSearchParams(data);

    // Attempt to contact server
    setLoading(true);
    fetch(
      "https://script.google.com/macros/s/AKfycbydW_ghAv79B-M4GE1ARGLGsERg7ssG5l_OfNs_V2ONv-GRvlvhjXMdZg/exec",
      {
        method: "POST",
        redirect: "follow",
        body: formData,
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    )
      .then((response) => response.json())
      .then((received) => {
        setLoading(false);
        if (received.result === "error") {
          // Error from server!!!
          console.log(received.message);
        } else if (received.result === "not_found") {
          // Can't find leader
          console.log(received.message);
        } else if (received.result === "repeat") {
          // Already RSVPd!
          console.log(received.message);
        } else if (received["party-data"].length === 1) {
          // No extra people
          data.guests = [];
          console.log(data);
          callback(data, 1);
        } else {
          // Has extra people
          data.party = received["party-data"];
          // Remove leader from party list
          data.party.splice(data.party.indexOf(data.leader), 1);
          console.log(data);
          callback(data);
        }
      })
      .catch((err) => {
        setLoading(false);
        // Server error!
        console.log(err);
      });
  };

  return (
    <Form className="party_leader_form" onSubmit={submit}>
      <Form.Group controlId="formPartyLeader">
        <Form.Label>Enter your party leader&apos;s name:</Form.Label>
        <Form.Control
          type="input"
          placeholder="Party leader name"
          required
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Enter your invite code:</Form.Label>
        <Form.Control
          type="input"
          placeholder="Invite code"
          required
          onChange={(e) => setCode(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Enter your email address (optional):</Form.Label>
        <Form.Control
          type="email"
          placeholder="Your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text>Please enter your email if you would like an email confirmation!</Form.Text>
      </Form.Group>

      <Button variant="primary" disabled={isLoading} type="submit">
        {isLoading ? (
          <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
        ) : null}
        {isLoading ? " Loading…" : "Next"}
      </Button>
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
