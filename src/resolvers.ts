import { DateTimeResolver } from 'graphql-scalars'
import { Resolvers } from './generated/graphql'
import { postPagination } from './pagination'

export const resolvers: Resolvers = {
  Query: {
    posts: (_parent, args, context) => {
      return postPagination.getConnection(args, async (queryParameters) => {
        return Promise.all([
          context.prisma.post.findMany({
            where: queryParameters.filterQuery,
            orderBy: queryParameters.orderBy,
            take: queryParameters.limit,
          }),
          context.prisma.post.count({ where: queryParameters.filterQuery }),
        ])
      })
    },
  },
  DateTime: DateTimeResolver,
  // Post: {
  //   author: (parent, _args, context: Context) => {
  //     return context.prisma.post
  //       .findUnique({
  //         where: { id: parent?.id },
  //       })
  //       .author()
  //   },
  // },
  // User: {
  //   posts: (parent, _args, context: Context) => {
  //     return context.prisma.user
  //       .findUnique({
  //         where: { id: parent?.id },
  //       })
  //       .posts()
  //   },
  // },
}
