import React from "react";

const DropArea = (props) => {
  return (
    <span>
      <div className="drop-content">
        <div className="drop-box">
          <svg viewBox="0 0 34 46">
            <g className="arrow" fill="none" transform="translate(1, 1)" stroke="#FFA800" strokeWidth="2">
              <path d="M16,0 L16,42" strokeLinecap="square" />
              <path d="M0,26 L15.9023353,43 L32,26" />
            </g>
          </svg>
        </div>
        <div className="drop-message">
          <div className="start-message">
            Drag your project folder to the window.
          </div>
          <div className="release-message">
            Now let go over the folder
          </div>
          <div className="loading-message">
            Loading the project.
          </div>
        </div>
      </div>
    </span>
  );
}

export default DropArea;
