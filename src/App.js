// 14 navbar.module.css
// 13 create styles directory in src and navbar.module.css
// 12
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults.js";
import SignUpForm from "./pages/auth/SignUpForm.js";
import SignInForm from "./pages/auth/SignInForm.js";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage.js";
import { useCurrentUser } from "./context/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm.js";
import ProfilePage from "./pages/profiles/ProfilePage.js";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./components/NotFound.js";

// 42 index.js
// 41
function App() {
  // 73 posts.js
  //  72 and below
  // But before we create these routes we’ll  need to know who the currentUser is
  // so we can return the posts they liked,  and the ones by profiles they follow.
  // So, let's set the currentUser value by calling and  auto-importing the useCurrentUser hook. We’ll need
  // their profile_id, to know whose profile_id to  filter the posts by. In case the currentUser’s
  // details are still being fetched in the  background, it will default to an empty string.
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          {/* 72 before */}
          {/* <Route exact path="/" render={() => <h1>Home page</h1>} /> */}
          {/* 72  and below*/}
          <Route
            exact
            path="/"
            render={() => (
              <PostsPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          {/* /72 */}
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          {/* 57 create asset.js in components */}
          {/* 56 and import */}
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          {/* 82  CommentCreateEditForm.module.css */}
          {/* 81 */}
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          {/* 65 PostPage.js*/}
          {/* 64  and import */}
          {/* The colon means that id is a parameter  that can be passed through the url.  
In this case, it will be the id of our  post. So any time we set a link to /post/  
and then add a post id React will know to  render the Post page for the specified post. */}
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          {/* 101 go to ProfileDataContext */}
          {/* 100 */}
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          {/* /100 */}
          {/* 116 create useRedirect.js in hooks */}
          {/* 115 */}
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          {/* /115 */}
          {/* 132 PostsPage.js */}
          {/* before 131 */}
          {/* <Route render={() => <p>Page not found!</p>} /> */}
          {/* after 131 */}
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;

// In the JSX code, we define the responsive values for our columns as props.
// The xs is the size for all screen sizes, and
// the md value applies to  medium size screens and up.
