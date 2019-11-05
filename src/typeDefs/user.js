import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        users(id:ID, username:String): [User!]!
        user(id:ID, username:String): User
    }

    extend type Mutation {
        signUp(name: String!, username: String!, email: String!, password: String!): User
    }

    type User {
        id: ID!
        name: String!
        username: String!
        email: String!
        bio: String
        avatar: String
    }
`;
