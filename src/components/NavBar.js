import React, {useEffect} from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../context/CurrentUserContext";
// 50 and below
import Avatar from "./Avatar";
import { useSetCurrentUser } from "../context/CurrentUserContext";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";
import useHover from "../hooks/useHover";
import AOS from "aos";
import "aos/dist/aos.css";


// create context folder in src and CurrentUserContext.js - 40
// 39

const NavBar = () => {
  // alive before 44
  // const currentUser = useContext(CurrentUserContext);

  // 45 axios default
  // 44
  const currentUser = useCurrentUser();
  const [hoverRef, isHovered] = useHover();
  


  // clickable burger menu
  // 51 and below
  // const { expanded, setExpanded } = useState(false);
  // 52 and below
//   Let’s now handle the functionality  so that the burger menu collapses  
// when we choose one of its options.
    // const ref = useRef(null)

    // 55 create PostCreateEditForm.module.css and Asset.module.css in styles
    // 55 create posts folder in src/pages and PostCreateForm.js inside

    // 54 refactoring 51-53/ create hooks folder and useClickOutsideToggle.js
    // 54 comment all toggle navbar logic from this area (51-53)
    // 54 add this logic to useClickOutsideToggle.js 
    // 54 and import
    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    // 53
    // useEffect(() => {
    //   const handleClickOutside = (event) => {
//         // We’ll first  check the element has been assigned to it.  
// We need this because its initial value is  set to null. And then we’ll check if the  
// user has clicked away from the referenced button.  
        // if (ref.current && !ref.current.contains(event.target)) {
          // If they have, we’ll call setExpanded with  false, which will close our dropdown menu.
      //     setExpanded(false);
      //   }
      // };
  
      // document.addEventListener("mouseup", handleClickOutside);
      // Now, inside the return statement’s cleanup  function, we’ll remove this event listener  
// so that we’re 100% sure we’re not  leaving any event listeners behind.  
    //   return () => {
    //     document.removeEventListener("mouseup", handleClickOutside);
    //   };
    // }, [ref]);

  // 50
  const setCurrentUser = useSetCurrentUser();
  
  // 50
  const handleSignOut = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      // 130 create NotFound.module.css and NotFound.js in components
      // 129 npm audit fix
      // 128
      removeTokenTimestamp();
      // /128
    } catch (err) {
      console.log(err);
    }
  };

  
  // 48 avatar.module.css create in styles
  // 47 and below
  const addPostIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className="far fa-plus-square"></i>Add post
    </NavLink>
  );
  // before 47
  // const loggedInIcons = <>{currentUser?.username}</>;
  // after 47 and below
  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className="fas fa-stream"></i>Feed
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/liked"
      >
        <i className="fas fa-heart"></i>Liked
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        // In our “to” prop, we’ll direct the user  
// to their own profile by passing their  profile_id into the url string. 
        to={`/profiles/${currentUser?.profile_id}`}
      >
        {/* src, text and height = props for avatar component */}
        

        <Avatar src={currentUser?.profile_image} text={currentUser?.username} height={40} content='null'/>
        
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    // 51 add expanded={expanded} and below
    // Ok, now we have to specify whether we’d  like the burger menu to be expanded.  
// We’ll do so by setting react  bootstrap Navbar expanded prop  
// to the expanded value that is  coming from the useState hook.
  
    <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top" ref={hoverRef}>
      
      <Container>
        <NavLink to="/">
          <Navbar.Brand data-aos="fade-down">
          {isHovered ? (
          <span className={styles.LogoOrangeText}>Pain Pictures</span>
          ) : (
          <span className={styles.LogoVioletText}>Pain Pictures</span>
          )}
          
          </Navbar.Brand>
        </NavLink >
      
        {/* 47 */}
        {currentUser && addPostIcon}
        {/* 51 onClick={() => setExpanded(!expanded)} */}
        <Navbar.Toggle 
        // 52
        ref={ref}
        onClick={() => setExpanded(!expanded)} 
        aria-controls="basic-navbar-nav" 
        />
        <Navbar.Collapse id="basic-navbar-nav" data-aos="fade-down">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fas fa-home"></i>Home
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  
  );
};

export default NavBar;