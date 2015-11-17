import React from "react";
import Header from "Header";
import fs from "fs";
import path from "path";
import shell from "shelljs/global";
import address from "address";

const Drop = React.createClass({
  getInitialState() {
    return {
      'port': '',
      'ip': address.ip()
    };
  },

  componentDidMount() {
    const target = document.getElementById('drop');

    target.ondragover = function () {
      return false;
    };

    target.ondragleave = target.ondragend = function () {
      return false;
    };

    target.ondrop = (e) => {
      e.preventDefault();
      this.parseForBuild(e.dataTransfer.files[0].path);
    };
  },

  parsePackageJSON(file) {
    const parsedPackage = JSON.parse(fs.readFileSync(file, 'utf-8'));

    this.setState({
      'title': parsedPackage.name,
      'version': parsedPackage.version
    });

    return parsedPackage;
  },

  killProcess() {
    process.kill(this.state.pid)

    this.setState({
      'pid': ''
    });
  },

  runStartScript() {
      const child = exec('npm start', {async:true});
      this.setState({'pid': child.pid + 1});

      child.stdout.on('data', (data) => {
        const local = data.match(/localhost:\d{4}/);

        if (local && this.state.port === '') {
          const port = local[0].split(':')[1];

          this.setState({'port': `:${port}`});
        }
      });
  },

  parseForBuild(filePath) {
    const files = fs.readdirSync(filePath);

    files.filter((x) => {
      const fullPath = filePath + '/' + x;
      const name = path.basename(fullPath, '.json');

      return (name === 'package'); 
    })
    .forEach((x) => {
        cd(filePath);
        const packageJSON = this.parsePackageJSON(x);

        if ( packageJSON.scripts.start ) {
          this.runStartScript();
        } else {
          console.log('no valid start script!');
        }
    });
  },

  render() {
    let button;

    if (this.state.pid) {
      button = (
        <button onClick={this.killProcess} className="btn">
          Stop Server
        </button>
      );
    } else {
      button = null;
    }

    return (
      <span>
        <Header data={this.state} />
        <div id="drop"></div>
          <svg viewBox="0 0 34 46">
            <g class="arrow" fill="none" transform="translate(1, 1)" stroke="#FFA800" stroke-width="2">
              <path d="M16,0 L16,42" stroke-linecap="square" />
              <path d="M0,26 L15.9023353,43 L32,26" />
            </g>
          </svg>
        </div>
        {button}
      </span>
    );
  }
});

export default Drop;
