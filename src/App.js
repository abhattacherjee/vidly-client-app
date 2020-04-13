import React, { Component } from "react";
import {ToastContainer} from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./components/loginForm";
import Movies from "./components/movies";
import NavBar from "./components/common/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import NotFound from "./components/common/notFound";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { getCurrentUser } from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
    state = {};

    items = [
      { path: "/movies", label: "Movies", show: "always" },
      { path: "/customers", label: "Customers", show: "always" },
      { path: "/rentals", label: "Rentals", show: "always" },
      { path: "/register", label: "Register", show: "unauthenticated" },
      { path: "/login", label: "Login", show: "unauthenticated"},
      { path: "/profile", content: (username) => <React.Fragment>{username}</React.Fragment>, show: "authenticated" },
      { path: "/logout", label: "Logout", show: "authenticated" }
    ];

    header = { path: "/", label: "Vidly" };

    componentDidMount() {
      this.setState({user: getCurrentUser()});
    }

  render() {
      const { user } = this.state;
        return (
          <main className="container>">
            <ToastContainer />
            <NavBar items={this.items} header={this.header} user={user} />
            <Switch>
              <Route path="/login" component={LoginForm}/>
              <Route path="/logout" component={Logout}/>
              <Route path="/register" component={RegisterForm}/>
              <ProtectedRoute path="/movies/:id" component={MovieForm} />
              <Route
                path="/movies"
                render={props => <Movies {...props} user={user}/>} />
              <Route path="/customers" component={Customers} />
              <Route path="/rentals" component={Rentals} />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" to="/movies" exact/>
              <Redirect to="/not-found" />
            </Switch>
          </main>
        );
    }
}

export default App;