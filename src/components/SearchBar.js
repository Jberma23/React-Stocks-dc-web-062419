import React from "react";
import { runInThisContext } from "vm";

const SearchBar = props => {
  return (
    <div>
      <strong>Sort by:</strong>
      <label>
        <input
          type="radio"
          value="Alphabetically"
          checked={props.settings.sort["Alphabetically"]["checked"]}
          onChange={props.handleSortChange}
        />
        Alphabetically
      </label>
      <label>
        <input
          type="radio"
          value="Price"
          checked={props.settings.sort["Price"]["checked"]}
          onChange={props.handleSortChange}
        />
        Price
      </label>
      <br />

      <label>
        <strong>Filter:</strong>
        <select onChange={props.handleFilterChange}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>
    </div>
  );
};

export default SearchBar;
