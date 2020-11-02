import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Container, Card } from "react-bootstrap";
import Image from "components/Image";
import "./ImageCardCountdown.scss";

const ImageCardCountdown = ({ className, imageFileName, imageAlt, countdown, subheader, extraInfo }) => {
  return (
    <Card style={{backgroundColor:'grey'}} className={clsx("image-card bg-grey text-white text-center", className)}>
      <Image className="image" fileName={imageFileName} alt={imageAlt || subheader} />
      <Card.ImgOverlay className="no-padding">
        <Container>
          <div className="intro-text">
            <div className="intro-lead-in">{subheader}</div>
            {countdown}
            {extraInfo}
          </div>
        </Container>
      </Card.ImgOverlay>
    </Card>
  );
};

ImageCardCountdown.propTypes = {
  className: PropTypes.string,
  imageFileName: PropTypes.string,
  imageAlt: PropTypes.string,
  countdown: PropTypes.object,
  subheader: PropTypes.string,
  extraInfo: PropTypes.any,
};

ImageCardCountdown.defaultProps = {
  className: null,
  imageFileName: null,
  imageAlt: null,
  countdown: null,
  subheader: "",
  extraInfo: null,
};

export default ImageCardCountdown;
