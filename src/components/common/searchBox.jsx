import React from "react";

const SearchBox = ({ name, label, onChange }) => {
  return (
    <div className="input-group m-8">
      <input
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
