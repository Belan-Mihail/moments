
import React, {useState, createContext } from 'react'

const PostCategoryFilterContext = createContext()

function PostCategoryFilterProvider({ children }) {

    // const [TurquoiseMode, setTurquoiseMode] = useState(false)
    // const ToggleTurquoiseMode = () => {
    //     setTurquoiseMode(!TurquoiseMode)
    // }
    const [PostCategoryFilters, setPostCategoryFilters] = useState('')
    
    

    return (
        // <TurquoiseModeContext.Provider value={{TurquoiseMode, ToggleTurquoiseMode}}>
        <PostCategoryFilterContext.Provider value={{PostCategoryFilters, setPostCategoryFilters}}>
          
            {children}
          
        </PostCategoryFilterContext.Provider>
      );

}

export {PostCategoryFilterContext, PostCategoryFilterProvider}