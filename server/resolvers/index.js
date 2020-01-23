const eventResolver = require("./event");
const authResolver = require("./auth");
const userResolver = require("./user");

const rootResolver = {
  ...eventResolver,
  ...authResolver,
  ...userResolver
};

module.exports = rootResolver;
