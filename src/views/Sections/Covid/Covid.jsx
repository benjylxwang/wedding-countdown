import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Row } from "react-bootstrap";
import SectionHeader from "components/SectionHeader";
import PageSection from "components/PageSection";
import Icon from "components/Icon";
import "./Covid.scss";

const Covid = ({ className, frontmatter }) => {
  if (!frontmatter) {
    return null;
  }

  const { anchor, header: rootHeader, subheader: rootSubHeader, details, links } = frontmatter;

  return (
    <PageSection className={clsx("covid-section", className)} id={anchor}>
      <Row>
        <Icon
          iconName="VirusIcon"
          size="2x"
          className={clsx("virus-icon", "col-lg-1", className)}
        />
        <SectionHeader lg={10} header={rootHeader} subheader={rootSubHeader} />
        <Icon
          iconName="VirusIcon"
          size="2x"
          className={clsx("virus-icon", "col-lg-1", className)}
        />
      </Row>
      <Row>
        <div className={clsx("col-lg-12", "text", className)}>
          {details.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Row>
      <Row>
        {links.map(({ title, url }) => (
          <div key={title} className={clsx("col-lg-4", "text-center", "link", className)}>
            <p>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Icon iconName="LinkIcon" /> {title}
              </a>
            </p>
          </div>
        ))}
      </Row>
      <hr />
      <Row>
        <div className={clsx("col-lg-12", "updates", className)}>
          <p>
            *UPDATE* To help keep everyone safe, we&apos;ve decided to split the wedding reception
            into two parts, each attended by half of the guests. Emails have been sent out letting
            people know which group they are in and with further details on how this will work.
          </p>
          <p>
            *UPDATE* In order to facilitate the two receptions, the ceremony has been moved to{" "}
            <strong>10am BST.</strong>
          </p>
        </div>
      </Row>
    </PageSection>
  );
};

Covid.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

Covid.defaultProps = {
  className: null,
  frontmatter: null,
};

export default Covid;
