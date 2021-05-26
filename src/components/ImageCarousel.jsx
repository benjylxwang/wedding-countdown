import React from "react";
import PropTypes from "prop-types";

import ImageHQ from "components/ImageHQ";
import "./ImageCarousel.scss";
import { Carousel } from "react-bootstrap";

const ImageCarousel = ({ imageFileName, imageAlt, subheader }) => {
  return (
    <Carousel interval={10000}>
      {imageFileName.map((image) => {
        return (
          <Carousel.Item key={image}>
            <ImageHQ className="image" fileName={image} alt={imageAlt || subheader} />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

ImageCarousel.propTypes = {
  imageFileName: PropTypes.string,
  imageAlt: PropTypes.string,
  subheader: PropTypes.string,
};

ImageCarousel.defaultProps = {
  imageFileName: null,
  imageAlt: null,
  subheader: "",
};

export default ImageCarousel;
