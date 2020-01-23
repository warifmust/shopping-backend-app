const { buildSchema } = require("graphql");

module.exports = buildSchema(`
	type Event {
		_id: ID!
		name: String!
		date: String!
	}

	type User {
		_id: ID!
		name: String!
		email: String!
		password: String
		phoneNumber: String!
		userType: String
	}

	type AuthData {
		userId: ID!
		token: String!
		tokenExpiration: Int!
	}

	input EventInput {
		_id: String!
		name: String!
		date: String!
	}

	input UserInput {
		name: String!
		email: String!
		password: String!
		phoneNumber: String!
	}

	type RootQuery {
		events: [Event!]!
		loginUser(email: String!, password: String!): AuthData!
	}

	type RootMutation {
		createEvent(eventInput: EventInput): Event
		signUpUser(userInput: UserInput): User
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`);
