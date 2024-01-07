// 72 app.js
// 71

import React, { useState, useEffect, useContext } from "react";

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
import { fetchMoreData } from "../../utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { PostOrderingFilterContext } from "../../context/PostOrderingFiltersContext";

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
  // 133 create Procfile 
  // 132 and below
  const currentUser = useCurrentUser();
  // /132

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

  // npm install react-infinite-scroll-component
  // 74 and below
  const [query, setQuery] = useState("");
  // /74

  const { PostOrderingFilter } =
    useContext(PostOrderingFilterContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // The request string will contain our filter  parameter, which comes from the filter prop
        // we set in our routes.
        // before 74
        // const { data } = await axiosReq.get(`/posts/?${filter}`);
        // after 74
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}&ordering=${PostOrderingFilter}`);
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
    // before 74
    // fetchPosts();
    // after 74
    //     It would be better to wait a moment  after the user has stopped typing
    // and then perform the API request. fetchPosts() inside setTimeout
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);
    // clear timer
    return () => {
      clearTimeout(timer);
    };

    // Let’s call the fetchPosts function and think  about when we would like this code to run.
    // Well, we should run this effect every  time the filter or pathname change,
    // so we’ll put these inside this  useEffect’s dependency array.
    // before 74
    // }, [filter, pathname]);
    // after 74
  // }, [filter, query, pathname]);
  // after 132
  }, [filter, query, pathname, currentUser, PostOrderingFilter]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8} data-aos="fade-right" data-aos-duration="1000">
        {/* 94 PopularProfile */}
        {/* before 93 */}
        {/* <p>Popular profiles mobile</p> */}
        {/* after 93 */}
        <PopularProfiles mobile />
        {/* 74 */}
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            // we  can set its value prop to our ‘query’ variable,
            // and update that value in the onChange attribute by  calling setQuery with the event target’s value.
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className={`mr-sm-2 ${styles.SearchInput}`}
            placeholder="Search posts"
          />
        </Form>
        {/* /74 */}

        {/* First, we’ll check if the data has been loaded,  if it hasn’t we’ll show our loading spinner. (str 108)*/}
        {hasLoaded ? (
          <>
            {/* Then, if our data has loaded, inside a fragment,  we‘ll create a second ternary to either display  
our posts or show a message. So we’ll check if  the results array in our state has a length, 
If  it doesn’t we’ll show our no results message. 102*/}
            {posts.results.length ? (
              
              //before 75 
              // posts.results.map((post) => (
                // We’ll map over the posts.results array.
                // For each, we’ll return our Post component, which  we need to auto-import.
                // We’ll give it a key, spread the post object and pass the setPosts
                // function so that the users  can like and unlike the posts.
                // before 75
                // <Post key={post.id} {...post} setPosts={setPosts} /> ))

                // 76 create untils folder in src and untils.js and import it
                // after 75 - InfiniteScroll and import
                <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                // Firstly we’ll set the dataLength prop,  which tells the component how many posts  
// are currently being displayed. We’ll  set its value to posts.results.length.
                dataLength={posts.results.length}
                loader={<Asset spinner />}
//                 Next, the hasMore prop tells the InfiniteScroll  
// component whether there is more data to load on  reaching the bottom of the current page of data.  
// Our posts object from the API contains  a key called ‘next’ which is a link to  
// the next page of results. If we’re on  the last page, that value will be null.  
// So we can use this to determine if  another page of results exists.  
// The hasMore prop will only accept a boolean value  of true or false, so we’ll use a clever JavaScript  
// logical operator called the double not operator,  sometimes called the double bang because of its  
// double exclamation marks. This operator returns  true for truthy values, and false for falsy values.
                hasMore={!!posts.next}
//                 The final prop that our InfiniteScroll  component needs is the next prop.  
// This prop accepts a function that will be  called to load the next page of results  
// if the hasMore prop is true
// We’re going to write the function to pass our  ‘next’ prop in a separate utils folder. Then  
// we’ll be able to reuse it later on for fetching  other paginated data, like comments and profiles.
                next={() => fetchMoreData(posts, setPosts)}
              />
              // /75
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
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2" data-aos="fade-left" data-aos-duration="1000">
        {/* 93 up */}
        {/* before 92 */}
        {/* <p>Popular profiles for desktop</p> */}
        {/* after 92 */}
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostsPage;
