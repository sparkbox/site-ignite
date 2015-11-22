import React from "react";
import Header from "Header";
import DropArea from "DropArea";
import fs from "fs";
import path from "path";
import shelljs from "shelljs/global";
import address from "address";
const shell = require("shell");

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
      target.classList.remove('load');
      target.classList.add('hover');
      return false;
    };

    target.ondragleave = target.ondragend = function () {
      target.classList.remove('hover');
      return false;
    };

    target.ondrop = (e) => {
      target.className = 'load';
      e.preventDefault();
      this.parseForBuild(e.dataTransfer.files[0].path);
    };

    const check = exec('which node', {async: true});
    check.on("exit", (exit) => {
      if (exit != 0) {
        shell.openExternal('https://nodejs.org/en/download/');
      }
    });
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
    const target = document.body;
    target.className = '';

    process.kill(this.state.pid);

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
          <button className="btn">
            Launch Website
          </button>
          <button className="btn">
            GitHub Repository
          </button>
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
        <DropArea data={this.state} />
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
