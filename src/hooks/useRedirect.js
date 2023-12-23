// 117 signinform
// 116

import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios";

// Inside, we’ll export and define a hook with this exact name. It will accept an
// argument called userAuthStatus, which will be a string set to either “loggedIn” or “loggedOut”
// depending on which type of user we want to redirect.
export const useRedirect = (userAuthStatus) => {
    // We’re going to programmatically redirect users back to the home page, so we’ll have
// to auto-import and call the useHistory hook to save the history object into a variable.
    const history = useHistory()

    // To be able to tell whether or not a user is logged in, we’ll need to make a network request on mount.
// So, we’ll also need to auto-import the useEffect hook.
    // useEffect(() => {
    //     const handleMount = async () => {
    //         try {
                // Inside the try block, we’ll make a post request to the dj-rest-auth/token/refresh
// endpoint with the default axios instance, which we’ll have to auto-import.
// We don’t need either of our axios interceptors here because
// this endpoint will let us know if the user is authenticated or not.

// !!!! The post request will act like a check as to whether the user is currently logged in or not.
// If a user is logged in; the access token will be refreshed successfully,
// and any code left in the try block will be able to run. If they’re not logged in though,
// we’ll get a response with the 401 error, and then the code in our catch block will run.
                // await axios.post("/dj-rest-auth/token/refresh/");

//                 So, if our user is logged in, and our userAuthStatus is set to the “loggedIn” string,
// then we know we should redirect the user. So we’ll add an if statement to check for that,
// and then push them back to the home page.
// if user is logged in, the code below will run
    //             if (userAuthStatus === "loggedIn") {
    //                 history.push("/");
    //             }
    //         } catch(err) {
    //             // if user is not logged in, the code below will run
    //     if (userAuthStatus === "loggedOut") {
    //         history.push("/");
    //         }
    //     }
    // })
    useEffect(() => {
        const handleMount = async () => {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
            // if user is logged in, the code below will run
            if (userAuthStatus === "loggedIn") {
              history.push("/");
            }
          } catch (err) {
            // if user is not logged in, the code below will run
            if (userAuthStatus === "loggedOut") {
              history.push("/");
            }
          }
        };
    
        handleMount();
      }, [history, userAuthStatus]);
}