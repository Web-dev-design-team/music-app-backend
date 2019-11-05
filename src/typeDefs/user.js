import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        users: [User!]!
        user(id:ID): User
    }

    extend type Mutation {
        signUp(name: String!, username: String!, email: String!, password: String!): SignUpRes,
        login(email: String!, password: String!): SignUpRes,
        updateProfile(name: String, bio: String, avatar: String, username: String): User, 
        verifyUser(verificationCode: String!): SignUpRes, 
        resendVerificationLink: String!
    }

    type SignUpRes {
        user: User!,
        message: String,
        token: String!
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
