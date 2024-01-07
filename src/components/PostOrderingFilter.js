import React, { useContext, useState, useEffect } from "react";
import { PostOrderingFilterContext } from "./../context/PostOrderingFiltersContext";
import AOS from "aos";
import "aos/dist/aos.css";

function PostOrderingFilter() {


const { setPostOrderingFilter } =
    useContext(PostOrderingFilterContext);


  const options = [
    {value: '', text: '--filtred by default--'},
    {value: 'likes_count', text: 'Likes (Low to High)'},
    {value: '-likes_count', text: 'Likes (High to Low)'},
    {value: 'comments_count', text: 'Comments (Low to High)'},
    {value: '-comments_count', text: 'Comments (High to Low)'},
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
    setPostOrderingFilter(selected)
    }, [setPostOrderingFilter, selected]);

  

  return (
    <div data-aos="fade-left">

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

export default PostOrderingFilter;
