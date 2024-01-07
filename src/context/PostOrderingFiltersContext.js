
import React, {useState, createContext } from 'react'

const PostOrderingFilterContext = createContext()

function PostOrderingFilterProvider({ children }) {

    // const [TurquoiseMode, setTurquoiseMode] = useState(false)
    // const ToggleTurquoiseMode = () => {
    //     setTurquoiseMode(!TurquoiseMode)
    // }
    const [PostOrderingFilter, setPostOrderingFilter] = useState('')
    
    

    return (
        // <TurquoiseModeContext.Provider value={{TurquoiseMode, ToggleTurquoiseMode}}>
        <PostOrderingFilterContext.Provider value={{PostOrderingFilter, setPostOrderingFilter}}>
          
            {children}
          
        </PostOrderingFilterContext.Provider>
      );

}

export {PostOrderingFilterContext, PostOrderingFilterProvider}