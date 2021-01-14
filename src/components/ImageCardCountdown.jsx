import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Button, Container, Card, Carousel } from "react-bootstrap";
import Image from "components/Image";

import FormItem from "components/FormItem";
import "./ImageCardCountdown.scss";
import PartyLeaderForm from "./FormElements/PartyLeaderForm";
import NameGuestsForm from "./FormElements/NameGuestsForm";
import AcceptDeclineForm from "./FormElements/AcceptDeclineForm";
import MealForm from "./FormElements/MealForm";
import ThanksForResponding from "./FormElements/ThanksForResponding";
import ConfirmSubmission from "./FormElements/ConfirmSubmission";
import ResponseSummary from "./FormElements/ResponseSummary";

const ImageCardCountdown = ({
  className,
  imageFileName,
  imageAlt,
  countdown,
  subheader,
  jumpToAnchorText,
}) => {
  const [index, setIndex] = useState(0);
  const [responded, setResponded] = useState(false);

  const [input, setInput] = useState([]);

  const startRSVP = () => {
    setIndex(1);
    setInput([]);
  };

  const cancelRSVP = () => {
    setIndex(0);
  };

  const goToSummary = (data) => {
    setIndex(7);
    setInput([data, ...input]);
  };

  const nextPage = (data, toSkip = 0) => {
    setIndex(index + 1 + toSkip);
    setInput([data, ...input]);
  };

  const goBack = (toSkip = 0) => {
    setIndex(index - 1 - toSkip);
    input.shift();
    setInput(input);
  };

  const toHome = (hasResponded = true) => {
    setIndex(0);
    setResponded(hasResponded);
  };

  const thanksForResponding = <h3>Thanks for responding!</h3>;

  let button;
  if (jumpToAnchorText) {
    button = (
      <Button
        size="lg"
        variant="outline-secondary"
        className="RSVPButton text-uppercase"
        onClick={startRSVP}
      >
        {jumpToAnchorText}
      </Button>
    );
  }

  return (
    <Card
      style={{ backgroundColor: "grey" }}
      className={clsx("image-card bg-grey text-white text-center", className)}
    >
      <Image className="image" fileName={imageFileName} alt={imageAlt || subheader} />
      <Card.ImgOverlay className="no-padding">
        <Carousel
          activeIndex={index}
          onSelect={null}
          controls={false}
          indicators={false}
          nextLabel={null}
        >
          <Carousel.Item>
            <Container className="faded_black">
              <div className="intro-text">
                <div className="intro-lead-in">{subheader}</div>
                {countdown}
                {responded ? thanksForResponding : button}
              </div>
            </Container>
          </Carousel.Item>
          <Carousel.Item>
            <FormItem
              form={
                <PartyLeaderForm
                  callback={nextPage}
                  cancelRSVP={cancelRSVP}
                  alreadyRSVPdCallback={goToSummary}
                />
              }
            />
          </Carousel.Item>
          <Carousel.Item>
            <FormItem
              form={<NameGuestsForm input={input[0]} goBack={goBack} callback={nextPage} />}
            />
          </Carousel.Item>
          <Carousel.Item>
            <FormItem
              form={<AcceptDeclineForm input={input[0]} goBack={goBack} callback={nextPage} />}
            />
          </Carousel.Item>
          <Carousel.Item>
            <FormItem form={<MealForm input={input[0]} goBack={goBack} callback={nextPage} />} />
          </Carousel.Item>
          <Carousel.Item>
            <FormItem
              form={<ConfirmSubmission input={input[0]} goBack={goBack} callback={nextPage} />}
            />
          </Carousel.Item>
          <Carousel.Item>
            <FormItem
              form={<ThanksForResponding input={input[0]} goBack={goBack} callback={toHome} />}
            />
          </Carousel.Item>
          <Carousel.Item>
            <FormItem
              form={<ResponseSummary input={input[0]} goBack={startRSVP} callback={toHome} />}
            />
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
  jumpToAnchorText: PropTypes.string,
};

ImageCardCountdown.defaultProps = {
  className: null,
  imageFileName: null,
  imageAlt: null,
  countdown: null,
  subheader: "",
  jumpToAnchorText: null,
};

export default ImageCardCountdown;
