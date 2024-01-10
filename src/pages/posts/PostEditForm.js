// 81 app.js
// 80

import React, { useRef, useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router";

function PostEditForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    post_category: "",
  });

  const { title, content, image, post_category } = postData;

  //   In this video, we’ll take care of  sending our form data to our API.
  // To do this, we need to create a  reference to our Form.File component
  // so that we can access the image  file when we submit our form.
  // Can you remember which react hook we used  before to create a reference to a component?
  // !!!!!! If you answered useRef, you’re correct!
  const imageInput = useRef(null);
  //   We'll first define the history variable by  using and importing the useHistory hook,
  // so that we can redirect our users.
  const history = useHistory();
  //   So, inside our component, we’ll  destructure the id from our url
  // by using and auto-importing the useParams hook.
  const { id } = useParams();

  //   Next, let’s set up our useEffect hook  to handle our API request using the
  // id parameter we just accessed.
  useEffect(() => {
    const handleMount = async () => {
      try {
        // Inside the try block,
        // we’ll use the axiosReq instance to get the  data about our post, passing the id into
        // the request string. And we’ll destructure  the response into the data variable here.
        const { data } = await axiosReq.get(`/posts/${id}/`);
        //         Assuming there are no errors, we can destructure  the data we received back from the API, so we’ll
        // get the post title, content, image and a value for  if the logged in user is the owner of the post.
        const { title, content, image, is_owner, post_category } = data;

        //         However, a better user experience, and a more  secure looking website, would only allow the post
        // owner to access the edit post page in the first  place, and would redirect any other users away.
        // So we can add this functionality with  a quick ternary that checks if the user
        // is the post owner. If so, the postData will be  updated with the data destructured above so that
        // the input fields can be populated on mount.
        // In the second part of our ternary, if the
        // user isn’t the post owner, we’ll send them  back to the home page of our website instead.
        is_owner ? setPostData({ title, content, image, post_category }) : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    // Inside we’ll check if the user
    // has chosen a file to upload by checking  if there is a file in the files array.
    if (event.target.files.length) {
      // In case our user decides to change  their image file after adding one,
      // we also need to call URL.revokeObjectURL to clear  the browser's reference to the previous file.
      // this work after setPostData
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        // and then set the image
        // attribute’s value using URL.createObjectURL  and pass it the file in the files array.
        // URL.createObjectURL creates a local  link to the file passed into it.
        // To access the file that has just been chosen, we  have to access the files array on event.target
        // and choose the first one.
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Then, we’ll instantiate a formData object instance
    // and append all three relevant pieces of  data: title, content and image.
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("post_category", post_category);
//     We are using the state to display  our image preview to the user,  
// so our file input element won't have a file  in it unless our user uploads a new image.
// So we first need to check if the imageInput  element has a file in it, before we try to  
// append it to the formData. If it doesn't, the  original file will stay in place in our API.
    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
//         Next, let's take a look at  our API request. At the moment  
// it creates a new post using the post() method.  But we need to change this to a put() method,  
// so we can update an existing post  instead of creating a new one.
// And we’ll pass our post id into the API request  string so it knows which post to update. 
      await axiosReq.put(`/posts/${id}/`, formData);
    //   In our redirect, we can also  use the id to redirect the user  
    //   back to the post they just edited
      history.push(`/posts/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

<Form.Group controlId="post_category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="post_category"
          value={post_category}
          onChange={handleChange}
        >
          <option>landscapes</option>
          <option>animals</option>
          <option>plants</option>
          <option>abstraction</option>
          <option>other</option>
          
        </Form.Control>

      </Form.Group>
      {errors?.post_category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Main}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Main}`} type="submit">
        update
      </Button>
    </div>
  );

//   Finally, let’s take a look at our JSX code in the  return statement to see if we can simplify the code.
// As this is an edit page, there isn’t any  need for our ternary here to display the upload icon.
// So we’ll remove the ternary code with  its upload icon asset and the React Fragment. 
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8} data-aos="fade-right" data-aos-duration="1000">
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Main} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2" data-aos="fade-left" data-aos-duration="1000">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostEditForm;
