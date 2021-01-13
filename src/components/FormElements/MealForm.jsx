import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Form, Button, ButtonGroup, Row, Col, Carousel } from "react-bootstrap";

import "./MealForm.scss";

const MealForm = ({ input, callback, goBack }) => {
  const [starter, setStarter] = useState("");
  const [main, setMain] = useState("");
  const [dessert, setDessert] = useState("");

  const [index, setIndex] = useState(0);
  const [output, setOutput] = useState({});

  const handleGoBack = () => {
    if (index === 0) goBack();
    else {
      // Remove response
      output.responses.pop();
      setIndex(index - 1);
    }
  };

  const submit = (e, name) => {
    e.preventDefault();
    // Save data to output
    if (!output.responses) output.responses = [];

    if (output.responses.length >= input.responses.length) {
      // Dealing with duplicate last element when coming back from next form element
      while (output.responses.length > input.responses.length - 1) output.responses.pop();
    }

    output.responses = [
      ...output.responses,
      {
        name,
        accepted: true,
        food: {
          starter,
          main,
          dessert,
        },
      },
    ];

    setOutput(output);
    console.log(output);

    if (index === input.acceptCount - 1) {
      output.leader = input.leader;
      output.acceptCount = input.acceptCount;
      output.code = input.code;
      output.email = input.email;

      output.responses = [
        ...output.responses,
        ...input.responses.filter((response) => !response.accepted),
      ];
      console.log(output);
      // Call callback function with data response
      callback(output);
    } else {
      // Next page
      setIndex(index + 1);
    }
  };

  if (input && input.responses) {
    return (
      <Carousel
        className="meal_form"
        activeIndex={index}
        onSelect=""
        controls={false}
        indicators={false}
        nextLabel={null}
      >
        {input.responses.map((person) =>
          person.accepted ? (
            <Carousel.Item key={person.name}>
              <Form onSubmit={(e) => submit(e, person.name)}>
                <h5>Please select the meal choices for {person.name}:</h5>
                <Form.Group>
                  <Form.Label>Starter</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    required
                    onChange={(e) => setStarter(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Please select
                    </option>
                    <option>Garlic Bread</option>
                    <option>Purple Soup</option>
                    <option>Chicken</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Main</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    required
                    onChange={(e) => setMain(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Please select
                    </option>
                    <option>Yum yum</option>
                    <option>Delicious Pie</option>
                    <option>Orange Apple</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Dessert</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    required
                    onChange={(e) => setDessert(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Please select
                    </option>
                    <option>Kentucky Friend Chicken</option>
                    <option>Something tasty</option>
                    <option>A big stick</option>
                  </Form.Control>
                </Form.Group>
                <Form.Row>
                  <Button className="back" variant="secondary" onClick={handleGoBack}>
                    Back
                  </Button>
                  <Button className="next" variant="primary" type="submit">
                    Next
                  </Button>
                </Form.Row>
              </Form>
            </Carousel.Item>
          ) : null,
        )}
      </Carousel>
    );
  }
  return null;
};

MealForm.propTypes = {
  callback: PropTypes.func,
  input: PropTypes.object,
  goBack: PropTypes.func,
};

MealForm.defaultProps = {
  callback: null,
  goBack: PropTypes.func,
  input: null,
};

export default MealForm;
