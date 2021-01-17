# Tokimons with MERN

An assignment that was given during one of my software engineering courses.
I like the idea of having a target model (in this case "Tokimons") and building
a CRUD app around it. This was derived from my earlier iteration of it using only
server side rendering with EJS and Express.

Note: I have disabled signup to prevent someone from filling up the DB
(probably no one will be looking at this site but I'm paranoid)

## Features

- Add a Tokimon to the database
- Display all your Tokimons
- Show information about a specific Tokimon
- Update a Tokimon's information
- Delete a Tokimon

### Additional Features

- User login and uses JWTs
- Match a Tokimon's highest attribute with a color
- Display a chart of a Tokimon's attributes
- Search for Tokimons with names

## Built with

- [MongoDB](https://www.mongodb.com/) - stores Tokimon and user information
- [Express](https://expressjs.com/) - backend framework
- [React](https://reactjs.org/) - frontend framework for a reactive SPA
- [Node.js](https://nodejs.org/en/) - runs the backend server
- [Typescript](https://www.typescriptlang.org/) - superset of JS that provides types
- [JSON Web Tokens](https://jwt.io/) - "sessionless" auth with access and refresh tokens
- [Chart.js](https://www.chartjs.org/docs/latest/) - generates bar graphs of our Tokimon type levels
- [Formik](https://formik.org/) - frontend package that helps with validation
- [React Bootstrap](https://react-bootstrap.github.io/) - frontend package that comes with pretty components
- [Yup](https://github.com/jquense/yup) - simple validator that runs with Formik
