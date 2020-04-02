import React, { Component } from "react";
import "font-awesome/less/icons.less";

class Heart extends Component {
  render() {
    return (
      <i
        className={this.getHeartStyle()}
        style={{ cursor: "pointer" }}
        onClick={this.props.onLike}
      />
    );
  }

  getHeartStyle = () => {
    const style = "fa fa-heart";
    return this.props.liked ? style : style + "-o";
  };
}

export default Heart;
