// 122 setupTests.js
// 121
import { rest } from "msw";

// Next, we’ll need to grab our API base url
// for our mock responses. So we’ll define a new variable called baseURL, and then grab the value
// for it from our axiosDefaults file.
const baseURL = "https://django-rest-frame-d1eb911cf8a1.herokuapp.com/"


// Inside we’ll create and export an array called handlers, which we’ll
// use to store our mocked request handlers.
export const handlers = [
    //     Next, let’s auto import the rest object and define a mock response for a GET request for user
// details, using our baseURL string, and then adding the dj-rest-auth/user/ endpoint to the end.
// The callback function will accept three arguments: request, response and context.
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
//         Inside, we’ll return a json response with a user object,
// just like a real response from our API would do. 
// Now when our tests try to reach out to this endpoint to get the users details,
// our mocked api request handlers will intercept the test request and respond with our provided
// data here, indicating that for my test Brian is the currently logged in user.
      return res(
        ctx.json({
            // an actual response
            pk: 6,
            username: "mike4",
            email: "",
            first_name: "",
            last_name: "",
            profile_id: 6,
            profile_image: "https://res.cloudinary.com/dtnxukqxl/image/upload/v1/media/../default_profile_d9pfdc_pdmycw"
            })
      );
    }),
    // Now, the logout endpoint is going to be much easier
    //  All we want to
// do is log out successfully with no errors. So, for a post request to the logout endpoint,
// our callback function will return a response with a 200 OK status.
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
      return res(ctx.status(200));
    }),
  ];