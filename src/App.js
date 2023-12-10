// 14 navbar.module.css
// 13 create styles directory in src and navbar.module.css
// 12
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";

// 3 remove header/ add test button and import
// 4 create components folder in src and add NavBar and add here navbar component and go to it

function App() {
  return (
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
          <Route exact path="/signin" render={() => <h1>Sign in</h1>} />
          <Route exact path="/signup" render={() => <h1>Sign up</h1>} />
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
