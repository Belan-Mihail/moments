// 77 create MoreDropdown.module.css
// 76
import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

// It will accept two arguments: resource  and setResource, so that we can render  
// and update different types of data  for our InfiniteScroll component.  
// For example, resource and setResource could be  posts and setPosts or comments and setComments.  
export const fetchMoreData = async (resource, setResource) => {
  try {
    // Inside a try-catch block, we’ll  auto-import the axiosReq instance  
// to make a network request to resource.next,  which is a URL to the next page of results.
    const { data } = await axiosReq.get(resource.next);
//     If there’s no error, we’ll call setResource and  pass it a callback function with prevResource as  
// the argument. The callback function will return an  object, inside of which we’ll spread prevResource.  
// We’ll update the next attribute with  the URL to the next page of results as well.
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
//       We also need to update the results array  to include the newly fetched results,  
// appending to the existing ones our state  is rendering for the user. We can use the reduce method to add our new  
// posts to the prevResource.results array
// Here we used the reduce method to loop through  the new page of results that we got from our API. 
// *** more comments to this function below the code

      results: data.results.reduce((acc, cur) => {
        // Then, we used the some() method to loop  through the array of posts in the accumulator. 
// Inside, we compared each accumulator item  
// id to the current post id from  the newly fetched posts array.
// If the some() method returned true, this means  it found a match and we are displaying that  
// post already. So in this case we return the  accumulator without adding the post to it. 
// And if the some() method does not find a  match, we return an array containing our  
// spread accumulator with the new post added to it.
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
        //   We then appended our new results to the existing  posts in our posts.results array in the state. 
      }, prevResource.results),
    }));
  } catch (err) {}
};


// We’ll set the initial value for the  accumulator to the previous results.
// Now you might think that we could just display the  next page of results our API has sent us. However,  
// let’s imagine that our Moments application becomes  really popular, and we have users adding new  
// posts, and deleting ones all the time. Since we load the newest posts first,  
// this means that if our users have added  5 more posts since we loaded the first  
// page of ten results, our second page will  contain 5 posts we are already displaying.  
// So, we need a way to filter out any duplicates. To do this, we’ll need to check the array of  
// existing results against the array of new results,  and only add new results to our accumulator.  
// Fortunately, there’s a handy JavaScript method  that we can use to do this, called some().
// The some() method checks whether the  callback passed to it returns true for  
// at least one element in the array and  it stops running as soon as it does.
// So we can use it to check if any of our post  IDs in the newly fetched data matches an id that  
// already exists in our previous results. If the some() method finds a match,  
// we’ll just return the existing accumulator to the  reduce method. But if it doesn’t find a match,  
// we know this is a new post, so we can return our  spread accumulator with the new post at the end.

// 105 profiledatacontext
// 104

export const followHelper = (profile, clickedProfile, following_id) => {
//   In the first part, we’ll check if the profile in the array we’re iterating over is the
// same one the user just clicked on.
  return profile.id === clickedProfile.id
    ? // This is the profile I clicked on,
      // update its followers count and set its following id
      {
//         So if their id’s are the same, we’ll return the profile object, increasing its followers_count
// by one and setting its following_id to data.id.
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
//       In the second part, we’ll check if the profile in the array we’re iterating over is owned
// by the currently logged in user.
    : profile.is_owner
    ? // This is the profile of the logged in user
      // update its following count
//       If so, we’ll have to increase that profile’s following_count by one, because the currently
// logged in user just followed a profile.
      { ...profile, following_count: profile.following_count + 1 }
    : // this is not the profile the user clicked on or the profile
      // the user owns, so just return it unchanged
      // Finally, in the last part of our ternary, we’ll return the profile without changing it,
// as we don’t have to update any of its attributes or stats.
      profile;
};

// 107 profilepage
// 106
export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null,
      }
    : profile.is_owner
    ? { ...profile, following_count: profile.following_count - 1 }
    : profile;
}

// 126 siginform
// 125
// Next, let’s take a look at these remaining errors in the console.
// We can see that as an unauthenticated user, our code is making these unnecessary requests
// to refresh their access token each time we interact with the application.
// So, let’s adjust our code so that an unauthenticated user doesn’t
// make extra network requests to refresh their access token.
// What we’ll do then, is: Store the logged in users refresh token
// timestamp in their browser using localStorage. Then, our code would check if this timestamp
// exists and only then make attempts to refresh the access token.
// We’ll also make sure to remove the timestamp from the browser when
// the user refresh token expires, or the user simply logs out.


// Let’s first start with a function to set a token timestamp in the browser storage.
// We’ll export and define a function called setTokenTimestamp.
// It will accept the data object returned by the API on login.
// Then, we’ll auto-import and use the jwtDecode function that comes with the library we just
// installed to decode the refresh token. This object comes with an expiry date with the key of exp,
// so we can save the ‘exp’ attribute to a variable called refreshTokenTImestamp.
// Finally, we can save that value to the user's browser using localStorage,
// and set its key to refreshTokenTimestamp. If you need a reminder on how localStorage works,
// there’s a link under the video.
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

// Great, now let’s create a function that will return a boolean value
// that will tell us if we should refresh the users token or not.
// We’ll export and name it shouldRefreshToken and it will return the refreshTokenTimestamp value
// from our local storage, converted by our good old friend the double not logical operator.
// Again, this means the token will be refreshed only for a logged in user.
export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

// Finally, we’ll write a third function to remove the localStorage value if the user logs
// out or their refresh token has expired. So we’ll export it and name it removeTokenTimestamp.
// All it will do is remove the refreshTokenTimestamp from the localStorage.
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};