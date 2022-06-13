const express = require("express");
const colors = require("colors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
// const { buildSchema } = require("graphql");

const app = express();

// Connect to database:
connectDB();

// // Construct a schema, using GraphQL schema language
// const schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// // The root provides a resolver function for each API endpoint
// const root = {
//   hello: () => {
//     return "Hello world!";
//   },
// };

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: process.env.NODE_ENV === "development",
    // graphiql: true,
  })
);
app.listen(port);
// console.log(port);
console.log(`Server is listening on port: ${port}`);
