import React, {useState, useEffect} from 'react'
import styles from './../styles/GreetingPopup.module.css'
import btnStyles from "./../styles/Button.module.css";

function GreetingModal() {

    const [viewPopup, setViewPopup ] = useState(null)
    let visited = localStorage["alreadyVisited"];

    useEffect(() => {
        // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
        const timeoutId = setTimeout(() => {

            if (visited) {
                setViewPopup(false)
            } else {
             localStorage["alreadyVisited"] = true;
             setViewPopup(true);
            }
        }, 1500);
    
        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timeoutId);
      }, []);
    
    
    
    const PopupIsVisible = (
        <div className={styles.Modal}>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <button
            className={`${btnStyles.Button} ${btnStyles.CommentButton}`}
            onClick={() => setViewPopup(false)}
            type="button"
            ></button>
        </div>
    )

  return (
    <div>
        {viewPopup ? PopupIsVisible : ''}
    </div>
  )
}

export default GreetingModal