// 41 app.js
// 40
// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// 47 navbar.js
// 46
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// As you probably remember, we’re  consuming the context in two places:
// SignInForm and Navbar. In order to make accessing  currentUser and setCurrentUser less cumbersome,
// by not having to import the useContext alongside  Context Objects, we’ll create two custom hooks.
// Back in the CurrentUserContext.js file,
// I’ll export them and name them  useCurrentUser and useSetCurrentUser.
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

// named not the same as the file names
// copy and paste all context logic from app.js
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // 46
  const history = useHistory();

  const handleMount = async () => {
    try {
      // before 46
      // const { data } = await axios.get("dj-rest-auth/user/");
      // after 46
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  // 46 and above
  //     We’re going to use and import the  useMemo hook, which is part of the React library.
  // useMemo is usually used to cache  complex values that take time to compute.
  // The reason we’re using it here is that useMemo  runs before the children components are mounted.
  // And we want to attach the interceptors  before the children mount,
  // as that’s where we’ll be using  them and making the requests from.

  // 128 Navbar
  // 127 and below 
  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        // The next utility function we created was the one to tell us if an expiry date exists
// in the users local storage. So that we can choose to run the refresh token code or not.
// Now let’s go to our CurrentUserProvider. It is located in the contexts folder,
// inside the CurrentUserContext file. Here, inside the request interceptor,
// we’ll put the entire try-catch block inside an if statement. The if-block will run only if the
// token should be refreshed, so we’ll auto-import the shouldRefreshToken function and call it.
        if (shouldRefreshToken()) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
            // We’re not finished yet though, we also have to remove the token timestamp when needed.
// As it was pointed out on the slide, we should do so when the refresh token expires.
// So, we’ll auto-import and call the removeTokenTimestamp function in two catch blocks
// for both the request and response interceptors, right underneath the setCurrentUser call.
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  

    // 46 we’ll start by  creating the response interceptor. I’ll attach
    // it to the axiosRes instance we just created in  axiosDefaults
    axiosRes.interceptors.response.use(
      // 46 If there’s no error, I’ll  just return the response.
      (response) => response,
      async (err) => {
        // 46 In case there is an error, I’ll check  if its status is 401 unauthorized.
        if (err.response?.status === 401) {
          try {
            // 46 Then, inside a try-catch block,  I’ll attempt to refresh the token.
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              //   46 So, back in the catch block, if the user  was logged in, I’ll redirect them to /signin
              // and set their data to null.
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
            // 127
            removeTokenTimestamp();
            // /127
          }
          //   46        If there’s no error refreshing the token,
          // I’ll return an axios instance with the  error config to exit the interceptor.
          return axios(err.config);
        }
        // 46 In case the error wasn’t 401, I’ll just reject the  Promise with the error to exit the interceptor.
        return Promise.reject(err);
      }
    );
    //     Ok, great! Now that we have both interceptors in  place, we shouldn’t forget to add a dependency
    // array for our useMemo hook with history  inside. We want useMemo to only run once,
    // but the linter will throw a warning if  we provided an empty dependency array.
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {/* To be able to wrap the children components  we mentioned earlier, and still render them,  
inside the inner Provider, I’ll add the squiggly  brackets and reference the children prop. */}
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
