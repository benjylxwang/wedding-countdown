import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Button, Container, Row } from "react-bootstrap";

import "./FormItem.scss";

const FormItem = ({ form, cancelRSVP }) => {
  return (
    <Container className={clsx("rsvp-form text-white text-center")}>
      <Row className={clsx("align-center")}>{form}</Row>

      {cancelRSVP ? (
        <div className={clsx("buttons")}>
          <Button
            className={clsx("cancel-button")}
            variant="outline-secondary"
            onClick={cancelRSVP}
          >
            Cancel
          </Button>
        </div>
      ) : null}
    </Container>
  );
};

FormItem.propTypes = {
  form: PropTypes.object,
  cancelRSVP: PropTypes.func,
};

FormItem.defaultProps = {
  form: null,
  cancelRSVP: null,
};

export default FormItem;
