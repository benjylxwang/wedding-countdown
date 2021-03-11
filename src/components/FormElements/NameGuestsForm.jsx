import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Form, Button } from "react-bootstrap";

import "./NameGuestsForm.scss";

const NameGuestsForm = ({ input, callback, goBack }) => {
  const [guests, setGuests] = useState([]);

  const handleChange = (e) => {
    guests[e.target.name] = e.target.value;
    setGuests(guests);
  };

  const handleGoBack = () => {
    setGuests([]);
    goBack();
  };

  const submit = (e) => {
    e.preventDefault();
    const data = input;
    data.guests = guests;

    // Call callback function with data response
    console.log(data);
    callback(data);
  };

  // First run only
  if (input && input.party && input.party.length !== guests.length) {
    setGuests([...input.party]);
  }

  if (input && input.party) {
    return (
      <>
        <Form className="name_guests_form" onSubmit={submit}>
          <h5>
            Looks like you&apos;ve got {input.party.length} extra{" "}
            {input.party.length === 1 ? "person" : "people"} to bring!
          </h5>
          <Form.Group controlId="formPartyLeader">
            <Form.Control type="input" value={input.leader} disabled />
          </Form.Group>
          {input.party.map((e, i) => (
            <Form.Group key={e} controlId="formPartyLeader">
              <Form.Control
                name={i}
                type="input"
                value={guests[i]}
                onChange={handleChange}
                placeholder={"Additional Guest " + i}
                required
              />
            </Form.Group>
          ))}

          <Form.Row>
            <Button variant="secondary" onClick={handleGoBack}>
              Back
            </Button>
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

NameGuestsForm.propTypes = {
  callback: PropTypes.func,
  goBack: PropTypes.func,
  input: PropTypes.object,
};

NameGuestsForm.defaultProps = {
  callback: null,
  goBack: null,
  input: null,
};

export default NameGuestsForm;
