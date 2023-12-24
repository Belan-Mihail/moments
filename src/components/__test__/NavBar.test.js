// 124 index.js
// 123-1 app.test.js
// 123



import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../context/CurrentUserContext";
import NavBar from "../NavBar";

// Inside that file,
// we’ll create our first test to make sure the NavBar component gets rendered correctly.
test("renders NavBar", () => {
  render(
    // We need this because the NavBar component renders Router Link components.
    <Router>
      <NavBar />
    </Router>
  );

//   If you’d like to check out the rendered HTML,
// you can always use the screen.debug method and call it in your test.
// Screen.debug works just like console.log and you can put it in wherever you want.
// One thing worth noting is that if you put it below an assertion,
// and the assertion throws an error, you won’t see anything printed to the terminal.
//   screen.debug();

// So let’s assert that the sign in button is there and save it to a variable named signInLink.
// To target it we’ll use a method called getByRole,
// and tell it we want to search for links. Methods that start with “get” are for synchronous code.
// As we have 3 links in our NavBar, we’ll pass it an object that says to look for the link with a
// name of “Sign in”. This value is case sensitive, so make sure it matches the text in your own link.
  const signInLink = screen.getByRole("link", { name: "Sign in" });
  expect(signInLink).toBeInTheDocument();
});

// Here our test description will say “renders link to the user profile for
// a logged in user” and we’ll need the callback function to be asynchronous because our test
// will be fetching data and we’ll need to await changes in the document
test("renders link to the user profile for a logged in user", async () => {
  render(
    <Router>
        {/* Our profile link will only show once the currentUser data is fetched,
so for that we’ll need to render the CurrentUserProvider as well. */}
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

//   As we need to target elements that aren’t there on mount, because they appear as a result of an async
// function, we should use one of the find query methods with the await keyword. Here, we’ll save
// the profileAvatar to a variable and find it by the text={currentUser?.username} = 'mike4' text within the Avatar component.
  const profileAvatar = await screen.findByText("mike4");
  expect(profileAvatar).toBeInTheDocument();

//   You probably noticed that we used a different query method this time to find the profileAvatar,
// we did this because the “profile” text we are searching for isn’t inside a link this time.
// You can learn more about the available query methods for react testing in the
// documentation link we’ve provided under the video.
});

// Ok, for our final test, let’s make sure that once the currently logged in user
// clicks the Sign out link, the Sign in and Sign up links reappear.
test("renders Sign in and Sign up buttons again on log out", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

//   Similar to the profile link, the sign out link isn’t present in the document on mount either.
// So, we will use a find method like last time.
// This time we’ll use the findByRole method because it’s an asynchronous query.
  const signOutLink = await screen.findByRole("link", { name: "Sign out" });
//   Now, we need to simulate a user click event. The way to
// do this is by importing fireEvent from the React testing library.
// Then, inside our test we can call the click method on fireEvent,
// and pass it the signOutLink variable so that our user click is fired on our chosen element.
  fireEvent.click(signOutLink);


//   With the sign out link clicked, all we have to do is wait for both sign in and sign up links
// to be rendered in our NavBar again, and then check that they are in the document.
  const signInLink = await screen.findByRole("link", { name: "Sign in" });
  const signUpLink = await screen.findByRole("link", { name: "Sign up" });

  expect(signInLink).toBeInTheDocument();
  expect(signUpLink).toBeInTheDocument();
});