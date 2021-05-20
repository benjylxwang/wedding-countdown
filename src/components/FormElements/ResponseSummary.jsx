import React from "react";
import PropTypes from "prop-types";

import { Button, Container, Row, Col } from "react-bootstrap";

import "./ResponseSummary.scss";

const ResponseSummary = ({ input, callback, goBack }) => {
  const submit = () => {
    callback(false);
  };

  if (input && input.people) {
    return (
      <Container className="response_summary">
        <h2>Looks like you&apos;ve already responded!</h2>
        {input.people.map((e) => (
          <Row key={e.name}>
            <Col>{e.name}</Col>
            <Col className={e.accepted ? "Accepted" : "Declined"}>
              {e.accepted ? "Accepted" : "Declined"}
            </Col>
          </Row>
        ))}
        <Row className="info">
          Please email benjylxwang@hotmail.com if the responses shown are incorrect
        </Row>
        <Row>
          <Button variant="secondary" onClick={() => goBack()}>
            Back
          </Button>
          <Button variant="primary" className="submit" onClick={submit}>
            Home
          </Button>
        </Row>
      </Container>
    );
  }
  return null;
};

ResponseSummary.propTypes = {
  goBack: PropTypes.func,
  callback: PropTypes.func,
  input: PropTypes.object,
};

ResponseSummary.defaultProps = {
  callback: null,
  goBack: null,
  input: null,
};

export default ResponseSummary;
