// 33 app.js
// 32
import React from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
  // 119 postcreateform.js
  // 118 and 
useRedirect("loggedIn");
// /118
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;
  
  const [errors, setErrors] = useState({});

  const history = useHistory();

//   First, we’ll have to spread the previous  signUpData so that we only need to update our  
// relevant attribute. For this, we’re going to use  the computed property name JavaScript feature  
// on event-dot-target-dot-name and set  it to event-dot-target-dot-value.
// Essentially this line creates a key value  pair, with the key being the input field name,  
// and the value being the value entered by the user.  This line means that we can reuse this function  
// to handle changes to any of our input fields,  instead of writing separate handlers for each one.
const handleChange = (event) => {
  setSignUpData({
    ...signUpData,
    [event.target.name]: event.target.value,
  });
}

//   After a successful registration, we should  be redirected to the ‘/signin’ page.  
// Luckily for us, it is very easy to  achieve. Let’s create a new variable  
// called history and call the useHistory  hook that comes with react-router.
  

//   It will be an async function that  accepts the event as an argument.  
// Inside, we’ll call preventDefault  so that the page doesn’t refresh.
// Next, inside a try-catch block,  
// we’ll post all the signUpData to the endpoint  in our API application for user registration,  
// which is /dj-rest-auth/registration/.

//       We’ll call the useState hook with an  empty object, where we will store all the errors.
// Back in the catch block, we’ll set  the errors to err.response?.data.
// This code with the question mark is called  optional chaining. What it does is check if  
// response is defined before looking for the data.  So if response isn’t defined, it won’t throw an error.

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6} data-aos="fade-right" data-aos-duration="2000">
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Now that we are storing the errors in the state,  
we can display them to the user when  something goes wrong. We’ll use the  
Alert bootstrap component to display any  error messages.
What we’ll have to do is map over the array  of errors for each key in the error state. 
To do this we’ll use conditional chaining  again to check if the username key is in the  
errors object, and if so, then produce our Alerts.  We’ll use that dropdown trick again to import this  
Alert component as we use it. We’ll give our Alert  a variant of warning so react-bootstrap will give  
it a yellow color. And we’ll add a key set to index.  Inside our alert, we’ll render the error message. */}
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.SignButton}`}
              
              type="submit"
            >
              Sign Up
            </Button>
            {/* The last piece of feedback we have to add is  for the so-called non-field-errors, such as when  
the passwords don’t match. So under the submit  button, I’ll add the Alerts for non_field_errors.   */}
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
        data-aos="fade-left" data-aos-duration="2000"
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero2.jpg"}
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;
