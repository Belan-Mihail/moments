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
import { useState, useEffect, createContext } from "react";
import axios from "axios";

// 27 create in styles SignInUpForm.module.css and Button.module.css (28)
// 26

// 3 remove header/ add test button and import
// 4 create components folder in src and add NavBar and add here navbar component and go to it

// 37 (next in render)
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
  // 36
  const [currentUser, setCurrentUser] = useState(null);

  // 36
  const handleMount = async () => {
    try {
      const { data } = await axios.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  // 36
  //   Now, to have code run when a component mounts,  we have to make use of the useEffect hook
  // and pass it an empty dependency array. Now  we can call the handleMount function inside.

  useEffect(() => {
    handleMount();
  }, []);

  // 37 (after read up)
  // useContextHook
  // As you can probably imagine, different pieces  of UI will be displayed based on whether the
  // user browsing our site is logged in or not.  This means that user state and data will be
  // used all over the application. It would  be a real pain to have to pass both the
  // currentUser variable and its setter function  manually as props down the component tree.
  // So, in order to make it more accessible,  we’ll use the useContext hook. The React
  // documentation states that context provides  a convenient way to pass data required by
  // many components in an application. Essentially,  Context is designed to share data that can be
  // considered “global” to any child components that  need access to

  return (
    // 38 SigninForm.js
    // 37
    //     First, Every Context Object comes with  a Provider component that allows child
    // components to subscribe to context changes
//     A Provider accepts a value prop to be passed to  child components that need to consume that value.  
// In our case, the values being  passed will be the currentUser,  
// and setCurrentUser, which is the  function to update the currentUser value.
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        // 12
        <div className={styles.App}>
          <NavBar />
          {/* 19 index.js */}
          {/* 18 npm install react-router-dom@5.3.0 */}
          {/* 17 add main in app.module.css and styles.main */}
          {/* 16 and import Container */}

          <Container className={styles.Main}>
            {/* 21 navbar.js */}
            {/* 20 and import */}
            <Switch>
              <Route exact path="/" render={() => <h1>Home page</h1>} />
              {/* 34 */}
              <Route exact path="/signin" render={() => <SignInForm />} />
              {/* <Route exact path="/signup" render={() => <h1>Sign up</h1>} /> */}
              {/* 34 create SignInForm.js and styles and add it hier - then got to the SignInForm.js*/}
              {/* 33 */}
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

// In the JSX code, we define the responsive values for our columns as props.
// The xs is the size for all screen sizes, and
// the md value applies to  medium size screens and up.
