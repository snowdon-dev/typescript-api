# Typescript Web Application and API

Development is happening on branch `develop/ds/staging`

## Development
- Add GUI link submission panel
- Add redirect handler
- Docker dev environment rejig - reload (nodemon etc setup)
- E2e testing
- Layer testing

## Testing
I've only implemented Unit Testing so far

```bash
$ yarn install
$ yarn test
```

## Build steps
Build steps will change - To run the application follow:

```bash
$ yarn install
$ ./node_modules/.bin/tsc

// method one
$ docker-compose up

// method two
$ node build/api/index.js
```

