import React from 'react'
import {Link} from "react-router-dom";

export default function home() {
  return (
    <ul>
      <li><Link to="/react-beautiful-dnd">react-beautiful-dnd</Link></li>
      <li><Link to="/react-sortable-hoc">react-sortable-hoc</Link></li>
      <li><Link to="/react-grid-dnd">react-grid-dnd</Link></li>
      <li><Link to="/react-dnd">react-dnd</Link></li>
    </ul>
  );
}