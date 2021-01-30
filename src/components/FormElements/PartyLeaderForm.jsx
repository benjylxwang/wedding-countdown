import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Form, Button, Spinner } from "react-bootstrap";

import "./PartyLeaderForm.scss";

const PartyLeaderForm = ({ callback, alreadyRSVPdCallback, cancelRSVP }) => {
  const [leader, setLeader] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [wrongName, setWrongName] = useState("");

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
          setErrorMsg(received.message);
        } else if (received.result === "not_found") {
          // Can't find leader
          console.log(received.message);
          setWrongName(data.leader);
        } else if (received.result === "repeat") {
          // Already RSVPd!
          console.log(received.message);
          console.log(received);
          setErrorMsg("");
          setWrongName("");
          alreadyRSVPdCallback(received.response);
        } else if (received["party-data"].length === 1) {
          // No extra people
          data.guests = [];
          console.log(data);
          callback(data, 1);
          setErrorMsg("");
          setWrongName("");
        } else {
          // Has extra people
          data.party = received["party-data"];
          // Remove leader from party list
          data.party.splice(data.party.indexOf(data.leader), 1);
          console.log(data);
          callback(data);
          setErrorMsg("");
          setWrongName("");
        }
      })
      .catch((err) => {
        setLoading(false);
        // Server error!
        console.log(err);
        setErrorMsg("Sorry but the server seems to be down. Please try again later.");
      });
  };

  return (
    <Form className="party_leader_form" onSubmit={submit}>
      <Form.Group controlId="formPartyLeader">
        <Form.Label>Enter your party leader&apos;s name:</Form.Label>
        <Form.Control
          type="input"
          placeholder="Firstname Lastname"
          required
          onChange={handleChange}
        />
        {wrongName !== "" ? (
          <Form.Text className="error_text">
            Sorry but we could not find an invitation for {wrongName}!
          </Form.Text>
        ) : null}
      </Form.Group>
      <Form.Group>
        <Form.Label>Enter your invite code:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Invite code"
          required
          onChange={(e) => setCode(e.target.value)}
        />
        {errorMsg !== "" ? <Form.Text className="error_text">{errorMsg}</Form.Text> : null}
      </Form.Group>
      <Form.Group>
        <Form.Label>Enter your email address:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Your email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text>Please enter your email so we can contact you if things change</Form.Text>
      </Form.Group>

      <Button variant="secondary" className="back" disabled={isLoading} onClick={cancelRSVP}>
        Back
      </Button>

      <Button variant="primary" className="next" disabled={isLoading} type="submit">
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
  alreadyRSVPdCallback: PropTypes.func,
  cancelRSVP: PropTypes.func,
};

PartyLeaderForm.defaultProps = {
  callback: null,
  alreadyRSVPdCallback: null,
  cancelRSVP: null,
};

export default PartyLeaderForm;
