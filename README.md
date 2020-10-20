# project-boilerplate

Backend/frontend project boilerplate, to start a new JavaScript/Typescript project as fast as a 🚀.

Based on the [typescript-dev-kit](https://github.com/openizr/typescript-dev-kit)

## Starting a back-end project

1. ```bash yarn install```
2. ```bash yarn run init```
3. Configure `package.json`:
```json
  ...
  "tsDevKitConfig": {
    "target": "node",
    "entry": {
      "main": "<YOUR_MAIN_ENTRYPOINT>"
    },
    "srcPath": "<YOUR_SRC_PATH>",
    "distPath": "<YOUR_DIST_PATH>",
    "banner": "<YOUR_BANNER>",
    "env": {
      "development": {
        "NODE_ENV": "\"development\""
      },
      "production": {
        "NODE_ENV": "\"production\""
      }
    }
  },
  ...
```

## Starting a front-end project

1. ```bash ./scripts/init.sh```
2. ```bash yarn install```
3. Configure `package.json`:
```json
  ...
  "tsDevKitConfig": {
    "target": "web",
    "devServer": {
      "ip": "0.0.0.0",
      "port": 3000
    },
    "entry": {
      "main": "<YOUR_MAIN_ENTRYPOINT>"
    },
    "srcPath": "<YOUR_ASSETS_PATH>",
    "distPath": "<YOUR_PUBLIC_PATH>",
    "banner": "<YOUR_BANNER>",
    "env": {
      "development": {
        "NODE_ENV": "\"development\""
      },
      "production": {
        "NODE_ENV": "\"production\""
      }
    }
  },
  ...
```
