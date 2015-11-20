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
      'title': '',
      'version': '',
      'ip': address.ip()
    };
  },

  componentDidMount() {
    const target = document.body;

    target.ondragover = function () {
      target.classList.add('hover');
      return false;
    };

    target.ondragleave = target.ondragend = function () {
      target.classList.remove('hover');
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
      'version': parsedPackage.version,
      'repository': parsedPackage.repository.url
    });

    return parsedPackage;
  },

  killProcess() {
    process.kill(this.state.pid)

    this.setState({
      'pid': ''
    });
  },

  installModules(packageJSON) {
    const installProcess = exec('npm install', {async: true});

    installProcess.on('exit', (code) => {
        if (code === 0 && packageJSON.scripts) {
          if (packageJSON.scripts.start) {
            this.runStartScript();
          } else {
            alert('No npm start script found');
            this.setState({
              title: '',
              version: ''
            });
          }
        } else {
          alert('No npm script found');
          this.setState({
            title: '',
            version: ''
          });
        }
    });
  },

  runStartScript() {
      const startProcess = exec('npm start', {async:true});
      this.setState({'pid': startProcess.pid + 1});

      startProcess.stdout.on('data', (data) => {
        const local = data.match(/:\d{4}/);

        if (local && this.state.port === '') {
          this.setState({'port': `${local}`});
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
        this.installModules(packageJSON);
    });
  },

  render() {
    let header;
    let interactions;
    let dropArea;

    if (this.state.pid) {
      header = (
        <Header data={this.state} />
      );
      interactions = (
        <div className="actions">
          <button onClick={this.killProcess} className="btn">
            Stop Server
          </button>
        </div>
      );
      dropArea = null;
    } else {
      header = null;
      interactions = null;
      dropArea = (
        <div id="drop">
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
              Drag your project folder to the window
            </div>
          </div>
        </div>
      );
    }

    return (
      <span>
        {header}
        {interactions}
        {dropArea}
      </span>
    );
  }
});

export default Drop;
