import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Heart from "./common/heart";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";
import ListGroup from "./common/listGroup";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: { _id: "1", name: "All Genres" },
  };
  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [this.state.selectedGenre, ...getGenres()],
    });
  }

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres: allGenres,
      selectedGenre,
    } = this.state;

    const filteredMovies =
      selectedGenre._id !== "1"
        ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
        : allMovies;

    const movies = paginate(filteredMovies, currentPage, pageSize);

    return (
      <div className={"container"}>
        <div className={"row"}>
          <div className={"col col-6 col-md-2"}>
            <ListGroup
              items={allGenres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className={"col col-md-8"}>
            <span className={this.getBadgeClasses()}>
              {this.renderText(filteredMovies)}
            </span>
            <br />
            {this.renderMovies(movies)}
            <Pagination
              onPageChange={this.handlePageChange}
              length={filteredMovies.length}
              pageSize={pageSize}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  renderText = movies => {
    let { length } = movies;
    return length === 0 ? "No movies to remove!" : `There are ${length} movies`;
  };

  getBadgeClasses = () => {
    let classes = "badge m-2 badge-";
    classes += this.state.movies.length === 0 ? "warning" : "primary";
    return classes;
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  handlePageChange = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  renderMovies = movies => {
    if (this.state.movies.length === 0) return;
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
          {movies.map(movie => {
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
                    onClick={() => this.handleDelete(movie)}>
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
