import React from "react";
import "./style.css";

export const SearchResultsChoice = ({result}) => {
  const handleClick = () => {
    //alert(`Bạn đã nhấp vào ${result.name}`);
    localStorage.setItem('query', JSON.stringify(result.name));
    console.log(localStorage.getItem('query'));
  };

  return (
    <div className="search-res-choice" onClick={handleClick}>{result.name}</div>
  );
};
