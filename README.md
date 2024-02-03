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

### API ENDPOINT

```
URL: http://3.95.0.99:3001

```
### API DOCUMENTATION
```
API DOCUMENTATION: https://documenter.getpostman.com/view/21317033/2s9YyvC1eG
```


# Database and Framework Choice

## MongoDB

### Why MongoDB?
```
MongoDB was chosen as the database for this functionality due to its flexibility and scalability. The nature of wallet and transaction data often involves complex structures and relationships, making a NoSQL database like MongoDB well-suited for handling dynamic and nested data. MongoDB's document-oriented model allows for easy representation of complex structures, making it ideal for storing transaction details, user information, and wallet configurations.

MongoDB also provides horizontal scalability, which is crucial for applications with potentially large amounts of transactional data. The ability to scale horizontally by adding more servers allows the system to handle increased load and ensure performance as the user base grows.
```

## NestJS

### Why NestJS?

```
NestJS was selected as the framework for implementing this functionality due to its modular and scalable architecture. NestJS is built on top of Node.js and utilizes TypeScript, providing a robust and maintainable codebase. The framework follows the principles of modular development and is inspired by Angular, making it easy to organize and scale the project.

NestJS supports the use of decorators and dependency injection, which enhances code readability and promotes maintainability. It also comes with built-in support for OpenAPI (Swagger), simplifying the process of documenting and testing APIs.

The use of NestJS facilitates the creation of a structured and organized project, ensuring that the wallet service is maintainable and extensible as new features are added. Additionally, NestJS's compatibility with TypeScript contributes to better code quality and reduces the likelihood of runtime errors.
```
