// 68 PostPage.js
// 67

import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Post = (props) => {
  //     Back in Post.js, we’ll destructure the props from our post results, passed from the parent component.
  // Our post component will behave differently depending on if the currentUser is the owner of the post or not.
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts,
  } = props;

  //   So we’ll define a currentUser variable using the useCurrentUser hook exported from the
  // currentUserContexts file.
  const currentUser = useCurrentUser();
  //   And using that variable we’ll check if the owner of the post matches the currentUser’s
  // username, and assign the returned boolean value to the is_owner variable.
  const is_owner = currentUser?.username === owner;
  // 80 create PostEditForm.js in posts
  // 79 and below
  const history = useHistory();

//   Great! Now, we’ll define a  handleEdit arrow function  
// that will redirect the post  owner to the url /posts/:id/edit.  
// As you’ll remember, this id variable holds the  id of the specific post the user wants to edit.
const handleEdit = () => {
  history.push(`/posts/${id}/edit`);
};

const handleDelete = async () => {
  try {
    await axiosRes.delete(`/posts/${id}/`);
    history.goBack();
  } catch (err) {
    console.log(err);
  }
};

// /79 and below

  // 70 create posts.module.css 
//   69 and below change onclick functions
const handleLike = async () => {
    try {
        // Inside a try-catch block, we’ll make a post request with the axiosRes instance
// to the likes endpoint with the post id, so that the API knows which post
// the user is trying to like.
      const { data } = await axiosRes.post("/likes/", { post: id });
    //   So after our API request we’ll write our setPosts code to update the post data.
// At the moment we’re just reaching out for a single post for our Post page, however,
// our Post component will also live in pages where we’ll display multiple posts one after another.
// So eventually this function will have to handle checking if it has
// the right post id before applying the like to it.

// Now, using setPosts, we’ll pass it a function with the prevPosts argument.
// Inside we’ll spread the previousPosts in the object and update the results array only.
      setPosts((prevPosts) => ({
        ...prevPosts,
//         We’ll map over it, and inside, we’ll use a ternary to check if post id matches the
// id of the post that was liked. If it does match, we’ll return the post object with
// the likes count incremented by one, and the like_id set to the id of the response data.
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            // If the id doesn’t match, we’ll just return the post and we won’t do anything with it
// so that our map can move on to the next post in the prevPosts results array.
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

// /69

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {/* Back in our div, under the span, we’ll check if the currently logged in user is the owner,
and if the postPage prop exists, if so, then we know we want to display the edit and delete options for our user.
For now we’ll just put three dots as a placeholder to check our logic works */}
            {/* before 79 */}
            {/* {is_owner && postPage && "..."} */}
            {/* after 79 */}
            {is_owner && postPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {/* We'll check if the title and content props have been passed before we render the respective Bootstrap components. */}
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
            {/* However, this icon will behave differently depending on different types of users.
So we’ll use a ternary here inside our div to display our icon in different ways. 
First, we’re not going to allow a user to like their own post.
So we’ll check if the currentUser owns the post, if they do we’ll display a tooltip
that says that they can’t like their own posts. To do that we’ll use and import the OverlayTrigger and Tooltip components from Bootstrap.*/}
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
            // Then in the second part of our ternary, if the currentUser isn’t the owner of the post, our ternay will then check if a like_id exists.
// If it does, that means our user has already liked the post.
// So we’ll create a span with an onClick attribute set to an empty arrow function for now.
          ) : like_id ? (
            // function for handle unliking the post (now empty)
            // before 69
            // <span onClick={() => {}}>
            // after 69
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
            // In the next part of our ternary, we want to check if the user is logged in, and if they are we’ll give them the ability to like the post.
          ) : currentUser ? (
            // function for handle liking the post (now empty)
            // before 69
            // <span onClick={() => {}}>
            // after 69
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
            // In the final part of our ternary we can display the like icon for a user who is not logged in.
            // Again, we’ll use the OverlayTrigger and Tooltip to display the message “Log in to like posts!” if they click the like icon.
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          {/* The comments icon will link to that post’s page, so we’ll use the Link component with
its “to” prop set to /posts/ and the id of the post. */}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
