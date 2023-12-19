// 88 create CommentEditForm.js
// 87

import React, { useState } from "react";
import styles from "../../styles/Comment.module.css";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";
// 90 PostPage.js
// 89 and below
import CommentEditForm from "./CommentEditForm";
// /89

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
  } = props;

  // 89 and below
  const [showEditForm, setShowEditForm] = useState(false);
  // /89

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      // Inside the try block, we’ll auto-import and use  the axiosRes instance to make a delete request
      // to the /comments/:id endpoint, so we’ll pass  in the id of the comment we want to delete.
      await axiosRes.delete(`/comments/${id}/`);
      //   Inside the array, we’ll spread the previous  post object and reduce its comments_count by one.
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      //           So, we’ll call the setComments function and return  an object, where we’ll only update the results array.
      // We want to remove the comment that matches  our id here. So we’ll call the filter function to
      // loop over the previous comments’ results array.  If the id is for the comment we want to remove,
      // our filter method will not return  it into the updated results array.
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {}
  };

  //   before 89
  // return (
  //     <div>
  //       <hr />
  //       <Media>
  //         <Link to={`/profiles/${profile_id}`}>
  //           <Avatar src={profile_image} />
  //         </Link>
  //         <Media.Body className="align-self-center ml-2">
  //           <span className={styles.Owner}>{owner}</span>
  //           <span className={styles.Date}>{updated_at}</span>
  //           <p>{content}</p>
  //         </Media.Body>
  //         {is_owner && (
  //             <MoreDropdown
  //             handleEdit={handleEdit}
  //             handleDelete={handleDelete}
  //             />
  //           )}
  //       </Media>
  //     </div>
  //   );

  // after 89
  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Comment;
