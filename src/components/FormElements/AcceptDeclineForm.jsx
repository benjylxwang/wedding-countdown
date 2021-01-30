import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Form, Button, ButtonGroup, Row, Col } from "react-bootstrap";

import "./AcceptDeclineForm.scss";

const AcceptDeclineForm = ({ input, callback, goBack }) => {
  const [accepted, setAccepted] = useState([]);
  const [declined, setDeclined] = useState([]);
  const [responded, setResponded] = useState([]);

  const [showError, setShowError] = useState(false);
  const [acceptCount, setAcceptCount] = useState(0);

  const onAccept = (i, name) => {
    accepted[i] = {
      name,
      accepted: true,
    };
    declined[i] = false;
    responded[i] = true;
    setAccepted(accepted);
    setDeclined(declined);
    setResponded(responded);
    setAcceptCount(acceptCount + 1);
  };

  const onDecline = (i, name) => {
    if (accepted[i] && accepted[i].accepted) setAcceptCount(acceptCount - 1);

    accepted[i] = {
      name,
      accepted: false,
    };
    declined[i] = true;
    responded[i] = true;
    setAccepted(accepted);
    setDeclined(declined);
    setResponded(responded);
  };

  const errorRespond = <Form.Text className="error">Please respond for everyone!</Form.Text>;

  const handleGoBack = () => {
    // Clear accepted, declined, responded
    setAccepted([]);
    setDeclined([]);
    setResponded([]);
    setAcceptCount(0);
    setShowError(false);
    if (input.guests.length === 0) goBack(1);
    else goBack();
  };

  const submit = (e) => {
    e.preventDefault();
    for (let g = 0; g < input.guests.length + 1; g += 1) {
      if (!responded[g]) {
        setShowError(true);
        return;
      }
    }

    const data = {
      leader: input.leader,
      code: input.code,
      email: input.email,
      responses: accepted,
      acceptCount,
    };

    // Call callback function with data response
    console.log(data);

    if (acceptCount === 0 || !input.food) {
      callback(data, 1);
    } else {
      callback(data);
    }
  };

  if (input && input.guests) {
    return (
      <>
        <Form className="accept_decline_form" onSubmit={submit}>
          <h5>Please RSVP for each person:</h5>
          <Form.Group as={Row} controlId="formPartyLeader">
            <Form.Label column>{input.leader}</Form.Label>
            <Col>
              <ButtonGroup required>
                <Button
                  variant={accepted[0] && accepted[0].accepted ? "success" : "outline-success"}
                  onClick={() => onAccept(0, input.leader)}
                >
                  Accept
                </Button>
                <Button
                  variant={declined[0] ? "danger" : "outline-danger"}
                  onClick={() => onDecline(0, input.leader)}
                >
                  Decline
                </Button>
              </ButtonGroup>
            </Col>
          </Form.Group>
          {input.guests.map((e, i) => (
            <Form.Group as={Row} key={e} controlId="guest">
              <Form.Label column>{e}</Form.Label>
              <Col>
                <ButtonGroup>
                  <Button
                    variant={
                      accepted[i + 1] && accepted[i + 1].accepted ? "success" : "outline-success"
                    }
                    onClick={() => onAccept(i + 1, e)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant={declined[i + 1] ? "danger" : "outline-danger"}
                    onClick={() => onDecline(i + 1, e)}
                  >
                    Decline
                  </Button>
                </ButtonGroup>
              </Col>
            </Form.Group>
          ))}

          <Form.Row>
            <Button variant="secondary" onClick={handleGoBack}>
              Back
            </Button>
            {showError ? errorRespond : null}
            <Button className="next" variant="primary" type="submit">
              Next
            </Button>
          </Form.Row>
        </Form>
      </>
    );
  }
  return null;
};

AcceptDeclineForm.propTypes = {
  callback: PropTypes.func,
  input: PropTypes.object,
  goBack: PropTypes.func,
};

AcceptDeclineForm.defaultProps = {
  callback: null,
  goBack: null,
  input: null,
};

export default AcceptDeclineForm;
