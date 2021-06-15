"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphQlSchema = void 0;
const graphql_1 = require("graphql");
exports.graphQlSchema = graphql_1.buildSchema(`
	type User {
		_id: ID!
		name: String!
		email: String!
		password: String
		phoneNumber: String!
		userType: String
	}

	type Product {
		_id: ID!
		img: String
		price: String
		name: String
		nutrient: String
	}

	type Cart {
		_id: ID!
		img: String!
		price: String!
		name: String!
		nutrient: String!
		belongsTo: String!
		status: String!
	}

	type AuthData {
		userId: ID!
		token: String!
		tokenExpiration: Int!
		user: User!
	}

	type ListOrders {
		_id: ID!
		img: String!
		price: String!
		name: String!
		nutrient: String!
	}

	type Order {
		_id: ID!
		belongsTo: String!
		totalPrice: String!
		status: String
		orders: [ListOrders!]!
	}

	input UserInput {
		name: String!
		email: String!
		password: String!
		phoneNumber: String!
	}

	input ProductInput {
		img: String!
		price: String!
		name: String!
		nutrient: String!
	}

	input CartInput {
		img: String!
		price: String!
		name: String!
		nutrient: String!
		belongsTo: String
		status: String
	}

	input ListOrdersInput {
		_id: String!
		img: String!
		price: String!
		name: String!
		nutrient: String!
	}

	input OrderInput {
		belongsTo: String!
		totalPrice: String!
		orders: [ListOrdersInput!]!
	}

	type RootQuery {
		loginUser(email: String!, password: String!): AuthData!
		getProducts: [Product]
		getProductsInCart(belongsTo: String!): [Cart]
		getOrder(belongsTo: ID!): [Order] 
	}

	type RootMutation {
		signUpUser(userInput: UserInput): User
		createProduct(productInput: ProductInput): Product
		addToCart(cartInput: CartInput): Cart
		removeProductInCart(id: ID!): Boolean
		createOrder(orderInput: OrderInput): Order
		cancelOrder(id: ID!): Boolean
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`);
//# sourceMappingURL=index.js.map