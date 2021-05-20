import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { Navbar, Container } from "react-bootstrap";

import "./NavbarAlt.scss";

const MyNavbar = ({ frontmatter, extraItems }) => {
  const { brand } = frontmatter;

  const [expanded] = React.useState(false);

  return (
    <Navbar
      className={clsx("navbar-alt-root")}
      variant="primary"
      expand="lg"
      fixed="top"
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand className="cursor-pointer" href="../">
          {brand}
        </Navbar.Brand>
        {extraItems}
      </Container>
    </Navbar>
  );
};

MyNavbar.propTypes = {
  frontmatter: PropTypes.object,
  extraItems: PropTypes.any,
};

MyNavbar.defaultProps = {
  frontmatter: {},
  extraItems: null,
};

export default MyNavbar;
