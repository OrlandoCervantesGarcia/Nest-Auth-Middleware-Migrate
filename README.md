<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This app provide. It is done with:

  - Auth
  - Middleware
  - Migrate Seed
  - PostgreSQL
  - API Rest

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

## Config data DB

```bash
# .env
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
POSTGRES_PORT=
PORT=
MODE=PROD or DEV
RUN_MIGRATIONS=true
ACCESS_TOKEN_SECRET=
```

## Installation DB & Run Data Seed

```bash
# migrate db
$ npm run start:dev

# seed data
$ npm run seed
```

API can be listened at https:///nest-rest-api.vercel.app or localhost 3009


## API Reference

#### Sign Up a new user

```http
  POST /auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Name of the person signing up |
| `email` | `string` | **Required**. Email of the person signing up |
| `password` | `string` | **Optional**. Password of the person signing up |

Password is hashed and saved in the db. 

**Example**
```
{
    "name": "Manoj",
    "email": "manojsethi@manojsethi.com",
    "password": "MyRandomPassword"
}
```

### Auth Endpoints
#### Login

```http
  GET /auth
```

| Parameter | Type     | Description                |        Demo 1      |       Demo 2        |       Demo 3        |
| :-------- | :------- | :------------------------- | :----------------- | :------------------ | :------------------ |
| `email` | `string` | **Required**. Email of the person signing in | Isadore.Fay6@gmail.com | Martina.Fritsch79@gmail.com | Wellington_OHara2@hotmail.com
| `password` | `string` | **Required**. Password of the person signing in | XG1s9jyHGFmRmvp | Miha43OCdip693m | QcWI4EaWOYMh8Ld

**Example**
```
{
    "email": "Isadore.Fay6@gmail.com",
    "password": "XG1s9jyHGFmRmvp"
}
```

#### SignIn

```http
  POST /auth/login
```

| Parameter | Type     | Description                |        Demo 1      |       Demo 2        |       Demo 3        |
| :-------- | :------- | :------------------------- | :----------------- | :------------------ | :------------------ |
| `email` | `string` | **Required**. Email of the person signing in | Isadore.Fay6@gmail.com | Martina.Fritsch79@gmail.com | Wellington_OHara2@hotmail.com
| `password` | `string` | **Required**. Password of the person signing in | XG1s9jyHGFmRmvp | Miha43OCdip693m | QcWI4EaWOYMh8Ld

**Example**
```
{
    "email": "manojsethi@manojsethi.com",
    "password": "MyRandomPassword"
}
```

After you are logged in you need to set the Authorization Header with the value of Bearer {{AccessToken}} in order to access the further API

#### RefreshToken

```http
  GET /auth/refresh
```
**NOTE** You need to pass Authorization Header with Bearer {{RefreshToken}} (RefreshToken received in signin request) to get the new pair of tokens.

```http
  GET /auth/logout
```
**NOTE** You need to pass Authorization Header with Bearer {{AccessToken}} (AccessToken received in signin request) as Logout is a secured route and is authenticated by AccessToken.

### Users Endpoints

#### Get All Users

```http
  GET /users
```

#### Get User By ID

```http
  GET /users/:id
```

#### Update User By ID

```http
  PATCH /users/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Optional** Name of the person |
| `email` | `string` | **Optional** Email of the person |
| `password` | `string` | **Optional** Password of the person |

**Example**
```
{
    "email": "manojsethi@manojsethi.com",
    "password": "MyRandomPassword"
}
```

#### Delete User By ID

```http
  DELETE /users/:id
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
