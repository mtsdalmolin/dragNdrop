import React from 'react';
import Routes from './routes.js';
import './App.css';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Routes />
    </DndProvider>
  );
}