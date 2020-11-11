import React, { useState } from "react";
import PropTypes from "prop-types";

import { Row, Button } from "react-bootstrap";
import PageSection from "components/PageSection";
import SectionHeader from "components/SectionHeader";

import RSVPForm from "components/RSVPForm";

const RSVP = ({ className, frontmatter }) => {
  const [isRSVPDone, setRSVPDone] = useState(false);

  const handleRSVPSuccess = () => {
    setRSVPDone(true);
  }

  if (!frontmatter) {
    return null;
  }

  const { anchor, header, subheader, rsvpDoneSubheader, rsvpAgainButtonLabel } = frontmatter;

  const rsvpAgainButton = <Row className="justify-content-center"><Button variant="link" onClick={() => setRSVPDone(false)}>{rsvpAgainButtonLabel}</Button></Row>

  return (
    <PageSection className={className} id={anchor}>
      <Row className="justify-content-center">
        <SectionHeader header={header} subheader={isRSVPDone? rsvpDoneSubheader: subheader} />
      </Row>
      {isRSVPDone ? rsvpAgainButton : <RSVPForm frontmatter={frontmatter} handleRSVPSuccess={handleRSVPSuccess}/>}
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
