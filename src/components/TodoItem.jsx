import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import "./TodoItem.scss";

const TodoItem = ({ title, url, address, description }) => {
  return (
    <a className={clsx("todo-item")} href={url} target="_blank" rel="noopener noreferrer">
      <div className={clsx("todo-item-div")}>
        <h4 className="todo-item-heading">{title}</h4>
        <p className="todo-item-address text-muted">{address}</p>
        <p className="todo-item-description">{description}</p>
      </div>
    </a>
  );
};

TodoItem.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  address: PropTypes.string,
  description: PropTypes.string,
};

TodoItem.defaultProps = {
  title: "",
  url: "",
  address: "",
  description: "",
};

export default TodoItem;
