const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    posts: [Post]
    friends: [User]
  }

  type Post {
    _id: ID
    postText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
    likeCount: Int
    likes: [Like]
    category: String
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Like {
    _id: ID
    userId: [String]
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(_id: ID!): Post
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPost(postText: String!, category: String!): Post
    addReaction(postId: ID!, reactionBody: String!): Post
    addFriend(friendId: ID!): User
    addLike(postId: ID!): Post
    removeLike(postId: ID!): Post
  }
`;

module.exports = typeDefs;
