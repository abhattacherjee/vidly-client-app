import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./components/loginForm";
import Movies from "./components/movies";
import NavBar from "./components/common/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import NotFound from "./components/common/notFound";
import "./App.css";
import RegisterForm from "./components/registerForm";

function App() {
  const items = [
    { path: "/login", label: "Login" },
    { path: "/register", label: "Register"},
    { path: "/movies", label: "Movies" },
    { path: "/customers", label: "Customers" },
    { path: "/rentals", label: "Rentals" },
  ];

  const header = { path: "/", label: "Vidly" };

  return (
    <main className="container>">
      <NavBar items={items} header={header} />
      <Switch>
        <Route path="/login" component={LoginForm}/>
        <Route path="/register" component={RegisterForm}/>
        <Route path="/movies/:id" component={MovieForm}/>
        <Route path="/movies" component={Movies} />
        <Route path="/customers" component={Customers} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/not-found" component={NotFound} />
        <Redirect from="/" to="/movies" exact/>
        <Redirect to="/not-found" />
      </Switch>
    </main>
  );
}

export default App;
