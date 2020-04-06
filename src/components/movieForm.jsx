import React, { Component } from "react";

class MovieForm extends Component {
  handleSave = () => {
    this.props.history.replace("/movies");
  };

  render() {
    return (
      <div>
        <h1 className="m-2">Movie Form {this.props.match.params.id}</h1>
        <button
          className="btn btn-primary m-2"
          onClick={() => this.handleSave()}>
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
