import React from "react";
import "font-awesome/less/icons.less";

const Heart = ({ liked, onLike }) => {
  let style = "clickable fa fa-heart";
  return <i className={liked ? style : style + "-o"} onClick={onLike} />;
};

export default Heart;
