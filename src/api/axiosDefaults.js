import axios from "axios";

// import this file in app.js
// 25

axios.defaults.baseURL = "https://django-rest-frame-d1eb911cf8a1.herokuapp.com/";
// Next, we’ll set the content-type  header to multipart/form-data  
// as that is the data format the API will be  expecting. We need the multipart because  
// our application will be dealing with  images as well as text in its requests. 
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

// 46 currentusercontext
// 45
// Ok, now back in the axiosDefaults, we’ll have to  
// export two newly created axios instances  that we’ll attach the interceptors to.  
// One to intercept the request and the  other one to intercept the response.
export const axiosReq = axios.create();
export const axiosRes = axios.create();