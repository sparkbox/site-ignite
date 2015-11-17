import React from "react";
import ReactDOM from "react-dom";
import Drop from "Drop";
const appHolder = document.getElementById('app');

const App = () => {
  return (
    <div className="view">
      <Drop />
    </div>
  );
}

ReactDOM.render(<App />, appHolder);
