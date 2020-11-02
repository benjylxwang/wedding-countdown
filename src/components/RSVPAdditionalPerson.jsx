import React from "react";
import PropTypes from "prop-types";

import { Col,Button, Form } from "react-bootstrap";

import "./RSVPAdditionalPerson.scss";

const RSVPAdditionalPerson = ({index, handleRemove, handleUpdate, nameValue, nameFormLabel, removePersonButtonLabel}) => {
  return (
      <Form.Row  className="justify-content-center">
        <Col md={4} >
            <Form.Control className="forminput" name="name" onChange={e => handleUpdate(index, e)} placeholder={nameFormLabel} value={nameValue} required />
        </Col>           
        <Col md={1} >
            <Button className="forminput" variant="outline-danger" onClick={() => handleRemove(index)} >{removePersonButtonLabel}</Button>
        </Col>
      </Form.Row>
  );
};

RSVPAdditionalPerson.propTypes = {
    index: PropTypes.number.isRequired,
    handleRemove: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    nameValue: PropTypes.string.isRequired,
    nameFormLabel: PropTypes.string.isRequired,
    removePersonButtonLabel: PropTypes.string.isRequired
};

RSVPAdditionalPerson.defaultProps = {
};

export default RSVPAdditionalPerson;
