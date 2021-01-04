import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Button, Container, Card, Carousel } from "react-bootstrap";
import Image from "components/Image";

import FormItem from "components/FormItem";
import "./ImageCardCountdown.scss";

const ImageCardCountdown = ({ className, imageFileName, imageAlt, countdown, subheader, jumpToAnchorText }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const startRSVP = () => {
    setIndex(1);
  };

  const cancelRSVP = () => {
    setIndex(0);
  };

  let button;
  if (jumpToAnchorText) {
    button = (
      <Button size="lg" variant="outline-secondary" className="RSVPButton text-uppercase" onClick={startRSVP}>
        {jumpToAnchorText}
      </Button>
    );
  }

  return (
    <Card style={{backgroundColor:'grey'}} className={clsx("image-card bg-grey text-white text-center", className)}>
      <Image className="image" fileName={imageFileName} alt={imageAlt || subheader} />
      <Card.ImgOverlay className="no-padding">
        <Carousel activeIndex={index} onSelect="" controls={false} indicators={false} nextLabel={null} >
          <Carousel.Item>
            <Container>
              <div className="intro-text">
                <div className="intro-lead-in">{subheader}</div>
                {countdown}
                {button}
              </div>
            </Container>
          </Carousel.Item>
          <Carousel.Item>
            <FormItem title="RSVP Form" cancelRSVP={cancelRSVP}/>
          </Carousel.Item>
        </Carousel>
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
  jumpToAnchorText: PropTypes.string
};

ImageCardCountdown.defaultProps = {
  className: null,
  imageFileName: null,
  imageAlt: null,
  countdown: null,
  subheader: "",
  jumpToAnchorText: null
};

export default ImageCardCountdown;
