import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import LinkButton from "./common/linkButton";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: { _id: "1", name: "All Genres" },
    sortColumn: { path: "title", order: "asc" },
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
      genres: allGenres,
      selectedGenre,
      sortColumn,
    } = this.state;

    const { data: movies, totalCount } = this.getPagedData();

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
            <div className={"row"}>
              <div className="col col-md-2" style={{ marginBottom: 20 }}>
                <LinkButton label="New Movie" path="/movies/new" />
              </div>
              <div className="col col-md-6">
                <span className={this.getBadgeClasses()}>
                  {this.renderText(totalCount)}
                </span>
              </div>
            </div>

            <MoviesTable
              movies={movies}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              onPageChange={this.handlePageChange}
              length={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;

    const filteredMovies =
      selectedGenre._id !== "1"
        ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
        : allMovies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  renderText = count => {
    return count === 0 ? "No movies to remove!" : `There are ${count} movies`;
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

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
}

export default Movies;
