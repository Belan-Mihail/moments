// 56 app js
// 55 started cod

import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Alert from "react-bootstrap/Alert";
import { useRedirect } from "../../hooks/useRedirect";

function PostCreateForm() {
  // create mocks folder in src and handlers.js
// 120 npm install msw --save-dev
// 119
useRedirect("loggedOut");
// /119
  const [errors, setErrors] = useState({});

  //   60 and below
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const { title, content, image } = postData;

  //   61 and below
  //   In this video, we’ll take care of  sending our form data to our API.
  // To do this, we need to create a  reference to our Form.File component
  // so that we can access the image  file when we submit our form.
  // Can you remember which react hook we used  before to create a reference to a component?
  // !!!!!! If you answered useRef, you’re correct!
  const imageInput = useRef(null);
  //   We'll first define the history variable by  using and importing the useHistory hook,
  // so that we can redirect our users.
  const history = useHistory();
  //   /61

  //   60
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  //   60
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

  //   61 and below
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Then, we’ll instantiate a formData object instance
    // and append all three relevant pieces of  data: title, content and image.
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    //     To send our image file, we’ll need to  access the referenced imageInput component,
    // and reach in to get the first file in  the current attributes files array.
    formData.append("image", imageInput.current.files[0]);

    try {
      //         Because we are sending an image file as  well as text to our API we need to refresh
      // the user's access token before we make a  request to create a post. For this, we’ll
      // import and use the axiosReq instance and post  the formData to the posts endpoint of our API.
      const { data } = await axiosReq.post("/posts/", formData);
      //   Our API will respond with data about our newly  created post, including its id. We can create
      //   a unique url for the new post by adding the  post id to our posts/ url string. So let's
      //   put that inside a history.push() method to redirect our  user to the page for their newly created post.
      history.push(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };
  // /61

  const textFields = (
    <div className="text-center">
      {/* 60 up */}
      {/* 59 */}
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          //   60
          value={title}
          onChange={handleChange}
          //   /60
        />
      </Form.Group>
      {/* 63 create PostPage.js in post folder */}
      {/* 62 and below */}
      {errors.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* /62 */}
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          //   60
          value={content}
          onChange={handleChange}
          //   /60
        />
      </Form.Group>
      {/* 62 and below */}
      {errors.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* /62 */}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Main}`}
        // 61 and below
        //         Finally, let’s wire up our cancel  button to take our user back to the
        // previous page in their browser history. On our cancel button we’ll add an onClick
        // attribute set to an arrow function that  calls goBack on our history object.
        // we’re  redirected back to the last page we were on.
        onClick={() => history.goBack()}
        // / 61
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Main}`} type="submit">
        create
      </Button>
    </div>
  );

  //   before 60
  //   return (
  //     <Form>
  //       <Row>
  //         <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
  //           <Container
  //             className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
  //           >
  //             <Form.Group className="text-center">
  //               <Form.Label
  //                 className="d-flex justify-content-center"
  //                 htmlFor="image-upload"
  //               >
  //                 {/* 59 up to text fields const */}
  //                 {/* 58 replace ASSET with <Asset /> component and import */}
  //                 {/* ASSET */}
  //                 <Asset src={Upload} message="Click or tap to upload an image" />
  //               </Form.Label>
  //             </Form.Group>
  //             <div className="d-md-none">{textFields}</div>
  //           </Container>
  //         </Col>
  //         <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
  //           <Container className={appStyles.Content}>{textFields}</Container>
  //         </Col>
  //       </Row>
  //     </Form>
  //   );

  // after 60
  return (
    // 61 onSubmit={handleSubmit} and below>
    <Form onSubmit={handleSubmit}>
      {/* / 61 */}
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8} data-aos="fade-right" data-aos-duration="1000">
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {/* Ok, now let’s add the logic  to display our image preview. 
Inside the Form.Group in our return statement,  
we’ll add a ternary to show a preview of the  user's image if they have chosen one. 
Otherwise,  we’ll show the upload icon and  message we already have here. */}
              {image ? (
                <>
                  <figure>
                    {/* Inside our figure we’ll add and import  a react-bootstrap Image component  
and set its className to appStyles.Image.  
It’s src will be the image  attribute of the postData object.  
And we’ll add the rounded prop, which Bootstrap  will use to add rounded corners to our image. */}
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                // 61
                ref={imageInput}
                // /61
              />
            </Form.Group>
            {/* 62 */}
      {errors.image?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* /62 */}
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

export default PostCreateForm;
