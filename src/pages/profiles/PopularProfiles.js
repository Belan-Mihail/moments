// 92 postspage.js
// 91

import React, { useState, useEffect } from "react";
import appStyles from "../../App.module.css";
import { Container } from "react-bootstrap";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";

const PopularProfiles = () => {
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
    <Container className={appStyles.Content}>
      {popularProfiles.results.length ? (
        <>
          <p>Most followed profiles.</p>
          {popularProfiles.results.map((profile) => (
            <p key={profile.id}>{profile.owner}</p>
          ))}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
