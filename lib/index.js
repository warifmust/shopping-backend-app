"use strict";
const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const { rootResolver } = require("./server/resolvers/index");
const { graphQlSchema } = require("./server/schema/index");
const bodyParser = require("body-parser");
const { isAuth } = require("./server/middleware/is-auth");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
app.use(isAuth);
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorizations");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
app.use("/graphql", graphqlHTTP({
    schema: graphQlSchema,
    rootValue: rootResolver,
    graphiql: true,
}));
const port = process.env.PORT || 4000;
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@seteltest.omgpl.mongodb.net/${process.env.PROJECT_NAME}?retryWrites=true&w=majority`)
    .then(() => {
    app.listen(port);
    console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map