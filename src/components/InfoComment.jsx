import React from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";

import "./InfoComment.scss";

const InfoComment = ({ comment }) => {
  return (
    <Col className="text-center section-subheading text-muted">
        <p className="infocomment">{comment}</p>
    </Col>
  );
};

InfoComment.propTypes = {
  comment: PropTypes.string
};

InfoComment.defaultProps = {
  comment: null
};

export default InfoComment;
