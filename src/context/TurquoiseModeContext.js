
import React, {useState, createContext } from 'react'

const TurquoiseModeContext = createContext()

function TurquoiseModeProvider(props) {

    // const [TurquoiseMode, setTurquoiseMode] = useState(false)
    // const ToggleTurquoiseMode = () => {
    //     setTurquoiseMode(!TurquoiseMode)
    // }
    const [TurquoiseMode, setTurquoiseMode] = useState('ligth')
    
    

    return (
        // <TurquoiseModeContext.Provider value={{TurquoiseMode, ToggleTurquoiseMode}}>
        <TurquoiseModeContext.Provider value={{TurquoiseMode, setTurquoiseMode}}>
          
            {props.children}
          
        </TurquoiseModeContext.Provider>
      );

}

export {TurquoiseModeContext, TurquoiseModeProvider}