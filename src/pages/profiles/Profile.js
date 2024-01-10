// 96 PopularProfile.js
// 95

import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../../context/ProfileDataContext";


const Profile = (props) => {
  
  // Then  we’ll destructure the profile and mobile props,
  // we’ll also add a new variable of imageSize which  we’ll use for the profile picture in the Avatar.
  // And we’ll give this variable  a default value of 55.
  const { profile, mobile, imageSize = 55 } = props;
  // Next we need to access the data within the profile  object, so we’ll destructure the id, following_id,
  // image and owner variables from it.
  const { id, following_id, image, owner, greeting } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  // 104 utils.js
  // // 103
  // let’s go to the Profile.js file so that we can add our handleFollow function to our follow button there, too.
// To access that, we’ll auto-import and call the useSetProfileData hook and destructure the handleFollow function.
  // 109 PostPage
// 108 handleUnfollow and below
  const { handleFollow, handleUnfollow } = useSetProfileData()
  // /103

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      
        {/* And we’ll set its  
“to” prop to link to the user’s profile page by  including the profile id in the template string */}
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} greeting={greeting} />
        </Link>
      
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      {/* Ok, now let’s work on displaying the follow  and unfollow buttons. Similar to the like and  
unlike buttons, we’ll have to check if the user  is logged in and if they're following a profile already. */}
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {/* We are only going to show our follow/unfollow  buttons in the desktop version of the  
PopularProfiles component. We also only want to  show these buttons to users who are logged in.  
Finally, we don’t want to show a follow button to  a user when the profile displayed is their own.
So let’s add some logic for  these conditions. */}

        {/* Inside the div, we’ll add the not-mobile condition to check  if we are on desktop, then we’ll check if  
the currentUser exists so we know our user is  logged in. And finally, we’ll also check if the  
user is not the owner of the profile because  our users won’t be able to follow themselves. */}

{/* Well, if the logged in user has  followed the profile, then a following_id prop  
from our API response won’t be null, so we can use  this in a ternary. If the following_id does exist,  
we'll display our unfollow button,  auto-importing that from react-bootstrap.  
And if the following_id doesn’t  exist we’ll show the follow button.
We’ve worked with logical operators in JSX,  and ternarys before, but this is the first time  
we’ve combined them in our conditional logic.  So if you’re finding this code confusing we’d   */}
        {!mobile && currentUser && !is_owner && (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Unfollow}`}
              // before 108
              // onClick={() => {}}
              // after 108
              onClick={() => handleUnfollow(profile)}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Follow}`}
              // before 103
              // onClick={() => {}}
              // after 103
              onClick={() => handleFollow(profile)}
            >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
