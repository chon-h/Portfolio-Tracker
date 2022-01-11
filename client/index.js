import React from 'react';
import { render } from 'react-dom';
const App = () => {
 return <h1>This is my React app!</h1>;
 }

render(
  <App />, 
  document.getElementById('root')
);