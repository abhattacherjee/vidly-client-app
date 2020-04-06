import React from "react";
import "./App.css";
import Movies from "./components/movies";
import NavBar from "./components/common/navbar";
import { Route, Switch } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";

function App() {
  const items = [
    { path: "/movies", label: "Movies" },
    { path: "/customers", label: "Customers" },
    { path: "/rentals", label: "Rentals" },
  ];

  const header = { path: "/", label: "Vidly"};
  return (
    <main className="container>">
      <NavBar items={items} header={header}/>
      <Switch>
        <Route path="/movies" component={Movies} />
        <Route path="/customers" component={Customers} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/" component={Movies} />
      </Switch>
    </main>
  );
}

export default App;
