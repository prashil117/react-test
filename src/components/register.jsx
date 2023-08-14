import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import Select from "react-select";
import "./register.css";

const skills = [
  { value: "react", label: "React" },
  { value: "vuejs", label: "Vue.js" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
  { value: "javascript", label: "JavaScript" },
  { value: "nodejs", label: "Node.js" }
];

const initialState = {
  name: "",
  email: "",
  password: ""
};

const Register = ({onSubmit}) => {
  const [state, setState] = useState(initialState);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const allFieldsEntered = Object.keys(state).every(
      (key) => state[key].trim() !== "");
    if (allFieldsEntered) {
      onSubmit(allFieldsEntered)
    }else{
      console.log("error")
    }
  };

  return (
    <div className="registration">
      <div className="container">
        <h2 className="title">Register</h2>
        <Form onSubmit={handleFormSubmit}>
          <h6 className="subtitle">
            Register Form
          </h6>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={state.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={state.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={state.password}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Button variant="primary" disabled={!state.name ||!state.email ||!state.password} type="submit">
              Register
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Register;
