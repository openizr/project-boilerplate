# project-boilerplate

Backend/frontend project boilerplate, to start a new JavaScript/Typescript project as fast as a 🚀.

Based on the [typescript-dev-kit](https://github.com/openizr/typescript-dev-kit)


## Project structure

### `backend`

Contains the back-end (server) codebase.

- `backend/src/scripts/conf`: global configuration (environment variables, endpoints declaration, common services, ...)
- `backend/src/scripts/hooks`: API hooks (aka middlewares)
- `backend/src/scripts/lib`: external services clients (APIs, databases, cache, ...) implementation
- `backend/src/scripts/locale`: translated labels, one file per language
- `backend/src/scripts/routes`: API endpoints implementation

### `frontend`

Contains the front-end (in-browser UI) codebase.

- `frontend/public`: public assets, served statically (HTML, JS, CSS, fonts, images, ...)
- `frontend/src/styles/components`: app-specific components' design SASS implementation
- `frontend/src/styles/pages`: app-specific pages' design SASS implementation
- `frontend/src/styles/_variables.scss`: global design system configuration (colors, fonts, ...)
- `frontend/src/scripts/components`: UI components React implementation
- `frontend/src/scripts/containers`: UI containers React implementation (based on [`diox`](https://github.com/openizr/diox))
- `frontend/src/scripts/helpers`: utility functions
- `frontend/src/scripts/lib`: external services clients (APIs, databases, cache, ...) implementation
- `frontend/src/scripts/locale`: translated labels, one file per language
- `frontend/src/scripts/pages`: UI pages React implementation
- `frontend/src/scripts/store`: store modules implementation (based on [`diox`](https://github.com/openizr/diox))


## Usage

/!\ [Docker](https://www.docker.com/) must be installed on your machine. /!\

At the root of the repository:

1. `cp .env.example` `.env`
2. Complete your `.env` file with missing values
3. `docker-compose up` (this might take a little while to start-up on the first time)

You can then navigate through the UI in your browser (`http://localhost:[FRONTEND_PORT])`), or
call the back-end API (`http://localhost:[BACKEND_PORT])`)
