import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { Navbar, Container, Nav } from "react-bootstrap";

import useSmoothScrollTo from "hooks/useSmoothScrollTo";
import Icon from "components/Icon";
import NavItem from "components/NavItem";

import "./NavbarAlt.scss";

const MyNavbar = ({ anchors, frontmatter, extraItems }) => {
  const { brand, menuText } = frontmatter;

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
  anchors: PropTypes.arrayOf(PropTypes.string),
  frontmatter: PropTypes.object,
  extraItems: PropTypes.any,
};

MyNavbar.defaultProps = {
  anchors: [],
  frontmatter: {},
  extraItems: null,
};

export default MyNavbar;
