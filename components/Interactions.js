import React from "react";

const Interactions = (props) => {
  return (
      <span>
        <header>
          <h1>{props.data.title}</h1>
          <h2>version <span className="highlight">{props.data.version}</span></h2>
        </header>
        <div className="url">
        {props.data.ip}<span className="highlight">{props.data.port}</span>
        </div>
      </span>
  );
}

export default Interactions;
