import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "./context/CurrentUserContext";
import { ProfileDataProvider } from "./context/ProfileDataContext";
import { TurquoiseModeProvider } from "./context/TurquoiseModeContext";
import { PostOrderingFilterProvider } from "./context/PostOrderingFiltersContext";
// import { PostCategoryFilterProvider } from "./context/PostCategoryFiltersContext";

// 125 install npm install jwt-decode and go to utils.js
// before 124
// ReactDOM.render(
//   <React.StrictMode>
//     {/* 20 app.js */}
//     {/* 19 and import */}
//     <Router>
//       {/* 43 SiginForm.js */}
//       {/* 42 and import */}
//       <CurrentUserProvider>
//         {/* 98 PopularProfiles */}
//         {/* 98 ProfileDataProvider */}
//         <ProfileDataProvider>
//           <App />
//         </ProfileDataProvider>
//       </CurrentUserProvider>
//     </Router>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// after 124
ReactDOM.render(
  <Router>
    {/* 43 SiginForm.js */}
    {/* 42 and import */}
    <CurrentUserProvider>
      {/* 98 PopularProfiles */}
      {/* 98 ProfileDataProvider */}
      <ProfileDataProvider>
        <TurquoiseModeProvider>
          <PostOrderingFilterProvider>
            {/* <PostCategoryFilterProvider> */}
              <App />
            {/* </PostCategoryFilterProvider> */}
          </PostOrderingFilterProvider>
        </TurquoiseModeProvider>
      </ProfileDataProvider>
    </CurrentUserProvider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
