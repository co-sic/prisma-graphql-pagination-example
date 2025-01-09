import { graphql } from '@gastromatic/node-service-utils-code-tag'
import { generatePaginationTypedefs } from '@gastromatic/graphql-cursor-pagination-core'

export const baseTypeDefs = graphql`
  type Mutation {
    createDraft(authorEmail: String!, data: PostCreateInput!): Post
    deletePost(id: Int!): Post
    incrementPostViewCount(id: Int!): Post
    signupUser(data: UserCreateInput!): User!
    togglePublishPost(id: Int!): Post
  }

  type Post {
    author: User
    content: String
    createdAt: DateTime!
    id: Int!
    published: Boolean!
    title: String!
    updatedAt: DateTime!
    viewCount: Int!
  }

  input PostCreateInput {
    content: String
    title: String!
  }

  ${generatePaginationTypedefs(
    'Post',
    ['AUTHOR_NAME', 'TITLE'],
    ['AUTHOR_EMAIL', 'VIEW_COUNT'],
  )}

  type Query {
    allUsers: [User!]!
    draftsByUser(userUniqueInput: UserUniqueInput!): [Post]
    posts(
      after: String
      first: Int
      orderBy: [PostOrder!]
      filterBy: PostFilterGroup
    ): PostConnection!
    postById(id: Int): Post
  }

  type User {
    email: String!
    id: Int!
    name: String
    posts: [Post!]!
  }

  input UserCreateInput {
    email: String!
    name: String
    posts: [PostCreateInput!]
  }

  input UserUniqueInput {
    email: String
    id: Int
  }

  scalar DateTime
`
