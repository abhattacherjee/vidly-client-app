import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import LinkButton from "./common/linkButton";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  defaultGenre = { _id: "1", name: "All Genres" };

  state = {
    genres: [],
    movies: [],
    searchText: "",
    pageSize: 4,
    currentPage: 1,
    selectedGenre: {},
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [this.defaultGenre, ...getGenres()],
      selectedGenre: this.defaultGenre,
    });
  }

  render() {
    const {
      pageSize,
      currentPage,
      genres: allGenres,
      selectedGenre,
      sortColumn,
      searchText,
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
                <span className={this.getBadgeClasses(totalCount)}>
                  {this.renderText(totalCount)}
                </span>
              </div>
            </div>
            <SearchBox
              name="search"
              label="Search..."
              value={searchText}
              onChange={this.handleSearch}
            />

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
      searchText,
    } = this.state;

    let filteredMovies = allMovies;

    // when search text is entered, do not filter movies by genre
    if (searchText)
      filteredMovies = allMovies.filter(
        m => m.title.toLowerCase().search(searchText.toLowerCase()) !== -1
      );
    else
      filteredMovies =
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

  getBadgeClasses = count => {
    let classes = "badge m-2 badge-";
    classes += count === 0 ? "warning" : "primary";
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
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
      searchResults: [],
      searchText: "",
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = searchText => {
    this.setState({
      searchText,
      selectedGenre: this.defaultGenre,
      currentPage: 1,
    });
  };
}

export default Movies;
