// 72 app.js
// 71

import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";

// 71
// function PostsPage() {

//   return (
//     <Row className="h-100">
//       <Col className="py-2 p-0 p-lg-2" lg={8}>
//         <p>Popular profiles mobile</p>
//         <p>List of posts here</p>
//       </Col>
//       <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
//         <p>Popular profiles for desktop</p>
//       </Col>
//     </Row>
//   );
// }

// export default PostsPage;

// 73
function PostsPage({ message, filter = "" }) {
  // We’ll need to store posts in an object, inside  a results array that will originally be empty,
  // just like we did in the PostPage component.
  const [posts, setPosts] = useState({ results: [] });
  // As it will take a moment for the posts to load,
  // it also makes sense to keep track of whether  or not all the data has been fetched.
  // We can use this to show a loading spinner  to our users as they wait for posts to load.
  const [hasLoaded, setHasLoaded] = useState(false);
  // We’ll also have to re-fetch posts again when  the user clicks between the home, feed and
  // liked pages. To detect the url change, we’ll  auto-import the useLocation react router hook.
  // The useLocation hook comes  from the react-router library,
  // and returns an object with data about  the current URL that the user is on.
  // We need to know this to detect if the user has  flicked between home, feed and liked pages.
  const { pathname } = useLocation();

  // now take care of the API request to fetch our posts.
  // To do this, we’ll have to make our API  request using the filters for each of our pages,
  // we’ll only show the posts relevant to that  filter, or show a loading icon when necessary.

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // The request string will contain our filter  parameter, which comes from the filter prop
        // we set in our routes.
        const { data } = await axiosReq.get(`/posts/?${filter}`);
        setPosts(data);
        // We’ll also set the hasLoaded variable to true,  so that the Spinner is no longer displayed.
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    //     As the code will run every time either of these  two values change, we’ll also have to setHasLoaded
    // to false before we fetch the posts, so that our  loading spinner will be displayed to our users
    setHasLoaded(false);
    fetchPosts();
    // Let’s call the fetchPosts function and think  about when we would like this code to run.
    // Well, we should run this effect every  time the filter or pathname change,
    // so we’ll put these inside this  useEffect’s dependency array.
  }, [filter, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        {/* First, we’ll check if the data has been loaded,  if it hasn’t we’ll show our loading spinner. (str 108)*/}
        {hasLoaded ? (
          <>
          {/* Then, if our data has loaded, inside a fragment,  we‘ll create a second ternary to either display  
our posts or show a message. So we’ll check if  the results array in our state has a length, 
If  it doesn’t we’ll show our no results message. 102*/}
            {posts.results.length ? (
              posts.results.map((post) => (
                // We’ll map over the posts.results array.  
// For each, we’ll return our Post component, which  we need to auto-import.
// We’ll give it a key, spread the post object and pass the setPosts  
// function so that the users  can like and unlike the posts.
                <Post key={post.id} {...post} setPosts={setPosts} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                {/* Pass it a src prop of the NoResults image, and the 
                 message prop we passed to our PostsPage component. */}
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default PostsPage;
