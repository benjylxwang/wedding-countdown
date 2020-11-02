import React, { useState } from "react";
import PropTypes from "prop-types";

import { Row, Col, Modal, Alert, Button, Form } from "react-bootstrap";
import Icon from "components/Icon";
import PageSection from "components/PageSection";
import SectionHeader from "components/SectionHeader";

import RSVPForm from "components/RSVPForm";

const RSVP = ({ className, frontmatter }) => {

  if (!frontmatter) {
    return null;
  }

  const { anchor, header, subheader } = frontmatter;

  return (
    <PageSection className={className} id={anchor}>
      <Row className="justify-content-center">
        <SectionHeader header={header} subheader={subheader} />
      </Row>
      <RSVPForm frontmatter={frontmatter}/>
    </PageSection>
  );
};

RSVP.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

RSVP.defaultProps = {
  className: null,
  frontmatter: null,
};

export default RSVP;
