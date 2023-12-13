// navbar.js import avatar
// 49

import React from "react";
import styles from "../styles/Avatar.module.css";

// To make our code neater, we can  actually !destructure our props! in place,  
// by moving our destructured variables  into the function parameter brackets.
const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        alt="avatar"
      />
      {/* I’ll also put the text prop after the image,  so that it is displayed alongside the picture,  
provided that it is passed in. */}
      {text}
    </span>
  );
};

export default Avatar;