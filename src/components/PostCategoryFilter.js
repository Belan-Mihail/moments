import React, { useContext, useState, useEffect } from "react";
import { PostCategoryFilterContext } from "./../context/PostCategoryFiltersContext";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function PostCategoryFilter() {
  const { setPostCategoryFilters } = useContext(PostCategoryFilterContext);

  const options = [
    { value: "", text: "--all posts--" },
    { value: "landscapes", text: "landscapes" },
    { value: "animals", text: "animals" },
    { value: "plants", text: "plants" },
    { value: "abstraction", text: "abstraction" },
    { value: "other", text: "other" },
  ];

  const [selected, setSelected] = useState(options[0].text);

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    setPostCategoryFilters(selected);
  }, [setPostCategoryFilters, selected]);

  return (
    <div data-aos="fade-left">
      <select value={selected} onChange={handleChange}>
        {options.map((option) => (
          <>
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          <Link to="/category">{option.text}</Link>
          </>
        ))}
      </select>
    </div>
  );
}

export default PostCategoryFilter;
