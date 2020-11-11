import React from "react";
import PropTypes from "prop-types";

import { Col } from "react-bootstrap";
import Image from "components/Image";

import "./PortfolioItem.scss";

const PortfolioItem = ({
  imageFileName,
  imageAlt,
  header,
  subheader,
  content,
}) => {
  return (
    <>
      <Col md={4} sm={6} className="portfolio-item">
        <Image
          className="img-fluid"
          fileName={imageFileName}
          alt={imageAlt || header || subheader}
        />
        <div className="portfolio-caption">
          <h4>{header}</h4>
          {subheader ? <p className="text-muted">{subheader}</p> : null}
          <hr/>
          {content ? <p className="text-content">{content}</p> : null}
        </div>
      </Col>
    </>
  );
};

PortfolioItem.propTypes = {
  imageFileName: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  content: PropTypes.string,
};

PortfolioItem.defaultProps = {
  imageAlt: "",
  subheader: "",
  content: "",
};

export default PortfolioItem;
