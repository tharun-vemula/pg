const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

  type Weather {
    temp : String
    humidity : String
  }

  type Accounts {
    bank : String
    branch : String
    address : String
    city : String
    district : String
    state : String
    bank_code : String
    weather : Weather
  }

  type User {
    id: ID
    name: String
    accounts : [Accounts]

  }

  type Query {
    getAllDetails : [User]
  }

  input Data {
    user_id : Int!
    user_name : String!
    bank_accounts: [String]
  }

  type Mutation {
    addAccountDetails(data : Data) : User
  }
`;


module.exports =  typeDefs