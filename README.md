# project-boilerplate

Library/playground project boilerplate, to start a new JavaScript/Typescript project as fast as a 🚀.

Based on [typescript-dev-kit](https://github.com/openizr/typescript-dev-kit).


## Project structure

### `library`

Contains the library (NPM package) codebase.

- `library/src/scripts`: core files

### `playground`

Contains the playground (in-browser UI) codebase.

- `playground/public`: public assets, served statically (HTML, JS, CSS, fonts, images, ...)
- `playground/src/scripts`: playground's logic


## Usage

/!\ [docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/) must be installed on your machine. /!\

At the root of this repository:

1. `cp .env.example` `.env`
2. Complete/change your `.env` file's values if necessary
3. `docker-compose up` (this might take a little while to start-up on the very first time)

You can then navigate through the UI in your browser (`http://localhost:[FRONTEND_PORT])`), or
call the back-end API (`http://localhost:[BACKEND_PORT])`)










## Usage

/!\ [Docker](https://www.docker.com/) must be installed on your machine. /!\

At the root of the repository:

1. `cp .env.example` `.env`
2. Complete your `.env` file with missing values
3. `docker-compose up` (this might take a little while to start-up on the first time)

You can then navigate through the UI in your browser (`http://localhost:[PLAYGROUND_PORT])`)
