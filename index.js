const express = require("express");
const path = require("path");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const rootResolver = require("./server/resolvers/index");
const graphQlSchema = require("./server/schema/index");
const generatePassword = require("password-generator");
const bodyParser = require("body-parser");
const isAuth = require("./server/middleware/is-auth");

const app = express();

app.use(bodyParser.json());
app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: rootResolver,
    graphiql: true
  })
);

// Put all API endpoints under '/api'
app.get("/api/passwords", (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  );

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 4000;
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-p8tzi.mongodb.net/${process.env.PROJECT_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port);
    console.log(
      `Running a GraphQL API server at http://localhost:${port}/graphql`
    );
  })
  .catch(err => console.log(err));
