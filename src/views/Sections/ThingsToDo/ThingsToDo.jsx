import React from "react";
import PropTypes from "prop-types";

import { Row, Col } from "react-bootstrap";

import TodoItem from "components/TodoItem";
import SectionHeader from "components/SectionHeader";
import PageSection from "components/PageSection";

const ThingsToDo = ({ className, frontmatter }) => {
  if (!frontmatter) {
    return null;
  }

  const { anchor, header: rootHeader, subheader: rootSubHeader, thingsToDo } = frontmatter;

  return (
    <PageSection className={className} id={anchor}>
      <Row>
        <SectionHeader header={rootHeader} subheader={rootSubHeader} />
      </Row>
      <Row className="text-center">
        {thingsToDo.map((todo) => (
          <Col md={4} key={todo.title} className="todo-item">
            <TodoItem {...todo} />
          </Col>
        ))}
      </Row>
    </PageSection>
  );
};

ThingsToDo.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

ThingsToDo.defaultProps = {
  className: null,
  frontmatter: null,
};

export default ThingsToDo;
