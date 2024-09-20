# Node.js TypeScript Starter Template

A starter template for building scalable Node.js applications using TypeScript, featuring essential packages and Docker support.

## Features

- TypeScript for type safety
- Express.js for server framework
- Prisma for database interaction
- Socket.IO for real-time communication
- Bull for job queues
- JWT for authentication
- Swagger for API documentation
- ESLint and Prettier for code quality
- Docker for containerization

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- Docker (for containerization)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GurudeepNaik/node-starter
   cd node-starter
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory to configure environment variables. Here's an example:

   ```plaintext
   PORT=3000
   DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb?schem"
   ```

### Development

To run the development server with hot-reloading:

```bash
npm run dev
```

### Building the Application

To build the TypeScript code into JavaScript:

```bash
npm run build
```

### Running the Application

To start the application:

```bash
npm start
```

### Seeding the Database

To seed your database:

```bash
npm run seed
```

### Running Tests

To run the tests with coverage:

```bash
npm run test
```

### Linting

To lint your code:

```bash
npm run lint
```

### Formatting

To format your code using Prettier:

```bash
npm run format
```

## Docker

To build and run the application in a Docker container, follow these steps:

1. Build the Docker image:

   ```bash
   docker build -t node-starter .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 3000:3000 --env-file .env node-starter
   ```

## Scripts Overview

| Script   | Description                                           |
|----------|-------------------------------------------------------|
| `dev`    | Runs the server in development mode                   |
| `build`  | Compiles TypeScript to JavaScript                     |
| `start`  | Starts the built application                          |
| `seed`   | Seeds the database                                    |
| `lint`   | Lints the code                                        |
| `test`   | Runs the tests with coverage                          |
| `format` | Formats the code using Prettier                       |

## Dependencies

### Dependencies

- [@prisma/client](https://www.prisma.io/client)
- [express](https://expressjs.com/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [socket.io](https://socket.io/)
- [dotenv](https://github.com/motdotla/dotenv)
- [nodemailer](https://nodemailer.com/)
- [winston](https://github.com/winstonjs/winston)

### Dev Dependencies

- [jest](https://jestjs.io/)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
- [ts-jest](https://github.com/kulshekhar/ts-jest)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
