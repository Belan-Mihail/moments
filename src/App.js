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

// 42 index.js
// 41
function App() {
 

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          {/* 57 create asset.js in components */}
          {/* 56 and import */}
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          {/* 65 PostPage.js*/}
          {/* 64  and import */}
          {/* The colon means that id is a parameter  that can be passed through the url.  
In this case, it will be the id of our  post. So any time we set a link to /post/  
and then add a post id React will know to  render the Post page for the specified post. */}
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;

// In the JSX code, we define the responsive values for our columns as props.
// The xs is the size for all screen sizes, and
// the md value applies to  medium size screens and up.
