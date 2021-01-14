import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";

import "./ConfirmSubmission.scss";

const ConfirmSubmission = ({ input, callback, goBack }) => {
  const [isLoading, setLoading] = useState(false);

  const submit = () => {
    const formData = new URLSearchParams({
      leader: input.leader,
      email: input.email,
      code: input.code,
      acceptCount: input.acceptCount,
      responses: JSON.stringify(input.responses),
    });

    setLoading(true);
    fetch(
      `https://script.google.com/macros/s/AKfycbydW_ghAv79B-M4GE1ARGLGsERg7ssG5l_OfNs_V2ONv-GRvlvhjXMdZg/exec`,
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    )
      .then((response) => response.json())
      .then((received) => {
        setLoading(false);
        console.log(received);

        if (received.result === "error") {
          console.log(received.message);
          console.log(received.debug);
        } else {
          callback(input);
        }
      })
      .catch((err) => {
        setLoading(false);
        // Server error!
        console.log(err);
      });
  };

  if (input && input.responses) {
    return (
      <Container className="confirm_submission">
        <h2>Confirm!</h2>
        {input.responses.map((e, i) => (
          <Row key={e.name}>
            <Col>{e.name}</Col>
            <Col className={e.accepted ? "Accepted" : "Declined"}>
              {e.accepted ? "Accepted" : "Declined"}
            </Col>
          </Row>
        ))}
        <Row>
          <Button variant="secondary" disabled={isLoading} onClick={() => goBack()}>
            Go Back!
          </Button>
          <Button variant="primary" disabled={isLoading} className="submit" onClick={submit}>
            {isLoading ? (
              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
            ) : null}
            {isLoading ? " Loading..." : "Submit RSVP"}
          </Button>
        </Row>
      </Container>
    );
  }
  return null;
};

ConfirmSubmission.propTypes = {
  goBack: PropTypes.func,
  callback: PropTypes.func,
  input: PropTypes.object,
};

ConfirmSubmission.defaultProps = {
  callback: null,
  goBack: null,
  input: null,
};

export default ConfirmSubmission;
