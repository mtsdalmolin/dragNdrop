import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactGridDND from "./pages/ReactGridDND";
import ReactSortableHOC from "./pages/ReactSortableHOC";
import ReactBeautifulDND from "./pages/ReactBeautifulDND";
import home from "./pages/Home";
import ReactDND from "./pages/ReactDND";

export default function Routes() {
  return (
    <Router>
      <Route path="/" exact component={ home } />
      <Route path="/react-beautiful-dnd" component={ ReactBeautifulDND } />
      <Route path="/react-sortable-hoc/" component={ ReactSortableHOC }/>
      <Route path="/react-grid-dnd/" component={ ReactGridDND }/>
      <Route path="/react-dnd/" component={ ReactDND }/>
    </Router>
  );
}