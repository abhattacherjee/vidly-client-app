import React, { Component } from "react";
import Heart from "./common/heart";
import Table from "./common/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      label: "Title",
      path: "title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title} </Link>,
    },
    { label: "Genre", path: "genre.name" },
    { label: "Rate", path: "dailyRentalRate" },
    { label: "Stock", path: "numberInStock" },
    {
      key: "like",
      content: movie => (
        <Heart liked={movie.like} onLike={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: movie => (
        <button
          className={"btn btn-danger btn-sm"}
          onClick={() => this.props.onDelete(movie)}>
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { movies, sortColumn, onSort } = this.props;
    if (movies.length === 0) return null;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
