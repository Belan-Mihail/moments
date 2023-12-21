import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "./context/CurrentUserContext";
import { ProfileDataProvider } from "./context/ProfileDataContext"

ReactDOM.render(
  <React.StrictMode>
    {/* 20 app.js */}
    {/* 19 and import */}
    <Router>
      {/* 43 SiginForm.js */}
      {/* 42 and import */}
      <CurrentUserProvider>
        {/* 98 PopularProfiles */}
        {/* 98 ProfileDataProvider */}
        <ProfileDataProvider>
          <App />
        </ProfileDataProvider>
      </CurrentUserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
