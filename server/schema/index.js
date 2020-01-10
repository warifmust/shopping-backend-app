const { buildSchema } = require('graphql');

module.exports = buildSchema(`
	type Event {
		_id: String!
		name: String!
		date: String!
	}

	input EventInput {
		_id: String!
		name: String!
		date: String!
	}

	type RootQuery {
		events: [Event!]!
	}

	type RootMutation {
		createEvent(eventInput: EventInput): Event
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`);