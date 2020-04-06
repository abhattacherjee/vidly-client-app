import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import NavBar from "./components/common/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import NotFound from "./components/common/notFound";
import "./App.css";


function App() {
  const items = [
    { path: "/movies", label: "Movies" },
    { path: "/customers", label: "Customers" },
    { path: "/rentals", label: "Rentals" },
  ];

  const header = { path: "/", label: "Vidly Home" };

  return (
    <main className="container>">
      <NavBar items={items} header={header} />
      <Switch>
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
