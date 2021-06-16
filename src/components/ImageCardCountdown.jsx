import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Card, Container } from "react-bootstrap";
import { Link } from "react-scroll";

import "./ImageCardCountdown.scss";
import ImageCarousel from "./ImageCarousel";

const ImageCardCountdown = ({
  className,
  imageFileName,
  imageAlt,
  countdown,
  subheader,
  jumpToAnchor,
  jumpToAnchorText,
}) => {
  let button;
  if (jumpToAnchorText) {
    button = (
      <Link
        className="RSVPButton text-uppercase btn btn-outline-secondary btn-lg"
        activeClass="active"
        spy
        smooth="easeInOutQuart"
        to={jumpToAnchor}
      >
        {jumpToAnchorText}
      </Link>
    );
  }

  return (
    <Card
      style={{ backgroundColor: "grey" }}
      className={clsx("image-card bg-grey text-white text-center", className)}
    >
      <ImageCarousel imageFileName={imageFileName} imageAlt={imageAlt} subheader={subheader} />
      <Card.ImgOverlay className="no-padding">
        <Container className="faded_black">
          <div className="intro-text">
            <div className="intro-lead-in">{subheader}</div>
            {countdown}
            {button}
          </div>
        </Container>
      </Card.ImgOverlay>
      <div className={clsx("photo-credits", className)}>
        <p>
          Images courtesy of{" "}
          <a href="https://catrionaelizabeth.com/" target="_blank" rel="noopener noreferrer">
            Catriona Elizabeth Photography
          </a>
        </p>
      </div>
    </Card>
  );
};

ImageCardCountdown.propTypes = {
  className: PropTypes.string,
  imageFileName: PropTypes.string,
  imageAlt: PropTypes.string,
  countdown: PropTypes.object,
  subheader: PropTypes.string,
  jumpToAnchorText: PropTypes.string,
  jumpToAnchor: PropTypes.string,
};

ImageCardCountdown.defaultProps = {
  className: null,
  imageFileName: null,
  imageAlt: null,
  countdown: null,
  subheader: "",
  jumpToAnchorText: null,
  jumpToAnchor: PropTypes.string,
};

export default ImageCardCountdown;
