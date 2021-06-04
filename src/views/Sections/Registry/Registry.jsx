import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Row } from "react-bootstrap";
import SectionHeader from "components/SectionHeader";
import PageSection from "components/PageSection";
import Icon from "components/Icon";
import "./Registry.scss";

const Registry = ({ className, frontmatter }) => {
  if (!frontmatter) {
    return null;
  }

  const { anchor, header: rootHeader, subheader: rootSubHeader, link } = frontmatter;

  return (
    <PageSection className={clsx("registry-section", className)} id={anchor}>
      <Row>
        <a
          className={clsx("col-lg-12", className)}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Row>
            <Icon
              className={clsx("link-icon", "col-lg-1", className)}
              size="2x"
              iconName="LinkIcon"
            />
            <SectionHeader lg={10} header={rootHeader} subheader={rootSubHeader} />
            <Icon
              className={clsx("link-icon", "col-lg-1", className)}
              size="2x"
              iconName="LinkIcon"
            />
          </Row>
        </a>
      </Row>
      <Row>

        <div className={clsx("col-lg-12", "text", className)}>
          <p>So many of our generous friends and family have already bought everything on the list! You can visit it to donate to our chosen charities or give to our house deposit fund.</p>
          <p>If you&apos;d like to give us something more specific send us a message!</p>
        </div>
      </Row>
    </PageSection>
  );
};

Registry.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

Registry.defaultProps = {
  className: null,
  frontmatter: null,
};

export default Registry;
