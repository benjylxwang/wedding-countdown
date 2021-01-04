import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Button, Container, Card, Carousel, Row } from "react-bootstrap";

import "./FormItem.scss"

const FormItem = ({ title, cancelRSVP }) => {
 
  return (
    <Container className={clsx("rsvp-form text-white text-center")}>
        <Row>
            <h4 lg="12" className={clsx("text-center title")}>{title}</h4>
        </Row>
        <div className={clsx("buttons")}>
            <Button className={clsx("cancel-button")} variant="outline-secondary" onClick={cancelRSVP} >Cancel</Button>
            <Button className={clsx("continue-button")} variant="outline-secondary" onClick={cancelRSVP} >Next</Button>
        </div>
    </Container>
  );
};

FormItem.propTypes = {
    title: PropTypes.string,
    cancelRSVP: PropTypes.func
};

FormItem.defaultProps = {
    title: "",
    cancelRSVP: null
};

export default FormItem;
