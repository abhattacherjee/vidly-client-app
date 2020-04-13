import React from "react";

/**
 *
 * @param name
 * @param label
 * @param onChange
 * @param value
 * @returns {*}
 * @constructor
 */
const SearchBox = ({ name, label, onChange, ...rest }) => {
  return (
    <div className="input-group m-8">
      <input
        {...rest}
        id={name}
        name={name}
        className="form-control"
        placeholder={label}
        onChange={e => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchBox;
