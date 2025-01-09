import { baseTypeDefs } from './typedefs'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { getPaginationTypedefs } from '@gastromatic/graphql-cursor-pagination-core'

export const typeDefs = mergeTypeDefs([
  baseTypeDefs,
  getPaginationTypedefs().replace('@shareable', ''),
])
