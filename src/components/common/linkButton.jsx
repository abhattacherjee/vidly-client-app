import React from "react";
import { Link } from "react-router-dom";

const LinkButton = ({ label, path }) => {
  return (
    <Link to={path}>
      <button className="btn btn-primary btn-sm">{label}</button>
    </Link>
  );
};

export default LinkButton;
