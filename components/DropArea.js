import React from "react";

const DropArea = (props) => {
  return (
    <span>
      <div className="drop-content">
        <div className="drop-box">
          <svg className="drop-arrow" viewBox="0 0 34 46">
            <g className="arrow" transform="translate(1, 1)">
              <path d="M16,0 L16,42" strokeLinecap="square" />
              <path d="M0,26 L15.9023353,43 L32,26" />
            </g>
          </svg>
          <svg className="load-circle" viewBox="0 0 115 115">
            <path className="circle" d="M73,109.764292 L73,109.764292 L73,109.764292 C68.0871132,111.219072 62.8847544,112 57.5,112 C27.4004811,112 3,87.5995189 3,57.5 C3,27.4004811 27.4004811,3 57.5,3 C87.5995189,3 112,27.4004811 112,57.5 C112,62.8847544 111.219072,68.0871132 109.764292,73" />
          </svg>
        </div>
        <div className="drop-message">
          <div className="start-message">
            Drop a project folder on this window
          </div>
          <div className="release-message">
            Now let go of the folder
          </div>
          <div className="loading-message">
            Loading the project
          </div>
        </div>
      </div>
    </span>
  );
}

export default DropArea;
