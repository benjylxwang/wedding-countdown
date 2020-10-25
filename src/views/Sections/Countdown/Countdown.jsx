import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Row } from "react-bootstrap";
import SectionHeader from "components/SectionHeader";
import PortfolioItem from "components/PortfolioItem";
import PageSection from "components/PageSection";
import "./Countdown.scss";

const Portfolio = ({ className, frontmatter }) => {
  if (!frontmatter) {
    return null;
  }

  const { anchor, header: rootHeader, subheader: rootSubHeader, portfolios } = frontmatter;

  return (
    <PageSection className={clsx("portfolio-section", className)} id={anchor}>
      <Row>
        <SectionHeader header={rootHeader} subheader={rootSubHeader} />
      </Row>
      <Row>
      <div class="countdown_container">
          <p>We're getting married in...</p>
          <div id="days" class="countdown_number">
            <number></number>
            <p>Days</p>
          </div>
          <div id="hrs" class="countdown_number">
            <number></number>
            <p>Hours</p>

          </div>
          <div id="mins" class="countdown_number">
            <number></number>
            <p>Minutes</p>

          </div>
          <div id="secs" class="countdown_number">
            <number></number>
            <p>Seconds</p>

          </div>
          <div id="ms" class="countdown_number">
            <number></number>
            <p>Milliseconds</p>
          </div>
      </div>
      </Row>
    </PageSection>
  );
};

Portfolio.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

Portfolio.defaultProps = {
  className: null,
  frontmatter: null,
};

export default Portfolio;
