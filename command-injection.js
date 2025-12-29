const { exec, spawn } = require('child_process');
const express = require('express');
const app = express();

// Pattern 1: Direct exec with user input
function pingHost(hostname) {
  exec('ping -c 4 ' + hostname, (error, stdout) => {
    console.log(stdout);
  });
}

// Pattern 2: Template literal exec
function runCommand(cmd) {
  exec(`${cmd}`, (error, stdout) => {
    console.log(stdout);
  });
}

// Pattern 3: String concatenation
function convertFile(filename) {
  const command = 'convert ' + filename + ' output.png';
  exec(command);
}

// Pattern 4: Shell: true (dangerous)
function executeWithShell(userInput) {
  exec(userInput, { shell: true }, (error, stdout) => {
    console.log(stdout);
  });// Pattern 4: Shell: true (dangerous)

  
function executeWithShell(userInput) {
  exec(userInput, { shell: true }, (error, stdout) => {
  });
}
  

// Pattern 4: Shell: true (dangerous)
function executeWithShell(userInput) {
  exec(userInput, { shell: true }, (error, stdout) => {
    console.log(stdout);
  });
}

// Pattern 5: spawn with shell
function spawnCommand(cmd) {
  spawn(cmd, [], { shell: true });
}

module.exports = {
  pingHost,
  runCommand,
  convertFile,
  executeWithShell,
  spawnCommand
};
