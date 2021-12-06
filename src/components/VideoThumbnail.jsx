import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "components/Image";

import "./VideoThumbnail.scss";
import { Col } from "react-bootstrap";

const VideoThumbnail = ({ videoID, description }) => {
  return (
    <Col lg={6} className={clsx("video-thumbnail")}>
      <a
        href={`https://www.youtube.com/watch?v=${videoID}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={`https://i.ytimg.com/vi_webp/${videoID}/maxresdefault.webp`} alt={description} />
        {/* <iframe
        id="embed"
        src={`https://www.youtube.com/embed/${videoID}`}
        title={`Youtube video ${videoID}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      /> */}
        <h5>{description}</h5>
      </a>
    </Col>
  );
};

VideoThumbnail.propTypes = {
  videoID: PropTypes.string.isRequired,
  description: PropTypes.string,
};

VideoThumbnail.defaultProps = {
  description: "A video",
};

export default VideoThumbnail;
