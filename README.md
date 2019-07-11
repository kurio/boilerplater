# Boilerplater
Boilerplater is a simple tool to generate boilerplate codes for various kind of applications

## Installation
`npm i -g @kurio/boilerplater`

## Usage
Available boilerplates are:

### Node.js Web Server
`boilerplater node-server <dir>`

This will generate codes for a web server into `dir` destination using this template: https://github.com/kurio/boilerplate-server-nodejs.

Packages used:
- [Express](https://expressjs.com/) as the main server
- [Babel](https://babeljs.io/) for transpiler
- [Jest](https://jestjs.io/) for test runner
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) for linters
- [Nodemon](https://nodemon.io/) for file watcher
- [Husky](https://github.com/typicode/husky) for git hooks

### Node.js CLI App
`boilerplater node-cli <dir>`

This will generate codes for a CLI application into `dir` destination using this template: https://github.com/kurio/boilerplate-cli-nodejs.

Packages used:
- [Commander.js](https://github.com/tj/commander.js/) as CLI handler
- [Babel](https://babeljs.io/) for transpiler
- [Jest](https://jestjs.io/) for test runner
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) for linters
- [Husky](https://github.com/typicode/husky) for git hooks
