import React from "react";
import PropTypes from "prop-types";

import { Button, Container } from "react-bootstrap";

import "./ThanksForResponding.scss";

const ThanksForResponding = ({ input, callback }) => {
  return (
    <Container className="thanks_for_responding">
      <h2>Thanks for responding!</h2>
      <p>Here&apos;s a link to our gift registry if you&apos;d like to check it out!</p>
      <Button
        variant="primary"
        href="https://www.weddingshop.com/Buy/View/82337"
        target="_blank"
        rel="noopener noreferrer"
      >
        Check it out!
      </Button>
      <Button variant="secondary" onClick={() => callback(input)}>
        Back To Home
      </Button>
    </Container>
  );
};

ThanksForResponding.propTypes = {
  callback: PropTypes.func,
  input: PropTypes.object,
};

ThanksForResponding.defaultProps = {
  callback: null,
  input: null,
};

export default ThanksForResponding;
