const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    pets: [String]!
    favorites: [Pet]!
  }
type Pet{
  _id:ID
  name:String
  description:String
  image:String
  price:Int
  quantity:Int
}
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User
    pets: [Pet]
    pet(petId : ID!):Pet
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addFavorite(userId: ID!, favorite: String!): User
    removeUser: User
    removeFavorite(favorite: String!): User
    addPet(input: String!): Pet
    removePet(petId: ID!): User
    updatePet(petId: ID!): Pet

  }
`;

module.exports = typeDefs;
