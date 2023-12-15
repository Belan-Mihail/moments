// 58 PostCreateForm
// 57 based code
import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";

// We’ve destructured the props our Asset  
// component may receive: spinner, src and message.
const Asset = ({ spinner, src, message }) => {
  return (

    // Our logic here with the double ampersand (&&) first checks if the prop exists,  
// and if it does, then renders the  element within the boolean expression.
// For example, if we don’t pass a spinner  prop, it’s value will be undefined,  
// and so the spinner component won’t be rendered.
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Spinner animation="border" />}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;