import React from "react";
import "./style.css";
import { SearchResultsChoice } from "./searchResultsChoice";

export const SearchResultsList = ({results}) => {
  return (
    <div className="search_result_list">
      {results.map((result,id)=>{
          return <SearchResultsChoice result={result} key={id} />
        })}
    </div>
  );
};