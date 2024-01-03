// 50 navbar.js import avatar
// 49

import React from "react";
import styles from "../styles/Avatar.module.css";
import useHover from "../hooks/useHover";


// To make our code neater, we can  actually !destructure our props! in place,
// by moving our destructured variables  into the function parameter brackets.
const Avatar = ({ src, height = 45, text, content }) => {
  const [hoverRef, isHovered] = useHover();
//    I’ll also put the text prop after the image,  so that it is displayed alongside the picture,  
// provided that it is passed in. 

  return (
    <span className={styles.ParentSpan} ref={hoverRef}>
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        content={content}
        alt="avatar"
      />

      
      {text}
      {/* {isHovered && (
        <OverlayTrigger placement="top" overlay={<Tooltip>123</Tooltip>}>
          
        </OverlayTrigger>
      )} */}
      {/* {isHovered ? (content ? (<span className={styles.Greeting}>{content}</span>) : (<span className={styles.Greeting}>. . .</span>)) : ("")}  */}
      {isHovered ? (content === 'null' ? ('') : (content ? (<span className={styles.Greeting}>{content}</span>) : (<span className={styles.Greeting}>. . .</span>))) : ("")} 
    </span>
    //  {isHovered ? (content.length ? (<span>{content}</span>) : ('...')) : ("")} 
  );
};

export default Avatar;
