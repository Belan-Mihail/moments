// 64 app.js
// 63
import React, { useState, useEffect } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
// 85 below
// 84 and below
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../context/CurrentUserContext";
import Comment from "../comments/Comment";

// /84
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

function PostPage() {
  // 66 create post.module.css in styles folder
  // 65 and import
  //   The way to access URL parameters
  // using the react router library is to use and  auto-import the useParams hook and destructure
  // it in place with the name of the parameter  that we set in the route, which was ‘id’.
  const { id } = useParams();
  //   So, to make all the future logic compatible with  arrays of posts, we’ll set the initial value to an
  // object that contains an empty array of results.  That way, we can always operate on the results
  // array, regardless of whether we get a single  post object or an array of posts from the API.
  const [post, setPost] = useState({ results: [] });

  // 84 and below
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });
  // /84

  useEffect(() => {
    // to fetch the post on mount, I’ll  define the handleMount async function.
    const handleMount = async () => {
      // However, this time our code will
      // be slightly different. Because eventually we’re  going to make two requests here.  One for a post,
      // and another for its comments.
      try {
        //         Here we are destructing the data property returned  from the API and renaming it to post, later
        // we’ll need to destructure a second property for our  comments data, which we’ll rename to comments.
        // This renaming of an object key will be new to  you and it is another nice destructuring feature,
        // allowing us to give our  variable a more meaningful name.
        // before 85
        // const [{ data: post }] = await Promise.all([
        //   axiosReq.get(`/posts/${id}`),
        // ]);
        // Ok, we’ll use the setPost function to update the  results array in the state to contain that post.
        // So that we can check it’s all working,  we’ll log the post to the console.
        // before 85
        // setPost({ results: [post] });
        // console.log(post);

        // after 85
        // Now, we can destructure the data  from the 2nd API request up here
        // next to the data we got about the post.  This time we’ll rename the data to comments.
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          // So inside the Promise.all() here, we’ll add the  axiosReq code to fetch comments for this post.
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        // Under setPost, we’ll call the setComments  function so that the state can be updated
        // and comments can be displayed to our users.
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };
    // Now, let’s call our handleMount function and run this code every time the  post id in the url changes.
    handleMount();
  }, [id]);
  // /65

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        {/* 69 post.js */}
        {/* 68 change placholder text to <Post /> */}
        {/* <p>Post component</p> */}
        {/* Inside it, we’ll spread the post object from the results array so that its key value
pairs are passed in as props. 
We’ll also pass the setPost function in the setPosts prop, which we will use later
to handle our likes.
So, we need to pass our Post component a prop from the PostPage.
Notice that we don’t need to give our postPage prop a value here, simply applying it means
it will be returned as true inside our Post component.*/}
        <Post {...post.results[0]} setPosts={setPost} postPage />
        {/* /68 */}
        {/* before 84 */}
        {/* <Container className={appStyles.Content}>Comments</Container> */}
        {/* after 84 */}
        <Container className={appStyles.Content}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : // 86 create Comment.module.css
          // before 85
          // ) : comments.results.length ? (
          //   "Comments"
          // ) : null}
          // after 85 and import import Comment from "../comments/Comment";
          comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            // 91 create profiles folder in src/pages and PopularProfiles.js
            // 90 (before without children={} and infinitescroll props)
            <InfiniteScroll
            children={comments.results.map((comment) => (
              // We’ll also spread the comment  object so that its contents are passed as props.
              <Comment
                key={comment.id}
                {...comment}
                setPost={setPost}
                setComments={setComments}
              />
            ))}
            dataLength={comments.results.length}
            loader={<Asset spinner />}
            hasMore={!!comments.next}
            next={() => fetchMoreData(comments, setComments)}

            />
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
          {/* /85 */}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default PostPage;
