import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import { toast } from "react-toastify";

class MovieForm extends Form {
  state = {
    data: { id: "", title: "", genreId: "", numberInStock: "", rate: "" },
    genres: [],
    errors: {},
  };

  schema = {
    id: Joi.allow(null),
    title: Joi.string().min(5).required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).required().label("Number in Stock"),
    rate: Joi.number().min(0).max(10).required().label("Rate"),
  };

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  populateGenres = async () => {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  };

  populateMovie = async () => {
    const { id: movieId } = this.props.match.params;
    if (movieId === "new") return;

    try {
      const { data: movie } = await getMovie(movieId);

      const data = {
        id: movie._id,
        title: movie.title,
        genreId: movie.genre._id,
        numberInStock: movie.numberInStock,
        rate: movie.dailyRentalRate,
      };
      this.setState({ data });
    } catch (e) {
      if (e.response && e.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  };

  doSubmit = async () => {
    try {
      // save the movie
      const movie = this.viewToDataModel(this.state.data);
      await saveMovie(movie);
      this.props.history.replace("/movies");
    } catch (e) {
      if (
        e.response &&
        (e.response.status === 400 || e.response.status === 401)
      ) {
        toast.error("Unauthorized");
      }
    }
  };

  viewToDataModel = movie => {
    return {
      _id: movie.id,
      title: movie.title,
      genreId: movie.genreId,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.rate,
    };
  };

  render() {
    return (
      <div className="container m-8">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("rate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
