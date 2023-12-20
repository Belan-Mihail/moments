// 92 postspage.js
// 91

import React, { useState, useEffect } from "react";
import appStyles from "../../App.module.css";
import { Container } from "react-bootstrap";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import Profile from "./Profile";

// 95 Profile.module.css and Profile.js in pages/profiles
// 94 add { mobile } and below
const PopularProfiles = ({ mobile }) => {
  const [profileData, setProfileData] = useState({
    // we will use the pageProfile later!
    pageProfile: { results: [] },
    // We’ll pass the useState hook an  object that has a popularProfiles attribute.
    // We’ll set popularProfiles to an object  with an empty results array inside.
    popularProfiles: { results: [] },
  });

  //   Now we have our profileData object defined,
  // we’ll need to destructure the  popularProfiles attribute from it.
  const { popularProfiles } = profileData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        // As you can see here, we’re fetching them in the  descending order of how many followers they have,
        // so the most followed profile will be at the top
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          // Inside, we’ll spread the previous  state, which you’ll remember
          // will eventually include the pageProfile  data as well as our popularProfiles.
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    // before 94
    // <Container className={appStyles.Content}>
    // after 94
    // Next, let’s adjust the styling of our container  by adding a check if the mobile prop exists,  
// and if it does, we’ll add the  bootstrap classes d-lg-none text-center  
    <Container className={`${appStyles.Content} ${
      mobile && "d-lg-none text-center mb-3"
    }`}>
      {popularProfiles.results.length ? (
        <>
        {/* before 94 */}
          {/* <p>Most followed profiles.</p>
          {popularProfiles.results.map((profile) => (
            <p key={profile.id}>{profile.owner}</p>
          ))} */}
          {/* after 94 */}
          {/* On mobile, they’ll display next  to each other, and we’ll only show the first 4.
Whereas in desktop view, we’ll display  up to 10 profiles, one on top of another. */}
{/* So underneath our most followed profiles  paragraph, let’s create a ternary where  
we’re mapping over popularProfiles and check  for the mobile prop again. If it is defined,   */}
          {mobile ? (
            <div className="d-flex justify-content-around">
              {/* On mobile, they’ll display next  to each other, and we’ll only show the first 4. */}
              {popularProfiles.results.slice(0, 4).map((profile) => (
                // 97 ProfileDataContext.js in context
                // before 96
              // <p key={profile.id}>{profile.owner}</p>
              // after 96
              // As before, we’ll pass it a key of the profile id,  and pass in the profile data itself as a prop.  
// For our component in the mobile view  we’ll pass in a mobile prop too,  
// so that we can hide the  follow button in this view. 
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            popularProfiles.results.map((profile) => (
              // before 96
              // <p key={profile.id}>{profile.owner}</p>
              // after 96 without mobile prop
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
