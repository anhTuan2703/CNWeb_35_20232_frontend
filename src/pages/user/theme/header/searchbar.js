import React from "react";
import { useState,useEffect } from "react";
import "./style.css";
import { SearchResultsList } from "./searchResultList";

export const SearchBar = ( {setResults} ) => {

  const [input, setInput] = useState("");
  const fetchdata = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response)=>response.json())
    .then(json => {
      const results = json.filter((user)=>{
      return (
        value 
        && user 
        && user.name 
        && user.name.toLowerCase().includes(value)
      );
    })
    setResults(results);
    //console.log(results);
  });
}

  const handleChange =(value) => {
    console.log(localStorage.getItem("query", value));
    setInput(value);
    localStorage.getItem("query", value);
    fetchdata(value);
    return value; 
  };

  return (
    <div className="search-input">
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
        <path
          d="M16.5769 8.03846C16.5769 12.478 12.978 16.0769 8.53846 16.0769C4.09894 16.0769 0.5 12.478 0.5 8.03846C0.5 3.59894 4.09894 0 8.53846 0C12.978 0 16.5769 3.59894 16.5769 8.03846ZM1.59915 8.03846C1.59915 11.8709 4.70598 14.9778 8.53846 14.9778C12.3709 14.9778 15.4778 11.8709 15.4778 8.03846C15.4778 4.20598 12.3709 1.09915 8.53846 1.09915C4.70598 1.09915 1.59915 4.20598 1.59915 8.03846Z"
          fill="#929090" 
        />
        <line x1="13.63" y1="13.1775" x2="20.2069" y2="19.7544" stroke="#929090" stroke-width="2" />
      </svg>
      <input 
        placeholder="Bạn đang tìm gì?" 
        value={input}
        onChange={(e)=>handleChange(e.target.value)}
      />
    </div>
  );
};