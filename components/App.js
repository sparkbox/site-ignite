import React from "react";
import ReactDOM from "react-dom";
const appHolder = document.getElementById('app');

const App = () => {
  return (
    <h1>Hello World!</h1>
  );
}

ReactDOM.render(<App />, appHolder);
