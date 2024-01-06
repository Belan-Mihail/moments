import React, { useContext, useState, useEffect } from "react";
import { TurquoiseModeContext } from "./../context/TurquoiseModeContext";
import AOS from "aos";
import "aos/dist/aos.css";

function ModeSwitch() {


const { setTurquoiseMode } =
    useContext(TurquoiseModeContext);


  const options = [
    {value: '', text: '--choose theme--'},
    {value: 'light', text: 'Light'},
    {value: 'turquoise', text: 'Turquoise'},
    {value: 'orange', text: 'Orange'},
  ];

  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (event) => {
    setSelected(event.target.value);

  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    setTurquoiseMode(selected)
    }, [setTurquoiseMode, selected]);

  

  return (
    <div data-aos="fade-right">

      <select value={selected} onChange={handleChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ModeSwitch;
