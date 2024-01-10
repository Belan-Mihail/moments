// 100 app.js
// 99

import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Button, Image } from "react-bootstrap";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../context/CurrentUserContext";
import {
  useProfileData,
  useSetProfileData,
} from "../../context/ProfileDataContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Post from "../posts/Post";
import { ProfileEditDropdown } from "../../components/MoreDropdown";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  // 103 Profile
  // 102
  // const setProfileData = useSetProfileData();
  // after 102
  // 108 profile.js
  // 107 add handleUnfollow and below
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  //   Now that we’ve written our API request, let’s start rendering our data in the browser. To access
  // the pageProfile data, we’ll destructure it when we call and auto-import the useProfileData hook.
  const { pageProfile } = useProfileData();
  // Let’s also destructure the single profile object from the results array.
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        //             Inside the try-block, we'll destructure the data returned and rename it to page profile.
        // We'll use promise.all again just like we did back in the code for post page.
        // There, we fetched the post and its comments. Here, we’ll be fetching the user profile and their posts
        // in a later unit. So, in the array we’ll make the request to the /profiles/:id/ endpoint with the
        // auto-imported axiosReq instance.
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        //   If everything goes well, we’ll need to update the pageProfile data.
        // To access it, we’ll define the setProfileData function by
        // auto-importing the useSetProfileData hook that we built in the last unit.
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      {/* 112 create  UsernameForm.js in profiles */}
      {/* 111 */}
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      {/* /111 */}
      <Row noGutters className="justify-content-center">
        <Col className={styles.Card}>
          <Col className={styles.Front} data-aos="zoom-in" data-aos-duration="1000">
            <Image
              className={styles.ProfileImage}
              roundedCircle
              src={profile?.image}
            />
            <h3 className="m-2">{profile?.owner}</h3>
            <div className={styles.ProfileInfoFront}>
              <div>
                <p>posts</p>
                <p>followers</p>
                <p>following</p>
              </div>

              <div>
                <p>{profile?.posts_count}</p>
                <p>{profile?.followers_count}</p>
                <p>{profile?.following_count}</p>
              </div>
            </div>
          </Col>
          <Row className={styles.Back}>
            <span className="text-center m-2">Bio</span>
            {profile?.content && <Col className={styles.Content}>{profile.content}</Col>}

            <Col className={styles.ProfileButton}>
              {currentUser &&
                !is_owner &&
                (profile?.following_id ? (
                  <Button
                    className={`${btnStyles.Button} ${btnStyles.Unfollow}`}
                    // Let’s now go to the follow button and call the handleFollow function with the profile in the onClick attribute.
                    // 107 before =>  empty function => onClick={() => {}}
                    onClick={() => handleUnfollow(profile)}
                  >
                    unfollow
                  </Button>
                ) : (
                  <Button
                    className={`${btnStyles.Button} ${btnStyles.Follow}`}
                    // // Let’s now go to the follow button and call the handleFollow function with the profile in the onClick attribute.
                    // 102 before =>  empty function => onClick={() => {}}
                    onClick={() => handleFollow(profile)}
                  >
                    follow
                  </Button>
                ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s posts</p>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8} data-aos="fade-right" data-aos-duration="1000">
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2" data-aos="fade-left" data-aos-duration="1000">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
