// 36 app.js
// 35

import React from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useSetCurrentUser } from "../../context/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";


const SignInForm = () => {
  // 38 and import useContext and SetCurrentUserContext. Avile before 43
  // const setCurrentUser = useContext(SetCurrentUserContext);

  // 44 navbar
  // 43 and import
//   We called our custom useSetCurrentUser  hook in SignInForm to be able to update  
// the current user data on successful login.
  const setCurrentUser = useSetCurrentUser();
  // 118 signupform
  // 117 and below
  // So, in the SignInForm component, we’ll auto-import our useRedirect
// hook at the top of our component code. And pass it the “loggedIn” string,
// as we want to redirect our users away from this page if they are already logged in.
  useRedirect("loggedIn");
  // /117

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  //  before 38
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     await axios.post("/dj-rest-auth/login/", signInData);
  //     history.push("/");
  //   } catch (err) {
  //     setErrors(err.response?.data);
  //   }
  // };

  // 39 navbar component
  // 38 after
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      // 127 currentusercontext
      // 126
      setTokenTimestamp(data);
//       In the handleSubmit function, we’ll auto-import the setTokenTimestamp function
// and call it with the data object returned by the API on successful sign in.
// Now this function should extract the expiry date from the access token
// and save it to the user's browser in local storage.
      // /126
      // before 117
      // history.push("/");
      // after 117
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign in</h1>

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
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Sign In
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
          </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero.jpg"}
        />
      </Col>
    </Row>
  );
};

export default SignInForm;
