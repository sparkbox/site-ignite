import React from "react";

const Header = (props) => {
  return (
      <span>
        <div className="running">
          <header>
            <h1>{props.data.title}</h1>
            <h2>version <span className="highlight">{props.data.version}</span></h2>
          </header>
          <div className="url">
          {props.data.ip}<span className="highlight">{props.data.port}</span>
          </div>
        </div>
      </span>
  );
}

export default Header;
