## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

#Simple user service
## stack: Typescript, TypeORM, Nest.js
## Database: PostgresSQL
database config is in app module, automigration is on
All entity is a childe of CoreEntity in 'src/application/entities/core.entity.ts'
middleware is the nest decorator

