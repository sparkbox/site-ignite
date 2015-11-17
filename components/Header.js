import React from "react";

const Header = (props) => {
  return (
      <span>
        <header>
          <h1>gap-templates</h1>
          <h2>version <span className="highlight">0.1.2</span></h2>
        </header>
        <div className="url">
        {props.ip}<span className="highlight">{props.port}</span>
        </div>
      </span>
  );
}

export default Header;
