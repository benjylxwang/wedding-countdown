import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Row } from "react-bootstrap";
import SectionHeader from "components/SectionHeader";
import PageSection from "components/PageSection";
import Icon from "components/Icon";
import "./YouTube.scss";

const YouTube = ({ className, frontmatter }) => {
  if (!frontmatter) {
    return null;
  }

  const { anchor, header: rootHeader, subheader: rootSubHeader, link } = frontmatter;

  return (
    <PageSection className={clsx("youtube-section", className)} id={anchor}>
      <Row>
        <SectionHeader lg={12} header={rootHeader} subheader={rootSubHeader} />
      </Row>
      <Row id="embed-container">
        <iframe
          id="embed"
          src={link + "?autoplay=1"}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Row>
    </PageSection>
  );
};

YouTube.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

YouTube.defaultProps = {
  className: null,
  frontmatter: null,
};

export default YouTube;
