import React from "react";
import ReactDOM from "react-dom";
import fs from "fs";
import path from "path";
import shelljs from "shelljs/global";
import address from "address";
import DropArea from "DropArea";
import Header from "Header";
import fixPath from "fix-path";
const shell = require("shell");
const appHolder = document.getElementById('app');

const App = React.createClass({
  getInitialState() {
    return {
      'port': '',
      'title': '',
      'version': '',
      'status': '',
      'ip': address.ip()
    };
  },

  componentDidMount() {
    fixPath();
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

    installProcess.stdout.on('data', (data) => {
      this.setState({
        status: data
      });
    });

    installProcess.on('exit', (code) => {
        this.setState({
          status: ''
        });
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
        this.setState({
          status: data 
        });
        const local = data.match(/:\d{4}/);

        if (local && this.state.port === '') {
          this.setState({
            'port': `${local}`,
            'status': ''
          });
        }
      });
  },

  parseForBuild(filePath) {
    fs.readdirSync(filePath).filter((x) => {
      return (path.basename(x, '.json') === 'package');
    })
    .forEach((x) => {
        cd(filePath);
        const parsedPackage = JSON.parse(fs.readFileSync(x, 'utf-8'));
        const url = (parsedPackage.repository) ? parsedPackage.repository.url : '';

        this.setState({
          'title': parsedPackage.name,
          'version': parsedPackage.version,
          'repository': url
        });

        this.installModules(parsedPackage);
    });
  },

  openSite() {
    shell.openExternal(`http://localhost${this.state.port}`);
  },

  openRepo() {
    shell.openExternal(this.state.repository);
  },

  render() {
    let header;
    let interactions;
    let dropArea;
    let repoButton;

    if (this.state.repository) {
      repoButton = (
        <button onClick={this.openRepo} className="btn">
          GitHub Repository
        </button>
      );
    } else {
      repoButton = null;
    }

    if (this.state.pid) {
      header = (
        <Header data={this.state} />
      );
      interactions = (
        <div className="actions">
          <button onClick={this.openSite} className="btn">
            Launch Website
          </button>
          {repoButton}
          <button onClick={this.killProcess} className="btn">
            Stop Server
          </button>
        </div>
      );
      dropArea = null;
    } else {
      header = null;
      interactions = null;
      dropArea = <DropArea data={this.state} />;
    }
    return (
      <div className="view">
        {header}
        {interactions}
        {dropArea}
      </div>
    );
  }
});

ReactDOM.render(<App />, appHolder);
