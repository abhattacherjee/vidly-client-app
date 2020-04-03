import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Heart from "./common/heart";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
  };

  render() {
    const { pageSize, currentPage, movies: allMovies } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);
    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.renderText()}</span>
        <br />
        {this.renderMovies(movies)}
        <Pagination
          onPageChange={this.handlePageChange}
          length={this.state.movies.length}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </div>
    );
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  renderText = () => {
    let { length } = this.state.movies;
    return length === 0 ? "No movies to remove!" : `There are ${length} movies`;
  };

  getBadgeClasses = () => {
    let classes = "badge m-2 badge-";
    classes += this.state.movies.length === 0 ? "warning" : "primary";
    return classes;
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  renderMovies = (movies) => {
    if (this.state.movies.length === 0) return;
    console.log(movies);
    return (
      <table className={"table table-striped"}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Rate</th>
            <th>Stock</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => {
            const {
              _id,
              title,
              genre,
              dailyRentalRate,
              numberInStock,
              like,
            } = movie;
            return (
              <tr key={_id}>
                <td>{title}</td>
                <td>{genre.name}</td>
                <td>{dailyRentalRate}</td>
                <td>{numberInStock}</td>
                <td>
                  <Heart liked={like} onLike={() => this.handleLike(movie)} />
                </td>
                <td>
                  <button
                    className={"btn btn-danger btn-sm"}
                    onClick={() => this.handleDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
}

export default Movies;
